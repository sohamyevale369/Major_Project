import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Building,
  MapPin,
  Clock,
  Send,
  FileText,
  Check,
  Star,
  Shield,
  HeartPulse,
  GraduationCap,
  X,
  Mail,
  User,
  Phone
} from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { MediSafeLogoMark } from '../common/BrandLogo';

export default function CareersView() {
  const { setActiveTab, currentUser, showToast } = useHealth();
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    coverNote: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const openPositions = [
    {
      id: 'ml-engineer',
      title: 'Clinical Machine Learning Research Engineer',
      department: 'AI & Algorithm Research',
      location: 'Hybrid / Pune, India',
      type: 'Full-time / Fellowship',
      experience: '0–2 Years / Final Year Grad',
      tag: 'Core ML / SHAP',
      summary: 'Design and optimize interpretable deep learning and gradient boosted models for personalized adverse drug reaction (ADR) prediction.',
      responsibilities: [
        'Develop SHAP and LIME feature attribution pipelines for multi-class pharmacological clashing.',
        'Benchmark drug-disease interaction models against clinical pharmacopeia datasets.',
        'Collaborate closely with Lead AI Engineer Soham Yevale on low-latency inference services.'
      ],
      requirements: [
        'Strong background in Python, PyTorch, Scikit-learn, and Explainable AI (XAI).',
        'Familiarity with biomedical ontologies (RxNorm, ATC, MeSH).',
        'Degree in Computer Engineering, Biomedical Informatics, or related disciplines.'
      ]
    },
    {
      id: 'nlp-specialist',
      title: 'Healthcare NLP & Knowledge Graph Specialist',
      department: 'Medical Informatics',
      location: 'Remote / Hybrid',
      type: 'Full-time / Research',
      experience: '0–2 Years',
      tag: 'OCR & NLP',
      summary: 'Curate multi-drug interaction knowledge bases and expand optical character recognition (OCR) pipelines for prescription digitization.',
      responsibilities: [
        'Train and refine OCR vision pipelines (Tesseract, layout parsers) on handwritten medical prescriptions.',
        'Construct automated entity extractors for drug active ingredients, dosages, and administration intervals.',
        'Collaborate with Healthcare Data Scientist Pooja Salunkhe on pharmacological validation.'
      ],
      requirements: [
        'Proficiency in Python, NLP algorithms, Regular Expressions, and document OCR.',
        'Solid understanding of pharmacology, clinical guidelines, and contraindications.',
        'Passion for patient medication safety and zero-error clinical workflows.'
      ]
    },
    {
      id: 'frontend-engineer',
      title: 'Clinical Systems Frontend Engineer',
      department: 'Product & Design Engineering',
      location: 'Remote / Pune, India',
      type: 'Full-time',
      experience: '0–2 Years',
      tag: 'React / UI-UX',
      summary: 'Build high-contrast, zero-cognitive-fatigue clinical interfaces tailored for attending physicians, nurses, and diverse patient demographics.',
      responsibilities: [
        'Implement accessible, responsive UI systems adhering to WCAG 2.1 AAA healthcare accessibility standards.',
        'Build interactive data visualizers for multi-drug risk gauges, radar charts, and printable audit logs.',
        'Collaborate with UI/UX Systems Designer Mrunali Kadam to craft empathetic patient journeys.'
      ],
      requirements: [
        'Expertise in modern React.js, Vite, Tailwind CSS, and component design systems.',
        'Meticulous attention to typography, micro-animations, and visual hierarchy.',
        'Prior experience or interest in health tech, EHR tools, or clinical decision dashboards.'
      ]
    },
    {
      id: 'clinical-pharmacologist',
      title: 'Clinical Pharmacologist & Medical Validator',
      department: 'Medical Advisory Board',
      location: 'Part-time / Advisory',
      type: 'Consulting / Fellowship',
      experience: 'PharmD / MD / Clinical Pharmacist',
      tag: 'Clinical Safety',
      summary: 'Review algorithmic risk recommendations, curate safe alternative substitute guidelines, and ensure peer-reviewed medical accuracy.',
      responsibilities: [
        'Audit AI-generated medication clash assessments against actual hospital clinical protocols.',
        'Verify renal dose adjustment criteria and cross-allergy sensitivity matrixes.',
        'Provide ongoing clinical oversight to the engineering development team.'
      ],
      requirements: [
        'PharmD, MD, or registered Clinical Pharmacist license.',
        'Deep knowledge of pharmacokinetics, pharmacodynamics, and polypharmacy management.',
        'Enthusiasm for explainable AI tools in preventive clinical medicine.'
      ]
    }
  ];

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applicationForm.name || !applicationForm.email) {
      if (typeof showToast === 'function') {
        showToast('Please provide your name and email address.', 'error');
      }
      return;
    }

    setSubmitted(true);
    if (typeof showToast === 'function') {
      showToast(`Application for ${selectedJob?.title} submitted successfully!`, 'success');
    }

    setTimeout(() => {
      setSelectedJob(null);
      setSubmitted(false);
      setApplicationForm({
        name: '',
        email: '',
        phone: '',
        portfolio: '',
        coverNote: ''
      });
    }, 1800);
  };

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
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>We Are Actively Recruiting Researchers & Engineers</span>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#235339] via-[#1B432E] to-[#143222] text-white p-8 sm:p-12 shadow-xl border border-[#143222]">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono tracking-wide text-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>CAREERS & RESEARCH FELLOWSHIPS • MEDISAFE AI</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Build the Future of <span className="text-emerald-300">Medication Safety AI</span>
            </h1>

            <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed max-w-2xl">
              Join our mission to prevent preventable adverse drug events and eliminate medical errors. Work alongside our core engineering leads on explainable machine learning, medical knowledge graphs, and human-centered clinical interfaces.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-emerald-200/90">
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <Briefcase className="w-3.5 h-3.5 text-emerald-300" />
                <span>4 Open Roles</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-emerald-300" />
                <span>Remote & Hybrid Options</span>
              </div>
              <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
                <Shield className="w-3.5 h-3.5 text-emerald-300" />
                <span>Healthcare Impact Driven</span>
              </div>
            </div>
          </div>

          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
            <MediSafeLogoMark size={320} />
          </div>
        </div>

        {/* Why Join Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-[#D5CDBF] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-[#E2EFE7] text-[#235339] flex items-center justify-center font-bold">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#18231C]">Direct Patient Impact</h3>
            <p className="text-xs text-[#5A645D] leading-relaxed">
              Every algorithm and feature directly targets the 1.3 million annual preventable emergency hospitalizations triggered by drug clashes and toxicities.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#D5CDBF] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#18231C]">Cutting-Edge Explainable AI</h3>
            <p className="text-xs text-[#5A645D] leading-relaxed">
              Work with state-of-the-art SHAP, LIME, and knowledge graphs to build transparent AI that doctors and pharmacists trust without hesitation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#D5CDBF] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-[#18231C]">Collaborative Mentorship</h3>
            <p className="text-xs text-[#5A645D] leading-relaxed">
              Collaborate directly with project leads Soham Yevale, Pooja Salunkhe, and Mrunali Kadam across ML architecture, NLP, and clinical UX.
            </p>
          </div>
        </div>

        {/* Open Positions Header */}
        <div className="space-y-2 text-left">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#235339] font-mono">
            <Briefcase className="w-4 h-4" />
            <span>Current Openings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#18231C]">
            Explore Available Opportunities
          </h2>
          <p className="text-xs sm:text-sm text-[#5A645D]">
            No login required to review roles or submit candidate applications.
          </p>
        </div>

        {/* Positions List */}
        <div className="space-y-4">
          {openPositions.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-[#ECE7DC] border-2 border-[#D5CDBF] hover:border-[#235339] transition-all shadow-xs hover:shadow-md space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white border border-[#D5CDBF] text-[#235339]">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#E2EFE7] text-[#1E5034]">
                      {job.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#18231C]">
                    {job.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJob(job)}
                  className="pill-btn-primary py-2 px-5 text-xs font-bold shrink-0 self-start sm:self-auto shadow-sm"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs text-[#37423B] leading-relaxed">
                {job.summary}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A645D] font-mono pt-2 border-t border-[#D5CDBF]/70">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#235339]" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#235339]" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-[#235339]" />
                  <span>{job.experience}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="bg-white/70 p-3 rounded-2xl border border-[#D5CDBF]/70 space-y-1.5">
                  <span className="font-bold text-[#18231C] block text-[11px] font-mono uppercase">
                    Key Responsibilities:
                  </span>
                  <ul className="space-y-1 text-[#424C44]">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#235339] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white/70 p-3 rounded-2xl border border-[#D5CDBF]/70 space-y-1.5">
                  <span className="font-bold text-[#18231C] block text-[11px] font-mono uppercase">
                    Desired Qualifications:
                  </span>
                  <ul className="space-y-1 text-[#424C44]">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <Check className="w-3 h-3 text-sky-800 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-lg rounded-3xl bg-[#F6F4ED] border-2 border-[#D5CDBF] shadow-2xl p-6 sm:p-8 space-y-5 text-left relative">
              
              <button
                type="button"
                onClick={() => setSelectedJob(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-[#ECE7DC] hover:bg-[#D5CDBF] text-[#18231C] transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 pr-8">
                <span className="text-[10px] font-mono uppercase font-bold text-[#235339] bg-[#E2EFE7] px-2 py-0.5 rounded">
                  Application
                </span>
                <h3 className="text-xl font-black text-[#18231C]">
                  {selectedJob.title}
                </h3>
                <p className="text-xs text-[#5A645D]">
                  {selectedJob.department} • {selectedJob.location}
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center space-y-3 bg-[#E2EFE7] rounded-2xl border border-[#C6DDD0] animate-scale-in">
                  <div className="w-12 h-12 rounded-full bg-[#235339] text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#18231C]">Application Received!</h4>
                  <p className="text-xs text-[#5A645D]">
                    Thank you, {applicationForm.name}. Our project recruitment team will review your profile and reach out via email.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-bold text-[#18231C] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                        placeholder="e.g. Alex Johnson"
                        className="ivory-input w-full pl-9 pr-3 py-2 text-xs bg-white"
                      />
                      <User className="w-3.5 h-3.5 text-[#6A746C] absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#18231C] mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        placeholder="e.g. alex@university.edu"
                        className="ivory-input w-full pl-9 pr-3 py-2 text-xs bg-white"
                      />
                      <Mail className="w-3.5 h-3.5 text-[#6A746C] absolute left-3 top-2.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#18231C] mb-1">
                      LinkedIn / GitHub / Portfolio URL
                    </label>
                    <input
                      type="url"
                      value={applicationForm.portfolio}
                      onChange={(e) => setApplicationForm({ ...applicationForm, portfolio: e.target.value })}
                      placeholder="https://github.com/yourhandle"
                      className="ivory-input w-full px-3 py-2 text-xs bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#18231C] mb-1">
                      Brief Note or Relevant Experience
                    </label>
                    <textarea
                      rows={3}
                      value={applicationForm.coverNote}
                      onChange={(e) => setApplicationForm({ ...applicationForm, coverNote: e.target.value })}
                      placeholder="Briefly tell us about your interest in clinical decision support and health AI..."
                      className="ivory-input w-full p-2.5 text-xs bg-white"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedJob(null)}
                      className="px-4 py-2 rounded-full border border-[#D5CDBF] hover:bg-[#ECE7DC] text-[#424C44] font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="pill-btn-primary py-2 px-6 text-xs font-bold shadow-sm flex items-center gap-1.5"
                    >
                      <Send className="w-3 h-3" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
