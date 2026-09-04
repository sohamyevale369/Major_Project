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
  AlertCircle
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
              name: 'Ibuprofen',
              dosage: '400mg',
              frequency: 'Twice daily with meals',
              duration: '10 days',
              notes: 'Extracted via OCR optical character recognition'
            }
          ],
          physicianAdvice: 'Take with full glass of water after food.',
          confidenceScore: 96.4
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Prescription Optical Character Recognition (OCR)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Smart Prescription OCR Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Don’t want to type your prescription? Upload or snap a photo of your doctor’s slip, and MediSafe AI will automatically read the medicine, dosage, and intake directions.
        </p>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Select A Sample Doctor's Prescription to Test OCR:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_PRESCRIPTIONS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleRunScan(preset)}
              className={`p-3 rounded-xl border text-left text-xs transition flex flex-col justify-between ${
                selectedPreset.id === preset.id && !uploadedFile
                  ? 'bg-mediteal-500/15 border-mediteal-500/40 text-white'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div>
                <strong className="block font-bold text-white mb-0.5">{preset.title.split('—')[0]}</strong>
                <span className="text-[11px] text-slate-400 block">{preset.doctorName}</span>
              </div>
              <span className="text-[10px] text-mediteal-300 font-mono mt-2 block">
                {preset.previewText}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative rounded-2xl border-2 border-dashed border-slate-750 hover:border-mediteal-500/50 bg-slate-900/60 p-8 text-center transition-all">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={handleFileUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title="Upload or drop prescription image"
        />
        <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-mediteal-500/20 to-mediblue-500/20 border border-mediteal-500/30 flex items-center justify-center text-mediteal-400">
            <UploadCloud className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              {uploadedFile ? `Loaded: ${uploadedFile}` : 'Drop your prescription photo here, or browse files'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Supports JPEG, PNG, WEBP, or scanned clinical PDFs (Tesseract OCR Engine)
            </p>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 pointer-events-auto"
          >
            Select Prescription Image
          </button>
        </div>
      </div>

      {isScanning && (
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mediteal-400 to-transparent animate-bounce" />
          
          <RefreshCw className="w-8 h-8 text-mediteal-400 animate-spin mx-auto" />
          <div>
            <h4 className="text-base font-bold text-white">
              Scanning Prescription via OCR Pipeline...
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Preprocessing image • Running text segmentation • Extracting drug names & dosages
            </p>
          </div>
        </div>
      )}

      {!isScanning && ocrResult && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-xl space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  OCR Extraction Complete
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Extracted Medication Parameters
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Confidence Score:</span>
              <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                {ocrResult.confidenceScore}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Identified Medications ({ocrResult.medicines.length}):
            </h4>

            <div className="space-y-3">
              {ocrResult.medicines.map((med, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {med.name}
                      </span>
                      <span className="text-xs text-mediteal-300 font-mono px-2 py-0.5 rounded bg-mediteal-500/15 border border-mediteal-500/30">
                        {med.dosage}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300">
                      Frequency: <strong className="text-slate-200">{med.frequency}</strong> • Duration: {med.duration}
                    </div>

                    {med.notes && (
                      <div className="text-[11px] text-slate-400 italic">
                        Clinical Note: {med.notes}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleForwardToRiskChecker(med)}
                    className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 text-xs font-bold shadow-md transition shrink-0"
                  >
                    <span>Run AI Safety Check on this Drug</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {ocrResult.physicianAdvice && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <strong className="text-slate-200">Extracted Instructions:</strong> {ocrResult.physicianAdvice}
            </div>
          )}

        </div>
      )}

    </div>
  );
}
