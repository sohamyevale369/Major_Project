import React, { useState } from 'react';
import {
  Camera,
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Eye,
  Sliders,
  AlertCircle,
  Check
} from 'lucide-react';
import { SAMPLE_PRESCRIPTIONS } from '../../data/mockAI';
import { useHealth } from '../../context/HealthContext';

export default function PrescriptionOCRView() {
  const { runSafetyCheck, setActiveTab, showToast } = useHealth();

  const [selectedPreset, setSelectedPreset] = useState(SAMPLE_PRESCRIPTIONS[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState(SAMPLE_PRESCRIPTIONS[0].extractedData);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleRunScan = (preset) => {
    setSelectedPreset(preset);
    setIsScanning(true);
    setOcrResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setOcrResult(preset.extractedData);
      showToast(`OCR Parsed: Extracted ${preset.extractedData.medicines.length} medicine(s) with ${preset.extractedData.confidenceScore}% confidence`, 'success');
    }, 1200);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setIsScanning(true);
      setOcrResult(null);

      setTimeout(() => {
        setIsScanning(false);
        const mockExtracted = {
          patientName: 'Uploaded Prescription',
          patientAge: '65',
          medicines: [
            {
              name: 'Paracetamol',
              dosage: '500 mg',
              frequency: '2 times/day',
              duration: '5 days',
              notes: 'Extracted via OCR optical character recognition'
            },
            {
              name: 'Amoxicillin',
              dosage: '250 mg',
              frequency: '3 times/day',
              duration: '7 days',
              notes: 'Extracted via OCR optical character recognition'
            }
          ],
          physicianAdvice: 'Take with full glass of water after food.',
          confidenceScore: 97.2
        };
        setOcrResult(mockExtracted);
        showToast('Prescription image processed successfully!', 'success');
      }, 1400);
    }
  };

  const handleForwardToRiskChecker = (med) => {
    runSafetyCheck(med.name, med.dosage, med.frequency);
    setActiveTab('risk-checker');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Transferred ${med.name} into AI Risk Engine`, 'info');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8 bg-[#F6F4ED] text-[#18231C]">
      
      {/* Header */}
      <div>
        <span className="section-tag mb-1">
          11 — PRESCRIPTION OCR SCANNER // VISION AI
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-[#18231C] tracking-tight uppercase">
          Prescription OCR Reader
        </h1>
        <p className="text-xs sm:text-sm text-[#5A645D] mt-1">
          Upload or snap a photo of your doctor’s slip or pill strip, and MediSafe AI will automatically extract medicine names, dosages, and intake schedules.
        </p>

        {/* Banner from Image 4 */}
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2EFE7] border border-[#C6DDD0] text-xs font-semibold text-[#1E5034]">
          <span className="w-2 h-2 rounded-full bg-[#235339] animate-pulse" />
          <span>● AI photo verification: online — packet photos will be OCR-checked</span>
        </div>
      </div>

      {/* Preset Prescription Selector */}
      <div className="ivory-card p-4 sm:p-5 space-y-2 shadow-sm">
        <span className="text-xs font-mono font-bold text-[#6A746C] uppercase tracking-wider block">
          Select A Sample Doctor's Slip to Test:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PRESCRIPTIONS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleRunScan(preset)}
              className={`p-3.5 rounded-2xl border text-left text-xs transition flex flex-col justify-between ${
                selectedPreset.id === preset.id && !uploadedFile
                  ? 'bg-[#235339] text-white border-[#235339] shadow-sm'
                  : 'bg-[#F3EFE6] text-[#4A554E] border-[#D5CDBF] hover:border-[#235339]'
              }`}
            >
              <div>
                <strong className={`block text-sm ${selectedPreset.id === preset.id && !uploadedFile ? 'text-white' : 'text-[#18231C]'}`}>
                  {preset.title}
                </strong>
                <p className={`text-[11px] mt-1 leading-snug ${selectedPreset.id === preset.id && !uploadedFile ? 'text-emerald-100' : 'text-[#6A746C]'}`}>
                  {preset.scenario}
                </p>
              </div>
              <span className={`text-[10px] font-mono mt-3 uppercase tracking-wider font-bold ${selectedPreset.id === preset.id && !uploadedFile ? 'text-emerald-200' : 'text-[#235339]'}`}>
                Run OCR Test →
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Box (styled after Reference Image 4) */}
      <div className="ivory-card p-6 sm:p-8 space-y-5 shadow-sm text-center">
        <div className="max-w-md mx-auto p-8 rounded-3xl border-2 border-dashed border-[#B8B1A0] bg-[#F3EFE6] hover:border-[#235339] transition">
          <UploadCloud className="w-10 h-10 text-[#235339] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#18231C]">
            {uploadedFile ? `Uploaded: ${uploadedFile}` : 'Upload Prescription Slip or Pill Packet'}
          </h3>
          <p className="text-xs text-[#6A746C] mt-1 mb-4">
            Supports clear JPG, PNG, or PDF images under 15MB
          </p>

          <label className="pill-btn-primary text-xs py-2.5 px-5 cursor-pointer">
            <Camera className="w-4 h-4" />
            <span>Choose File</span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Checklist reminders from Image 4 */}
        <div className="text-left max-w-md mx-auto space-y-1 text-xs text-[#5A645D]">
          <div className="flex items-center gap-2">
            <span className="text-[#235339] font-bold">✓</span>
            <span>Only unopened, unexpired strips are verified</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#235339] font-bold">✓</span>
            <span>A clear packet or doctor slip photo speeds up OCR recognition</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#235339] font-bold">✓</span>
            <span>You'll get an instant Accepted / Review / Warning result</span>
          </div>
        </div>
      </div>

      {/* Scanning Spinner */}
      {isScanning && (
        <div className="sage-result-box p-8 text-center space-y-3 animate-pulse">
          <RefreshCw className="w-8 h-8 text-[#235339] animate-spin mx-auto" />
          <h4 className="text-base font-black text-[#18231C] uppercase">
            OCR Processing: Optical Extraction Running…
          </h4>
          <p className="text-xs text-[#5A645D]">
            Detecting medicine names, dosage strengths, and frequency instructions…
          </p>
        </div>
      )}

      {/* OCR Extraction Result (Step 11 Example: Detected ✓ Paracetamol - 500mg, ✓ Amoxicillin - 250mg) */}
      {ocrResult && !isScanning && (
        <div className="sage-result-box p-6 sm:p-8 space-y-5 animate-fade-in shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#C6DDD0]">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1E5034] block">
                OCR PARSED OUTPUT
              </span>
              <h3 className="text-xl font-black text-[#18231C] uppercase">
                Extracted Medications ({ocrResult.medicines.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-[#1E5034] border border-[#C6DDD0] text-xs font-mono font-bold">
                Confidence: {ocrResult.confidenceScore}%
              </span>
              <span className="px-3 py-1 rounded-full bg-[#235339] text-white text-xs font-bold">
                OCR Verified ✓
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {ocrResult.medicines.map((med, idx) => (
              <div
                key={idx}
                className="ivory-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#235339] transition"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#E2EFE7] text-[#235339] flex items-center justify-center text-xs font-black">
                      ✓
                    </span>
                    <h4 className="text-base font-bold text-[#18231C]">
                      {med.name}
                    </h4>
                    <span className="text-xs font-mono text-[#6A746C]">({med.dosage})</span>
                    <span className="text-xs font-semibold text-[#235339]">• {med.frequency}</span>
                  </div>
                  {med.duration && (
                    <span className="text-xs text-[#5A645D] block mt-1 pl-7">
                      Duration: {med.duration} — {med.notes}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleForwardToRiskChecker(med)}
                  className="pill-btn-primary text-xs py-2 px-4 shrink-0 font-bold"
                >
                  <span>Check Safety</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {ocrResult.physicianAdvice && (
            <div className="p-3.5 rounded-2xl bg-white border border-[#C6DDD0] text-xs space-y-1">
              <strong className="text-[#18231C] block font-bold">Doctor's Intake Advice:</strong>
              <p className="text-[#5A645D]">{ocrResult.physicianAdvice}</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
