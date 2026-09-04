import React from 'react';
import { User, Stethoscope, Building2 } from 'lucide-react';

export default function RoleSelector({ selectedRole, onSelectRole }) {
  const roles = [
    {
      id: 'patient',
      label: 'Patient',
      desc: 'Personal Health & AI Diagnosis',
      icon: User,
    },
    {
      id: 'doctor',
      label: 'Practitioner',
      desc: 'Doctor & Clinical Portal',
      icon: Stethoscope,
    },
    {
      id: 'admin',
      label: 'Hospital Admin',
      desc: 'Healthcare Enterprise & EMR',
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
        Account Type / Access Role
      </label>
      <div className="grid grid-cols-3 gap-2">
        {roles.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => onSelectRole(role.id)}
              className={`group relative flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 ${
                isSelected
                  ? 'bg-mediteal-500/15 border-mediteal-500 text-mediteal-300 shadow-lg shadow-mediteal-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <div
                className={`p-2 rounded-lg mb-1.5 transition-colors ${
                  isSelected
                    ? 'bg-mediteal-500/20 text-mediteal-300'
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold truncate w-full">
                {role.label}
              </span>
              {isSelected && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-mediteal-400 rounded-full ring-4 ring-slate-950" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
