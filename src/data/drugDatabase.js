// Comprehensive clinical drug database for MediSafe AI
// Contains medications, typical dosages, side effects, known contraindications, and safe alternatives

export const COMMON_MEDICATIONS = [
  {
    id: 'med-1',
    name: 'Ibuprofen',
    brandNames: ['Advil', 'Motrin', 'Nurofen'],
    category: 'NSAID (Nonsteroidal Anti-inflammatory Drug)',
    commonDosages: ['200mg', '400mg', '600mg', '800mg'],
    defaultDosage: '400mg',
    defaultFrequency: 'Twice daily with meals',
    frequencies: ['Once daily', 'Twice daily with meals', 'Three times daily', 'As needed for pain'],
    primaryUse: 'Pain relief, fever, and inflammation',
    contraindicatedDiseases: [
      {
        disease: 'Chronic Kidney Disease',
        riskSeverity: 'HIGH',
        explanation: 'NSAIDs inhibit prostaglandin synthesis, severely decreasing renal blood flow and worsening kidney filtration function.',
        addedRisk: 35
      },
      {
        disease: 'Stomach Ulcer / GERD',
        riskSeverity: 'HIGH',
        explanation: 'Inhibits gastric mucosal protection, significantly increasing risk of stomach bleeding and ulcers.',
        addedRisk: 30
      },
      {
        disease: 'Heart Failure / Hypertension',
        riskSeverity: 'MEDIUM',
        explanation: 'Causes sodium and fluid retention, potentially elevating blood pressure.',
        addedRisk: 20
      }
    ],
    allergyClasses: ['NSAIDs', 'Aspirin Allergy'],
    baseSideEffects: [
      { name: 'Stomach Upset / Acid Reflux', baseRate: 48, severe: false },
      { name: 'Headache', baseRate: 24, severe: false },
      { name: 'Dizziness & Lightheadedness', baseRate: 18, severe: false },
      { name: 'Fluid Retention / Swelling', baseRate: 15, severe: false },
      { name: 'Kidney Strain (Elevated Creatinine)', baseRate: 28, severe: true }
    ],
    alternatives: [
      {
        name: 'Acetaminophen (Paracetamol)',
        dosage: '500mg as needed',
        category: 'Non-NSAID Analgesic',
        whySafer: 'Metabolized by the liver rather than kidneys, sparing renal blood vessels from NSAID damage.',
        projectedRiskScore: 18,
        riskLevel: 'LOW',
        doctorNote: 'Ideal first-line alternative for patients with renal impairment or gastrointestinal sensitivities.'
      },
      {
        name: 'Topical Diclofenac Gel (1%)',
        dosage: 'Apply to affected joint 2x daily',
        category: 'Topical NSAID',
        whySafer: 'Minimal systemic absorption (<6% of oral doses), greatly lowering internal organ exposure.',
        projectedRiskScore: 22,
        riskLevel: 'LOW',
        doctorNote: 'Recommended for localized joint pain without exposing kidneys or stomach to oral NSAID load.'
      }
    ]
  },
  {
    id: 'med-2',
    name: 'Paracetamol (Acetaminophen)',
    brandNames: ['Tylenol', 'Panadol', 'Calpol'],
    category: 'Analgesic & Antipyretic',
    commonDosages: ['325mg', '500mg', '650mg', '1000mg'],
    defaultDosage: '500mg',
    defaultFrequency: 'Every 6 hours as needed',
    frequencies: ['Once daily', 'Twice daily', 'Every 6 hours as needed', 'As needed for fever'],
    primaryUse: 'Mild-to-moderate pain and fever reduction',
    contraindicatedDiseases: [
      {
        disease: 'Liver Cirrhosis / Severe Hepatic Impairment',
        riskSeverity: 'HIGH',
        explanation: 'Metabolized heavily in the liver; in severe liver failure, accumulation of toxic metabolite NAPQI causes hepatic necrosis.',
        addedRisk: 40
      },
      {
        disease: 'Chronic Alcoholism',
        riskSeverity: 'MEDIUM',
        explanation: 'Depletes hepatic glutathione stores, heightening sensitivity to acetaminophen toxicity.',
        addedRisk: 25
      }
    ],
    allergyClasses: ['Acetaminophen Allergy'],
    baseSideEffects: [
      { name: 'Mild Nausea', baseRate: 12, severe: false },
      { name: 'Headache', baseRate: 10, severe: false },
      { name: 'Insomnia (if combined with caffeine)', baseRate: 8, severe: false },
      { name: 'Elevated Liver Enzymes (high dose)', baseRate: 14, severe: true }
    ],
    alternatives: [
      {
        name: 'Topical Menthol / Camphor Analgesic Patch',
        dosage: '1 patch applied for 8 hours',
        category: 'Topical Analgesic',
        whySafer: 'Avoids systemic liver metabolism entirely.',
        projectedRiskScore: 8,
        riskLevel: 'LOW',
        doctorNote: 'Safe topical option for musculoskeletal pain when oral pain relievers are cautioned.'
      }
    ]
  },
  {
    id: 'med-3',
    name: 'Amoxicillin',
    brandNames: ['Amoxil', 'Trimox', 'Augmentin'],
    category: 'Beta-lactam Antibiotic (Penicillin class)',
    commonDosages: ['250mg', '500mg', '875mg'],
    defaultDosage: '500mg',
    defaultFrequency: 'Three times daily for 7 days',
    frequencies: ['Twice daily for 7 days', 'Three times daily for 7 days', 'Twice daily for 10 days'],
    primaryUse: 'Bacterial respiratory, ear, throat, and urinary infections',
    contraindicatedDiseases: [
      {
        disease: 'Severe Renal Impairment',
        riskSeverity: 'MEDIUM',
        explanation: 'Excreted by kidneys; dose reduction needed to prevent neurotoxicity.',
        addedRisk: 22
      },
      {
        disease: 'Infectious Mononucleosis',
        riskSeverity: 'MEDIUM',
        explanation: 'High likelihood (up to 90%) of developing a widespread erythematous maculopapular rash.',
        addedRisk: 28
      }
    ],
    allergyClasses: ['Penicillin', 'Beta-lactam Allergy'],
    baseSideEffects: [
      { name: 'Nausea & Stomach Cramps', baseRate: 35, severe: false },
      { name: 'Diarrhea / Loose Stools', baseRate: 42, severe: false },
      { name: 'Skin Rash or Hives', baseRate: 20, severe: true },
      { name: 'Oral Thrush / Yeast Overgrowth', baseRate: 15, severe: false }
    ],
    alternatives: [
      {
        name: 'Azithromycin (Zithromax)',
        dosage: '250mg / 500mg oral daily',
        category: 'Macrolide Antibiotic',
        whySafer: 'Belongs to macrolide class; non-cross-reactive with penicillin allergies.',
        projectedRiskScore: 16,
        riskLevel: 'LOW',
        doctorNote: 'Proven alternative for penicillin-allergic patients with upper respiratory infections.'
      },
      {
        name: 'Doxycycline',
        dosage: '100mg twice daily',
        category: 'Tetracycline Antibiotic',
        whySafer: 'Completely different chemical structure; safe in documented beta-lactam hypersensitivity.',
        projectedRiskScore: 19,
        riskLevel: 'LOW',
        doctorNote: 'Effective broad-spectrum choice for skin, soft tissue, and atypical chest infections.'
      }
    ]
  },
  {
    id: 'med-4',
    name: 'Warfarin',
    brandNames: ['Coumadin', 'Jantoven'],
    category: 'Vitamin K Antagonist Anticoagulant (Blood Thinner)',
    commonDosages: ['1mg', '2mg', '2.5mg', '5mg', '7.5mg', '10mg'],
    defaultDosage: '5mg',
    defaultFrequency: 'Once daily in the evening',
    frequencies: ['Once daily in the evening', 'Dosed according to INR test'],
    primaryUse: 'Prevention of stroke, deep vein thrombosis (DVT), and pulmonary embolism',
    contraindicatedDiseases: [
      {
        disease: 'Active Bleeding / Hemorrhagic Stroke History',
        riskSeverity: 'HIGH',
        explanation: 'Severe risk of uncontrollable, life-threatening internal bleeding.',
        addedRisk: 45
      },
      {
        disease: 'Severe Hypertension (Uncontrolled)',
        riskSeverity: 'HIGH',
        explanation: 'Elevated vascular pressure increases incidence of cerebral hemorrhage.',
        addedRisk: 30
      },
      {
        disease: 'Liver Cirrhosis',
        riskSeverity: 'HIGH',
        explanation: 'Impaired synthesis of clotting factors compounds anticoagulant impact.',
        addedRisk: 35
      }
    ],
    allergyClasses: ['Warfarin Hypersensitivity'],
    baseSideEffects: [
      { name: 'Bruising & Easy Bleeding', baseRate: 64, severe: true },
      { name: 'Prolonged Bleeding from Minor Cuts', baseRate: 58, severe: false },
      { name: 'Dizziness or Weakness (from blood loss)', baseRate: 22, severe: true },
      { name: 'Hair Thinning (Alopecia)', baseRate: 12, severe: false }
    ],
    alternatives: [
      {
        name: 'Apixaban (Eliquis)',
        dosage: '5mg twice daily',
        category: 'Direct Oral Anticoagulant (DOAC)',
        whySafer: 'Predictable pharmacokinetics with fewer dietary interactions and significantly lower intracranial bleeding rates.',
        projectedRiskScore: 28,
        riskLevel: 'MEDIUM',
        doctorNote: 'Requires medical review to verify renal clearance before switching.'
      }
    ]
  },
  {
    id: 'med-5',
    name: 'Aspirin',
    brandNames: ['Bayer', 'Bufferin', 'Ecotrin'],
    category: 'Antiplatelet & Salicylate NSAID',
    commonDosages: ['81mg (Baby/Low Dose)', '325mg', '500mg'],
    defaultDosage: '81mg (Baby/Low Dose)',
    defaultFrequency: 'Once daily with food',
    frequencies: ['Once daily with food', 'Every 4 to 6 hours for pain'],
    primaryUse: 'Cardiovascular event prophylaxis & pain relief',
    contraindicatedDiseases: [
      {
        disease: 'Stomach Ulcer / Bleeding Disorder',
        riskSeverity: 'HIGH',
        explanation: 'Irreversibly inhibits platelet COX-1, dramatically elevating gastrointestinal bleeding.',
        addedRisk: 38
      },
      {
        disease: 'Asthma (Aspirin-Exacerbated Respiratory Disease)',
        riskSeverity: 'HIGH',
        explanation: 'Shunts arachidonic acid into leukotrienes, precipitating bronchospasm.',
        addedRisk: 32
      }
    ],
    allergyClasses: ['Aspirin Allergy', 'Salicylates', 'NSAIDs'],
    baseSideEffects: [
      { name: 'Gastric Irritation & Heartburn', baseRate: 40, severe: false },
      { name: 'Occult Blood in Stool / Anemia', baseRate: 25, severe: true },
      { name: 'Tinnitus (Ringing in Ears at higher doses)', baseRate: 18, severe: false },
      { name: 'Easy Bruising', baseRate: 35, severe: false }
    ],
    alternatives: [
      {
        name: 'Clopidogrel (Plavix)',
        dosage: '75mg once daily',
        category: 'P2Y12 Inhibitor Antiplatelet',
        whySafer: 'Lower incidence of gastrointestinal mucosal erosions compared to aspirin.',
        projectedRiskScore: 20,
        riskLevel: 'LOW',
        doctorNote: 'Standard substitute for patients with aspirin hypersensitivity or high GI bleeding vulnerability.'
      }
    ]
  },
  {
    id: 'med-6',
    name: 'Metformin',
    brandNames: ['Glucophage', 'Fortamet'],
    category: 'Biguanide Antidiabetic',
    commonDosages: ['500mg', '850mg', '1000mg', '1000mg ER'],
    defaultDosage: '500mg',
    defaultFrequency: 'Twice daily with meals',
    frequencies: ['Once daily with dinner', 'Twice daily with meals', 'Three times daily'],
    primaryUse: 'Blood sugar control in Type 2 Diabetes',
    contraindicatedDiseases: [
      {
        disease: 'Severe Renal Impairment (eGFR < 30)',
        riskSeverity: 'HIGH',
        explanation: 'Drug clearance slows down, precipitating life-threatening lactic acidosis.',
        addedRisk: 42
      },
      {
        disease: 'Heart Failure (Acute Decompensated)',
        riskSeverity: 'HIGH',
        explanation: 'Tissue hypoperfusion raises lactate production alongside reduced renal clearance.',
        addedRisk: 34
      },
      {
        disease: 'Severe Liver Disease',
        riskSeverity: 'MEDIUM',
        explanation: 'Impaired hepatic lactate clearance exacerbates acidosis risk.',
        addedRisk: 26
      }
    ],
    allergyClasses: ['Metformin Allergy'],
    baseSideEffects: [
      { name: 'Diarrhea & Gastrointestinal Cramping', baseRate: 55, severe: false },
      { name: 'Metallic Taste in Mouth', baseRate: 22, severe: false },
      { name: 'Nausea and Loss of Appetite', baseRate: 30, severe: false },
      { name: 'Vitamin B12 Deficiency (long-term)', baseRate: 18, severe: false }
    ],
    alternatives: [
      {
        name: 'Linagliptin (Tradjenta)',
        dosage: '5mg once daily',
        category: 'DPP-4 Inhibitor',
        whySafer: 'Eliminated predominantly through the biliary system; requires no renal dosage adjustment.',
        projectedRiskScore: 15,
        riskLevel: 'LOW',
        doctorNote: 'Excellent glycemic control alternative for diabetic patients with renal compromise.'
      }
    ]
  },
  {
    id: 'med-7',
    name: 'Lisinopril',
    brandNames: ['Prinivil', 'Zestril'],
    category: 'ACE Inhibitor (Antihypertensive)',
    commonDosages: ['5mg', '10mg', '20mg', '40mg'],
    defaultDosage: '10mg',
    defaultFrequency: 'Once daily in the morning',
    frequencies: ['Once daily in the morning', 'Twice daily'],
    primaryUse: 'High blood pressure, heart failure, post-myocardial infarction',
    contraindicatedDiseases: [
      {
        disease: 'History of Angioedema',
        riskSeverity: 'HIGH',
        explanation: 'Bradykinin accumulation can trigger life-threatening airway swelling.',
        addedRisk: 45
      },
      {
        disease: 'Bilateral Renal Artery Stenosis',
        riskSeverity: 'HIGH',
        explanation: 'Blocks efferent arteriolar constriction, causing acute drop in filtration pressure.',
        addedRisk: 38
      },
      {
        disease: 'Hyperkalemia (High Potassium)',
        riskSeverity: 'MEDIUM',
        explanation: 'Reduces aldosterone secretion, causing further dangerous potassium retention.',
        addedRisk: 28
      }
    ],
    allergyClasses: ['ACE Inhibitors'],
    baseSideEffects: [
      { name: 'Persistent Dry Tickling Cough', baseRate: 42, severe: false },
      { name: 'Dizziness / Orthostatic Hypotension', baseRate: 28, severe: false },
      { name: 'Hyperkalemia (High Blood Potassium)', baseRate: 20, severe: true },
      { name: 'Fatigue & Lethargy', baseRate: 16, severe: false }
    ],
    alternatives: [
      {
        name: 'Losartan (Cozaar)',
        dosage: '50mg once daily',
        category: 'Angiotensin Receptor Blocker (ARB)',
        whySafer: 'Does not inhibit kinase II; does not elevate bradykinin, practically eliminating the dry cough.',
        projectedRiskScore: 14,
        riskLevel: 'LOW',
        doctorNote: 'Preferred first alternative when patients develop an intolerable ACE-inhibitor cough.'
      },
      {
        name: 'Amlodipine (Norvasc)',
        dosage: '5mg once daily',
        category: 'Calcium Channel Blocker (CCB)',
        whySafer: 'Acts directly on peripheral vascular smooth muscle without altering potassium or bradykinin pathways.',
        projectedRiskScore: 16,
        riskLevel: 'LOW',
        doctorNote: 'Reliable blood pressure manager with minimal renal filtration interaction.'
      }
    ]
  },
  {
    id: 'med-8',
    name: 'Ciprofloxacin',
    brandNames: ['Cipro', 'Proquin'],
    category: 'Fluoroquinolone Antibiotic',
    commonDosages: ['250mg', '500mg', '750mg'],
    defaultDosage: '500mg',
    defaultFrequency: 'Twice daily for 5 to 7 days',
    frequencies: ['Twice daily for 5 days', 'Twice daily for 7 days', 'Twice daily for 14 days'],
    primaryUse: 'Complicated urinary tract, abdominal, and joint infections',
    contraindicatedDiseases: [
      {
        disease: 'Myasthenia Gravis',
        riskSeverity: 'HIGH',
        explanation: 'FDA Black Box Warning: exacerbates muscle weakness and can trigger respiratory arrest.',
        addedRisk: 48
      },
      {
        disease: 'Tendonitis / Tendon Rupture History',
        riskSeverity: 'HIGH',
        explanation: 'Weakens collagen bundles; Achilles tendon rupture risk is especially high in seniors (>65).',
        addedRisk: 36
      },
      {
        disease: 'Cardiac Arrhythmia (Long QT syndrome)',
        riskSeverity: 'MEDIUM',
        explanation: 'Prolongs the cardiac QT interval, posing risk of torsades de pointes.',
        addedRisk: 30
      }
    ],
    allergyClasses: ['Fluoroquinolones'],
    baseSideEffects: [
      { name: 'Nausea & Stomach Discomfort', baseRate: 32, severe: false },
      { name: 'Tendon Pain / Joint Stiffness', baseRate: 24, severe: true },
      { name: 'Dizziness & Lightheadedness', baseRate: 22, severe: false },
      { name: 'Sun Sensitivity / Phototoxicity', baseRate: 19, severe: false }
    ],
    alternatives: [
      {
        name: 'Nitrofurantoin (Macrobid)',
        dosage: '100mg twice daily for 5 days',
        category: 'Nitrofuran Urinary Antiseptic',
        whySafer: 'Concentrates directly in urine without systemic musculoskeletal toxicity.',
        projectedRiskScore: 15,
        riskLevel: 'LOW',
        doctorNote: 'Recommended primary agent for uncomplicated lower urinary tract infections without tendon risks.'
      }
    ]
  },
  {
    id: 'med-9',
    name: 'Atorvastatin',
    brandNames: ['Lipitor'],
    category: 'HMG-CoA Reductase Inhibitor (Statin)',
    commonDosages: ['10mg', '20mg', '40mg', '80mg'],
    defaultDosage: '20mg',
    defaultFrequency: 'Once daily at bedtime',
    frequencies: ['Once daily at bedtime', 'Once daily in the morning'],
    primaryUse: 'Cholesterol lowering and cardiovascular disease prevention',
    contraindicatedDiseases: [
      {
        disease: 'Active Liver Disease / Cirrhosis',
        riskSeverity: 'HIGH',
        explanation: 'Can exacerbate liver enzyme transaminase elevations.',
        addedRisk: 35
      }
    ],
    allergyClasses: ['Statins'],
    baseSideEffects: [
      { name: 'Muscle Aches / Myalgia', baseRate: 28, severe: false },
      { name: 'Mild Digestive Discomfort', baseRate: 16, severe: false },
      { name: 'Mild Memory Fog / Sleep Disturbance', baseRate: 11, severe: false },
      { name: 'Elevated Liver Enzymes', baseRate: 12, severe: true }
    ],
    alternatives: [
      {
        name: 'Rosuvastatin (Crestor)',
        dosage: '5mg once daily',
        category: 'Hydrophilic Statin',
        whySafer: 'Less lipophilic; lower muscle penetration and fewer CYP3A4 metabolic interactions.',
        projectedRiskScore: 14,
        riskLevel: 'LOW',
        doctorNote: 'Better tolerated in patients who develop myalgias on atorvastatin.'
      }
    ]
  },
  {
    id: 'med-10',
    name: 'Omeprazole',
    brandNames: ['Prilosec', 'Losec'],
    category: 'Proton Pump Inhibitor (PPI)',
    commonDosages: ['20mg', '40mg'],
    defaultDosage: '20mg',
    defaultFrequency: 'Once daily 30 mins before breakfast',
    frequencies: ['Once daily 30 mins before breakfast', 'Twice daily before meals'],
    primaryUse: 'Acid reflux (GERD), stomach ulcers, and gastric protection',
    contraindicatedDiseases: [
      {
        disease: 'Severe Osteoporosis',
        riskSeverity: 'MEDIUM',
        explanation: 'Long-term acid suppression reduces calcium absorption, increasing bone fracture risk.',
        addedRisk: 20
      },
      {
        disease: 'Recurrent C. difficile Infection',
        riskSeverity: 'HIGH',
        explanation: 'Decreased gastric acidity allows bacterial spores to survive and colonize the gut.',
        addedRisk: 32
      }
    ],
    allergyClasses: ['Proton Pump Inhibitors'],
    baseSideEffects: [
      { name: 'Headache', baseRate: 18, severe: false },
      { name: 'Abdominal Pain / Bloating', baseRate: 20, severe: false },
      { name: 'Low Magnesium Levels (long-term)', baseRate: 15, severe: true },
      { name: 'Mild Diarrhea', baseRate: 14, severe: false }
    ],
    alternatives: [
      {
        name: 'Famotidine (Pepcid)',
        dosage: '20mg twice daily',
        category: 'H2 Receptor Blocker',
        whySafer: 'Milder acid suppression with fewer bone density, gut flora, or magnesium complications.',
        projectedRiskScore: 12,
        riskLevel: 'LOW',
        doctorNote: 'Effective step-down therapy for heartburn without prolonged PPI adverse profiles.'
      }
    ]
  }
];

// Clinical Drug-to-Drug Interaction Knowledge Base
export const DRUG_DRUG_INTERACTIONS = [
  {
    drug1: 'Warfarin',
    drug2: 'Aspirin',
    severity: 'SEVERE',
    riskScore: 88,
    summary: 'Extreme Bleeding & Hemorrhage Hazard',
    mechanism: 'Dual anticoagulant and antiplatelet inhibition creates a synergistic suppression of hemostasis. Greatly magnifies gastrointestinal and intracranial bleeding risk.',
    actionRequired: 'Avoid concurrent use unless strictly supervised by a cardiologist. Monitor INR and signs of internal bleeding immediately.'
  },
  {
    drug1: 'Warfarin',
    drug2: 'Ibuprofen',
    severity: 'SEVERE',
    riskScore: 84,
    summary: 'High Gastrointestinal Hemorrhage Hazard',
    mechanism: 'Ibuprofen damages gastric mucosa and displaces Warfarin from plasma protein binding sites while impairing platelet function, multiplying bleeding risk 3-4x.',
    actionRequired: 'Do not combine. Switch pain management to Acetaminophen (Paracetamol) or topical therapy.'
  },
  {
    drug1: 'Lisinopril',
    drug2: 'Ibuprofen',
    severity: 'HIGH',
    riskScore: 76,
    summary: 'Blunted Blood Pressure Control & Acute Kidney Injury',
    mechanism: 'Ibuprofen blocks renal prostaglandins, causing vasoconstriction that negates Lisinoprils vasodilatory mechanism and creates dangerous pressure drop in the nephron.',
    actionRequired: 'Avoid regular NSAID usage. Monitor blood pressure and serum creatinine levels.'
  },
  {
    drug1: 'Metformin',
    drug2: 'Ciprofloxacin',
    severity: 'MODERATE',
    riskScore: 58,
    summary: 'Dysglycemia & Altered Blood Sugar Control',
    mechanism: 'Fluoroquinolones can cause erratic blood glucose fluctuations (severe hypoglycemia or hyperglycemia) when taken with oral antidiabetics.',
    actionRequired: 'Increase frequency of blood sugar self-monitoring during antibiotic course.'
  },
  {
    drug1: 'Atorvastatin',
    drug2: 'Ciprofloxacin',
    severity: 'MODERATE',
    riskScore: 62,
    summary: 'Increased Statin Exposure & Myopathy Risk',
    mechanism: 'Inhibition of CYP3A4/transporters elevates systemic statin concentrations, increasing probability of muscle toxicity (rhabdomyolysis).',
    actionRequired: 'Report any sudden unexplained muscle pain, dark urine, or joint tenderness.'
  },
  {
    drug1: 'Omeprazole',
    drug2: 'Warfarin',
    severity: 'MODERATE',
    riskScore: 60,
    summary: 'Elevated Anticoagulant Activity (INR spikes)',
    mechanism: 'Omeprazole inhibits CYP2C19, decreasing the metabolic clearance of Warfarin and causing unexpected spikes in anticoagulation.',
    actionRequired: 'Switch PPI to Pantoprazole or Famotidine, or increase INR testing frequency.'
  },
  {
    drug1: 'Aspirin',
    drug2: 'Ibuprofen',
    severity: 'HIGH',
    riskScore: 78,
    summary: 'Loss of Cardioprotective Effect & Severe Gastric Risk',
    mechanism: 'Ibuprofen competitively blocks Aspirins access to the platelet COX-1 binding site, destroying Aspirins cardiac protective benefits while compounding stomach erosion.',
    actionRequired: 'Take Aspirin at least 2 hours prior to any NSAID, or preferably choose Paracetamol.'
  }
];

// Presets of diseases and allergies for fast 1-click selection
export const DISEASE_LIST = [
  'Chronic Kidney Disease',
  'Hypertension (High Blood Pressure)',
  'Type 2 Diabetes',
  'Asthma / COPD',
  'Stomach Ulcer / GERD',
  'Liver Cirrhosis / Disease',
  'Atrial Fibrillation / Heart Failure',
  'Osteoporosis',
  'Myasthenia Gravis',
  'History of Stroke'
];

export const ALLERGY_LIST = [
  'Penicillin',
  'Sulfa Drugs (Sulfonamides)',
  'Aspirin / NSAIDs',
  'Codeine / Opioids',
  'Cephalosporins',
  'Fluoroquinolones',
  'Metformin Allergy',
  'Latex / Adhesive'
];
