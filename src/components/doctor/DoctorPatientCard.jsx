import React from 'react';
import {
  User,
  HeartPulse,
  AlertTriangle,
  Pill,
  ChevronRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import RiskBadge from '../common/RiskBadge';

export default function DoctorPatientCard({
  patient,
  isSelected,
  onSelect,
  reviewStatus,
  latestReview
}) {
  const diseases = patient?.chronicDiseases || patient?.diseases || [];
  const allergies = patient?.allergies || [];
  const medicines = patient?.currentMedicines || [];

  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-4 shadow-sm hover:shadow-md ${
        isSelected
          ? 'bg-white border-[#235339] ring-2 ring-[#235339]/20 shadow-md'
          : 'bg-white hover:bg-[#FBF9F5] border-[#E5DFD1]'
      }`}
    >
      {/* Header: Avatar, Name & Status Badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl font-black flex items-center justify-center text-sm shadow-xs shrink-0 ${
            isSelected
              ? 'bg-[#235339] text-white'
              : 'bg-[#E2EFE7] text-[#1E5034] border border-[#C6DDD0]'
          }`}>
            {(patient.name || 'P').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black text-[#18231C] tracking-tight">
                {patient.name}
              </h3>
              {isSelected && (
                <span className="px-2 py-0.5 rounded-full bg-[#235339] text-white text-[10px] font-bold font-mono">
                  Active Patient
                </span>
              )}
            </div>
            <p className="text-xs text-[#6F7771] font-medium">
              {patient.age ? `${patient.age} yrs` : 'Age not specified'} • {patient.gender || 'Patient'} {patient.weight ? `• ${patient.weight} kg` : ''}
            </p>
          </div>
        </div>

        {/* Clinical Review Status Badge */}
        <div>
          {latestReview ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold font-mono">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Reviewed ✓</span>
            </span>
          ) : allergies.length > 0 ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[10px] font-bold font-mono">
              <AlertTriangle className="w-3 h-3 text-amber-700" />
              <span>Review Pending</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E2EFE7] border border-[#C6DDD0] text-[#1E5034] text-[10px] font-bold font-mono">
              <Clock className="w-3 h-3 text-[#235339]" />
              <span>Ready for Review</span>
            </span>
          )}
        </div>
      </div>

      {/* Conditions & Allergies Chips */}
      <div className="space-y-2 pt-1 border-t border-[#ECE7DC] text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#6F7771] font-mono block mb-1">
            Diagnosed Conditions ({diseases.length}):
          </span>
          <div className="flex flex-wrap gap-1">
            {diseases.length === 0 ? (
              <span className="text-[11px] text-[#8C938D] italic">No chronic illnesses recorded</span>
            ) : (
              diseases.slice(0, 3).map((d, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[11px] font-medium"
                >
                  {d}
                </span>
              ))
            )}
            {diseases.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#ECE7DC] text-[#424C44] text-[10px] font-bold font-mono">
                +{diseases.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-[#6F7771] font-mono block mb-1">
            Known Drug Allergies:
          </span>
          <div className="flex flex-wrap gap-1">
            {allergies.length === 0 ? (
              <span className="text-[11px] text-emerald-800 font-medium">None documented (Safe)</span>
            ) : (
              allergies.map((a, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-[11px] font-bold"
                >
                  ⚠ {a}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Footer: Medicines Count & Selection CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-[#ECE7DC] text-xs">
        <div className="flex items-center gap-1.5 text-[#5A645D]">
          <Pill className="w-3.5 h-3.5 text-[#235339]" />
          <span className="font-semibold text-[#18231C]">{medicines.length}</span>
          <span>Current {medicines.length === 1 ? 'Medicine' : 'Medicines'}</span>
        </div>

        <button
          type="button"
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition shadow-2xs ${
            isSelected
              ? 'bg-[#235339] text-white'
              : 'bg-[#ECE7DC] hover:bg-[#235339] text-[#18231C] hover:text-white'
          }`}
        >
          <span>{isSelected ? 'Selected' : 'Select Patient'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
