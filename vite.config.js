import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const USERS_FILE = path.resolve(__dirname, 'src/data/users.json');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    define: {
      __DEV_SERVER_BOOT__: JSON.stringify(Date.now().toString())
    },
    plugins: [
      react(),
      {
        name: 'users-json-api',
        handleHotUpdate({ file }) {
          if (file.includes('users.json')) {
            return []; // Return empty array to prevent HMR and browser page reloads
          }
        },
        configureServer(server) {
          server.middlewares.use('/api/users/register', (req, res, next) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const newUser = JSON.parse(body);
                  if (!newUser || !newUser.email) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: 'Invalid payload: email is required.' }));
                    return;
                  }

                  let currentOnDisk = [];
                  if (fs.existsSync(USERS_FILE)) {
                    try {
                      currentOnDisk = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
                    } catch (e) {
                      currentOnDisk = [];
                    }
                  }

                  const em = newUser.email.toLowerCase().trim();
                  const exists = currentOnDisk.some(u => u && u.email && u.email.toLowerCase().trim() === em);
                  if (exists) {
                    res.statusCode = 400;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: `An account with email "${newUser.email}" already exists. Please sign in instead.` }));
                    return;
                  }

                  // Prepend the new registered user to the database
                  currentOnDisk.unshift(newUser);
                  fs.writeFileSync(USERS_FILE, JSON.stringify(currentOnDisk, null, 2), 'utf-8');
                  console.log(`\n[NEW USER REGISTERED] ${newUser.name} (${newUser.email}) [Role: ${newUser.role}] — Total: ${currentOnDisk.length}`);

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, user: newUser, users: currentOnDisk, count: currentOnDisk.length }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
            } else {
              next();
            }
          });

          server.middlewares.use('/api/users', (req, res, next) => {
            if (req.method === 'GET') {
              try {
                if (!fs.existsSync(USERS_FILE)) {
                  fs.writeFileSync(USERS_FILE, '[]', 'utf-8');
                }
                const data = fs.readFileSync(USERS_FILE, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err.message }));
              }
            } else if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', () => {
                try {
                  const parsed = JSON.parse(body);
                  const isExplicitReplace = req.headers['x-replace-database'] === 'true' || req.url.includes('replace=true');

                  let currentOnDisk = [];
                  if (fs.existsSync(USERS_FILE)) {
                    try {
                      currentOnDisk = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
                    } catch (e) {
                      currentOnDisk = [];
                    }
                  }

                  let finalUsers = [];

                  if (isExplicitReplace && Array.isArray(parsed)) {
                    // Admin explicit replacement (such as delete or deduplication)
                    finalUsers = parsed;
                  } else if (Array.isArray(parsed)) {
                    // Safe merge by email to prevent accidental data loss across multiple devices
                    const diskMap = new Map();
                    for (const u of currentOnDisk) {
                      if (u && u.email) diskMap.set(u.email.toLowerCase().trim(), u);
                    }
                    for (const u of parsed) {
                      if (u && u.email) {
                        const em = u.email.toLowerCase().trim();
                        const existing = diskMap.get(em) || {};
                        diskMap.set(em, { ...existing, ...u });
                      }
                    }
                    finalUsers = Array.from(diskMap.values());
                  } else if (parsed && typeof parsed === 'object' && parsed.email) {
                    // Single user record update
                    const diskMap = new Map();
                    for (const u of currentOnDisk) {
                      if (u && u.email) diskMap.set(u.email.toLowerCase().trim(), u);
                    }
                    const em = parsed.email.toLowerCase().trim();
                    const existing = diskMap.get(em) || {};
                    diskMap.set(em, { ...existing, ...parsed });
                    finalUsers = Array.from(diskMap.values());
                  } else {
                    finalUsers = currentOnDisk;
                  }

                  fs.writeFileSync(USERS_FILE, JSON.stringify(finalUsers, null, 2), 'utf-8');
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, count: finalUsers.length, users: finalUsers }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              next();
            }
          });

          server.middlewares.use('/api/send-otp', (req, res, next) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const { email, otp, sender = 'sohamyevale1126@gmail.com', name } = JSON.parse(body || '{}');
                  const timestamp = new Date().toLocaleString();

                  console.log('\n============================================================');
                  console.log('[MEDISAFE AI - SECURE EMAIL DISPATCH SERVICE]');
                  console.log(`Timestamp: ${timestamp}`);
                  console.log(`From (Sender): ${sender}`);
                  console.log(`To (Recipient): ${email}${name ? ` (${name})` : ''}`);
                  console.log(`Subject: MediSafe AI — Password Reset Verification Code: ${otp}`);
                  console.log('------------------------------------------------------------');

                  let gmailUser = 'sohamyevale1126@gmail.com';
                  let gmailPass = '';
                  try {
                    const envPath = path.resolve(__dirname, '.env');
                    if (fs.existsSync(envPath)) {
                      const envContent = fs.readFileSync(envPath, 'utf-8');
                      const userMatch = envContent.match(/^GMAIL_USER\s*=\s*(.+)$/m);
                      const passMatch = envContent.match(/^GMAIL_APP_PASSWORD\s*=\s*(.+)$/m);
                      if (userMatch && userMatch[1]) gmailUser = userMatch[1].trim();
                      if (passMatch && passMatch[1]) gmailPass = passMatch[1].trim();
                    }
                  } catch (e) {}
                  if (!gmailPass) {
                    gmailPass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD || '';
                  }

                  let realEmailSent = false;
                  let deliveryError = null;

                  if (gmailPass && gmailPass.trim()) {
                    try {
                      const cleanPass = gmailPass.replace(/\s+/g, '').trim();
                      const transporter = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                        port: 465,
                        secure: true,
                        auth: {
                          user: gmailUser,
                          pass: cleanPass
                        }
                      });

                      await transporter.sendMail({
                        from: `"MediSafe AI Security" <${gmailUser}>`,
                        to: email,
                        subject: `MediSafe AI — Password Reset Verification Code: ${otp}`,
                        text: `Hello,\n\nYour 6-digit verification code to reset your MediSafe AI password is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you did not request a password reset, please ignore this email.`,
                        html: `
                          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 520px; margin: auto; padding: 24px; border: 1px solid #e0dbce; border-radius: 16px; background-color: #fcfbf9;">
                            <div style="text-align: center; margin-bottom: 20px;">
                              <h2 style="color: #235339; margin: 0; font-size: 22px; font-weight: 900; letter-spacing: 1px;">MEDISAFE<span style="color: #1e5034;">.AI</span></h2>
                              <p style="color: #6a746c; font-size: 11px; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px;">Clinical Drug Safety & Patient Security Engine</p>
                            </div>
                            <div style="background: white; border: 1px solid #e5dfd1; border-radius: 12px; padding: 24px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                              <p style="font-size: 14px; color: #18231c; margin-top: 0;">Hello${name ? ` <strong>${name}</strong>` : ''},</p>
                              <p style="font-size: 13px; color: #4a554e; line-height: 1.6;">You recently initiated a request to reset the password for your MediSafe AI account. Please use the 6-digit verification code below to verify your identity and set a new password:</p>
                              <div style="text-align: center; margin: 28px 0;">
                                <div style="display: inline-block; font-size: 32px; font-weight: 900; letter-spacing: 10px; color: #235339; background: #eaf3ed; border: 2px solid #235339; padding: 14px 32px; border-radius: 12px; font-family: monospace;">
                                  ${otp}
                                </div>
                              </div>
                              <p style="font-size: 12px; color: #6a746c; margin-bottom: 4px;">⏰ This verification code is valid for <strong>10 minutes</strong>.</p>
                              <p style="font-size: 12px; color: #8d8678; margin-top: 4px; margin-bottom: 0;">If you did not request this password reset, please disregard this notification.</p>
                            </div>
                            <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #8d8678;">
                              Dispatched by MediSafe AI Security Service • Sender: ${gmailUser}
                            </div>
                          </div>
                        `
                      });
                      realEmailSent = true;
                      console.log(`[EMAIL DISPATCH SUCCESS] Real email delivered to ${email} inbox via smtp.gmail.com!`);
                    } catch (mailErr) {
                      deliveryError = mailErr.message;
                      console.error('[EMAIL DISPATCH ERROR]', mailErr.message);
                    }
                  } else {
                    console.log('[NOTICE] GMAIL_APP_PASSWORD not set in .env. Enter your 16-character Google App Password in .env to deliver real emails.');
                  }
                  console.log('============================================================\n');

                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: true,
                    realEmailSent,
                    deliveryError,
                    message: realEmailSent
                      ? `Verification email successfully dispatched to ${email}`
                      : `Verification code processed for ${email}.`,
                    sender: gmailUser,
                    timestamp
                  }));
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ success: false, error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    server: {
      host: true, // Exposes the server to the local network (Wi-Fi)
      port: 3000,
      allowedHosts: true,
      open: false,
      watch: {
        ignored: ['**/src/data/users.json', '**/users.json']
      }
    }
  };
});
