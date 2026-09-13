import React, { useState, useRef } from 'react';
import {
  Users,
  User,
  Shield,
  HeartPulse,
  Sparkles,
  ArrowLeft,
  Camera,
  Upload,
  Trash2,
  CheckCircle2,
  Mail,
  Linkedin,
  Github,
  Award,
  BookOpen,
  Cpu,
  FileCheck,
  Stethoscope,
  Code2,
  Layers,
  GraduationCap,
  FolderGit2,
  ExternalLink
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { MediSafeLogoMark } from '../common/BrandLogo';
import sohamImg from '../../assets/team/soham-yevale.jpg';
import poojaImg from '../../assets/team/pooja-salunkhe.jpg';

export default function AboutUsView() {
  const { setActiveTab, currentUser } = useHealth();

  // Store uploaded passport photos in local state (persisted in localStorage for convenience)
  const [memberPhotos, setMemberPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('medisafe_team_photos');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const fileInputRefs = {
    soham: useRef(null),
    pooja: useRef(null),
    mrunali: useRef(null)
  };

  const handlePhotoUpload = (memberId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (base64) {
        const updated = { ...memberPhotos, [memberId]: base64 };
        setMemberPhotos(updated);
        try {
          localStorage.setItem('medisafe_team_photos', JSON.stringify(updated));
        } catch (err) {
          console.warn('Could not persist team photo to localStorage:', err);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = (memberId) => {
    const updated = { ...memberPhotos };
    delete updated[memberId];
    setMemberPhotos(updated);
    try {
      localStorage.setItem('medisafe_team_photos', JSON.stringify(updated));
    } catch (err) {
      console.warn('Could not update localStorage:', err);
    }
  };

  const teamMembers = [
    {
      id: 'soham',
      number: '1',
      name: 'Soham Yevale',
      role: 'Project Lead & Full-Stack AI Engineer',
      focusArea: 'Machine Learning Architecture, SHAP/LIME Explainability & System Integration',
      department: 'Department of Computer Engineering',
      badges: ['Team Lead', 'ML Architecture', 'Full Stack'],
      badgeColor: 'bg-[#235339] text-white',
      defaultPhoto: sohamImg,
      bio: 'Final-year Computer Engineering undergraduate and lead architect behind MediSafe AI. Specializes in explainable clinical decision support, translating deep pharmacological feature interactions into interpretable clinician-ready scores using SHAP and LIME frameworks.',
      responsibilities: [
        'Engineered core explainability algorithms predicting individualized drug side effects.',
        'Architected end-to-end full stack system with reactive role-based access for Patients, Doctors, and Administrators.',
        'Integrated real-time drug interaction matrices and clinical contraindication safety guards.'
      ],
      skills: ['Python', 'PyTorch / Scikit-learn', 'Explainable AI (SHAP / LIME)', 'React.js', 'Vite', 'Tailwind CSS', 'FastAPI / Node.js'],
      email: 'soham.yevale@medisafe.ai',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'pooja',
      number: '2',
      name: 'Pooja Salunkhe',
      role: 'Healthcare Data Scientist & NLP Specialist',
      focusArea: 'Clinical Knowledge Graph, Tesseract OCR Engine & Drug Clash Analytics',
      department: 'Department of Computer Engineering',
      badges: ['Data Science', 'OCR & NLP', 'Drug Database'],
      badgeColor: 'bg-sky-800 text-white',
      defaultPhoto: poojaImg,
      bio: 'Data science and natural language processing enthusiast focused on medical informatics. Built and validated the pharmacological knowledge graph encompassing multidrug contraindications, allergy cross-reactivity algorithms, and automated prescription OCR extraction.',
      responsibilities: [
        'Curated and benchmarked clinical drug databases with over 100+ active pharmaceutical ingredients.',
        'Developed client-side optical character recognition (OCR) pipeline for digitizing printed and handwritten prescriptions.',
        'Implemented drug allergy clash detection and dosage safety threshold evaluation routines.'
      ],
      skills: ['Medical Informatics', 'Tesseract.js OCR', 'NLP & Regex Parsing', 'Data Validation', 'JavaScript', 'Clinical Data Modeling'],
      email: 'pooja.salunkhe@medisafe.ai',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'mrunali',
      number: '3',
      name: 'Mrunali Kadam',
      role: 'UI/UX Designer & Frontend Systems Engineer',
      focusArea: 'Clinical Human-Centered Design, Responsive Interface & Accessibility',
      department: 'Department of Computer Engineering',
      badges: ['UI/UX Design', 'Frontend System', 'WCAG Accessibility'],
      badgeColor: 'bg-emerald-800 text-white',
      defaultPhoto: null,
      bio: 'Design technologist and frontend engineer passionate about high-trust medical interfaces. Designed the signature ivory & forest-green clinical design system, ensuring intuitive information architecture, zero cognitive fatigue for clinicians, and accessible workflows for elderly patients.',
      responsibilities: [
        'Designed accessible, WCAG-compliant design language with rich data visualizations.',
        'Built interactive safety radar charts, SHAP factor attribution bars, and printable doctor reports.',
        'Streamlined user flows for prescription scanning, patient onboarding, and clinical review dashboards.'
      ],
      skills: ['UI/UX Design', 'Figma', 'Modern CSS & Tailwind', 'React Components', 'Data Visualization', 'Responsive Web Design'],
      email: 'mrunali.kadam@medisafe.ai',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    }
  ];

  const handleBackNavigation = () => {
    if (currentUser?.role === 'admin') {
      setActiveTab('admin');
    } else if (currentUser?.role === 'clinician') {
      setActiveTab('doctor-dashboard');
    } else {
      setActiveTab('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F6F4ED] text-[#18231C] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
        
        {/* Navigation Bar / Back Button */}
        <div className="flex items-center justify-between border-b border-[#D5CDBF] pb-4">
          <button
            onClick={handleBackNavigation}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#235339] hover:text-[#18231C] px-3 py-1.5 rounded-full bg-white border border-[#D5CDBF] hover:border-[#235339] transition shadow-xs group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to {currentUser ? 'Dashboard' : 'Home'}</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[#5A645D]">
            <span className="w-2 h-2 rounded-full bg-[#235339] animate-pulse"></span>
            <span>Final Year Major Engineering Project • 2024–2025</span>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#235339] via-[#1B432E] to-[#143222] text-white p-8 sm:p-12 shadow-xl border border-[#143222]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wide text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>MAJOR PROJECT • DEPARTMENT OF COMPUTER ENGINEERING</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Meet the Team Behind <span className="text-emerald-300">MediSafe AI</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              An Explainable AI-driven clinical decision support system engineered to eliminate preventable medication errors, predict personalized adverse drug reactions, and assist healthcare providers with transparent pharmacological reasoning.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-emerald-200/90">
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <Users className="w-3.5 h-3.5 text-emerald-300" />
                <span>3 Core Engineering Members</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-300" />
                <span>B.E. Computer Engineering</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-300" />
                <span>Explainable AI (SHAP & LIME)</span>
              </div>
            </div>
          </div>

          {/* Decorative background watermark */}
          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
            <MediSafeLogoMark size={320} />
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#235339] font-mono">
            <Users className="w-4 h-4" />
            <span>Our Core Engineering Team</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18231C]">
            Innovators, Researchers & Developers
          </h2>
          <p className="text-xs sm:text-sm text-[#5A645D]">
            Developed collaboratively as our capstone major project to make medication safety transparent, personalized, and clinically actionable.
          </p>
        </div>

        {/* Team Members Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member) => {
            const isCustomUploaded = !!memberPhotos[member.id];
            const activePhoto = memberPhotos[member.id] || member.defaultPhoto;
            const hasPhoto = !!activePhoto;

            return (
              <div
                key={member.id}
                className="rounded-3xl bg-[#ECE7DC] border-2 border-[#D5CDBF] hover:border-[#235339] transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Section */}
                <div className="p-6 space-y-5">
                  
                  {/* Member Index & Role Badge */}
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-full bg-[#235339] text-white font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                      #{member.number}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-white border border-[#D5CDBF] text-[#235339]">
                      Core Member
                    </span>
                  </div>

                  {/* PASSPORT SIZE PHOTO SPACE - Specially designated & framed */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative group/photo">
                      
                      {/* Passport Photo Frame (Standard 3.5cm x 4.5cm ratio: w-36 h-44) */}
                      <div
                        className={`w-36 h-44 rounded-2xl border-2 overflow-hidden shadow-md flex flex-col items-center justify-center transition-all duration-200 ${
                          hasPhoto
                            ? 'border-[#235339] bg-white'
                            : 'border-dashed border-[#A8A090] bg-[#F6F4ED] hover:border-[#235339]'
                        }`}
                      >
                        {hasPhoto ? (
                          <img
                            src={activePhoto}
                            alt={`${member.name} Passport Photo`}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="p-3 text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-[#E0D9CB] text-[#6A746C] flex items-center justify-center mx-auto shadow-inner">
                              <User className="w-6 h-6 text-[#4A554E]" />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] font-bold text-[#18231C] block uppercase tracking-wider font-mono">
                                Passport Photo
                              </span>
                              <span className="text-[9px] text-[#5A645D] block font-mono">
                                3.5 × 4.5 cm Space
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Passport Photo Stamp Badge */}
                      <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 rounded-md border border-[#D5CDBF] shadow-xs text-[9px] font-mono font-bold text-[#235339] flex items-center gap-1">
                        <Camera className="w-3 h-3 text-[#235339]" />
                        <span>{hasPhoto ? 'Photo Verified' : 'Passport Spec'}</span>
                      </div>
                    </div>

                    {/* Photo Action Controls (Upload / Replace / Reset) */}
                    <div className="mt-3.5 flex items-center gap-1.5">
                      <input
                        type="file"
                        ref={fileInputRefs[member.id]}
                        onChange={(e) => handlePhotoUpload(member.id, e)}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRefs[member.id]?.current?.click()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#E2EFE7] border border-[#D5CDBF] hover:border-[#235339] text-[#18231C] hover:text-[#235339] text-[10px] font-bold transition shadow-2xs"
                        title="Upload passport size photo"
                      >
                        <Upload className="w-3 h-3 text-[#235339]" />
                        <span>{hasPhoto ? 'Replace Photo' : 'Upload Photo'}</span>
                      </button>

                      {isCustomUploaded && (
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(member.id)}
                          className="p-1 rounded-lg bg-white hover:bg-rose-50 border border-[#D5CDBF] hover:border-rose-300 text-[#C53030] text-[10px] transition shadow-2xs"
                          title="Reset to default photo"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Name & Role Header */}
                  <div className="text-center space-y-1 pt-1">
                    <h3 className="text-lg font-black text-[#18231C] tracking-tight">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-[#235339] leading-tight">
                      {member.role}
                    </div>
                    <div className="text-[10px] font-mono text-[#5A645D]">
                      {member.department}
                    </div>
                  </div>

                  {/* Bio Paragraph */}
                  <p className="text-xs text-[#37423B] leading-relaxed bg-white/80 p-3 rounded-2xl border border-[#D5CDBF]/70 text-left">
                    {member.bio}
                  </p>

                  {/* Key Responsibilities */}
                  <div className="space-y-2 text-left">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#18231C] block font-mono">
                      Key Contributions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#37423B]">
                      {member.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#235339] shrink-0 mt-0.5" />
                          <span className="text-[11px] leading-snug">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Technical Strengths */}
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5A645D] block font-mono">
                      Specializations & Tech:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#D5CDBF] text-[#18231C]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Contact & Link Bar */}
                <div className="p-4 bg-white border-t border-[#D5CDBF] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#5A645D] font-mono">
                    <Mail className="w-3.5 h-3.5 text-[#235339]" />
                    <span className="truncate max-w-[150px]">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#235339]">
                    <span className="text-[10px] font-bold uppercase bg-[#E2EFE7] px-2 py-0.5 rounded border border-[#C6DDD0] font-mono">
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Architecture & Academic Context */}
        <div className="rounded-3xl bg-white border-2 border-[#D5CDBF] p-8 space-y-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[#E5DFD1] pb-4">
            <div className="w-10 h-10 rounded-2xl bg-[#235339] text-white flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#18231C]">
                About the MediSafe AI Major Project
              </h3>
              <p className="text-xs text-[#5A645D]">
                Capstone Engineering Project • Explainable Machine Learning Applied to Clinical Pharmacology
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#37423B] leading-relaxed">
            <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#18231C]">
                <Cpu className="w-4 h-4 text-[#235339]" />
                <span className="text-xs uppercase font-mono">The Clinical Problem</span>
              </div>
              <p>
                Adverse Drug Reactions (ADRs) cause over 1.3 million emergency department visits annually. Traditional drug checkers rely on simple binary keyword clashes and lack transparency, failing to consider individual patient factors such as age, chronic diseases, or renal clearance margins.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#18231C]">
                <Layers className="w-4 h-4 text-[#235339]" />
                <span className="text-xs uppercase font-mono">The Explainable Solution</span>
              </div>
              <p>
                MediSafe AI bridges this critical gap by pairing clinical pharmacology data with Explainable AI (SHAP & LIME). Rather than presenting a black-box percentage, the system explains <em>why</em> a risk score exists, identifying the precise biological clashes and offering physician-vetted substitutes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F6F4ED] border border-[#E5DFD1] space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#18231C]">
                <FileCheck className="w-4 h-4 text-[#235339]" />
                <span className="text-xs uppercase font-mono">Real-World Utility</span>
              </div>
              <p>
                Equipped with prescription OCR digitization, comprehensive multi-drug interaction maps, attending doctor audit workflows, and downloadable safety summaries, MediSafe AI empowers both non-technical patients and busy hospital clinicians.
              </p>
            </div>
          </div>

          {/* Academic Notice & Mentorship */}
          <div className="p-4 rounded-2xl bg-[#E2EFE7] border border-[#C6DDD0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#235339] shrink-0" />
              <div>
                <span className="font-bold text-[#18231C] block">
                  Academic Project Deliverable • 2024–2025
                </span>
                <span className="text-[#37423B] text-[11px]">
                  Guided under the faculty curriculum of Computer Engineering. Validated using open pharmacopeia standards.
                </span>
              </div>
            </div>

            <button
              onClick={handleBackNavigation}
              className="pill-btn-primary py-2 px-5 text-xs font-bold shrink-0 shadow-sm"
            >
              Explore MediSafe AI Features →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
