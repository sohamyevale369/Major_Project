import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const USERS_FILE = path.resolve(__dirname, 'src/data/users.json');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'users-json-api',
      configureServer(server) {
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
              res.end(JSON.stringify({ error: err.message }));
            }
          } else if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body);
                fs.writeFileSync(USERS_FILE, JSON.stringify(parsed, null, 2), 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, count: parsed.length }));
              } catch (err) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
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
    port: 3000,
    open: true
  }
});
