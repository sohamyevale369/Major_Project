// MediSafe AI Simulation Engine (Frontend Mock Implementation)
// Accurately models the AI/ML, SHAP/LIME Explainable AI, and OCR pipelines
// Designed so backend (Flask/FastAPI) and ML models can be plugged in seamlessly

import { COMMON_MEDICATIONS, DRUG_DRUG_INTERACTIONS } from './drugDatabase.js';

/**
 * Predicts personalized side effect probabilities based on patient physiology & dosage
 */
/**
 * Clinical condition matching with synonym, token, and keyword support
 */
export function matchesClinicalCondition(patientDisease, contraDisease) {
  if (!patientDisease || !contraDisease) return false;
  const pd = patientDisease.toLowerCase().trim();
  const cd = contraDisease.toLowerCase().trim();

  if (pd === cd || pd.includes(cd) || cd.includes(pd)) return true;

  // Clinical synonym groups for robust cross-matching
  const synonymGroups = [
    ['kidney', 'renal', 'nephro', 'creatinine', 'egfr', 'dialysis'],
    ['liver', 'hepatic', 'cirrhosis'],
    ['hypertension', 'blood pressure', 'high bp', 'htn'],
    ['heart failure', 'cardiac', 'congestive', 'atrial fibrillation', 'arrhythmia', 'heart disease'],
    ['ulcer', 'gerd', 'acid reflux', 'gastric', 'bleeding', 'stomach ulcer'],
    ['asthma', 'copd', 'respiratory', 'airway', 'bronchial'],
    ['stroke', 'cerebrovascular', 'tia', 'hemorrhagic'],
    ['osteoporosis', 'bone density', 'bone fracture'],
    ['myasthenia gravis', 'myasthenia'],
    ['diabetes', 'hyperglycemia', 'hypoglycemia', 'dysglycemia', 'type 2 diabetes'],
    ['alcohol', 'alcoholism', 'hepatic impairment']
  ];

  for (const group of synonymGroups) {
    const pdMatch = group.some(kw => pd.includes(kw));
    const cdMatch = group.some(kw => cd.includes(kw));
    if (pdMatch && cdMatch) return true;
  }

  // Token / component matching (split on /, commas, parens)
  const pdTokens = pd.split(/[/(),]/).map(s => s.trim()).filter(s => s.length > 3);
  const cdTokens = cd.split(/[/(),]/).map(s => s.trim()).filter(s => s.length > 3);

  return pdTokens.some(pt => cdTokens.some(ct => ct.includes(pt) || pt.includes(ct)));
}

/**
 * Clinical allergy cross-reactivity and drug class matching
 */
export function matchesClinicalAllergy(patientAllergy, allergyClass, medName) {
  if (!patientAllergy) return false;
  const pa = patientAllergy.toLowerCase().trim();
  const ac = (allergyClass || '').toLowerCase().trim();
  const mn = (medName || '').toLowerCase().trim();

  if (ac && (pa.includes(ac) || ac.includes(pa))) return true;
  if (mn && (pa.includes(mn) || mn.includes(pa))) return true;

  // Allergy synonym classes
  const allergyGroups = [
    ['nsaid', 'nsaids', 'ibuprofen', 'aspirin', 'naproxen', 'diclofenac'],
    ['penicillin', 'amoxicillin', 'ampicillin', 'beta-lactam', 'augmentin'],
    ['sulfa', 'sulfonamide', 'sulfamethoxazole', 'bactrim', 'septra'],
    ['opioid', 'codeine', 'morphine', 'tramadol', 'oxycodone'],
    ['fluoroquinolone', 'ciprofloxacin', 'cipro', 'levofloxacin'],
    ['statin', 'atorvastatin', 'rosuvastatin', 'simvastatin'],
    ['ace inhibitor', 'lisinopril', 'enalapril', 'ramipril'],
    ['ppi', 'proton pump', 'omeprazole', 'pantoprazole', 'esomeprazole'],
    ['metformin']
  ];

  for (const group of allergyGroups) {
    const paMatch = group.some(kw => pa.includes(kw));
    const targetMatch = group.some(kw => (ac && ac.includes(kw)) || (mn && mn.includes(kw)));
    if (paMatch && targetMatch) return true;
  }

  return false;
}

/**
 * Predicts personalized side effect probabilities based on patient physiology & dosage
 */
export function predictSideEffects(patient, medication, selectedDosage) {
  if (!medication || !medication.baseSideEffects) return [];

  const patientDiseases = patient?.diseases || patient?.chronicDiseases || [];

  // Physiological multipliers
  const isSenior = (patient?.age || 40) >= 65;
  const isHeavyWeight = (patient?.weight || 70) > 90;
  const isLowWeight = (patient?.weight || 70) < 55;
  const hasKidneyIssue = patientDiseases.some(d => matchesClinicalCondition(d, 'Chronic Kidney Disease'));
  const hasLiverIssue = patientDiseases.some(d => matchesClinicalCondition(d, 'Liver Cirrhosis / Disease'));
  const hasGerdIssue = patientDiseases.some(d => matchesClinicalCondition(d, 'Stomach Ulcer / GERD'));

  return medication.baseSideEffects.map((item) => {
    let rate = item.baseRate;

    // Age modifier
    if (isSenior) rate += 12;

    // Disease specific multipliers
    if ((item.name.toLowerCase().includes('kidney') || item.name.toLowerCase().includes('creatinine')) && hasKidneyIssue) {
      rate += 38;
    }
    if ((item.name.toLowerCase().includes('liver') || item.name.toLowerCase().includes('enzyme')) && hasLiverIssue) {
      rate += 35;
    }
    if ((item.name.toLowerCase().includes('stomach') || item.name.toLowerCase().includes('reflux') || item.name.toLowerCase().includes('gastric')) && hasGerdIssue) {
      rate += 28;
    }

    // Weight modifier
    if (isLowWeight) rate += 8;

    // Dosage modifier
    if (selectedDosage && (selectedDosage.includes('800') || selectedDosage.includes('1000') || selectedDosage.includes('875'))) {
      rate += 14;
    }

    // Cap between 5% and 95%
    const finalRate = Math.min(95, Math.max(5, Math.round(rate)));

    return {
      name: item.name,
      probability: finalRate,
      severe: item.severe || finalRate > 50
    };
  }).sort((a, b) => b.probability - a.probability);
}

/**
 * Evaluates comprehensive medication risk for a specific patient
 */
export function evaluateMedicationSafety(patient, medicineName, dosage, frequency) {
  const med = COMMON_MEDICATIONS.find(
    m => m.name.toLowerCase() === medicineName.toLowerCase() ||
         m.brandNames.some(b => b.toLowerCase() === medicineName.toLowerCase())
  );

  // Baseline if drug unknown
  if (!med) {
    return {
      medicineName,
      foundInDb: false,
      riskScore: 35,
      riskLevel: 'MEDIUM',
      allergyAlert: null,
      diseaseConflicts: [],
      drugDrugConflicts: [],
      sideEffects: [],
      shapFactors: [
        { factor: 'Unverified Medication Name', impact: '+25%', type: 'risk', description: 'Medicine not recognized in verified clinical database.' },
        { factor: 'Standard Adult Baseline', impact: '+10%', type: 'risk', description: 'General physiological baseline precaution.' }
      ],
      plainEnglishExplanation: 'This medicine was not found in our verified database. Please check spelling or consult your pharmacist.',
      alternatives: []
    };
  }

  let totalRisk = 12; // baseline
  const shapFactors = [];
  const diseaseConflicts = [];
  let allergyAlert = null;

  // 1. Check Allergy Risk
  const patientAllergies = patient?.allergies || [];
  const matchedAllergy = patientAllergies.find(allergy => {
    return med.allergyClasses.some(ac => matchesClinicalAllergy(allergy, ac, med.name)) ||
           matchesClinicalAllergy(allergy, '', med.name);
  });

  if (matchedAllergy) {
    totalRisk += 65;
    allergyAlert = {
      detectedAllergy: matchedAllergy,
      drugClass: med.allergyClasses.join(', '),
      severity: 'SEVERE / EMERGENCY',
      warning: `Patient has a documented allergy to ${matchedAllergy}. Taking ${med.name} (${med.category}) could trigger acute hypersensitivity or anaphylaxis.`
    };
    shapFactors.push({
      factor: `Known Allergy: ${matchedAllergy}`,
      impact: '+60%',
      type: 'risk',
      description: `Patient allergy profile matches ${med.name}'s drug family.`
    });
  }

  // 2. Check Drug-Disease Interactions
  const patientDiseases = patient?.diseases || patient?.chronicDiseases || [];
  med.contraindicatedDiseases.forEach(contra => {
    const matchedDisease = patientDiseases.find(d => matchesClinicalCondition(d, contra.disease));

    if (matchedDisease) {
      totalRisk += contra.addedRisk;
      diseaseConflicts.push({
        disease: matchedDisease,
        contraDisease: contra.disease,
        severity: contra.riskSeverity,
        explanation: contra.explanation
      });

      shapFactors.push({
        factor: `${matchedDisease}`,
        impact: `+${contra.addedRisk}%`,
        type: 'risk',
        description: contra.explanation
      });
    }
  });

  // 3. Check Age Factor
  const age = patient?.age || 40;
  if (age >= 65) {
    totalRisk += 25;
    shapFactors.push({
      factor: `Senior Age (${age} years)`,
      impact: '+25%',
      type: 'risk',
      description: 'Reduced glomerular filtration and slower hepatic drug clearance naturally increase sensitivity to this medication.'
    });
  } else if (age < 18) {
    totalRisk += 15;
    shapFactors.push({
      factor: `Pediatric/Adolescent Age (${age} years)`,
      impact: '+15%',
      type: 'risk',
      description: 'Requires tailored pediatric dosing to avoid metabolic strain.'
    });
  } else {
    shapFactors.push({
      factor: 'Adult Age Window (18-64)',
      impact: '-10%',
      type: 'protective',
      description: 'Patient is within optimal metabolic age window.'
    });
  }

  // 4. Check Dosage Factor
  if (dosage && (dosage.includes('800') || dosage.includes('1000') || dosage.includes('875'))) {
    totalRisk += 15;
    shapFactors.push({
      factor: `High Strength Dosage (${dosage})`,
      impact: '+15%',
      type: 'risk',
      description: 'High dose escalates metabolic load and organ exposure.'
    });
  }

  // 5. Check Concurrent Drug-Drug Interactions
  const drugDrugConflicts = [];
  const currentMedicines = patient?.currentMedicines || [];

  currentMedicines.forEach(curr => {
    const interaction = DRUG_DRUG_INTERACTIONS.find(
      dd => (dd.drug1.toLowerCase() === med.name.toLowerCase() && dd.drug2.toLowerCase() === curr.name.toLowerCase()) ||
            (dd.drug2.toLowerCase() === med.name.toLowerCase() && dd.drug1.toLowerCase() === curr.name.toLowerCase())
    );

    if (interaction) {
      totalRisk += 25;
      drugDrugConflicts.push({
        withDrug: curr.name,
        currentDosage: curr.dosage,
        severity: interaction.severity,
        summary: interaction.summary,
        mechanism: interaction.mechanism,
        action: interaction.actionRequired
      });

      shapFactors.push({
        factor: `Interaction with ${curr.name}`,
        impact: '+20%',
        type: 'risk',
        description: interaction.summary
      });
    }
  });

  // Calculate final bounded score (0 to 100)
  const finalScore = Math.min(99, Math.max(8, Math.round(totalRisk)));

  let riskLevel = 'LOW';
  if (finalScore >= 70 || allergyAlert) {
    riskLevel = 'HIGH';
  } else if (finalScore >= 35) {
    riskLevel = 'MEDIUM';
  }

  // Generate plain English explanation for non-tech users
  let plainEnglish = '';
  if (allergyAlert) {
    plainEnglish = `⚠️ CRITICAL: You are allergic to ${allergyAlert.detectedAllergy}! Taking ${med.name} can cause severe allergic reactions like swelling or hives. Do NOT take this pill without calling your doctor.`;
  } else if (diseaseConflicts.length > 0 && age >= 65) {
    const diseasesText = diseaseConflicts.map(d => d.disease).join(' and ');
    plainEnglish = `⚠️ High Risk: Because you are ${age} years old and have ${diseasesText}, taking ${med.name} puts extra stress on your body and could worsen your condition.`;
  } else if (diseaseConflicts.length > 0) {
    const diseasesText = diseaseConflicts.map(d => d.disease).join(', ');
    plainEnglish = `Caution: ${med.name} may aggravate your ${diseasesText}. We recommend talking to your doctor about safer alternatives.`;
  } else if (drugDrugConflicts.length > 0) {
    const drugsText = drugDrugConflicts.map(d => d.withDrug).join(', ');
    plainEnglish = `Caution: ${med.name} can clash with your current medicine (${drugsText}). Taking both at the same time might cause unwanted side effects.`;
  } else if (riskLevel === 'LOW') {
    plainEnglish = `✅ Good News: ${med.name} appears to have a Low Risk profile based on your current age, medical conditions, and medications. Always take it as directed.`;
  } else {
    plainEnglish = `Medium Risk: ${med.name} has moderate side effects. Make sure to take it with food or water and follow the prescribed dosage.`;
  }

  const sideEffects = predictSideEffects(patient, med, dosage);

  return {
    medication: med,
    medicineName: med.name,
    foundInDb: true,
    dosage: dosage || med.defaultDosage,
    frequency: frequency || med.defaultFrequency,
    riskScore: finalScore,
    riskLevel,
    allergyAlert,
    diseaseConflicts,
    drugDrugConflicts,
    sideEffects,
    shapFactors,
    plainEnglishExplanation: plainEnglish,
    alternatives: med.alternatives || []
  };
}

/**
 * Checks multi-drug interactions across an arbitrary list of medications
 */
export function checkMultiDrugInteractions(medicinesList) {
  if (!medicinesList || medicinesList.length < 2) return [];

  const foundInteractions = [];

  for (let i = 0; i < medicinesList.length; i++) {
    for (let j = i + 1; j < medicinesList.length; j++) {
      const name1 = medicinesList[i].trim().toLowerCase();
      const name2 = medicinesList[j].trim().toLowerCase();

      const match = DRUG_DRUG_INTERACTIONS.find(
        dd => (dd.drug1.toLowerCase() === name1 && dd.drug2.toLowerCase() === name2) ||
              (dd.drug2.toLowerCase() === name1 && dd.drug1.toLowerCase() === name2)
      );

      if (match) {
        foundInteractions.push(match);
      }
    }
  }

  return foundInteractions;
}

/**
 * Sample prescription OCR documents for testing
 */
export const SAMPLE_PRESCRIPTIONS = [
  {
    id: 'rx-1',
    title: 'Outpatient Clinic Rx — Dr. R. Sharma (Kidney Risk Case)',
    doctorName: 'Dr. Rajesh Sharma, MD (Internal Medicine)',
    clinicName: 'St. Jude Community Health Center',
    date: 'March 2025',
    imageType: 'clinic_printed',
    previewText: 'Rx: Ibuprofen 400mg, Twice Daily for Knee Pain',
    extractedData: {
      patientName: 'Soham Vikas Yevale',
      patientAge: '23',
      medicines: [
        {
          name: 'Ibuprofen',
          dosage: '400mg',
          frequency: 'Twice daily with meals',
          duration: '14 days',
          notes: 'For bilateral knee osteoarthritis flare'
        }
      ],
      physicianAdvice: 'Take with food. Discontinue if gastric upset occurs.',
      confidenceScore: 97.8
    }
  },
  {
    id: 'rx-2',
    title: 'Cardiology Clinic Rx — Dr. H. Adams (Interaction Case)',
    doctorName: 'Dr. Helen Adams, FACC (Cardiology)',
    clinicName: 'Metro Heart Institute',
    date: 'April 2025',
    imageType: 'hospital_rx',
    previewText: 'Rx: Aspirin 325mg + Warfarin 5mg (Combination Alert)',
    extractedData: {
      patientName: 'Clinical Patient (Cardiology)',
      patientAge: '58',
      medicines: [
        {
          name: 'Aspirin',
          dosage: '325mg',
          frequency: 'Once daily in morning',
          duration: '30 days',
          notes: 'Cardioprotection'
        },
        {
          name: 'Warfarin',
          dosage: '5mg',
          frequency: 'Once daily in evening',
          duration: '30 days',
          notes: 'Anticoagulation for atrial fibrillation'
        }
      ],
      physicianAdvice: 'Periodic INR monitoring required. Watch for bruising.',
      confidenceScore: 95.4
    }
  },
  {
    id: 'rx-3',
    title: 'Urgent Care Slip — Dr. K. Patel (Allergy Case)',
    doctorName: 'Dr. Kevin Patel, MD',
    clinicName: 'Valley Urgent Care Clinic',
    date: 'May 2025',
    imageType: 'urgent_care',
    previewText: 'Rx: Amoxicillin 500mg, Three Times Daily (Allergy Conflict)',
    extractedData: {
      patientName: 'Mrunali Kadam',
      patientAge: '22',
      medicines: [
        {
          name: 'Amoxicillin',
          dosage: '500mg',
          frequency: 'Three times daily for 7 days',
          duration: '7 days',
          notes: 'For acute bacterial sinusitis'
        }
      ],
      physicianAdvice: 'Finish full antibiotic course.',
      confidenceScore: 98.2
    }
  }
];
