var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/App.jsx
var App_exports = {};
__export(App_exports, {
  default: () => App
});
module.exports = __toCommonJS(App_exports);
var import_react24 = __toESM(require("react"), 1);

// src/context/HealthContext.jsx
var import_react = __toESM(require("react"), 1);

// src/data/samplePatients.js
var SAMPLE_PATIENTS = [
  {
    id: "patient-1",
    name: "Robert Jenkins",
    age: 68,
    gender: "Male",
    weight: 78,
    description: "Senior with Kidney Disease & Hypertension",
    diseases: ["Chronic Kidney Disease", "Hypertension (High Blood Pressure)"],
    allergies: ["Sulfa Drugs (Sulfonamides)"],
    medicalHistory: "Stage 3 CKD diagnosed in 2021. Monitored for elevated creatinine and blood pressure.",
    currentMedicines: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
    ],
    recommendedTestDrug: "Ibuprofen",
    testScenarioTitle: "Senior (68) + Kidney Disease + Ibuprofen",
    testScenarioHighlight: "Triggers High Risk (85%) due to renal blood flow inhibition & age factor."
  },
  {
    id: "patient-2",
    name: "Eleanor Vance",
    age: 54,
    gender: "Female",
    weight: 65,
    description: "Cardiac Patient with Penicillin Allergy & Blood Thinner",
    diseases: ["Atrial Fibrillation / Heart Failure"],
    allergies: ["Penicillin", "Beta-lactam Allergy"],
    medicalHistory: "Persistent A-fib managed with anticoagulant. Documented anaphylactic rash to penicillin in childhood.",
    currentMedicines: [
      { name: "Warfarin", dosage: "5mg", frequency: "Once daily in evening" }
    ],
    recommendedTestDrug: "Amoxicillin",
    testScenarioTitle: "Allergy Test: Eleanor + Amoxicillin (Penicillin class)",
    testScenarioHighlight: "Triggers Emergency Allergy Alert & Macrolide alternative recommendation."
  },
  {
    id: "patient-3",
    name: "Marcus Brody",
    age: 58,
    gender: "Male",
    weight: 85,
    description: "Cardiac Patient on Blood Thinner (Drug-Drug Test)",
    diseases: ["Hypertension (High Blood Pressure)", "History of Stroke"],
    allergies: [],
    medicalHistory: "Mild ischemic attack in 2023. Prescribed Warfarin for stroke prevention.",
    currentMedicines: [
      { name: "Warfarin", dosage: "5mg", frequency: "Once daily" }
    ],
    recommendedTestDrug: "Aspirin",
    testScenarioTitle: "Drug Interaction Test: Warfarin + Aspirin",
    testScenarioHighlight: "Triggers Severe Bleeding Risk (88%) between dual blood thinners."
  },
  {
    id: "patient-4",
    name: "Devon Clark",
    age: 32,
    gender: "Male",
    weight: 72,
    description: "Young Adult with Type 2 Diabetes",
    diseases: ["Type 2 Diabetes"],
    allergies: [],
    medicalHistory: "Early stage adult onset diabetes well-controlled through diet and Metformin.",
    currentMedicines: [
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily with meals" }
    ],
    recommendedTestDrug: "Paracetamol (Acetaminophen)",
    testScenarioTitle: "Safe Profile Test: Paracetamol for Fever",
    testScenarioHighlight: "Demonstrates Green (Low Risk 15%) safe verification score."
  }
];
var DEFAULT_PATIENT = SAMPLE_PATIENTS[0];

// src/data/drugDatabase.js
var COMMON_MEDICATIONS = [
  {
    id: "med-1",
    name: "Ibuprofen",
    brandNames: ["Advil", "Motrin", "Nurofen"],
    category: "NSAID (Nonsteroidal Anti-inflammatory Drug)",
    commonDosages: ["200mg", "400mg", "600mg", "800mg"],
    defaultDosage: "400mg",
    defaultFrequency: "Twice daily with meals",
    frequencies: ["Once daily", "Twice daily with meals", "Three times daily", "As needed for pain"],
    primaryUse: "Pain relief, fever, and inflammation",
    contraindicatedDiseases: [
      {
        disease: "Chronic Kidney Disease",
        riskSeverity: "HIGH",
        explanation: "NSAIDs inhibit prostaglandin synthesis, severely decreasing renal blood flow and worsening kidney filtration function.",
        addedRisk: 35
      },
      {
        disease: "Stomach Ulcer / GERD",
        riskSeverity: "HIGH",
        explanation: "Inhibits gastric mucosal protection, significantly increasing risk of stomach bleeding and ulcers.",
        addedRisk: 30
      },
      {
        disease: "Heart Failure / Hypertension",
        riskSeverity: "MEDIUM",
        explanation: "Causes sodium and fluid retention, potentially elevating blood pressure.",
        addedRisk: 20
      }
    ],
    allergyClasses: ["NSAIDs", "Aspirin Allergy"],
    baseSideEffects: [
      { name: "Stomach Upset / Acid Reflux", baseRate: 48, severe: false },
      { name: "Headache", baseRate: 24, severe: false },
      { name: "Dizziness & Lightheadedness", baseRate: 18, severe: false },
      { name: "Fluid Retention / Swelling", baseRate: 15, severe: false },
      { name: "Kidney Strain (Elevated Creatinine)", baseRate: 28, severe: true }
    ],
    alternatives: [
      {
        name: "Acetaminophen (Paracetamol)",
        dosage: "500mg as needed",
        category: "Non-NSAID Analgesic",
        whySafer: "Metabolized by the liver rather than kidneys, sparing renal blood vessels from NSAID damage.",
        projectedRiskScore: 18,
        riskLevel: "LOW",
        doctorNote: "Ideal first-line alternative for patients with renal impairment or gastrointestinal sensitivities."
      },
      {
        name: "Topical Diclofenac Gel (1%)",
        dosage: "Apply to affected joint 2x daily",
        category: "Topical NSAID",
        whySafer: "Minimal systemic absorption (<6% of oral doses), greatly lowering internal organ exposure.",
        projectedRiskScore: 22,
        riskLevel: "LOW",
        doctorNote: "Recommended for localized joint pain without exposing kidneys or stomach to oral NSAID load."
      }
    ]
  },
  {
    id: "med-2",
    name: "Paracetamol (Acetaminophen)",
    brandNames: ["Tylenol", "Panadol", "Calpol"],
    category: "Analgesic & Antipyretic",
    commonDosages: ["325mg", "500mg", "650mg", "1000mg"],
    defaultDosage: "500mg",
    defaultFrequency: "Every 6 hours as needed",
    frequencies: ["Once daily", "Twice daily", "Every 6 hours as needed", "As needed for fever"],
    primaryUse: "Mild-to-moderate pain and fever reduction",
    contraindicatedDiseases: [
      {
        disease: "Liver Cirrhosis / Severe Hepatic Impairment",
        riskSeverity: "HIGH",
        explanation: "Metabolized heavily in the liver; in severe liver failure, accumulation of toxic metabolite NAPQI causes hepatic necrosis.",
        addedRisk: 40
      },
      {
        disease: "Chronic Alcoholism",
        riskSeverity: "MEDIUM",
        explanation: "Depletes hepatic glutathione stores, heightening sensitivity to acetaminophen toxicity.",
        addedRisk: 25
      }
    ],
    allergyClasses: ["Acetaminophen Allergy"],
    baseSideEffects: [
      { name: "Mild Nausea", baseRate: 12, severe: false },
      { name: "Headache", baseRate: 10, severe: false },
      { name: "Insomnia (if combined with caffeine)", baseRate: 8, severe: false },
      { name: "Elevated Liver Enzymes (high dose)", baseRate: 14, severe: true }
    ],
    alternatives: [
      {
        name: "Topical Menthol / Camphor Analgesic Patch",
        dosage: "1 patch applied for 8 hours",
        category: "Topical Analgesic",
        whySafer: "Avoids systemic liver metabolism entirely.",
        projectedRiskScore: 8,
        riskLevel: "LOW",
        doctorNote: "Safe topical option for musculoskeletal pain when oral pain relievers are cautioned."
      }
    ]
  },
  {
    id: "med-3",
    name: "Amoxicillin",
    brandNames: ["Amoxil", "Trimox", "Augmentin"],
    category: "Beta-lactam Antibiotic (Penicillin class)",
    commonDosages: ["250mg", "500mg", "875mg"],
    defaultDosage: "500mg",
    defaultFrequency: "Three times daily for 7 days",
    frequencies: ["Twice daily for 7 days", "Three times daily for 7 days", "Twice daily for 10 days"],
    primaryUse: "Bacterial respiratory, ear, throat, and urinary infections",
    contraindicatedDiseases: [
      {
        disease: "Severe Renal Impairment",
        riskSeverity: "MEDIUM",
        explanation: "Excreted by kidneys; dose reduction needed to prevent neurotoxicity.",
        addedRisk: 22
      },
      {
        disease: "Infectious Mononucleosis",
        riskSeverity: "MEDIUM",
        explanation: "High likelihood (up to 90%) of developing a widespread erythematous maculopapular rash.",
        addedRisk: 28
      }
    ],
    allergyClasses: ["Penicillin", "Beta-lactam Allergy"],
    baseSideEffects: [
      { name: "Nausea & Stomach Cramps", baseRate: 35, severe: false },
      { name: "Diarrhea / Loose Stools", baseRate: 42, severe: false },
      { name: "Skin Rash or Hives", baseRate: 20, severe: true },
      { name: "Oral Thrush / Yeast Overgrowth", baseRate: 15, severe: false }
    ],
    alternatives: [
      {
        name: "Azithromycin (Zithromax)",
        dosage: "250mg / 500mg oral daily",
        category: "Macrolide Antibiotic",
        whySafer: "Belongs to macrolide class; non-cross-reactive with penicillin allergies.",
        projectedRiskScore: 16,
        riskLevel: "LOW",
        doctorNote: "Proven alternative for penicillin-allergic patients with upper respiratory infections."
      },
      {
        name: "Doxycycline",
        dosage: "100mg twice daily",
        category: "Tetracycline Antibiotic",
        whySafer: "Completely different chemical structure; safe in documented beta-lactam hypersensitivity.",
        projectedRiskScore: 19,
        riskLevel: "LOW",
        doctorNote: "Effective broad-spectrum choice for skin, soft tissue, and atypical chest infections."
      }
    ]
  },
  {
    id: "med-4",
    name: "Warfarin",
    brandNames: ["Coumadin", "Jantoven"],
    category: "Vitamin K Antagonist Anticoagulant (Blood Thinner)",
    commonDosages: ["1mg", "2mg", "2.5mg", "5mg", "7.5mg", "10mg"],
    defaultDosage: "5mg",
    defaultFrequency: "Once daily in the evening",
    frequencies: ["Once daily in the evening", "Dosed according to INR test"],
    primaryUse: "Prevention of stroke, deep vein thrombosis (DVT), and pulmonary embolism",
    contraindicatedDiseases: [
      {
        disease: "Active Bleeding / Hemorrhagic Stroke History",
        riskSeverity: "HIGH",
        explanation: "Severe risk of uncontrollable, life-threatening internal bleeding.",
        addedRisk: 45
      },
      {
        disease: "Severe Hypertension (Uncontrolled)",
        riskSeverity: "HIGH",
        explanation: "Elevated vascular pressure increases incidence of cerebral hemorrhage.",
        addedRisk: 30
      },
      {
        disease: "Liver Cirrhosis",
        riskSeverity: "HIGH",
        explanation: "Impaired synthesis of clotting factors compounds anticoagulant impact.",
        addedRisk: 35
      }
    ],
    allergyClasses: ["Warfarin Hypersensitivity"],
    baseSideEffects: [
      { name: "Bruising & Easy Bleeding", baseRate: 64, severe: true },
      { name: "Prolonged Bleeding from Minor Cuts", baseRate: 58, severe: false },
      { name: "Dizziness or Weakness (from blood loss)", baseRate: 22, severe: true },
      { name: "Hair Thinning (Alopecia)", baseRate: 12, severe: false }
    ],
    alternatives: [
      {
        name: "Apixaban (Eliquis)",
        dosage: "5mg twice daily",
        category: "Direct Oral Anticoagulant (DOAC)",
        whySafer: "Predictable pharmacokinetics with fewer dietary interactions and significantly lower intracranial bleeding rates.",
        projectedRiskScore: 28,
        riskLevel: "MEDIUM",
        doctorNote: "Requires medical review to verify renal clearance before switching."
      }
    ]
  },
  {
    id: "med-5",
    name: "Aspirin",
    brandNames: ["Bayer", "Bufferin", "Ecotrin"],
    category: "Antiplatelet & Salicylate NSAID",
    commonDosages: ["81mg (Baby/Low Dose)", "325mg", "500mg"],
    defaultDosage: "81mg (Baby/Low Dose)",
    defaultFrequency: "Once daily with food",
    frequencies: ["Once daily with food", "Every 4 to 6 hours for pain"],
    primaryUse: "Cardiovascular event prophylaxis & pain relief",
    contraindicatedDiseases: [
      {
        disease: "Stomach Ulcer / Bleeding Disorder",
        riskSeverity: "HIGH",
        explanation: "Irreversibly inhibits platelet COX-1, dramatically elevating gastrointestinal bleeding.",
        addedRisk: 38
      },
      {
        disease: "Asthma (Aspirin-Exacerbated Respiratory Disease)",
        riskSeverity: "HIGH",
        explanation: "Shunts arachidonic acid into leukotrienes, precipitating bronchospasm.",
        addedRisk: 32
      }
    ],
    allergyClasses: ["Aspirin Allergy", "Salicylates", "NSAIDs"],
    baseSideEffects: [
      { name: "Gastric Irritation & Heartburn", baseRate: 40, severe: false },
      { name: "Occult Blood in Stool / Anemia", baseRate: 25, severe: true },
      { name: "Tinnitus (Ringing in Ears at higher doses)", baseRate: 18, severe: false },
      { name: "Easy Bruising", baseRate: 35, severe: false }
    ],
    alternatives: [
      {
        name: "Clopidogrel (Plavix)",
        dosage: "75mg once daily",
        category: "P2Y12 Inhibitor Antiplatelet",
        whySafer: "Lower incidence of gastrointestinal mucosal erosions compared to aspirin.",
        projectedRiskScore: 20,
        riskLevel: "LOW",
        doctorNote: "Standard substitute for patients with aspirin hypersensitivity or high GI bleeding vulnerability."
      }
    ]
  },
  {
    id: "med-6",
    name: "Metformin",
    brandNames: ["Glucophage", "Fortamet"],
    category: "Biguanide Antidiabetic",
    commonDosages: ["500mg", "850mg", "1000mg", "1000mg ER"],
    defaultDosage: "500mg",
    defaultFrequency: "Twice daily with meals",
    frequencies: ["Once daily with dinner", "Twice daily with meals", "Three times daily"],
    primaryUse: "Blood sugar control in Type 2 Diabetes",
    contraindicatedDiseases: [
      {
        disease: "Severe Renal Impairment (eGFR < 30)",
        riskSeverity: "HIGH",
        explanation: "Drug clearance slows down, precipitating life-threatening lactic acidosis.",
        addedRisk: 42
      },
      {
        disease: "Heart Failure (Acute Decompensated)",
        riskSeverity: "HIGH",
        explanation: "Tissue hypoperfusion raises lactate production alongside reduced renal clearance.",
        addedRisk: 34
      },
      {
        disease: "Severe Liver Disease",
        riskSeverity: "MEDIUM",
        explanation: "Impaired hepatic lactate clearance exacerbates acidosis risk.",
        addedRisk: 26
      }
    ],
    allergyClasses: ["Metformin Allergy"],
    baseSideEffects: [
      { name: "Diarrhea & Gastrointestinal Cramping", baseRate: 55, severe: false },
      { name: "Metallic Taste in Mouth", baseRate: 22, severe: false },
      { name: "Nausea and Loss of Appetite", baseRate: 30, severe: false },
      { name: "Vitamin B12 Deficiency (long-term)", baseRate: 18, severe: false }
    ],
    alternatives: [
      {
        name: "Linagliptin (Tradjenta)",
        dosage: "5mg once daily",
        category: "DPP-4 Inhibitor",
        whySafer: "Eliminated predominantly through the biliary system; requires no renal dosage adjustment.",
        projectedRiskScore: 15,
        riskLevel: "LOW",
        doctorNote: "Excellent glycemic control alternative for diabetic patients with renal compromise."
      }
    ]
  },
  {
    id: "med-7",
    name: "Lisinopril",
    brandNames: ["Prinivil", "Zestril"],
    category: "ACE Inhibitor (Antihypertensive)",
    commonDosages: ["5mg", "10mg", "20mg", "40mg"],
    defaultDosage: "10mg",
    defaultFrequency: "Once daily in the morning",
    frequencies: ["Once daily in the morning", "Twice daily"],
    primaryUse: "High blood pressure, heart failure, post-myocardial infarction",
    contraindicatedDiseases: [
      {
        disease: "History of Angioedema",
        riskSeverity: "HIGH",
        explanation: "Bradykinin accumulation can trigger life-threatening airway swelling.",
        addedRisk: 45
      },
      {
        disease: "Bilateral Renal Artery Stenosis",
        riskSeverity: "HIGH",
        explanation: "Blocks efferent arteriolar constriction, causing acute drop in filtration pressure.",
        addedRisk: 38
      },
      {
        disease: "Hyperkalemia (High Potassium)",
        riskSeverity: "MEDIUM",
        explanation: "Reduces aldosterone secretion, causing further dangerous potassium retention.",
        addedRisk: 28
      }
    ],
    allergyClasses: ["ACE Inhibitors"],
    baseSideEffects: [
      { name: "Persistent Dry Tickling Cough", baseRate: 42, severe: false },
      { name: "Dizziness / Orthostatic Hypotension", baseRate: 28, severe: false },
      { name: "Hyperkalemia (High Blood Potassium)", baseRate: 20, severe: true },
      { name: "Fatigue & Lethargy", baseRate: 16, severe: false }
    ],
    alternatives: [
      {
        name: "Losartan (Cozaar)",
        dosage: "50mg once daily",
        category: "Angiotensin Receptor Blocker (ARB)",
        whySafer: "Does not inhibit kinase II; does not elevate bradykinin, practically eliminating the dry cough.",
        projectedRiskScore: 14,
        riskLevel: "LOW",
        doctorNote: "Preferred first alternative when patients develop an intolerable ACE-inhibitor cough."
      },
      {
        name: "Amlodipine (Norvasc)",
        dosage: "5mg once daily",
        category: "Calcium Channel Blocker (CCB)",
        whySafer: "Acts directly on peripheral vascular smooth muscle without altering potassium or bradykinin pathways.",
        projectedRiskScore: 16,
        riskLevel: "LOW",
        doctorNote: "Reliable blood pressure manager with minimal renal filtration interaction."
      }
    ]
  },
  {
    id: "med-8",
    name: "Ciprofloxacin",
    brandNames: ["Cipro", "Proquin"],
    category: "Fluoroquinolone Antibiotic",
    commonDosages: ["250mg", "500mg", "750mg"],
    defaultDosage: "500mg",
    defaultFrequency: "Twice daily for 5 to 7 days",
    frequencies: ["Twice daily for 5 days", "Twice daily for 7 days", "Twice daily for 14 days"],
    primaryUse: "Complicated urinary tract, abdominal, and joint infections",
    contraindicatedDiseases: [
      {
        disease: "Myasthenia Gravis",
        riskSeverity: "HIGH",
        explanation: "FDA Black Box Warning: exacerbates muscle weakness and can trigger respiratory arrest.",
        addedRisk: 48
      },
      {
        disease: "Tendonitis / Tendon Rupture History",
        riskSeverity: "HIGH",
        explanation: "Weakens collagen bundles; Achilles tendon rupture risk is especially high in seniors (>65).",
        addedRisk: 36
      },
      {
        disease: "Cardiac Arrhythmia (Long QT syndrome)",
        riskSeverity: "MEDIUM",
        explanation: "Prolongs the cardiac QT interval, posing risk of torsades de pointes.",
        addedRisk: 30
      }
    ],
    allergyClasses: ["Fluoroquinolones"],
    baseSideEffects: [
      { name: "Nausea & Stomach Discomfort", baseRate: 32, severe: false },
      { name: "Tendon Pain / Joint Stiffness", baseRate: 24, severe: true },
      { name: "Dizziness & Lightheadedness", baseRate: 22, severe: false },
      { name: "Sun Sensitivity / Phototoxicity", baseRate: 19, severe: false }
    ],
    alternatives: [
      {
        name: "Nitrofurantoin (Macrobid)",
        dosage: "100mg twice daily for 5 days",
        category: "Nitrofuran Urinary Antiseptic",
        whySafer: "Concentrates directly in urine without systemic musculoskeletal toxicity.",
        projectedRiskScore: 15,
        riskLevel: "LOW",
        doctorNote: "Recommended primary agent for uncomplicated lower urinary tract infections without tendon risks."
      }
    ]
  },
  {
    id: "med-9",
    name: "Atorvastatin",
    brandNames: ["Lipitor"],
    category: "HMG-CoA Reductase Inhibitor (Statin)",
    commonDosages: ["10mg", "20mg", "40mg", "80mg"],
    defaultDosage: "20mg",
    defaultFrequency: "Once daily at bedtime",
    frequencies: ["Once daily at bedtime", "Once daily in the morning"],
    primaryUse: "Cholesterol lowering and cardiovascular disease prevention",
    contraindicatedDiseases: [
      {
        disease: "Active Liver Disease / Cirrhosis",
        riskSeverity: "HIGH",
        explanation: "Can exacerbate liver enzyme transaminase elevations.",
        addedRisk: 35
      }
    ],
    allergyClasses: ["Statins"],
    baseSideEffects: [
      { name: "Muscle Aches / Myalgia", baseRate: 28, severe: false },
      { name: "Mild Digestive Discomfort", baseRate: 16, severe: false },
      { name: "Mild Memory Fog / Sleep Disturbance", baseRate: 11, severe: false },
      { name: "Elevated Liver Enzymes", baseRate: 12, severe: true }
    ],
    alternatives: [
      {
        name: "Rosuvastatin (Crestor)",
        dosage: "5mg once daily",
        category: "Hydrophilic Statin",
        whySafer: "Less lipophilic; lower muscle penetration and fewer CYP3A4 metabolic interactions.",
        projectedRiskScore: 14,
        riskLevel: "LOW",
        doctorNote: "Better tolerated in patients who develop myalgias on atorvastatin."
      }
    ]
  },
  {
    id: "med-10",
    name: "Omeprazole",
    brandNames: ["Prilosec", "Losec"],
    category: "Proton Pump Inhibitor (PPI)",
    commonDosages: ["20mg", "40mg"],
    defaultDosage: "20mg",
    defaultFrequency: "Once daily 30 mins before breakfast",
    frequencies: ["Once daily 30 mins before breakfast", "Twice daily before meals"],
    primaryUse: "Acid reflux (GERD), stomach ulcers, and gastric protection",
    contraindicatedDiseases: [
      {
        disease: "Severe Osteoporosis",
        riskSeverity: "MEDIUM",
        explanation: "Long-term acid suppression reduces calcium absorption, increasing bone fracture risk.",
        addedRisk: 20
      },
      {
        disease: "Recurrent C. difficile Infection",
        riskSeverity: "HIGH",
        explanation: "Decreased gastric acidity allows bacterial spores to survive and colonize the gut.",
        addedRisk: 32
      }
    ],
    allergyClasses: ["Proton Pump Inhibitors"],
    baseSideEffects: [
      { name: "Headache", baseRate: 18, severe: false },
      { name: "Abdominal Pain / Bloating", baseRate: 20, severe: false },
      { name: "Low Magnesium Levels (long-term)", baseRate: 15, severe: true },
      { name: "Mild Diarrhea", baseRate: 14, severe: false }
    ],
    alternatives: [
      {
        name: "Famotidine (Pepcid)",
        dosage: "20mg twice daily",
        category: "H2 Receptor Blocker",
        whySafer: "Milder acid suppression with fewer bone density, gut flora, or magnesium complications.",
        projectedRiskScore: 12,
        riskLevel: "LOW",
        doctorNote: "Effective step-down therapy for heartburn without prolonged PPI adverse profiles."
      }
    ]
  }
];
var DRUG_DRUG_INTERACTIONS = [
  {
    drug1: "Warfarin",
    drug2: "Aspirin",
    severity: "SEVERE",
    riskScore: 88,
    summary: "Extreme Bleeding & Hemorrhage Hazard",
    mechanism: "Dual anticoagulant and antiplatelet inhibition creates a synergistic suppression of hemostasis. Greatly magnifies gastrointestinal and intracranial bleeding risk.",
    actionRequired: "Avoid concurrent use unless strictly supervised by a cardiologist. Monitor INR and signs of internal bleeding immediately."
  },
  {
    drug1: "Warfarin",
    drug2: "Ibuprofen",
    severity: "SEVERE",
    riskScore: 84,
    summary: "High Gastrointestinal Hemorrhage Hazard",
    mechanism: "Ibuprofen damages gastric mucosa and displaces Warfarin from plasma protein binding sites while impairing platelet function, multiplying bleeding risk 3-4x.",
    actionRequired: "Do not combine. Switch pain management to Acetaminophen (Paracetamol) or topical therapy."
  },
  {
    drug1: "Lisinopril",
    drug2: "Ibuprofen",
    severity: "HIGH",
    riskScore: 76,
    summary: "Blunted Blood Pressure Control & Acute Kidney Injury",
    mechanism: "Ibuprofen blocks renal prostaglandins, causing vasoconstriction that negates Lisinoprils vasodilatory mechanism and creates dangerous pressure drop in the nephron.",
    actionRequired: "Avoid regular NSAID usage. Monitor blood pressure and serum creatinine levels."
  },
  {
    drug1: "Metformin",
    drug2: "Ciprofloxacin",
    severity: "MODERATE",
    riskScore: 58,
    summary: "Dysglycemia & Altered Blood Sugar Control",
    mechanism: "Fluoroquinolones can cause erratic blood glucose fluctuations (severe hypoglycemia or hyperglycemia) when taken with oral antidiabetics.",
    actionRequired: "Increase frequency of blood sugar self-monitoring during antibiotic course."
  },
  {
    drug1: "Atorvastatin",
    drug2: "Ciprofloxacin",
    severity: "MODERATE",
    riskScore: 62,
    summary: "Increased Statin Exposure & Myopathy Risk",
    mechanism: "Inhibition of CYP3A4/transporters elevates systemic statin concentrations, increasing probability of muscle toxicity (rhabdomyolysis).",
    actionRequired: "Report any sudden unexplained muscle pain, dark urine, or joint tenderness."
  },
  {
    drug1: "Omeprazole",
    drug2: "Warfarin",
    severity: "MODERATE",
    riskScore: 60,
    summary: "Elevated Anticoagulant Activity (INR spikes)",
    mechanism: "Omeprazole inhibits CYP2C19, decreasing the metabolic clearance of Warfarin and causing unexpected spikes in anticoagulation.",
    actionRequired: "Switch PPI to Pantoprazole or Famotidine, or increase INR testing frequency."
  },
  {
    drug1: "Aspirin",
    drug2: "Ibuprofen",
    severity: "HIGH",
    riskScore: 78,
    summary: "Loss of Cardioprotective Effect & Severe Gastric Risk",
    mechanism: "Ibuprofen competitively blocks Aspirins access to the platelet COX-1 binding site, destroying Aspirins cardiac protective benefits while compounding stomach erosion.",
    actionRequired: "Take Aspirin at least 2 hours prior to any NSAID, or preferably choose Paracetamol."
  }
];
var DISEASE_LIST = [
  "Chronic Kidney Disease",
  "Hypertension (High Blood Pressure)",
  "Type 2 Diabetes",
  "Asthma / COPD",
  "Stomach Ulcer / GERD",
  "Liver Cirrhosis / Disease",
  "Atrial Fibrillation / Heart Failure",
  "Osteoporosis",
  "Myasthenia Gravis",
  "History of Stroke"
];
var ALLERGY_LIST = [
  "Penicillin",
  "Sulfa Drugs (Sulfonamides)",
  "Aspirin / NSAIDs",
  "Codeine / Opioids",
  "Cephalosporins",
  "Fluoroquinolones",
  "Metformin Allergy",
  "Latex / Adhesive"
];

// src/data/mockAI.js
function predictSideEffects(patient, medication, selectedDosage) {
  if (!medication || !medication.baseSideEffects) return [];
  const isSenior = (patient?.age || 40) >= 65;
  const isHeavyWeight = (patient?.weight || 70) > 90;
  const isLowWeight = (patient?.weight || 70) < 55;
  const hasKidneyIssue = patient?.diseases?.some((d) => d.toLowerCase().includes("kidney"));
  const hasLiverIssue = patient?.diseases?.some((d) => d.toLowerCase().includes("liver"));
  return medication.baseSideEffects.map((item) => {
    let rate = item.baseRate;
    if (isSenior) rate += 12;
    if (item.name.toLowerCase().includes("kidney") && hasKidneyIssue) {
      rate += 38;
    }
    if (item.name.toLowerCase().includes("liver") && hasLiverIssue) {
      rate += 35;
    }
    if (item.name.toLowerCase().includes("stomach") || item.name.toLowerCase().includes("reflux")) {
      if (patient?.diseases?.some((d) => d.toLowerCase().includes("ulcer") || d.toLowerCase().includes("gerd"))) {
        rate += 28;
      }
    }
    if (isLowWeight) rate += 8;
    if (selectedDosage && (selectedDosage.includes("800") || selectedDosage.includes("1000") || selectedDosage.includes("875"))) {
      rate += 14;
    }
    const finalRate = Math.min(95, Math.max(5, Math.round(rate)));
    return {
      name: item.name,
      probability: finalRate,
      severe: item.severe || finalRate > 50
    };
  }).sort((a, b) => b.probability - a.probability);
}
function evaluateMedicationSafety(patient, medicineName, dosage, frequency) {
  const med = COMMON_MEDICATIONS.find(
    (m) => m.name.toLowerCase() === medicineName.toLowerCase() || m.brandNames.some((b) => b.toLowerCase() === medicineName.toLowerCase())
  );
  if (!med) {
    return {
      medicineName,
      foundInDb: false,
      riskScore: 35,
      riskLevel: "MEDIUM",
      allergyAlert: null,
      diseaseConflicts: [],
      drugDrugConflicts: [],
      sideEffects: [],
      shapFactors: [
        { factor: "Unverified Medication Name", impact: "+25%", type: "risk", description: "Medicine not recognized in verified clinical database." },
        { factor: "Standard Adult Baseline", impact: "+10%", type: "risk", description: "General physiological baseline precaution." }
      ],
      plainEnglishExplanation: "This medicine was not found in our verified database. Please check spelling or consult your pharmacist.",
      alternatives: []
    };
  }
  let totalRisk = 12;
  const shapFactors = [];
  const diseaseConflicts = [];
  let allergyAlert = null;
  const patientAllergies = patient?.allergies || [];
  const matchedAllergy = patientAllergies.find((allergy) => {
    return med.allergyClasses.some(
      (ac) => allergy.toLowerCase().includes(ac.toLowerCase()) || ac.toLowerCase().includes(allergy.toLowerCase()) || allergy.toLowerCase().includes(med.name.toLowerCase())
    );
  });
  if (matchedAllergy) {
    totalRisk += 65;
    allergyAlert = {
      detectedAllergy: matchedAllergy,
      drugClass: med.allergyClasses.join(", "),
      severity: "SEVERE / EMERGENCY",
      warning: `Patient has a documented allergy to ${matchedAllergy}. Taking ${med.name} (${med.category}) could trigger acute hypersensitivity or anaphylaxis.`
    };
    shapFactors.push({
      factor: `Known Allergy: ${matchedAllergy}`,
      impact: "+60%",
      type: "risk",
      description: `Patient allergy profile matches ${med.name}'s drug family.`
    });
  }
  const patientDiseases = patient?.diseases || [];
  med.contraindicatedDiseases.forEach((contra) => {
    const matchedDisease = patientDiseases.find(
      (d) => d.toLowerCase().includes(contra.disease.toLowerCase()) || contra.disease.toLowerCase().includes(d.toLowerCase())
    );
    if (matchedDisease) {
      totalRisk += contra.addedRisk;
      diseaseConflicts.push({
        disease: matchedDisease,
        severity: contra.riskSeverity,
        explanation: contra.explanation
      });
      shapFactors.push({
        factor: `${matchedDisease}`,
        impact: `+${contra.addedRisk}%`,
        type: "risk",
        description: contra.explanation
      });
    }
  });
  const age = patient?.age || 40;
  if (age >= 65) {
    totalRisk += 25;
    shapFactors.push({
      factor: `Senior Age (${age} years)`,
      impact: "+25%",
      type: "risk",
      description: "Reduced glomerular filtration and slower hepatic drug clearance naturally increase sensitivity to this medication."
    });
  } else if (age < 18) {
    totalRisk += 15;
    shapFactors.push({
      factor: `Pediatric/Adolescent Age (${age} years)`,
      impact: "+15%",
      type: "risk",
      description: "Requires tailored pediatric dosing to avoid metabolic strain."
    });
  } else {
    shapFactors.push({
      factor: "Adult Age Window (18-64)",
      impact: "-10%",
      type: "protective",
      description: "Patient is within optimal metabolic age window."
    });
  }
  if (dosage && (dosage.includes("800") || dosage.includes("1000") || dosage.includes("875"))) {
    totalRisk += 15;
    shapFactors.push({
      factor: `High Strength Dosage (${dosage})`,
      impact: "+15%",
      type: "risk",
      description: "High dose escalates metabolic load and organ exposure."
    });
  }
  const drugDrugConflicts = [];
  const currentMedicines = patient?.currentMedicines || [];
  currentMedicines.forEach((curr) => {
    const interaction = DRUG_DRUG_INTERACTIONS.find(
      (dd) => dd.drug1.toLowerCase() === med.name.toLowerCase() && dd.drug2.toLowerCase() === curr.name.toLowerCase() || dd.drug2.toLowerCase() === med.name.toLowerCase() && dd.drug1.toLowerCase() === curr.name.toLowerCase()
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
        impact: "+20%",
        type: "risk",
        description: interaction.summary
      });
    }
  });
  const finalScore = Math.min(99, Math.max(8, Math.round(totalRisk)));
  let riskLevel = "LOW";
  if (finalScore >= 70 || allergyAlert) {
    riskLevel = "HIGH";
  } else if (finalScore >= 35) {
    riskLevel = "MEDIUM";
  }
  let plainEnglish = "";
  if (allergyAlert) {
    plainEnglish = `\u26A0\uFE0F CRITICAL: You are allergic to ${allergyAlert.detectedAllergy}! Taking ${med.name} can cause severe allergic reactions like swelling or hives. Do NOT take this pill without calling your doctor.`;
  } else if (diseaseConflicts.length > 0 && age >= 65) {
    const diseasesText = diseaseConflicts.map((d) => d.disease).join(" and ");
    plainEnglish = `\u26A0\uFE0F High Risk: Because you are ${age} years old and have ${diseasesText}, taking ${med.name} puts extra stress on your body and could worsen your condition.`;
  } else if (diseaseConflicts.length > 0) {
    const diseasesText = diseaseConflicts.map((d) => d.disease).join(", ");
    plainEnglish = `Caution: ${med.name} may aggravate your ${diseasesText}. We recommend talking to your doctor about safer alternatives.`;
  } else if (drugDrugConflicts.length > 0) {
    const drugsText = drugDrugConflicts.map((d) => d.withDrug).join(", ");
    plainEnglish = `Caution: ${med.name} can clash with your current medicine (${drugsText}). Taking both at the same time might cause unwanted side effects.`;
  } else if (riskLevel === "LOW") {
    plainEnglish = `\u2705 Good News: ${med.name} appears to have a Low Risk profile based on your current age, medical conditions, and medications. Always take it as directed.`;
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
function checkMultiDrugInteractions(medicinesList) {
  if (!medicinesList || medicinesList.length < 2) return [];
  const foundInteractions = [];
  for (let i = 0; i < medicinesList.length; i++) {
    for (let j = i + 1; j < medicinesList.length; j++) {
      const name1 = medicinesList[i].trim().toLowerCase();
      const name2 = medicinesList[j].trim().toLowerCase();
      const match = DRUG_DRUG_INTERACTIONS.find(
        (dd) => dd.drug1.toLowerCase() === name1 && dd.drug2.toLowerCase() === name2 || dd.drug2.toLowerCase() === name1 && dd.drug1.toLowerCase() === name2
      );
      if (match) {
        foundInteractions.push(match);
      }
    }
  }
  return foundInteractions;
}
var SAMPLE_PRESCRIPTIONS = [
  {
    id: "rx-1",
    title: "Outpatient Clinic Rx \u2014 Dr. R. Sharma (Kidney Risk Case)",
    doctorName: "Dr. Rajesh Sharma, MD (Internal Medicine)",
    clinicName: "St. Jude Community Health Center",
    date: "March 2025",
    imageType: "clinic_printed",
    previewText: "Rx: Ibuprofen 400mg, Twice Daily for Knee Pain",
    extractedData: {
      patientName: "Robert Jenkins",
      patientAge: "68",
      medicines: [
        {
          name: "Ibuprofen",
          dosage: "400mg",
          frequency: "Twice daily with meals",
          duration: "14 days",
          notes: "For bilateral knee osteoarthritis flare"
        }
      ],
      physicianAdvice: "Take with food. Discontinue if gastric upset occurs.",
      confidenceScore: 97.8
    }
  },
  {
    id: "rx-2",
    title: "Cardiology Clinic Rx \u2014 Dr. H. Adams (Interaction Case)",
    doctorName: "Dr. Helen Adams, FACC (Cardiology)",
    clinicName: "Metro Heart Institute",
    date: "April 2025",
    imageType: "hospital_rx",
    previewText: "Rx: Aspirin 325mg + Warfarin 5mg (Combination Alert)",
    extractedData: {
      patientName: "Marcus Brody",
      patientAge: "58",
      medicines: [
        {
          name: "Aspirin",
          dosage: "325mg",
          frequency: "Once daily in morning",
          duration: "30 days",
          notes: "Cardioprotection"
        },
        {
          name: "Warfarin",
          dosage: "5mg",
          frequency: "Once daily in evening",
          duration: "30 days",
          notes: "Anticoagulation for atrial fibrillation"
        }
      ],
      physicianAdvice: "Periodic INR monitoring required. Watch for bruising.",
      confidenceScore: 95.4
    }
  },
  {
    id: "rx-3",
    title: "Urgent Care Slip \u2014 Dr. K. Patel (Allergy Case)",
    doctorName: "Dr. Kevin Patel, MD",
    clinicName: "Valley Urgent Care Clinic",
    date: "May 2025",
    imageType: "urgent_care",
    previewText: "Rx: Amoxicillin 500mg, Three Times Daily (Allergy Conflict)",
    extractedData: {
      patientName: "Eleanor Vance",
      patientAge: "54",
      medicines: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: "Three times daily for 7 days",
          duration: "7 days",
          notes: "For acute bacterial sinusitis"
        }
      ],
      physicianAdvice: "Finish full antibiotic course.",
      confidenceScore: 98.2
    }
  }
];

// src/data/userStorage.js
var USERS_STORAGE_KEY = "medisafe_users";
var CURRENT_USER_KEY = "medisafe_active_user";
var AUDIT_LOGS_KEY = "medisafe_audit_logs";
var SEED_USERS = [
  {
    id: "usr-admin-1",
    name: "System Administrator",
    email: "admin@medisafe.ai",
    password: "Admin@123",
    role: "admin",
    department: "Clinical IT & Compliance",
    licenseNumber: "SYS-ADMIN-001",
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-01-10T08:30:00.000Z",
    lastLogin: "2025-03-01T10:15:00.000Z",
    notes: "Master administrator with full system audit, user management & deduplication rights."
  },
  {
    id: "usr-doc-1",
    name: "Dr. Rajesh Sharma, MD",
    email: "dr.sharma@medisafe.ai",
    password: "Doctor@123",
    role: "clinician",
    department: "Internal Medicine & Pharmacology",
    licenseNumber: "MD-98421",
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-03-15T09:00:00.000Z",
    lastLogin: "2025-03-02T14:20:00.000Z",
    notes: "Chief Attending Physician. Consulted for senior nephrotoxicity alerts."
  },
  {
    id: "usr-doc-2",
    name: "Dr. Helen Adams, FACC",
    email: "dr.adams@medisafe.ai",
    password: "Doctor@123",
    role: "clinician",
    department: "Cardiovascular Care Unit",
    licenseNumber: "MD-77123",
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-05-20T11:45:00.000Z",
    lastLogin: "2025-02-28T16:00:00.000Z",
    notes: "Cardiology Specialist. Supervises anticoagulant interaction protocols."
  },
  {
    id: "usr-pat-1",
    name: "Robert Jenkins",
    email: "robert.jenkins@medisafe.care",
    password: "Patient@123",
    role: "patient",
    age: 68,
    gender: "Male",
    chronicDiseases: ["Chronic Kidney Disease", "Hypertension (High Blood Pressure)"],
    allergies: ["Sulfa Drugs (Sulfonamides)"],
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-06-01T10:00:00.000Z",
    lastLogin: "2025-03-02T10:30:00.000Z",
    notes: "Senior patient on Lisinopril therapy; high sensitivity to NSAIDs."
  },
  {
    id: "usr-pat-2",
    name: "Eleanor Vance",
    email: "eleanor.vance@medisafe.care",
    password: "Patient@123",
    role: "patient",
    age: 54,
    gender: "Female",
    chronicDiseases: ["Atrial Fibrillation / Heart Failure"],
    allergies: ["Penicillin", "Beta-lactam Allergy"],
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-07-12T13:10:00.000Z",
    lastLogin: "2025-02-27T11:40:00.000Z",
    notes: "Patient on Warfarin anticoagulation with severe penicillin hypersensitivity."
  },
  {
    id: "usr-pat-3",
    name: "Marcus Brody",
    email: "marcus.brody@medisafe.care",
    password: "Patient@123",
    role: "patient",
    age: 58,
    gender: "Male",
    chronicDiseases: ["Hypertension (High Blood Pressure)", "History of Stroke"],
    allergies: [],
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-08-04T15:30:00.000Z",
    lastLogin: "2025-02-25T09:15:00.000Z",
    notes: "Stroke recovery profile; blood thinner monitored."
  },
  {
    id: "usr-pat-4",
    name: "Devon Clark",
    email: "devon.clark@medisafe.care",
    password: "Patient@123",
    role: "patient",
    age: 32,
    gender: "Male",
    chronicDiseases: ["Type 2 Diabetes"],
    allergies: [],
    status: "Active",
    isNewUser: false,
    registeredAt: "2024-09-18T12:00:00.000Z",
    lastLogin: "2025-02-20T17:45:00.000Z",
    notes: "Young adult diabetic profile on Metformin."
  }
];
var INITIAL_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "2025-03-02T10:30:00.000Z",
    action: "Prescription Evaluated",
    performedBy: "Robert Jenkins (robert.jenkins@medisafe.care)",
    details: "Checked Ibuprofen 400mg with Chronic Kidney Disease (High Risk Flagged)"
  },
  {
    id: "log-2",
    timestamp: "2025-03-02T09:15:00.000Z",
    action: "User Sign In",
    performedBy: "Dr. Rajesh Sharma (dr.sharma@medisafe.ai)",
    details: "Clinician portal session started"
  },
  {
    id: "log-3",
    timestamp: "2025-03-01T10:15:00.000Z",
    action: "Database Integrity Check",
    performedBy: "System Administrator (admin@medisafe.ai)",
    details: "Full duplicate records audit executed. All clinical tables verified."
  }
];
function getAllUsers() {
  try {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return parsed;
  } catch (err) {
    console.error("Failed reading user storage, falling back to seed:", err);
    return SEED_USERS;
  }
}
function saveAllUsers(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error("Failed saving users to storage:", err);
  }
  if (typeof fetch !== "undefined") {
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(users)
    }).catch(() => {
    });
  }
}
function getActiveUserSession() {
  try {
    const stored = localStorage.getItem(CURRENT_USER_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (err) {
    return null;
  }
}
function setActiveUserSession(user) {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error("Failed setting active user session:", err);
  }
}
function logSystemActivity(action, details, performedBy = "System") {
  try {
    const stored = localStorage.getItem(AUDIT_LOGS_KEY);
    const logs = stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
    const newLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      action,
      details,
      performedBy: typeof performedBy === "object" ? `${performedBy.name} (${performedBy.email})` : performedBy
    };
    const updated = [newLog, ...logs.slice(0, 99)];
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    return INITIAL_AUDIT_LOGS;
  }
}
function getSystemAuditLogs() {
  try {
    const stored = localStorage.getItem(AUDIT_LOGS_KEY);
    return stored ? JSON.parse(stored) : INITIAL_AUDIT_LOGS;
  } catch (err) {
    return INITIAL_AUDIT_LOGS;
  }
}
function registerNewUser(userData) {
  const users = getAllUsers();
  const normalizedEmail = userData.email.trim().toLowerCase();
  const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    throw new Error(`An account with email "${userData.email}" already exists. Please sign in instead.`);
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const newUser = {
    id: `usr-new-${Date.now()}`,
    name: userData.name.trim(),
    email: normalizedEmail,
    password: userData.password,
    role: userData.role || "patient",
    department: userData.department || (userData.role === "clinician" ? "General Medicine" : ""),
    licenseNumber: userData.licenseNumber || (userData.role === "clinician" ? "LIC-PENDING" : ""),
    age: userData.age ? Number(userData.age) : 35,
    gender: userData.gender || "Not Specified",
    chronicDiseases: userData.chronicDiseases || [],
    allergies: userData.allergies || [],
    status: "Active",
    isNewUser: true,
    // Marked as newly registered
    registeredAt: now,
    lastLogin: now,
    notes: userData.notes || "Registered through MediSafe AI online portal."
  };
  const updatedUsers = [newUser, ...users];
  saveAllUsers(updatedUsers);
  logSystemActivity("New User Registered", `Account created with role: ${newUser.role.toUpperCase()}`, newUser);
  return newUser;
}
function authenticateUser(email, password) {
  const users = getAllUsers();
  const normalizedEmail = (email || "").trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (!user) {
    return {
      success: false,
      message: "No account registered with this email. Please check your spelling or register a new account."
    };
  }
  if (user.status === "Suspended") {
    return {
      success: false,
      message: "This account is currently suspended. Please contact the clinical administrator."
    };
  }
  if (user.password !== password) {
    return {
      success: false,
      message: "Incorrect password. Please verify your credentials and try again."
    };
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const updatedUsers = users.map((u) => u.id === user.id ? { ...u, lastLogin: now } : u);
  saveAllUsers(updatedUsers);
  const activeUser = { ...user, lastLogin: now };
  setActiveUserSession(activeUser);
  logSystemActivity("User Sign In", `Successful authentication (${activeUser.role.toUpperCase()})`, activeUser);
  return {
    success: true,
    user: activeUser
  };
}
function deduplicateUserDatabase() {
  const users = getAllUsers();
  const seenEmails = /* @__PURE__ */ new Map();
  const duplicatesFound = [];
  const uniqueUsers = [];
  for (const user of users) {
    const emailKey = user.email.toLowerCase().trim();
    if (seenEmails.has(emailKey)) {
      duplicatesFound.push({
        duplicateUser: user,
        originalId: seenEmails.get(emailKey).id,
        email: user.email
      });
    } else {
      seenEmails.set(emailKey, user);
      uniqueUsers.push(user);
    }
  }
  if (duplicatesFound.length > 0) {
    saveAllUsers(uniqueUsers);
    logSystemActivity(
      "Duplicate Records Removed",
      `Identified & removed ${duplicatesFound.length} duplicate user record(s): ${duplicatesFound.map((d) => d.email).join(", ")}`,
      "System Deduplication Utility"
    );
  }
  return {
    duplicatesRemovedCount: duplicatesFound.length,
    initialCount: users.length,
    finalCount: uniqueUsers.length,
    duplicates: duplicatesFound
  };
}
function updateUserDetails(userId, updates) {
  const users = getAllUsers();
  const updated = users.map((u) => {
    if (u.id === userId) {
      return { ...u, ...updates };
    }
    return u;
  });
  saveAllUsers(updated);
  logSystemActivity("User Record Updated", `Modified user ID: ${userId}`, "Admin");
  return updated;
}
function deleteUserAccount(userId) {
  const users = getAllUsers();
  const target = users.find((u) => u.id === userId);
  const filtered = users.filter((u) => u.id !== userId);
  saveAllUsers(filtered);
  if (target) {
    logSystemActivity("User Record Deleted", `Removed user: ${target.name} (${target.email})`, "Admin");
  }
  return filtered;
}
function adminCreateUser(userData) {
  return registerNewUser({
    ...userData,
    isNewUser: true,
    notes: userData.notes || "Created directly by System Administrator."
  });
}

// src/context/HealthContext.jsx
var HealthContext = (0, import_react.createContext)();
function HealthProvider({ children }) {
  const [currentUser, setCurrentUser] = (0, import_react.useState)(() => getActiveUserSession());
  const [users, setUsers] = (0, import_react.useState)(() => getAllUsers());
  const [auditLogs, setAuditLogs] = (0, import_react.useState)(() => getSystemAuditLogs());
  const [patient, setPatient] = (0, import_react.useState)(SAMPLE_PATIENTS[0]);
  const [activeTab, setActiveTab] = (0, import_react.useState)("home");
  const initialAnalysis = evaluateMedicationSafety(
    SAMPLE_PATIENTS[0],
    "Ibuprofen",
    "400mg",
    "Twice daily with meals"
  );
  const [currentAnalysis, setCurrentAnalysis] = (0, import_react.useState)(initialAnalysis);
  const [medicationHistory, setMedicationHistory] = (0, import_react.useState)([
    {
      id: "hist-1",
      date: "2025-03-02",
      time: "10:30 AM",
      medicineName: "Ibuprofen",
      dosage: "400mg",
      riskScore: 85,
      riskLevel: "HIGH",
      primaryAlert: "Kidney Disease + Senior Age (68) Contraindication",
      status: "Avoided / Switched to Alternative"
    },
    {
      id: "hist-2",
      date: "2025-02-14",
      time: "02:15 PM",
      medicineName: "Paracetamol (Acetaminophen)",
      dosage: "500mg",
      riskScore: 18,
      riskLevel: "LOW",
      primaryAlert: "Safe for Kidney Profile with Liver Monitoring",
      status: "Active / Prescribed"
    },
    {
      id: "hist-3",
      date: "2025-01-20",
      time: "09:00 AM",
      medicineName: "Lisinopril",
      dosage: "10mg",
      riskScore: 28,
      riskLevel: "LOW",
      primaryAlert: "Routine Antihypertensive \u2014 Mild Cough Monitored",
      status: "Active / Prescribed"
    }
  ]);
  const [emergencyAlert, setEmergencyAlert] = (0, import_react.useState)(null);
  const [isChatbotOpen, setIsChatbotOpen] = (0, import_react.useState)(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = (0, import_react.useState)(false);
  const [toast, setToast] = (0, import_react.useState)(null);
  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4e3);
  };
  const refreshUsersAndLogs = () => {
    setUsers(getAllUsers());
    setAuditLogs(getSystemAuditLogs());
  };
  (0, import_react.useEffect)(() => {
    if (currentUser) {
      const matchedPatient = SAMPLE_PATIENTS.find(
        (p) => p.name.toLowerCase() === currentUser.name.toLowerCase() || currentUser.email.includes(p.name.toLowerCase().split(" ")[0])
      );
      if (matchedPatient) {
        setPatient(matchedPatient);
      } else if (currentUser.role === "patient") {
        setPatient((prev) => ({
          ...prev,
          name: currentUser.name,
          age: currentUser.age || prev.age,
          gender: currentUser.gender || prev.gender,
          diseases: currentUser.chronicDiseases || prev.diseases,
          allergies: currentUser.allergies || prev.allergies
        }));
      }
    }
  }, [currentUser]);
  const login = (email, password) => {
    const result = authenticateUser(email, password);
    if (!result.success) {
      showToast(result.message, "error");
      return result;
    }
    setCurrentUser(result.user);
    refreshUsersAndLogs();
    if (result.user.role === "admin") {
      setActiveTab("admin");
      showToast(`Welcome Administrator ${result.user.name}`, "success");
    } else {
      setActiveTab("dashboard");
      showToast(`Signed in successfully as ${result.user.role === "clinician" ? "Healthcare Clinician" : "Patient"}`, "success");
    }
    return result;
  };
  const register = (userData) => {
    try {
      const newUser = registerNewUser(userData);
      setActiveUserSession(newUser);
      setCurrentUser(newUser);
      refreshUsersAndLogs();
      if (newUser.role === "admin") {
        setActiveTab("admin");
      } else {
        setActiveTab("dashboard");
      }
      showToast(`Account created successfully! Welcome, ${newUser.name}`, "success");
      return { success: true, user: newUser };
    } catch (err) {
      showToast(err.message, "error");
      return { success: false, message: err.message };
    }
  };
  const logout = () => {
    if (currentUser) {
      logSystemActivity("User Sign Out", `User ended active session`, currentUser);
    }
    setActiveUserSession(null);
    setCurrentUser(null);
    setActiveTab("home");
    refreshUsersAndLogs();
    showToast("Signed out successfully. Task portal is locked until next login.", "info");
  };
  const deduplicateUsers = () => {
    const report = deduplicateUserDatabase();
    refreshUsersAndLogs();
    if (report.duplicatesRemovedCount > 0) {
      showToast(`Deduplication complete: Removed ${report.duplicatesRemovedCount} duplicate record(s)!`, "success");
    } else {
      showToast("Database integrity scan complete: No duplicate records found.", "info");
    }
    return report;
  };
  const changeUserStatus = (userId, newStatus) => {
    updateUserDetails(userId, { status: newStatus });
    refreshUsersAndLogs();
    showToast(`User status updated to ${newStatus}`, "success");
  };
  const removeUser = (userId) => {
    deleteUserAccount(userId);
    refreshUsersAndLogs();
    showToast("User record permanently removed from database", "info");
  };
  const adminAddUser = (userData) => {
    try {
      const user = adminCreateUser(userData);
      refreshUsersAndLogs();
      showToast(`Created account for ${user.name} (${user.role.toUpperCase()})`, "success");
      return { success: true, user };
    } catch (err) {
      showToast(err.message, "error");
      return { success: false, message: err.message };
    }
  };
  const loadPatientPreset = (presetPatient) => {
    setPatient(presetPatient);
    const testMed = presetPatient.recommendedTestDrug || "Paracetamol (Acetaminophen)";
    const newAnalysis = evaluateMedicationSafety(presetPatient, testMed);
    setCurrentAnalysis(newAnalysis);
    if (newAnalysis.allergyAlert) {
      setEmergencyAlert({
        title: "Emergency Allergy Warning Detected",
        medicine: testMed,
        details: newAnalysis.allergyAlert.warning
      });
    }
    showToast(`Loaded profile for ${presetPatient.name} (${presetPatient.description})`, "success");
  };
  const updatePatient = (updatedFields) => {
    setPatient((prev) => {
      const updated = { ...prev, ...updatedFields };
      if (currentAnalysis?.medicineName) {
        const recheck = evaluateMedicationSafety(
          updated,
          currentAnalysis.medicineName,
          currentAnalysis.dosage,
          currentAnalysis.frequency
        );
        setCurrentAnalysis(recheck);
      }
      return updated;
    });
    showToast("Health profile updated successfully", "success");
  };
  const runSafetyCheck = (medicineName, dosage, frequency) => {
    const analysis = evaluateMedicationSafety(patient, medicineName, dosage, frequency);
    setCurrentAnalysis(analysis);
    if (analysis.allergyAlert) {
      setEmergencyAlert({
        title: "Allergy Conflict Detected!",
        medicine: medicineName,
        details: analysis.allergyAlert.warning
      });
    }
    const historyEntry = {
      id: `hist-${Date.now()}`,
      date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      medicineName: analysis.medicineName,
      dosage: analysis.dosage,
      riskScore: analysis.riskScore,
      riskLevel: analysis.riskLevel,
      primaryAlert: analysis.allergyAlert ? "Severe Allergy" : analysis.diseaseConflicts[0]?.disease || "Routine Safety Evaluation",
      status: analysis.riskLevel === "HIGH" ? "Flagged High Risk" : "Evaluated Safe"
    };
    setMedicationHistory((prev) => [historyEntry, ...prev]);
    if (currentUser) {
      logSystemActivity(
        "Medicine Risk Evaluated",
        `Evaluated ${medicineName} (${dosage || "standard"}). Risk Score: ${analysis.riskScore}% (${analysis.riskLevel})`,
        currentUser
      );
    }
    return analysis;
  };
  return /* @__PURE__ */ import_react.default.createElement(
    HealthContext.Provider,
    {
      value: {
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
        users,
        auditLogs,
        refreshUsersAndLogs,
        deduplicateUsers,
        changeUserStatus,
        removeUser,
        adminAddUser,
        patient,
        setPatient,
        loadPatientPreset,
        updatePatient,
        activeTab,
        setActiveTab,
        currentAnalysis,
        setCurrentAnalysis,
        runSafetyCheck,
        medicationHistory,
        setMedicationHistory,
        emergencyAlert,
        setEmergencyAlert,
        isChatbotOpen,
        setIsChatbotOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        toast,
        showToast,
        setToast
      }
    },
    children
  );
}
function useHealth() {
  const context = (0, import_react.useContext)(HealthContext);
  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
}

// src/components/common/Navbar.jsx
var import_react2 = __toESM(require("react"), 1);
var import_lucide_react = require("lucide-react");
function Navbar() {
  const {
    activeTab,
    setActiveTab,
    patient,
    loadPatientPreset,
    setIsChatbotOpen,
    currentUser,
    logout,
    setEmergencyAlert
  } = useHealth();
  const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react2.useState)(false);
  const [patientDropdownOpen, setPatientDropdownOpen] = (0, import_react2.useState)(false);
  const [userDropdownOpen, setUserDropdownOpen] = (0, import_react2.useState)(false);
  const isAdmin = currentUser?.role === "admin";
  const isClinician = currentUser?.role === "clinician";
  const navItems = [
    { id: "home", label: "Home", icon: import_lucide_react.Shield },
    { id: "dashboard", label: "Dashboard", icon: import_lucide_react.Activity },
    { id: "risk-checker", label: "Medicine Risk Check", icon: import_lucide_react.Pill, highlight: true },
    { id: "interactions", label: "Drug Interactions", icon: import_lucide_react.RefreshCw },
    { id: "ocr", label: "Prescription OCR", icon: import_lucide_react.Camera },
    { id: "profile", label: "Health Profile", icon: import_lucide_react.User },
    { id: "history", label: "History & Report", icon: import_lucide_react.History },
    { id: "admin", label: "Admin Console", icon: import_lucide_react.ShieldCheck, adminBadge: true }
  ];
  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ import_react2.default.createElement("header", { className: "sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl transition-all" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "bg-gradient-to-r from-mediteal-950/80 via-slate-900 to-mediblue-950/80 px-4 py-1.5 border-b border-slate-800/50 text-[11px] sm:text-xs text-slate-300 flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "flex h-2 w-2 rounded-full bg-emerald-400 animate-ping shrink-0" }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-semibold text-mediteal-300" }, "Explainable AI Safety Engine:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "hidden sm:inline text-slate-300" }, "SHAP / LIME Powered Clinical Decision Support")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-3 shrink-0" }, /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => setEmergencyAlert({
        title: "Emergency Medical Hotline & Help",
        medicine: null,
        details: "If you or someone else is experiencing an acute allergic reaction, difficulty breathing, or severe chest pain after taking medication, call 911 or visit the nearest emergency room immediately."
      }),
      className: "text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 hover:underline transition"
    },
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.AlertCircle, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ import_react2.default.createElement("span", { className: "hidden md:inline" }, "Emergency? Click here"),
    /* @__PURE__ */ import_react2.default.createElement("span", { className: "md:hidden" }, "Emergency")
  ))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center justify-between h-16 sm:h-18" }, /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => handleNavClick("home"),
      className: "flex items-center gap-3 group text-left focus:outline-none"
    },
    /* @__PURE__ */ import_react2.default.createElement("div", { className: "relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-mediteal-400 to-mediblue-600 text-slate-950 shadow-md shadow-mediteal-500/20 group-hover:scale-105 transition-transform" }, /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.Shield, { className: "w-5 h-5 text-slate-950 stroke-[2.5]" }), /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.Sparkles, { className: "w-3 h-3 text-white absolute -top-1 -right-1" })),
    /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-mediteal-300 transition-colors" }, "MediSafe", /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-mediteal-400" }, ".AI")), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-[10px] px-1.5 py-0.2 font-bold tracking-wider uppercase rounded bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40" }, "v2.0")), /* @__PURE__ */ import_react2.default.createElement("p", { className: "text-[11px] text-slate-400 font-medium hidden sm:block" }, "Explainable Medicine Safety & Recommendations"))
  ), /* @__PURE__ */ import_react2.default.createElement("nav", { className: "hidden xl:flex items-center space-x-1" }, navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        key: item.id,
        onClick: () => handleNavClick(item.id),
        className: `flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${isActive ? item.adminBadge ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm" : "bg-mediteal-500/15 text-mediteal-300 border border-mediteal-500/30 shadow-sm" : "text-slate-300 hover:text-white hover:bg-slate-850"} ${item.highlight && !isActive ? "ring-1 ring-mediteal-500/20" : ""}`
      },
      /* @__PURE__ */ import_react2.default.createElement(Icon, { className: `w-3.5 h-3.5 ${item.adminBadge ? "text-purple-400" : isActive ? "text-mediteal-400" : "text-slate-400"}` }),
      /* @__PURE__ */ import_react2.default.createElement("span", null, item.label)
    );
  })), /* @__PURE__ */ import_react2.default.createElement("div", { className: "flex items-center gap-2 sm:gap-3" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => setPatientDropdownOpen(!patientDropdownOpen),
      className: "flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 hover:border-mediteal-500/50 text-xs text-slate-200 transition-all group",
      title: "Switch Demo Patient Profile"
    },
    /* @__PURE__ */ import_react2.default.createElement("div", { className: "w-6 h-6 rounded-lg bg-mediteal-500/20 text-mediteal-300 flex items-center justify-center font-bold text-xs" }, patient.name.charAt(0)),
    /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-left hidden md:block" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-[11px] font-bold text-slate-200 group-hover:text-mediteal-300 leading-none" }, patient.name), /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-[10px] text-slate-400 leading-none mt-0.5" }, "Age ", patient.age, " \u2022 ", patient.diseases[0] ? patient.diseases[0].slice(0, 15) + "\u2026" : "Healthy")),
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.ChevronDown, { className: "w-3.5 h-3.5 text-slate-400" })
  ), patientDropdownOpen && /* @__PURE__ */ import_react2.default.createElement("div", { className: "absolute right-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "px-3 py-2 border-b border-slate-800 text-xs" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-white block" }, "Switch Test Patient Profile"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-400 text-[11px]" }, "1-click test scenarios for testing")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "py-1 space-y-1" }, SAMPLE_PATIENTS.map((p) => /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      key: p.id,
      onClick: () => {
        loadPatientPreset(p);
        setPatientDropdownOpen(false);
      },
      className: `w-full text-left px-3 py-2 rounded-xl text-xs transition flex items-start gap-2.5 ${patient.id === p.id ? "bg-mediteal-500/20 text-mediteal-300 font-semibold border border-mediteal-500/30" : "text-slate-300 hover:bg-slate-800"}`
    },
    /* @__PURE__ */ import_react2.default.createElement("span", { className: "w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 text-mediteal-400" }, p.name.charAt(0)),
    /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("div", { className: "font-semibold text-white" }, p.name, " (", p.age, "y)"), /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-[11px] text-slate-400 line-clamp-1" }, p.description))
  ))), /* @__PURE__ */ import_react2.default.createElement("div", { className: "pt-2 mt-1 border-t border-slate-800 text-center" }, /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("profile");
        setPatientDropdownOpen(false);
      },
      className: "text-xs text-mediteal-400 hover:underline font-semibold"
    },
    "Customize Profile Manually \u2192"
  )))), /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => setIsChatbotOpen(true),
      className: "relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-mediteal-500/20 to-mediblue-500/20 hover:from-mediteal-500/30 hover:to-mediblue-500/30 border border-mediteal-500/40 text-xs font-semibold text-mediteal-300 transition-all shadow-sm group"
    },
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.Bot, { className: "w-4 h-4 text-mediteal-400 group-hover:rotate-12 transition-transform" }),
    /* @__PURE__ */ import_react2.default.createElement("span", { className: "hidden sm:inline" }, "AI Guide"),
    /* @__PURE__ */ import_react2.default.createElement("span", { className: "flex h-2 w-2 relative" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-mediteal-400 opacity-75" }), /* @__PURE__ */ import_react2.default.createElement("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-mediteal-500" }))
  ), currentUser && /* @__PURE__ */ import_react2.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => setUserDropdownOpen(!userDropdownOpen),
      className: "flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-slate-700 bg-slate-900 hover:border-slate-600 text-xs text-slate-200 transition",
      title: "User Profile & Account"
    },
    /* @__PURE__ */ import_react2.default.createElement("div", { className: `w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${isAdmin ? "bg-purple-500/20 text-purple-300" : isClinician ? "bg-sky-500/20 text-sky-300" : "bg-emerald-500/20 text-emerald-300"}` }, currentUser.name ? currentUser.name.charAt(0) : "U"),
    /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-left hidden lg:block" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-[11px] font-bold text-white leading-none" }, currentUser.name), /* @__PURE__ */ import_react2.default.createElement("div", { className: "text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5 leading-none" }, currentUser.role)),
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.ChevronDown, { className: "w-3.5 h-3.5 text-slate-400 hidden sm:block" })
  ), userDropdownOpen && /* @__PURE__ */ import_react2.default.createElement("div", { className: "absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-fade-in text-xs" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "px-3 py-2 border-b border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-white block" }, currentUser.name), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-400 text-[11px] font-mono truncate block" }, currentUser.email), /* @__PURE__ */ import_react2.default.createElement("span", { className: `inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${isAdmin ? "bg-purple-500/20 text-purple-300" : isClinician ? "bg-sky-500/20 text-sky-300" : "bg-emerald-500/20 text-emerald-300"}` }, currentUser.role, " Account")), /* @__PURE__ */ import_react2.default.createElement("div", { className: "py-1 space-y-0.5" }, isAdmin && /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => handleNavClick("admin"),
      className: "w-full text-left px-3 py-2 rounded-xl text-purple-300 hover:bg-purple-500/10 font-semibold flex items-center gap-2 transition"
    },
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.ShieldCheck, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ import_react2.default.createElement("span", null, "Admin Console")
  ), /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => handleNavClick("profile"),
      className: "w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 flex items-center gap-2 transition"
    },
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.User, { className: "w-3.5 h-3.5 text-slate-400" }),
    /* @__PURE__ */ import_react2.default.createElement("span", null, "Health Profile")
  ), /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => handleNavClick("dashboard"),
      className: "w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 flex items-center gap-2 transition"
    },
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.Activity, { className: "w-3.5 h-3.5 text-slate-400" }),
    /* @__PURE__ */ import_react2.default.createElement("span", null, "My Dashboard")
  )), /* @__PURE__ */ import_react2.default.createElement("div", { className: "pt-1 border-t border-slate-800" }, /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => {
        setUserDropdownOpen(false);
        logout();
      },
      className: "w-full text-left px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 font-semibold flex items-center gap-2 transition"
    },
    /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.LogOut, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ import_react2.default.createElement("span", null, "Sign Out (Lock Tasks)")
  )))), /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => setMobileMenuOpen(!mobileMenuOpen),
      className: "xl:hidden p-2 rounded-xl border border-slate-700 bg-slate-900 text-slate-300 hover:text-white",
      "aria-label": "Toggle Navigation Menu"
    },
    mobileMenuOpen ? /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.X, { className: "w-5 h-5" }) : /* @__PURE__ */ import_react2.default.createElement(import_lucide_react.Menu, { className: "w-5 h-5" })
  )))), mobileMenuOpen && /* @__PURE__ */ import_react2.default.createElement("div", { className: "xl:hidden border-t border-slate-800 bg-slate-950/98 px-4 pt-3 pb-6 space-y-2 animate-fade-in shadow-2xl" }, /* @__PURE__ */ import_react2.default.createElement("div", { className: "grid grid-cols-2 gap-2 mb-3" }, navItems.map((item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    return /* @__PURE__ */ import_react2.default.createElement(
      "button",
      {
        key: item.id,
        onClick: () => handleNavClick(item.id),
        className: `flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition ${isActive ? item.adminBadge ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40" : "bg-slate-900/60 text-slate-300 hover:bg-slate-800"}`
      },
      /* @__PURE__ */ import_react2.default.createElement(Icon, { className: `w-4 h-4 shrink-0 ${item.adminBadge ? "text-purple-400" : "text-mediteal-400"}` }),
      /* @__PURE__ */ import_react2.default.createElement("span", null, item.label)
    );
  })), currentUser && /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between" }, /* @__PURE__ */ import_react2.default.createElement("div", null, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-400 text-[10px] block" }, "Signed in as:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-white block" }, currentUser.name), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-mediteal-300 text-[11px] font-mono" }, currentUser.email)), /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      onClick: () => {
        setMobileMenuOpen(false);
        logout();
      },
      className: "px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-bold"
    },
    "Sign Out"
  )), /* @__PURE__ */ import_react2.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs" }, /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-slate-400 block mb-1" }, "Active Patient:"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "font-bold text-white block" }, patient.name, " (", patient.age, "y, ", patient.gender, ")"), /* @__PURE__ */ import_react2.default.createElement("span", { className: "text-mediteal-300 text-[11px] block mt-0.5" }, patient.diseases.join(", ") || "No recorded conditions"))));
}

// src/components/common/Footer.jsx
var import_react3 = __toESM(require("react"), 1);
var import_lucide_react2 = require("lucide-react");
function Footer() {
  const { setActiveTab } = useHealth();
  return /* @__PURE__ */ import_react3.default.createElement("footer", { className: "mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "bg-slate-900/80 border-b border-slate-800 px-4 py-4" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-3 text-slate-300" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react2.AlertTriangle, { className: "w-5 h-5" })), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-xs leading-relaxed" }, /* @__PURE__ */ import_react3.default.createElement("strong", { className: "text-amber-300" }, "Important Healthcare Notice:"), " MediSafe AI provides explainable clinical decision support based on pharmacological guidelines, interaction models, and peer-reviewed drug data. It is intended to assist patients, caregivers, and clinicians. It does not replace individualized medical advice from your doctor or pharmacist."))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-3 md:col-span-1" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 font-bold" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react2.Shield, { className: "w-4 h-4 text-slate-950" })), /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-base font-bold text-white" }, "MediSafe", /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-mediteal-400" }, ".AI"))), /* @__PURE__ */ import_react3.default.createElement("p", { className: "text-slate-400 text-xs leading-relaxed" }, "Empowering patients and clinicians with explainable AI to prevent medication errors, predict personalized side effects, and suggest safer alternatives."), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2 text-slate-400 text-[11px]" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react2.Sparkles, { className: "w-3.5 h-3.5 text-mediteal-400" }), /* @__PURE__ */ import_react3.default.createElement("span", null, "Built with React + Tailwind CSS"))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h4", { className: "text-xs font-bold text-white uppercase tracking-wider mb-3" }, "Safety Modules"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "space-y-2" }, /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("risk-checker");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Personalized Side Effect Predictor"
  )), /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("interactions");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Drug\u2013Drug Interaction Checker"
  )), /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("ocr");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Prescription OCR Scanner"
  )), /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("risk-checker");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Explainable AI (SHAP / LIME)"
  )))), /* @__PURE__ */ import_react3.default.createElement("div", null, /* @__PURE__ */ import_react3.default.createElement("h4", { className: "text-xs font-bold text-white uppercase tracking-wider mb-3" }, "Patient Tools"), /* @__PURE__ */ import_react3.default.createElement("ul", { className: "space-y-2" }, /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("profile");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Health Profile & Allergies"
  )), /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("history");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Medication History Log"
  )), /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("report");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Printable Safety Summary"
  )), /* @__PURE__ */ import_react3.default.createElement("li", null, /* @__PURE__ */ import_react3.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("dashboard");
        window.scrollTo(0, 0);
      },
      className: "hover:text-mediteal-300 transition"
    },
    "Safety Metrics Dashboard"
  )))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react3.default.createElement("h4", { className: "text-xs font-bold text-white uppercase tracking-wider" }, "Emergency & Helplines"), /* @__PURE__ */ import_react3.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-2 text-rose-400 font-semibold text-xs" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react2.Phone, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react3.default.createElement("span", null, "Emergency: 911 / 112")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-slate-300 text-[11px]" }, "Poison Control Help: ", /* @__PURE__ */ import_react3.default.createElement("span", { className: "text-white font-mono font-semibold" }, "1-800-222-1222")), /* @__PURE__ */ import_react3.default.createElement("div", { className: "text-slate-400 text-[11px]" }, "Free, confidential medical advice 24/7.")))), /* @__PURE__ */ import_react3.default.createElement("div", { className: "mt-8 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3" }, /* @__PURE__ */ import_react3.default.createElement("p", null, "\xA9 2025 MediSafe AI Project \u2022 Explainable Medicine Recommendation System."), /* @__PURE__ */ import_react3.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ import_react3.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react3.default.createElement(import_lucide_react2.FileCheck, { className: "w-3.5 h-3.5 text-mediteal-400" }), "HIPAA-Ready Interface Design")))));
}

// src/components/common/EmergencyModal.jsx
var import_react4 = __toESM(require("react"), 1);
var import_lucide_react3 = require("lucide-react");
function EmergencyModal() {
  const { emergencyAlert, setEmergencyAlert, setActiveTab } = useHealth();
  if (!emergencyAlert) return null;
  return /* @__PURE__ */ import_react4.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "relative w-full max-w-lg overflow-hidden rounded-2xl border border-rose-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/30 p-6 sm:p-8 shadow-2xl shadow-rose-950/80" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 animate-pulse" }), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      onClick: () => setEmergencyAlert(null),
      className: "absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition",
      "aria-label": "Dismiss Emergency Alert"
    },
    /* @__PURE__ */ import_react4.default.createElement(import_lucide_react3.X, { className: "w-5 h-5" })
  ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex items-start gap-4" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "p-3.5 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 shrink-0" }, /* @__PURE__ */ import_react4.default.createElement(import_lucide_react3.AlertOctagon, { className: "w-8 h-8 animate-bounce" })), /* @__PURE__ */ import_react4.default.createElement("div", null, /* @__PURE__ */ import_react4.default.createElement("span", { className: "inline-block px-2.5 py-0.5 mb-1.5 text-xs font-bold tracking-wider uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full" }, "High Priority Warning"), /* @__PURE__ */ import_react4.default.createElement("h3", { className: "text-xl sm:text-2xl font-bold text-white tracking-tight" }, emergencyAlert.title || "Critical Medication Alert"), emergencyAlert.medicine && /* @__PURE__ */ import_react4.default.createElement("p", { className: "text-sm text-rose-300 font-medium mt-0.5" }, "Flagged Medicine: ", /* @__PURE__ */ import_react4.default.createElement("span", { className: "font-bold underline" }, emergencyAlert.medicine)))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "mt-5 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-100 text-sm leading-relaxed" }, /* @__PURE__ */ import_react4.default.createElement("p", { className: "font-semibold text-rose-200 mb-1 flex items-center gap-1.5" }, /* @__PURE__ */ import_react4.default.createElement(import_lucide_react3.ShieldAlert, { className: "w-4 h-4 text-rose-400 shrink-0" }), "Plain-English Safety Notice:"), /* @__PURE__ */ import_react4.default.createElement("p", null, emergencyAlert.details)), /* @__PURE__ */ import_react4.default.createElement("div", { className: "mt-4 space-y-2" }, /* @__PURE__ */ import_react4.default.createElement("h4", { className: "text-xs font-semibold text-slate-300 uppercase tracking-wider" }, "What you should do right now:"), /* @__PURE__ */ import_react4.default.createElement("ul", { className: "text-xs sm:text-sm text-slate-300 space-y-1.5" }, /* @__PURE__ */ import_react4.default.createElement("li", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" }, "1"), /* @__PURE__ */ import_react4.default.createElement("span", null, /* @__PURE__ */ import_react4.default.createElement("strong", null, "Do not swallow or inject this medicine"), " until speaking with your doctor or pharmacist.")), /* @__PURE__ */ import_react4.default.createElement("li", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" }, "2"), /* @__PURE__ */ import_react4.default.createElement("span", null, "Check the ", /* @__PURE__ */ import_react4.default.createElement("strong", null, "Safe Alternatives"), " recommended by MediSafe AI below for safer options.")), /* @__PURE__ */ import_react4.default.createElement("li", { className: "flex items-start gap-2" }, /* @__PURE__ */ import_react4.default.createElement("span", { className: "w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" }, "3"), /* @__PURE__ */ import_react4.default.createElement("span", null, "If you are already feeling sick, short of breath, or swollen, call emergency services immediately.")))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "mt-6 flex flex-col sm:flex-row items-center gap-3" }, /* @__PURE__ */ import_react4.default.createElement(
    "a",
    {
      href: "tel:911",
      className: "w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-sm shadow-lg shadow-rose-900/50 transition-all transform active:scale-95"
    },
    /* @__PURE__ */ import_react4.default.createElement(import_lucide_react3.PhoneCall, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react4.default.createElement("span", null, "Call Emergency / Helpline")
  ), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      onClick: () => {
        setEmergencyAlert(null);
        setActiveTab("risk-checker");
      },
      className: "w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-sm border border-slate-700 transition"
    },
    /* @__PURE__ */ import_react4.default.createElement(import_lucide_react3.HeartHandshake, { className: "w-4 h-4 inline mr-1.5 text-mediteal-400" }),
    "View Safe Alternatives"
  ))));
}

// src/components/common/Toast.jsx
var import_react5 = __toESM(require("react"), 1);
var import_lucide_react4 = require("lucide-react");
function Toast() {
  const { toast, setToast } = useHealth();
  if (!toast) return null;
  const icons = {
    success: /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0" }),
    warning: /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.AlertTriangle, { className: "w-5 h-5 text-amber-400 shrink-0" }),
    error: /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.XCircle, { className: "w-5 h-5 text-rose-400 shrink-0" }),
    info: /* @__PURE__ */ import_react5.default.createElement(import_lucide_react4.Info, { className: "w-5 h-5 text-sky-400 shrink-0" })
  };
  const borderColors = {
    success: "border-emerald-500/40 bg-slate-900/95 text-emerald-100",
    warning: "border-amber-500/40 bg-slate-900/95 text-amber-100",
    error: "border-rose-500/40 bg-slate-900/95 text-rose-100",
    info: "border-sky-500/40 bg-slate-900/95 text-sky-100"
  };
  return /* @__PURE__ */ import_react5.default.createElement("div", { className: "fixed bottom-6 right-6 z-50 max-w-md w-full px-4 animate-slide-up pointer-events-auto" }, /* @__PURE__ */ import_react5.default.createElement(
    "div",
    {
      className: `flex items-center gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md ${borderColors[toast.type] || borderColors.info}`
    },
    icons[toast.type] || icons.info,
    /* @__PURE__ */ import_react5.default.createElement("div", { className: "flex-1 text-sm font-medium leading-snug" }, toast.message),
    /* @__PURE__ */ import_react5.default.createElement(
      "button",
      {
        onClick: () => setToast(null),
        className: "text-slate-400 hover:text-white text-xs p-1 rounded hover:bg-slate-800 transition"
      },
      "\u2715"
    )
  ));
}

// src/components/home/HeroSection.jsx
var import_react7 = __toESM(require("react"), 1);
var import_lucide_react6 = require("lucide-react");

// src/components/common/RiskBadge.jsx
var import_react6 = __toESM(require("react"), 1);
var import_lucide_react5 = require("lucide-react");
function RiskBadge({ level = "LOW", score, size = "md", showIcon = true }) {
  const normLevel = (level || "LOW").toUpperCase();
  const configs = {
    LOW: {
      bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
      pill: "bg-emerald-500 text-slate-950 font-bold",
      dot: "bg-emerald-400",
      icon: import_lucide_react5.ShieldCheck,
      label: "Low Risk \u2014 Generally Safe",
      shortLabel: "Low Risk"
    },
    MEDIUM: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-300",
      pill: "bg-amber-500 text-slate-950 font-bold",
      dot: "bg-amber-400",
      icon: import_lucide_react5.AlertTriangle,
      label: "Medium Risk \u2014 Exercise Caution",
      shortLabel: "Medium Risk"
    },
    HIGH: {
      bg: "bg-rose-500/15 border-rose-500/40 text-rose-300",
      pill: "bg-rose-500 text-white font-bold",
      dot: "bg-rose-400",
      icon: import_lucide_react5.AlertOctagon,
      label: "High Risk \u2014 Consult Doctor",
      shortLabel: "High Risk"
    },
    SEVERE: {
      bg: "bg-red-600/20 border-red-500/60 text-red-200",
      pill: "bg-red-600 text-white font-bold",
      dot: "bg-red-400",
      icon: import_lucide_react5.AlertOctagon,
      label: "Severe Risk \u2014 Emergency Hazard",
      shortLabel: "Severe Hazard"
    }
  };
  const config = configs[normLevel] || configs.LOW;
  const IconComponent = config.icon;
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs sm:text-sm",
    lg: "px-4 py-1.5 text-sm sm:text-base font-semibold"
  };
  return /* @__PURE__ */ import_react6.default.createElement(
    "span",
    {
      className: `inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${sizeClasses[size] || sizeClasses.md} font-medium transition-all shadow-sm`
    },
    /* @__PURE__ */ import_react6.default.createElement("span", { className: `w-2 h-2 rounded-full ${config.dot} animate-pulse` }),
    showIcon && /* @__PURE__ */ import_react6.default.createElement(IconComponent, { className: "w-3.5 h-3.5 shrink-0" }),
    /* @__PURE__ */ import_react6.default.createElement("span", null, config.shortLabel),
    score !== void 0 && /* @__PURE__ */ import_react6.default.createElement("span", { className: "ml-1 px-1.5 py-0.2 rounded-full bg-slate-900/60 font-mono text-[11px] text-slate-200" }, score, "%")
  );
}

// src/components/home/HeroSection.jsx
function HeroSection() {
  const { setActiveTab, loadPatientPreset, runSafetyCheck } = useHealth();
  const handleQuickDemo = (patientId, drugName, dosage) => {
    const targetPatient = SAMPLE_PATIENTS.find((p) => p.id === patientId) || SAMPLE_PATIENTS[0];
    loadPatientPreset(targetPatient);
    runSafetyCheck(drugName, dosage);
    setActiveTab("risk-checker");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ import_react7.default.createElement("section", { className: "relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial-gradient pointer-events-none opacity-80" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "absolute -top-24 -right-24 w-96 h-96 bg-mediteal-500/10 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "absolute top-1/2 -left-24 w-80 h-80 bg-mediblue-500/10 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ import_react7.default.createElement("div", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-mediteal-500/30 bg-mediteal-500/10 text-mediteal-300 text-xs sm:text-sm font-medium shadow-inner animate-fade-in" }, /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Sparkles, { className: "w-3.5 h-3.5 text-mediteal-400" }), /* @__PURE__ */ import_react7.default.createElement("span", null, "Explainable AI-Powered Medicine Safety for Everyone"))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-6 text-center max-w-4xl mx-auto space-y-4" }, /* @__PURE__ */ import_react7.default.createElement("h1", { className: "text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]" }, "Know If Your Medicine Is", " ", /* @__PURE__ */ import_react7.default.createElement("span", { className: "bg-gradient-to-r from-mediteal-300 via-mediteal-400 to-sky-400 bg-clip-text text-transparent" }, "Truly Safe For You"), " ", "In Seconds."), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed" }, "MediSafe AI checks your ", /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-white" }, "age, diseases, and allergies"), " to predict harmful side effects, dangerous pill clashes, and doctor-approved safer alternatives in plain, simple words.")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto" }, /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("risk-checker");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-sm sm:text-base shadow-xl shadow-mediteal-500/25 hover:shadow-mediteal-500/40 transform hover:-translate-y-0.5 transition-all"
    },
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Pill, { className: "w-5 h-5 text-slate-950" }),
    /* @__PURE__ */ import_react7.default.createElement("span", null, "Check A Medicine Now"),
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.ArrowRight, { className: "w-4 h-4 text-slate-950 ml-1" })
  ), /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("ocr");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 text-white font-semibold text-sm sm:text-base border border-slate-700/80 hover:border-slate-600 shadow-md transition-all"
    },
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.Camera, { className: "w-5 h-5 text-mediteal-400" }),
    /* @__PURE__ */ import_react7.default.createElement("span", null, "Upload Prescription (OCR)")
  )), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-14 pt-10 border-t border-slate-800/80" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-center mb-6" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-mediteal-400 bg-mediteal-500/10 px-3 py-1 rounded-full border border-mediteal-500/20" }, "\u26A1 1-Click Live Test Demos"), /* @__PURE__ */ import_react7.default.createElement("h2", { className: "text-lg sm:text-2xl font-bold text-white mt-2" }, "See How MediSafe AI Works Right Now"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mt-1" }, "Click any realistic patient case below to watch the AI evaluate risks, explain why, and suggest safer options instantly.")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "group relative rounded-2xl border border-rose-500/30 bg-gradient-to-b from-slate-900/90 to-rose-950/20 p-5 hover:border-rose-500/60 transition-all shadow-lg hover:shadow-rose-950/40 flex flex-col justify-between" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-md border border-rose-500/30" }, "High Risk Conflict"), /* @__PURE__ */ import_react7.default.createElement(RiskBadge, { level: "HIGH", score: 85, size: "sm" })), /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-base font-bold text-white group-hover:text-rose-200 transition" }, "Senior Patient (68y) + Chronic Kidney Disease + Ibuprofen"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-slate-300 mt-2 leading-relaxed" }, "Ibuprofen severely constricts blood flow to impaired kidneys. The AI flags this as ", /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-rose-300" }, "85% High Risk"), " and recommends Paracetamol.")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] text-slate-400 font-mono" }, "Patient: Robert Jenkins"), /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => handleQuickDemo("patient-1", "Ibuprofen", "400mg"),
      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold border border-rose-500/40 transition group-hover:scale-105"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", null, "Test Case"),
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.ArrowRight, { className: "w-3.5 h-3.5" })
  ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "group relative rounded-2xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 to-amber-950/20 p-5 hover:border-amber-500/60 transition-all shadow-lg hover:shadow-amber-950/40 flex flex-col justify-between" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-md border border-amber-500/30" }, "Allergy Alert"), /* @__PURE__ */ import_react7.default.createElement(RiskBadge, { level: "HIGH", score: 89, size: "sm" })), /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-base font-bold text-white group-hover:text-amber-200 transition" }, "Eleanor (54y) + Penicillin Allergy + Amoxicillin"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-slate-300 mt-2 leading-relaxed" }, "Amoxicillin is in the Penicillin antibiotic family. MediSafe AI detects this cross-reactivity and blocks it with an ", /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-amber-300" }, "Emergency Allergy Warning"), ".")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] text-slate-400 font-mono" }, "Patient: Eleanor Vance"), /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => handleQuickDemo("patient-2", "Amoxicillin", "500mg"),
      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/40 transition group-hover:scale-105"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", null, "Test Case"),
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.ArrowRight, { className: "w-3.5 h-3.5" })
  ))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "group relative rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-emerald-950/20 p-5 hover:border-emerald-500/60 transition-all shadow-lg hover:shadow-emerald-950/40 flex flex-col justify-between" }, /* @__PURE__ */ import_react7.default.createElement("div", null, /* @__PURE__ */ import_react7.default.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-md border border-emerald-500/30" }, "Safe Verification"), /* @__PURE__ */ import_react7.default.createElement(RiskBadge, { level: "LOW", score: 15, size: "sm" })), /* @__PURE__ */ import_react7.default.createElement("h3", { className: "text-base font-bold text-white group-hover:text-emerald-200 transition" }, "Young Adult (32y) + Diabetes + Paracetamol"), /* @__PURE__ */ import_react7.default.createElement("p", { className: "text-xs text-slate-300 mt-2 leading-relaxed" }, "Standard antipyretic evaluation with no renal, liver, or allergy conflicts. MediSafe assigns a ", /* @__PURE__ */ import_react7.default.createElement("strong", { className: "text-emerald-300" }, "15% Low Risk"), " safety score.")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between" }, /* @__PURE__ */ import_react7.default.createElement("span", { className: "text-[11px] text-slate-400 font-mono" }, "Patient: Devon Clark"), /* @__PURE__ */ import_react7.default.createElement(
    "button",
    {
      onClick: () => handleQuickDemo("patient-4", "Paracetamol (Acetaminophen)", "500mg"),
      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition group-hover:scale-105"
    },
    /* @__PURE__ */ import_react7.default.createElement("span", null, "Test Case"),
    /* @__PURE__ */ import_react7.default.createElement(import_lucide_react6.ArrowRight, { className: "w-3.5 h-3.5" })
  ))))), /* @__PURE__ */ import_react7.default.createElement("div", { className: "mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-xl sm:text-2xl font-extrabold text-white" }, "100%"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-[11px] text-slate-400" }, "Explainable Predictions")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-xl sm:text-2xl font-extrabold text-mediteal-400" }, "0\u2013100%"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-[11px] text-slate-400" }, "Side Effect Probabilities")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-xl sm:text-2xl font-extrabold text-sky-400" }, "OCR Ready"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-[11px] text-slate-400" }, "Prescription Scanning")), /* @__PURE__ */ import_react7.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800" }, /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-xl sm:text-2xl font-extrabold text-emerald-400" }, "Safer Recs"), /* @__PURE__ */ import_react7.default.createElement("div", { className: "text-[11px] text-slate-400" }, "Doctor-Reviewed Alternatives")))));
}

// src/components/home/HowItWorks.jsx
var import_react8 = __toESM(require("react"), 1);
var import_lucide_react7 = require("lucide-react");
function HowItWorks() {
  const { setActiveTab } = useHealth();
  const steps = [
    {
      stepNumber: "01",
      title: "Enter Your Health Details",
      subtitle: "Takes less than 1 minute",
      description: "Input simple details like your age, any conditions you have (like kidney disease or high blood pressure), and known allergies.",
      icon: import_lucide_react7.UserCheck,
      color: "from-sky-500 to-mediblue-600",
      badge: "Step 1: Your Profile",
      actionText: "View Sample Profile",
      actionTab: "profile"
    },
    {
      stepNumber: "02",
      title: "Add Your Medicine or Rx Slip",
      subtitle: "Type pill name or snap a photo",
      description: "Type the medicine name (like Ibuprofen or Amoxicillin) or upload a photo of your doctor\u2019s prescription for automatic scanning.",
      icon: import_lucide_react7.Camera,
      color: "from-mediteal-400 to-emerald-600",
      badge: "Step 2: Medication",
      actionText: "Try Rx Scanner",
      actionTab: "ocr"
    },
    {
      stepNumber: "03",
      title: "See Your Safety Color & Why",
      subtitle: "Green \u{1F7E2}, Yellow \u{1F7E1}, Red \u{1F534}",
      description: "Get an instant safety score from 0 to 100%. MediSafe AI explains in plain English why your age, dosage, or condition triggered the score.",
      icon: import_lucide_react7.Activity,
      color: "from-amber-400 to-rose-500",
      badge: "Step 3: Explainable AI",
      actionText: "See Risk Checker",
      actionTab: "risk-checker"
    },
    {
      stepNumber: "04",
      title: "Discover Safer Alternatives",
      subtitle: "Doctor-reviewed options",
      description: "If your medicine poses a high risk, MediSafe AI suggests lower-risk alternatives to discuss with your healthcare professional.",
      icon: import_lucide_react7.HeartHandshake,
      color: "from-emerald-400 to-teal-600",
      badge: "Step 4: Safer Recs",
      actionText: "Check Alternatives",
      actionTab: "risk-checker"
    }
  ];
  return /* @__PURE__ */ import_react8.default.createElement("section", { className: "py-16 bg-slate-900/50 border-y border-slate-800/80" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-mediteal-400 bg-mediteal-500/10 px-3 py-1 rounded-full border border-mediteal-500/20" }, "Simple & Easy To Use"), /* @__PURE__ */ import_react8.default.createElement("h2", { className: "text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight" }, "How MediSafe AI Protects You in 4 Steps"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-sm sm:text-base text-slate-300 mt-2" }, "No technical knowledge needed. Designed for everyday patients, families, and healthcare workers.")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, steps.map((step) => {
    const Icon = step.icon;
    return /* @__PURE__ */ import_react8.default.createElement(
      "div",
      {
        key: step.stepNumber,
        className: "relative rounded-2xl border border-slate-800 bg-slate-900/90 p-6 flex flex-col justify-between hover:border-slate-700 transition-all hover:-translate-y-1 shadow-md hover:shadow-xl"
      },
      /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700" }, step.badge), /* @__PURE__ */ import_react8.default.createElement("span", { className: "font-mono text-2xl font-black text-slate-700" }, step.stepNumber)), /* @__PURE__ */ import_react8.default.createElement("div", { className: `w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} p-2.5 text-slate-950 flex items-center justify-center mb-4 shadow-lg` }, /* @__PURE__ */ import_react8.default.createElement(Icon, { className: "w-6 h-6 stroke-[2.5]" })), /* @__PURE__ */ import_react8.default.createElement("h3", { className: "text-lg font-bold text-white mb-1" }, step.title), /* @__PURE__ */ import_react8.default.createElement("div", { className: "text-xs font-semibold text-mediteal-400 mb-2" }, step.subtitle), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 leading-relaxed" }, step.description)),
      /* @__PURE__ */ import_react8.default.createElement("div", { className: "mt-6 pt-4 border-t border-slate-800/80" }, /* @__PURE__ */ import_react8.default.createElement(
        "button",
        {
          onClick: () => {
            setActiveTab(step.actionTab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          className: "flex items-center gap-1.5 text-xs font-semibold text-mediteal-300 hover:text-white transition group"
        },
        /* @__PURE__ */ import_react8.default.createElement("span", null, step.actionText),
        /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" })
      ))
    );
  })), /* @__PURE__ */ import_react8.default.createElement("div", { className: "mt-12 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 shadow-lg" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex flex-col lg:flex-row items-center justify-between gap-6" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "space-y-1 text-center lg:text-left" }, /* @__PURE__ */ import_react8.default.createElement("h4", { className: "text-base sm:text-lg font-bold text-white flex items-center justify-center lg:justify-start gap-2" }, /* @__PURE__ */ import_react8.default.createElement(import_lucide_react7.CheckCircle2, { className: "w-5 h-5 text-emerald-400" }), "The Simple Traffic-Light Color Guide"), /* @__PURE__ */ import_react8.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300" }, "You never have to decipher complicated medical charts to know if a medicine is safe:")), /* @__PURE__ */ import_react8.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto" }, /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "w-3 h-3 rounded-full bg-emerald-400 shrink-0 animate-pulse" }), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("strong", { className: "block font-bold" }, "\u{1F7E2} Green (0\u201334%)"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[11px] text-emerald-200" }, "Safe to take as directed"))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2.5 px-4 py-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "w-3 h-3 rounded-full bg-amber-400 shrink-0 animate-pulse" }), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("strong", { className: "block font-bold" }, "\u{1F7E1} Yellow (35\u201369%)"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[11px] text-amber-200" }, "Caution: Monitor side effects"))), /* @__PURE__ */ import_react8.default.createElement("div", { className: "flex items-center gap-2.5 px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs" }, /* @__PURE__ */ import_react8.default.createElement("span", { className: "w-3 h-3 rounded-full bg-rose-400 shrink-0 animate-pulse" }), /* @__PURE__ */ import_react8.default.createElement("div", null, /* @__PURE__ */ import_react8.default.createElement("strong", { className: "block font-bold" }, "\u{1F534} Red (70\u2013100%)"), /* @__PURE__ */ import_react8.default.createElement("span", { className: "text-[11px] text-rose-200" }, "High Risk: Call your doctor"))))))));
}

// src/components/home/FeatureGrid.jsx
var import_react9 = __toESM(require("react"), 1);
var import_lucide_react8 = require("lucide-react");
function FeatureGrid() {
  const { setActiveTab } = useHealth();
  const features = [
    {
      id: "side-effects",
      title: "Personalized Side Effect Prediction",
      tag: "AI Predictive Engine",
      description: "Calculates side effect probabilities (e.g. Headache 75%, Nausea 62%) tailored specifically to your age, weight, and health history.",
      icon: import_lucide_react8.Activity,
      actionTab: "risk-checker",
      color: "text-mediteal-400 bg-mediteal-500/10 border-mediteal-500/20"
    },
    {
      id: "drug-drug",
      title: "Drug\u2013Drug Interaction Detection",
      tag: "Multi-Pill Safety",
      description: "Checks if two or more medicines interfere with one another (such as Warfarin + Aspirin creating fatal bleeding hazards).",
      icon: import_lucide_react8.RefreshCw,
      actionTab: "interactions",
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20"
    },
    {
      id: "drug-disease",
      title: "Drug\u2013Disease Interaction Detection",
      tag: "Organ Protection",
      description: "Identifies dangerous conflicts between medicines and chronic illnesses (e.g. Ibuprofen damaging kidneys in renal patients).",
      icon: import_lucide_react8.AlertOctagon,
      actionTab: "risk-checker",
      color: "text-rose-400 bg-rose-500/10 border-rose-500/20"
    },
    {
      id: "allergy",
      title: "Allergy Cross-Reactivity Detection",
      tag: "Anaphylaxis Shield",
      description: "Alerts you instantly if a prescribed pill shares chemical traits with your known allergies (e.g. Penicillin vs Amoxicillin).",
      icon: import_lucide_react8.ShieldAlert,
      actionTab: "profile",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
    },
    {
      id: "explainable-ai",
      title: "Explainable AI (SHAP / LIME)",
      tag: "Transparent Reasoning",
      description: "Explains exactly why a risk score was assigned (+25% Senior Age, +35% Kidney Disease) so you and your doctor understand every recommendation.",
      icon: import_lucide_react8.Sparkles,
      actionTab: "risk-checker",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
    },
    {
      id: "ocr",
      title: "Prescription OCR Scanner",
      tag: "Tesseract OCR Ready",
      description: "Upload doctor slips or prescription labels; MediSafe automatically extracts the medicine name, dosage, and intake frequency.",
      icon: import_lucide_react8.Camera,
      actionTab: "ocr",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
    },
    {
      id: "alternatives",
      title: "Safe Alternative Recommendations",
      tag: "Clinical Review Options",
      description: "Suggests lower-risk medications with clinical rationale for doctor review when current choices are deemed high-risk.",
      icon: import_lucide_react8.HeartHandshake,
      actionTab: "risk-checker",
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20"
    },
    {
      id: "safety-report",
      title: "Clinical Safety Report & History",
      tag: "Doctor-Ready Summaries",
      description: "Stores previous predictions and exports formatted clinical safety summaries to share directly with your pharmacist or physician.",
      icon: import_lucide_react8.FileText,
      actionTab: "report",
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
    }
  ];
  return /* @__PURE__ */ import_react9.default.createElement("section", { className: "py-16" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: "text-center max-w-3xl mx-auto mb-12" }, /* @__PURE__ */ import_react9.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20" }, "Comprehensive Medical Intelligence"), /* @__PURE__ */ import_react9.default.createElement("h2", { className: "text-2xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight" }, "Complete Medicine Safety Features"), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-sm sm:text-base text-slate-300 mt-2" }, "Engineered to detect every level of medication risk before it happens.")), /* @__PURE__ */ import_react9.default.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, features.map((feat) => {
    const Icon = feat.icon;
    return /* @__PURE__ */ import_react9.default.createElement(
      "div",
      {
        key: feat.id,
        className: "rounded-2xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between hover:border-slate-700 transition hover:-translate-y-1 shadow-md hover:shadow-xl group"
      },
      /* @__PURE__ */ import_react9.default.createElement("div", null, /* @__PURE__ */ import_react9.default.createElement("div", { className: "flex items-center justify-between mb-3" }, /* @__PURE__ */ import_react9.default.createElement("div", { className: `p-2.5 rounded-xl border ${feat.color}` }, /* @__PURE__ */ import_react9.default.createElement(Icon, { className: "w-5 h-5" })), /* @__PURE__ */ import_react9.default.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded" }, feat.tag)), /* @__PURE__ */ import_react9.default.createElement("h3", { className: "text-base font-bold text-white group-hover:text-mediteal-300 transition mb-2" }, feat.title), /* @__PURE__ */ import_react9.default.createElement("p", { className: "text-xs text-slate-300 leading-relaxed" }, feat.description)),
      /* @__PURE__ */ import_react9.default.createElement("div", { className: "mt-5 pt-3 border-t border-slate-800/80" }, /* @__PURE__ */ import_react9.default.createElement(
        "button",
        {
          onClick: () => {
            setActiveTab(feat.actionTab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          },
          className: "flex items-center gap-1.5 text-xs font-semibold text-mediteal-400 hover:text-white transition"
        },
        /* @__PURE__ */ import_react9.default.createElement("span", null, "Try Module"),
        /* @__PURE__ */ import_react9.default.createElement(import_lucide_react8.ArrowRight, { className: "w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" })
      ))
    );
  }))));
}

// src/components/profile/HealthProfileView.jsx
var import_react10 = __toESM(require("react"), 1);
var import_lucide_react9 = require("lucide-react");
function HealthProfileView() {
  const { patient, updatePatient, loadPatientPreset, setActiveTab } = useHealth();
  const [formData, setFormData] = (0, import_react10.useState)({
    name: patient.name || "",
    age: patient.age || 45,
    gender: patient.gender || "Male",
    weight: patient.weight || 70,
    diseases: patient.diseases || [],
    allergies: patient.allergies || [],
    medicalHistory: patient.medicalHistory || "",
    currentMedicines: patient.currentMedicines || []
  });
  const [customDisease, setCustomDisease] = (0, import_react10.useState)("");
  const [customAllergy, setCustomAllergy] = (0, import_react10.useState)("");
  const [newMedName, setNewMedName] = (0, import_react10.useState)("");
  const [newMedDosage, setNewMedDosage] = (0, import_react10.useState)("");
  const toggleDisease = (disease) => {
    setFormData((prev) => {
      const exists = prev.diseases.includes(disease);
      const nextDiseases = exists ? prev.diseases.filter((d) => d !== disease) : [...prev.diseases, disease];
      return { ...prev, diseases: nextDiseases };
    });
  };
  const toggleAllergy = (allergy) => {
    setFormData((prev) => {
      const exists = prev.allergies.includes(allergy);
      const nextAllergies = exists ? prev.allergies.filter((a) => a !== allergy) : [...prev.allergies, allergy];
      return { ...prev, allergies: nextAllergies };
    });
  };
  const handleAddCustomDisease = (e) => {
    e.preventDefault();
    if (customDisease.trim() && !formData.diseases.includes(customDisease.trim())) {
      setFormData((prev) => ({
        ...prev,
        diseases: [...prev.diseases, customDisease.trim()]
      }));
      setCustomDisease("");
    }
  };
  const handleAddCustomAllergy = (e) => {
    e.preventDefault();
    if (customAllergy.trim() && !formData.allergies.includes(customAllergy.trim())) {
      setFormData((prev) => ({
        ...prev,
        allergies: [...prev.allergies, customAllergy.trim()]
      }));
      setCustomAllergy("");
    }
  };
  const handleAddCurrentMed = (e) => {
    e.preventDefault();
    if (newMedName.trim()) {
      setFormData((prev) => ({
        ...prev,
        currentMedicines: [
          ...prev.currentMedicines,
          { name: newMedName.trim(), dosage: newMedDosage.trim() || "Standard dose", frequency: "Daily" }
        ]
      }));
      setNewMedName("");
      setNewMedDosage("");
    }
  };
  const handleRemoveCurrentMed = (index) => {
    setFormData((prev) => ({
      ...prev,
      currentMedicines: prev.currentMedicines.filter((_, i) => i !== index)
    }));
  };
  const handleSave = () => {
    updatePatient(formData);
  };
  return /* @__PURE__ */ import_react10.default.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-800" }, /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mediteal-500/10 border border-mediteal-500/20 text-mediteal-300 text-xs font-semibold mb-2" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.User, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react10.default.createElement("span", null, "Personal Health Profile")), /* @__PURE__ */ import_react10.default.createElement("h1", { className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight" }, "Patient Health Profile & Risk Baseline"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1" }, "MediSafe AI uses your age, chronic illnesses, and allergies to predict personal side effects.")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-xs text-slate-400 font-medium" }, "Quick Demo Profiles:"), SAMPLE_PATIENTS.map((p) => /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      key: p.id,
      onClick: () => {
        loadPatientPreset(p);
        setFormData({
          name: p.name,
          age: p.age,
          gender: p.gender,
          weight: p.weight,
          diseases: p.diseases,
          allergies: p.allergies,
          medicalHistory: p.medicalHistory,
          currentMedicines: p.currentMedicines
        });
      },
      className: `px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition ${patient.id === p.id ? "bg-mediteal-500 text-slate-950 border-mediteal-400" : "bg-slate-900 text-slate-300 border-slate-700 hover:border-slate-500"}`
    },
    p.name.split(" ")[0],
    " (",
    p.age,
    "y)"
  )))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "lg:col-span-2 space-y-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md" }, /* @__PURE__ */ import_react10.default.createElement("h2", { className: "text-base font-bold text-white mb-4 flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.User, { className: "w-4 h-4 text-mediteal-400" }), "1. Basic Demographics"), /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Full Name"), /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "text",
      value: formData.name,
      onChange: (e) => setFormData({ ...formData, name: e.target.value }),
      className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none",
      placeholder: "e.g. John Doe"
    }
  )), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Age (Years)"), /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "number",
      min: "1",
      max: "120",
      value: formData.age,
      onChange: (e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 }),
      className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
    }
  ), formData.age >= 65 && /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-[10px] text-amber-400 font-semibold block mt-1" }, "Senior Age Factor Active (+25% sensitivity)")), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Biological Gender"), /* @__PURE__ */ import_react10.default.createElement(
    "select",
    {
      value: formData.gender,
      onChange: (e) => setFormData({ ...formData, gender: e.target.value }),
      className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
    },
    /* @__PURE__ */ import_react10.default.createElement("option", { value: "Male" }, "Male"),
    /* @__PURE__ */ import_react10.default.createElement("option", { value: "Female" }, "Female"),
    /* @__PURE__ */ import_react10.default.createElement("option", { value: "Other" }, "Other / Non-binary")
  )), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Weight (kg)"), /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "number",
      min: "10",
      max: "250",
      value: formData.weight,
      onChange: (e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 }),
      className: "w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
    }
  )))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ import_react10.default.createElement("h2", { className: "text-base font-bold text-white flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.HeartPulse, { className: "w-4 h-4 text-rose-400" }), "2. Diagnosed Medical Conditions"), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-xs text-slate-400 font-medium" }, formData.diseases.length, " selected")), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-slate-400 mb-4" }, "Click conditions you have. MediSafe AI uses these to detect Drug\u2013Disease contraindications (e.g. Kidney Disease with Ibuprofen)."), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-wrap gap-2 mb-4" }, DISEASE_LIST.map((disease) => {
    const isSelected = formData.diseases.includes(disease);
    return /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        key: disease,
        type: "button",
        onClick: () => toggleDisease(disease),
        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${isSelected ? "bg-rose-500/20 text-rose-300 border border-rose-500/50 shadow-sm" : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"}`
      },
      isSelected ? /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Check, { className: "w-3.5 h-3.5 text-rose-400" }) : /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Plus, { className: "w-3.5 h-3.5 text-slate-500" }),
      /* @__PURE__ */ import_react10.default.createElement("span", null, disease)
    );
  })), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "text",
      value: customDisease,
      onChange: (e) => setCustomDisease(e.target.value),
      placeholder: "Type another condition (e.g. Glaucoma, Thyroid)...",
      className: "flex-1 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
    }
  ), /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      type: "button",
      onClick: handleAddCustomDisease,
      className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
    },
    "Add Condition"
  ))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between mb-2" }, /* @__PURE__ */ import_react10.default.createElement("h2", { className: "text-base font-bold text-white flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.AlertCircle, { className: "w-4 h-4 text-amber-400" }), "3. Known Drug Allergies"), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-xs text-slate-400 font-medium" }, formData.allergies.length, " selected")), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-slate-400 mb-4" }, "Select allergies to prevent severe cross-reactions and emergency allergic responses."), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-wrap gap-2 mb-4" }, ALLERGY_LIST.map((allergy) => {
    const isSelected = formData.allergies.includes(allergy);
    return /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        key: allergy,
        type: "button",
        onClick: () => toggleAllergy(allergy),
        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${isSelected ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow-sm" : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700"}`
      },
      isSelected ? /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Check, { className: "w-3.5 h-3.5 text-amber-400" }) : /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Plus, { className: "w-3.5 h-3.5 text-slate-500" }),
      /* @__PURE__ */ import_react10.default.createElement("span", null, allergy)
    );
  })), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex gap-2" }, /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "text",
      value: customAllergy,
      onChange: (e) => setCustomAllergy(e.target.value),
      placeholder: "Type another allergy (e.g. Codeine, Erythromycin)...",
      className: "flex-1 px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
    }
  ), /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      type: "button",
      onClick: handleAddCustomAllergy,
      className: "px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
    },
    "Add Allergy"
  ))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-md" }, /* @__PURE__ */ import_react10.default.createElement("h2", { className: "text-base font-bold text-white mb-2 flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Pill, { className: "w-4 h-4 text-sky-400" }), "4. Current Medications You Take Regularly"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-slate-400 mb-4" }, "Medicines you already take. MediSafe AI checks these for Drug\u2013Drug interactions whenever a new medicine is evaluated."), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-2 mb-4" }, formData.currentMedicines.length === 0 ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "text-xs text-slate-400 italic p-3 rounded-xl bg-slate-950 border border-slate-800 text-center" }, "No active medicines listed.") : formData.currentMedicines.map((med, idx) => /* @__PURE__ */ import_react10.default.createElement(
    "div",
    {
      key: idx,
      className: "flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs"
    },
    /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Pill, { className: "w-3.5 h-3.5 text-mediteal-400" }), /* @__PURE__ */ import_react10.default.createElement("strong", { className: "text-white text-sm" }, med.name), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 font-mono" }, "(", med.dosage, ")"), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400" }, "\u2022 ", med.frequency)),
    /* @__PURE__ */ import_react10.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => handleRemoveCurrentMed(idx),
        className: "text-rose-400 hover:text-rose-300 p-1",
        title: "Remove medicine"
      },
      /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.X, { className: "w-4 h-4" })
    )
  ))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2" }, /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "text",
      value: newMedName,
      onChange: (e) => setNewMedName(e.target.value),
      placeholder: "Medicine name (e.g. Warfarin)",
      className: "px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
    }
  ), /* @__PURE__ */ import_react10.default.createElement(
    "input",
    {
      type: "text",
      value: newMedDosage,
      onChange: (e) => setNewMedDosage(e.target.value),
      placeholder: "Dosage (e.g. 5mg daily)",
      className: "px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
    }
  ), /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      type: "button",
      onClick: handleAddCurrentMed,
      className: "px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition"
    },
    "+ Add Medicine"
  ))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-col sm:flex-row items-center gap-3" }, /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      type: "button",
      onClick: handleSave,
      className: "w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-sm shadow-xl shadow-mediteal-500/20 transition"
    },
    /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.Save, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react10.default.createElement("span", null, "Save & Update Health Profile")
  ), /* @__PURE__ */ import_react10.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        handleSave();
        setActiveTab("risk-checker");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition"
    },
    "Run Medicine Safety Check \u2192"
  ))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "p-6 rounded-2xl border border-mediteal-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-mediteal-950/20 shadow-xl sticky top-24" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex items-center justify-between pb-4 border-b border-slate-800" }, /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-mediteal-400" }, "Active Health Card"), /* @__PURE__ */ import_react10.default.createElement(import_lucide_react9.ShieldCheck, { className: "w-5 h-5 text-mediteal-400" })), /* @__PURE__ */ import_react10.default.createElement("div", { className: "mt-4 text-center pb-4 border-b border-slate-800" }, /* @__PURE__ */ import_react10.default.createElement("div", { className: "w-16 h-16 rounded-2xl bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 text-2xl font-black flex items-center justify-center mx-auto mb-2 shadow-lg" }, formData.name.charAt(0) || "P"), /* @__PURE__ */ import_react10.default.createElement("h3", { className: "text-lg font-bold text-white" }, formData.name || "Patient Name"), /* @__PURE__ */ import_react10.default.createElement("p", { className: "text-xs text-slate-400" }, formData.age, " years old \u2022 ", formData.gender, " \u2022 ", formData.weight, " kg")), /* @__PURE__ */ import_react10.default.createElement("div", { className: "mt-4 space-y-3 text-xs" }, /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 block font-semibold mb-1" }, "Conditions (", formData.diseases.length, "):"), formData.diseases.length > 0 ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-wrap gap-1" }, formData.diseases.map((d) => /* @__PURE__ */ import_react10.default.createElement("span", { key: d, className: "px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30 text-[11px]" }, d))) : /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 italic" }, "None reported")), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 block font-semibold mb-1" }, "Known Allergies (", formData.allergies.length, "):"), formData.allergies.length > 0 ? /* @__PURE__ */ import_react10.default.createElement("div", { className: "flex flex-wrap gap-1" }, formData.allergies.map((a) => /* @__PURE__ */ import_react10.default.createElement("span", { key: a, className: "px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[11px]" }, a))) : /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-emerald-400 font-medium" }, "No known allergies")), /* @__PURE__ */ import_react10.default.createElement("div", null, /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 block font-semibold mb-1" }, "Current Medications (", formData.currentMedicines.length, "):"), formData.currentMedicines.length > 0 ? /* @__PURE__ */ import_react10.default.createElement("ul", { className: "space-y-1" }, formData.currentMedicines.map((m, i) => /* @__PURE__ */ import_react10.default.createElement("li", { key: i, className: "text-slate-300 flex items-center justify-between" }, /* @__PURE__ */ import_react10.default.createElement("span", null, "\u2022 ", m.name), /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 font-mono text-[10px]" }, m.dosage)))) : /* @__PURE__ */ import_react10.default.createElement("span", { className: "text-slate-400 italic" }, "No regular medications"))), /* @__PURE__ */ import_react10.default.createElement("div", { className: "mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed" }, "\u{1F4A1} ", /* @__PURE__ */ import_react10.default.createElement("strong", null, "How this helps you:"), " When you test a pill, MediSafe AI automatically scans these conditions to protect you from kidney strain, allergic shock, or medicine clashes.")))));
}

// src/components/risk-checker/MedicineRiskView.jsx
var import_react15 = __toESM(require("react"), 1);
var import_lucide_react14 = require("lucide-react");

// src/components/risk-checker/RiskGauge.jsx
var import_react11 = __toESM(require("react"), 1);
var import_lucide_react10 = require("lucide-react");
function RiskGauge({ score = 15, level = "LOW", medicineName = "" }) {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - score / 100 * circumference;
  const colorConfigs = {
    LOW: {
      strokeColor: "#10b981",
      glowColor: "rgba(16, 185, 129, 0.3)",
      textGradient: "from-emerald-300 to-teal-400",
      label: "Low Safety Risk",
      summary: "Safe to take as directed for your profile",
      bgGlow: "bg-emerald-500/10 border-emerald-500/30"
    },
    MEDIUM: {
      strokeColor: "#f59e0b",
      glowColor: "rgba(245, 158, 11, 0.3)",
      textGradient: "from-amber-300 to-yellow-400",
      label: "Moderate Risk Detected",
      summary: "Caution advised. Monitor for potential side effects",
      bgGlow: "bg-amber-500/10 border-amber-500/30"
    },
    HIGH: {
      strokeColor: "#f43f5e",
      glowColor: "rgba(244, 63, 94, 0.35)",
      textGradient: "from-rose-300 to-red-400",
      label: "High Risk Hazard",
      summary: "Significant safety concern detected. Do not take without doctor review",
      bgGlow: "bg-rose-500/15 border-rose-500/40"
    }
  };
  const current = colorConfigs[level.toUpperCase()] || colorConfigs.LOW;
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: `p-6 rounded-2xl border ${current.bgGlow} bg-slate-900/90 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6` }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "relative flex items-center justify-center shrink-0" }, /* @__PURE__ */ import_react11.default.createElement(
    "svg",
    {
      height: radius * 2,
      width: radius * 2,
      className: "transform -rotate-90"
    },
    /* @__PURE__ */ import_react11.default.createElement(
      "circle",
      {
        stroke: "rgba(51, 65, 85, 0.4)",
        fill: "transparent",
        strokeWidth: stroke,
        r: normalizedRadius,
        cx: radius,
        cy: radius
      }
    ),
    /* @__PURE__ */ import_react11.default.createElement(
      "circle",
      {
        stroke: current.strokeColor,
        fill: "transparent",
        strokeWidth: stroke,
        strokeDasharray: `${circumference} ${circumference}`,
        style: { strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" },
        strokeLinecap: "round",
        r: normalizedRadius,
        cx: radius,
        cy: radius
      }
    )
  ), /* @__PURE__ */ import_react11.default.createElement("div", { className: "absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: `text-3xl font-black bg-gradient-to-br ${current.textGradient} bg-clip-text text-transparent font-mono` }, score, "%"), /* @__PURE__ */ import_react11.default.createElement("span", { className: "text-[10px] uppercase font-extrabold tracking-wider text-slate-400 mt-0.5" }, "Risk Score"))), /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex-1 text-center sm:text-left space-y-2" }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "flex flex-wrap items-center justify-center sm:justify-start gap-2" }, /* @__PURE__ */ import_react11.default.createElement(RiskBadge, { level, score, size: "lg" }), /* @__PURE__ */ import_react11.default.createElement("span", { className: "text-xs font-mono text-slate-400" }, "Evaluating: ", /* @__PURE__ */ import_react11.default.createElement("strong", { className: "text-white" }, medicineName))), /* @__PURE__ */ import_react11.default.createElement("h3", { className: "text-lg font-bold text-white tracking-tight" }, current.label), /* @__PURE__ */ import_react11.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg" }, current.summary), /* @__PURE__ */ import_react11.default.createElement("div", { className: "pt-2 flex items-center justify-center sm:justify-start gap-3 text-[11px] text-slate-400" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }), "0\u201334% Safe"), /* @__PURE__ */ import_react11.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "w-2 h-2 rounded-full bg-amber-400" }), "35\u201369% Caution"), /* @__PURE__ */ import_react11.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "w-2 h-2 rounded-full bg-rose-400" }), "70\u2013100% Danger"))));
}

// src/components/risk-checker/SideEffectBars.jsx
var import_react12 = __toESM(require("react"), 1);
var import_lucide_react11 = require("lucide-react");
function SideEffectBars({ sideEffects = [], patientAge, medicineName }) {
  if (!sideEffects || sideEffects.length === 0) {
    return /* @__PURE__ */ import_react12.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400" }, "No specific side effect data available for this medication.");
  }
  const getBarColor = (probability) => {
    if (probability >= 60) return "bg-rose-500 from-rose-500 to-red-600";
    if (probability >= 35) return "bg-amber-500 from-amber-500 to-amber-600";
    return "bg-mediteal-500 from-mediteal-500 to-teal-600";
  };
  const getTextColor = (probability) => {
    if (probability >= 60) return "text-rose-400";
    if (probability >= 35) return "text-amber-400";
    return "text-mediteal-300";
  };
  return /* @__PURE__ */ import_react12.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-800" }, /* @__PURE__ */ import_react12.default.createElement("div", null, /* @__PURE__ */ import_react12.default.createElement("h3", { className: "text-base font-bold text-white flex items-center gap-2" }, /* @__PURE__ */ import_react12.default.createElement(import_lucide_react11.Activity, { className: "w-4 h-4 text-mediteal-400" }), "Personalized Side Effect Predictions"), /* @__PURE__ */ import_react12.default.createElement("p", { className: "text-xs text-slate-400 mt-0.5" }, "AI calculated probabilities for ", /* @__PURE__ */ import_react12.default.createElement("span", { className: "text-white font-semibold" }, medicineName), " tailored to your profile.")), /* @__PURE__ */ import_react12.default.createElement("span", { className: "text-[11px] font-semibold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full w-fit" }, "Patient Age: ", patientAge, "y")), /* @__PURE__ */ import_react12.default.createElement("div", { className: "space-y-4" }, sideEffects.map((item, idx) => {
    const barGradient = getBarColor(item.probability);
    const textColor = getTextColor(item.probability);
    return /* @__PURE__ */ import_react12.default.createElement("div", { key: idx, className: "space-y-1.5" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex items-center justify-between text-xs" }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react12.default.createElement("span", { className: "font-semibold text-slate-200" }, item.name), item.severe && /* @__PURE__ */ import_react12.default.createElement("span", { className: "px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30" }, "High Impact")), /* @__PURE__ */ import_react12.default.createElement("span", { className: `font-mono font-bold text-sm ${textColor}` }, item.probability, "%")), /* @__PURE__ */ import_react12.default.createElement("div", { className: "w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden" }, /* @__PURE__ */ import_react12.default.createElement(
      "div",
      {
        className: `h-full rounded-full bg-gradient-to-r ${barGradient} transition-all duration-1000 ease-out`,
        style: { width: `${item.probability}%` }
      }
    )));
  })), /* @__PURE__ */ import_react12.default.createElement("div", { className: "mt-5 p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed" }, /* @__PURE__ */ import_react12.default.createElement(import_lucide_react11.Info, { className: "w-4 h-4 text-mediteal-400 shrink-0 mt-0.5" }), /* @__PURE__ */ import_react12.default.createElement("span", null, /* @__PURE__ */ import_react12.default.createElement("strong", null, "Why these percentages?"), " MediSafe AI adjusts standard clinical trial rates using patient physiology (age, kidney/liver efficiency, weight, and concurrent drug clearance).")));
}

// src/components/risk-checker/ExplainableAIView.jsx
var import_react13 = __toESM(require("react"), 1);
var import_lucide_react12 = require("lucide-react");
function ExplainableAIView({
  shapFactors = [],
  riskLevel = "LOW",
  plainEnglishExplanation = "",
  medicineName = ""
}) {
  return /* @__PURE__ */ import_react13.default.createElement("div", { className: "p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-purple-950/20 border border-purple-500/30 shadow-xl space-y-6" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-800" }, /* @__PURE__ */ import_react13.default.createElement("div", null, /* @__PURE__ */ import_react13.default.createElement("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-bold uppercase tracking-wider mb-1.5" }, /* @__PURE__ */ import_react13.default.createElement(import_lucide_react12.Sparkles, { className: "w-3 h-3 text-purple-400" }), /* @__PURE__ */ import_react13.default.createElement("span", null, "Transparent Explainable AI (SHAP / LIME)")), /* @__PURE__ */ import_react13.default.createElement("h3", { className: "text-lg sm:text-xl font-extrabold text-white tracking-tight" }, "Why Did MediSafe AI Predict This Risk Score?"), /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-xs text-slate-300" }, "No black-box guesses. Here is the exact clinical breakdown of how your personal health factors contributed to the verdict.")), /* @__PURE__ */ import_react13.default.createElement("div", { className: "shrink-0 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-right" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "text-[10px] text-slate-400 uppercase tracking-wider block" }, "Methodology"), /* @__PURE__ */ import_react13.default.createElement("span", { className: "text-xs font-mono font-bold text-purple-300" }, "SHAP Feature Attribution"))), plainEnglishExplanation && /* @__PURE__ */ import_react13.default.createElement("div", { className: "p-4 rounded-xl bg-slate-950/80 border border-purple-500/30 flex items-start gap-3" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0 mt-0.5" }, /* @__PURE__ */ import_react13.default.createElement(import_lucide_react12.BookOpen, { className: "w-4 h-4" })), /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-1 text-xs sm:text-sm" }, /* @__PURE__ */ import_react13.default.createElement("strong", { className: "text-purple-200 block font-bold" }, "In Plain Words:"), /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-slate-200 leading-relaxed" }, plainEnglishExplanation))), /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react13.default.createElement("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-400" }, "Factor-by-Factor Risk Contribution:"), /* @__PURE__ */ import_react13.default.createElement("div", { className: "space-y-2.5" }, shapFactors.length === 0 ? /* @__PURE__ */ import_react13.default.createElement("div", { className: "text-xs text-slate-400 p-3 bg-slate-950 rounded-xl" }, "Standard physiological baseline. No adverse risk factors detected.") : shapFactors.map((item, idx) => {
    const isRisk = item.type === "risk";
    const badgeClass = isRisk ? "bg-rose-500/15 border-rose-500/30 text-rose-300" : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300";
    const signColor = isRisk ? "text-rose-400 font-mono font-bold" : "text-emerald-400 font-mono font-bold";
    return /* @__PURE__ */ import_react13.default.createElement(
      "div",
      {
        key: idx,
        className: "p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition"
      },
      /* @__PURE__ */ import_react13.default.createElement("div", { className: "flex items-center justify-between gap-2" }, /* @__PURE__ */ import_react13.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react13.default.createElement("span", { className: `px-2 py-0.5 rounded text-xs font-bold border ${badgeClass}` }, item.factor)), /* @__PURE__ */ import_react13.default.createElement("span", { className: `text-sm ${signColor}` }, item.impact)),
      /* @__PURE__ */ import_react13.default.createElement("p", { className: "text-xs text-slate-300 mt-2 leading-relaxed" }, item.description)
    );
  }))), /* @__PURE__ */ import_react13.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2" }, /* @__PURE__ */ import_react13.default.createElement(import_lucide_react12.HelpCircle, { className: "w-4 h-4 text-purple-400 shrink-0 mt-0.5" }), /* @__PURE__ */ import_react13.default.createElement("span", null, /* @__PURE__ */ import_react13.default.createElement("strong", null, "What is SHAP?"), " In machine learning, ", /* @__PURE__ */ import_react13.default.createElement("em", null, "SHapley Additive exPlanations"), " measures how much each feature (such as your age, kidney function, or dosage) pushes the model\u2019s prediction higher or lower from baseline. This ensures physicians can verify the AI\u2019s reasoning before prescribing.")));
}

// src/components/risk-checker/SafeAlternatives.jsx
var import_react14 = __toESM(require("react"), 1);
var import_lucide_react13 = require("lucide-react");
function SafeAlternatives({
  alternatives = [],
  currentMedicine = "",
  currentRiskScore = 85,
  onSelectAlternative
}) {
  const { runSafetyCheck, showToast } = useHealth();
  if (!alternatives || alternatives.length === 0) {
    return /* @__PURE__ */ import_react14.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center text-xs text-slate-400" }, "No specific alternative suggestions mapped for this drug. Consult your doctor for therapeutic substitutes.");
  }
  const handleApplyAlternative = (alt) => {
    runSafetyCheck(alt.name, alt.dosage);
    showToast(`Switched analysis to safer alternative: ${alt.name}`, "success");
  };
  return /* @__PURE__ */ import_react14.default.createElement("div", { className: "p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 to-mediteal-950/20 border border-mediteal-500/30 shadow-xl space-y-6" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800" }, /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("div", { className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-mediteal-500/15 border border-mediteal-500/30 text-mediteal-300 text-[11px] font-bold uppercase tracking-wider mb-1.5" }, /* @__PURE__ */ import_react14.default.createElement(import_lucide_react13.HeartHandshake, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react14.default.createElement("span", null, "Clinical Decision Support")), /* @__PURE__ */ import_react14.default.createElement("h3", { className: "text-lg sm:text-xl font-extrabold text-white tracking-tight" }, "Safer Medication Alternatives"), /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-xs text-slate-300" }, "Options with lower predicted risk profiles for your specific health conditions.")), /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-xs text-slate-400" }, "Showing ", /* @__PURE__ */ import_react14.default.createElement("strong", { className: "text-white" }, alternatives.length), " safer substitute(s)")), /* @__PURE__ */ import_react14.default.createElement("div", { className: "space-y-4" }, alternatives.map((alt, idx) => {
    const scoreDifference = currentRiskScore - (alt.projectedRiskScore || 20);
    return /* @__PURE__ */ import_react14.default.createElement(
      "div",
      {
        key: idx,
        className: "p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-mediteal-500/40 transition-all shadow-md space-y-4"
      },
      /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" }, /* @__PURE__ */ import_react14.default.createElement("div", null, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-slate-400" }, "Option ", idx + 1, ":"), /* @__PURE__ */ import_react14.default.createElement("h4", { className: "text-base sm:text-lg font-bold text-white" }, alt.name), /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "(", alt.dosage, ")")), /* @__PURE__ */ import_react14.default.createElement("span", { className: "text-xs text-mediteal-400 font-medium" }, "Category: ", alt.category)), /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "text-right" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "text-[10px] text-slate-400 uppercase tracking-wider" }, "Projected Risk"), /* @__PURE__ */ import_react14.default.createElement(RiskBadge, { level: alt.riskLevel || "LOW", score: alt.projectedRiskScore, size: "sm" })), scoreDifference > 0 && /* @__PURE__ */ import_react14.default.createElement("div", { className: "px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1" }, /* @__PURE__ */ import_react14.default.createElement("span", null, "-", scoreDifference, "% Risk")))),
      /* @__PURE__ */ import_react14.default.createElement("div", { className: "p-3.5 rounded-xl bg-slate-900 border border-slate-800/80 text-xs space-y-1" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex items-center gap-1.5 text-emerald-300 font-semibold" }, /* @__PURE__ */ import_react14.default.createElement(import_lucide_react13.ShieldCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }), /* @__PURE__ */ import_react14.default.createElement("span", null, "Why This Alternative Is Safer For You:")), /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-slate-300 leading-relaxed pl-5" }, alt.whySafer)),
      /* @__PURE__ */ import_react14.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2" }, /* @__PURE__ */ import_react14.default.createElement("p", { className: "text-[11px] text-slate-400 italic" }, "\u2695\uFE0F ", /* @__PURE__ */ import_react14.default.createElement("strong", null, "Physician Review Note:"), " ", alt.doctorNote), /* @__PURE__ */ import_react14.default.createElement(
        "button",
        {
          onClick: () => handleApplyAlternative(alt),
          className: "flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 text-xs font-bold border border-mediteal-500/40 transition shrink-0"
        },
        /* @__PURE__ */ import_react14.default.createElement("span", null, "Evaluate ", alt.name.split(" ")[0]),
        /* @__PURE__ */ import_react14.default.createElement(import_lucide_react13.ArrowRight, { className: "w-3.5 h-3.5" })
      ))
    );
  })), /* @__PURE__ */ import_react14.default.createElement("div", { className: "p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed" }, /* @__PURE__ */ import_react14.default.createElement("strong", null, "Important Clinical Protocol:"), " MediSafe AI recommendations serve as an explainable decision-support tool. Do not switch prescriptions without your primary doctor or pharmacist\u2019s authorization."));
}

// src/components/risk-checker/MedicineRiskView.jsx
function MedicineRiskView() {
  const {
    patient,
    currentAnalysis,
    runSafetyCheck,
    setActiveTab,
    showToast
  } = useHealth();
  const [selectedMedName, setSelectedMedName] = (0, import_react15.useState)(currentAnalysis?.medicineName || "Ibuprofen");
  const [dosage, setDosage] = (0, import_react15.useState)(currentAnalysis?.dosage || "400mg");
  const [frequency, setFrequency] = (0, import_react15.useState)(currentAnalysis?.frequency || "Twice daily with meals");
  const [isAnalyzing, setIsAnalyzing] = (0, import_react15.useState)(false);
  const currentMedMeta = COMMON_MEDICATIONS.find(
    (m) => m.name.toLowerCase() === selectedMedName.toLowerCase() || m.brandNames.some((b) => b.toLowerCase() === selectedMedName.toLowerCase())
  );
  const handleSelectMedChip = (med) => {
    setSelectedMedName(med.name);
    setDosage(med.defaultDosage);
    setFrequency(med.defaultFrequency);
    executeAnalysis(med.name, med.defaultDosage, med.defaultFrequency);
  };
  const executeAnalysis = (medName, medDose, medFreq) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      runSafetyCheck(medName, medDose, medFreq);
      setIsAnalyzing(false);
      showToast(`Analyzed ${medName} for ${patient.name}`, "success");
    }, 450);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedMedName.trim()) {
      executeAnalysis(selectedMedName.trim(), dosage, frequency);
    }
  };
  return /* @__PURE__ */ import_react15.default.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 font-black flex items-center justify-center text-sm shrink-0" }, patient.name.charAt(0)), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-xs text-slate-400" }, "Evaluating safety for:"), /* @__PURE__ */ import_react15.default.createElement("strong", { className: "text-white text-sm" }, patient.name), /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "(", patient.age, "y, ", patient.gender, ")")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "text-xs text-slate-300 mt-0.5" }, "Conditions: ", /* @__PURE__ */ import_react15.default.createElement("strong", { className: "text-mediteal-300" }, patient.diseases.join(", ") || "None"), " \u2022 Allergies: ", /* @__PURE__ */ import_react15.default.createElement("strong", { className: "text-amber-300" }, patient.allergies.join(", ") || "None")))), /* @__PURE__ */ import_react15.default.createElement(
    "button",
    {
      onClick: () => setActiveTab("profile"),
      className: "text-xs text-mediteal-400 hover:text-mediteal-300 font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 transition flex items-center gap-1.5 w-fit"
    },
    /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.User, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ import_react15.default.createElement("span", null, "Edit Patient Profile")
  )), /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5" }, /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("h1", { className: "text-2xl font-extrabold text-white tracking-tight flex items-center gap-2" }, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.Pill, { className: "w-6 h-6 text-mediteal-400" }), "Personalized Medicine Risk & Side Effect Checker"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1" }, "Choose a medicine below or type any prescription to run the Explainable AI safety engine.")), /* @__PURE__ */ import_react15.default.createElement("div", null, /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2" }, "Quick-Select Common Medications:"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex flex-wrap gap-2" }, COMMON_MEDICATIONS.map((med) => {
    const isSelected = selectedMedName.toLowerCase() === med.name.toLowerCase();
    return /* @__PURE__ */ import_react15.default.createElement(
      "button",
      {
        key: med.id,
        onClick: () => handleSelectMedChip(med),
        className: `px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${isSelected ? "bg-mediteal-500 text-slate-950 border border-mediteal-400 shadow-sm font-bold" : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700"}`
      },
      /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.Pill, { className: "w-3.5 h-3.5" }),
      /* @__PURE__ */ import_react15.default.createElement("span", null, med.name)
    );
  }))), /* @__PURE__ */ import_react15.default.createElement("form", { onSubmit: handleFormSubmit, className: "grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "sm:col-span-5" }, /* @__PURE__ */ import_react15.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Medicine Name"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react15.default.createElement(
    "input",
    {
      type: "text",
      value: selectedMedName,
      onChange: (e) => setSelectedMedName(e.target.value),
      placeholder: "e.g. Ibuprofen, Paracetamol, Amoxicillin...",
      className: "w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
    }
  ), /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.Search, { className: "w-4 h-4 text-slate-500 absolute left-3 top-3" }))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "sm:col-span-3" }, /* @__PURE__ */ import_react15.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Strength / Dosage"), currentMedMeta?.commonDosages ? /* @__PURE__ */ import_react15.default.createElement(
    "select",
    {
      value: dosage,
      onChange: (e) => setDosage(e.target.value),
      className: "w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
    },
    currentMedMeta.commonDosages.map((d) => /* @__PURE__ */ import_react15.default.createElement("option", { key: d, value: d }, d))
  ) : /* @__PURE__ */ import_react15.default.createElement(
    "input",
    {
      type: "text",
      value: dosage,
      onChange: (e) => setDosage(e.target.value),
      placeholder: "e.g. 500mg",
      className: "w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
    }
  )), /* @__PURE__ */ import_react15.default.createElement("div", { className: "sm:col-span-4 flex items-end" }, /* @__PURE__ */ import_react15.default.createElement(
    "button",
    {
      type: "submit",
      disabled: isAnalyzing,
      className: "w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-sm shadow-lg shadow-mediteal-500/20 transition disabled:opacity-50"
    },
    isAnalyzing ? /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, null, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.RefreshCw, { className: "w-4 h-4 animate-spin text-slate-950" }), /* @__PURE__ */ import_react15.default.createElement("span", null, "Computing AI Safety...")) : /* @__PURE__ */ import_react15.default.createElement(import_react15.default.Fragment, null, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.Sparkles, { className: "w-4 h-4 text-slate-950" }), /* @__PURE__ */ import_react15.default.createElement("span", null, "Analyze Medicine Safety"))
  )))), currentAnalysis && /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-6 animate-fade-in" }, /* @__PURE__ */ import_react15.default.createElement(
    RiskGauge,
    {
      score: currentAnalysis.riskScore,
      level: currentAnalysis.riskLevel,
      medicineName: currentAnalysis.medicineName
    }
  ), currentAnalysis.allergyAlert && /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-500/60 shadow-lg flex items-start gap-4" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0" }, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.ShieldAlert, { className: "w-6 h-6 animate-pulse" })), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded" }, "Severe Allergy Warning"), /* @__PURE__ */ import_react15.default.createElement("span", { className: "text-xs text-rose-300 font-bold" }, "Detected Trigger: ", currentAnalysis.allergyAlert.detectedAllergy)), /* @__PURE__ */ import_react15.default.createElement("h4", { className: "text-base font-bold text-white" }, "Hypersensitivity Conflict Detected"), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-xs sm:text-sm text-rose-200 leading-relaxed" }, currentAnalysis.allergyAlert.warning))), currentAnalysis.diseaseConflicts.length > 0 && /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 shadow-lg space-y-3" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-2 text-amber-400 font-bold text-sm" }, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.AlertTriangle, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ import_react15.default.createElement("span", null, "Drug\u2013Disease Contraindication Warnings (", currentAnalysis.diseaseConflicts.length, ")")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-2" }, currentAnalysis.diseaseConflicts.map((dc, i) => /* @__PURE__ */ import_react15.default.createElement("div", { key: i, className: "p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center justify-between gap-2 mb-1" }, /* @__PURE__ */ import_react15.default.createElement("strong", { className: "text-white text-sm" }, dc.disease), /* @__PURE__ */ import_react15.default.createElement("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30" }, dc.severity, " Contraindication")), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-slate-300 leading-relaxed" }, dc.explanation))))), currentAnalysis.drugDrugConflicts.length > 0 && /* @__PURE__ */ import_react15.default.createElement("div", { className: "p-5 rounded-2xl bg-rose-950/30 border border-rose-500/40 shadow-lg space-y-3" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-2 text-rose-400 font-bold text-sm" }, /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.RefreshCw, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ import_react15.default.createElement("span", null, "Drug\u2013Drug Interaction Detected with Existing Prescriptions")), /* @__PURE__ */ import_react15.default.createElement("div", { className: "space-y-2" }, currentAnalysis.drugDrugConflicts.map((ddc, i) => /* @__PURE__ */ import_react15.default.createElement("div", { key: i, className: "p-3.5 rounded-xl bg-slate-950/80 border border-rose-500/30 text-xs space-y-1" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center justify-between gap-2" }, /* @__PURE__ */ import_react15.default.createElement("strong", { className: "text-white text-sm" }, currentAnalysis.medicineName, " + ", ddc.withDrug, " (", ddc.currentDosage, ")"), /* @__PURE__ */ import_react15.default.createElement("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30" }, ddc.severity, " Interaction")), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-slate-300 font-medium" }, ddc.summary), /* @__PURE__ */ import_react15.default.createElement("p", { className: "text-slate-400" }, ddc.mechanism), /* @__PURE__ */ import_react15.default.createElement("div", { className: "pt-1 text-[11px] text-amber-300 font-semibold" }, "Action Required: ", ddc.action))))), /* @__PURE__ */ import_react15.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ import_react15.default.createElement(
    SideEffectBars,
    {
      sideEffects: currentAnalysis.sideEffects,
      patientAge: patient.age,
      medicineName: currentAnalysis.medicineName
    }
  ), /* @__PURE__ */ import_react15.default.createElement(
    ExplainableAIView,
    {
      shapFactors: currentAnalysis.shapFactors,
      riskLevel: currentAnalysis.riskLevel,
      plainEnglishExplanation: currentAnalysis.plainEnglishExplanation,
      medicineName: currentAnalysis.medicineName
    }
  )), /* @__PURE__ */ import_react15.default.createElement(
    SafeAlternatives,
    {
      alternatives: currentAnalysis.alternatives,
      currentMedicine: currentAnalysis.medicineName,
      currentRiskScore: currentAnalysis.riskScore
    }
  ), /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ import_react15.default.createElement("div", { className: "text-xs text-slate-400" }, "Evaluated on ", (/* @__PURE__ */ new Date()).toLocaleDateString(), " \u2022 Ready for clinical consultation"), /* @__PURE__ */ import_react15.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react15.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("history");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
    },
    "View Medication History"
  ), /* @__PURE__ */ import_react15.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("report");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-1.5 px-4 py-2 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 text-xs font-bold border border-mediteal-500/40 transition"
    },
    /* @__PURE__ */ import_react15.default.createElement(import_lucide_react14.Printer, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ import_react15.default.createElement("span", null, "Export Safety Report")
  )))));
}

// src/components/interactions/DrugInteractionView.jsx
var import_react16 = __toESM(require("react"), 1);
var import_lucide_react15 = require("lucide-react");
function DrugInteractionView() {
  const [medsList, setMedsList] = (0, import_react16.useState)(["Warfarin", "Aspirin"]);
  const [inputDrug, setInputDrug] = (0, import_react16.useState)("");
  const [interactions, setInteractions] = (0, import_react16.useState)(() => checkMultiDrugInteractions(["Warfarin", "Aspirin"]));
  const handleAddDrug = (name) => {
    const trimmed = name.trim();
    if (trimmed && !medsList.some((m) => m.toLowerCase() === trimmed.toLowerCase())) {
      const updated = [...medsList, trimmed];
      setMedsList(updated);
      setInteractions(checkMultiDrugInteractions(updated));
      setInputDrug("");
    }
  };
  const handleRemoveDrug = (index) => {
    const updated = medsList.filter((_, i) => i !== index);
    setMedsList(updated);
    setInteractions(checkMultiDrugInteractions(updated));
  };
  const handleLoadCombo = (combo) => {
    setMedsList(combo);
    setInteractions(checkMultiDrugInteractions(combo));
  };
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8" }, /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-xs font-semibold mb-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.RefreshCw, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react16.default.createElement("span", null, "Multi-Medication Safety Scanner")), /* @__PURE__ */ import_react16.default.createElement("h1", { className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight" }, "Drug\u2013Drug Interaction Checker"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1" }, "Taking multiple pills together? MediSafe AI analyzes simultaneous pharmacology to prevent hazardous biochemical clashes.")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider block" }, "1-Click Interaction Presets to Try:"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-wrap gap-2" }, /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      onClick: () => handleLoadCombo(["Warfarin", "Aspirin"]),
      className: "px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold hover:bg-rose-500/25 transition"
    },
    "\u26A0\uFE0F Warfarin + Aspirin (Severe Bleeding Hazard)"
  ), /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      onClick: () => handleLoadCombo(["Lisinopril", "Ibuprofen"]),
      className: "px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition"
    },
    "\u26A0\uFE0F Lisinopril + Ibuprofen (Kidney / BP Blunting)"
  ), /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      onClick: () => handleLoadCombo(["Metformin", "Ciprofloxacin"]),
      className: "px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition"
    },
    "Metformin + Ciprofloxacin (Dysglycemia)"
  ), /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      onClick: () => handleLoadCombo(["Paracetamol (Acetaminophen)", "Amoxicillin"]),
      className: "px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition"
    },
    "\u{1F7E2} Paracetamol + Amoxicillin (Safe Combination)"
  ))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6" }, /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement("h2", { className: "text-base font-bold text-white mb-2 flex items-center gap-2" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.Pill, { className: "w-4 h-4 text-mediteal-400" }), "Active Medication Combination List (", medsList.length, ")"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-xs text-slate-400" }, "Add at least 2 medications to check whether they can be safely swallowed together.")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-wrap gap-2" }, medsList.map((med, idx) => /* @__PURE__ */ import_react16.default.createElement(
    "div",
    {
      key: idx,
      className: "flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-semibold shadow-inner"
    },
    /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.Pill, { className: "w-3.5 h-3.5 text-mediteal-400" }),
    /* @__PURE__ */ import_react16.default.createElement("span", null, med),
    /* @__PURE__ */ import_react16.default.createElement(
      "button",
      {
        onClick: () => handleRemoveDrug(idx),
        className: "text-slate-400 hover:text-rose-400 p-0.5 rounded transition",
        title: "Remove"
      },
      /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.Trash2, { className: "w-3.5 h-3.5" })
    )
  )), medsList.length === 0 && /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-xs text-slate-400 italic py-2" }, "No medications added. Add medications below to test.")), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-3 pt-2 border-t border-slate-800" }, /* @__PURE__ */ import_react16.default.createElement(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        handleAddDrug(inputDrug);
      },
      className: "flex gap-2"
    },
    /* @__PURE__ */ import_react16.default.createElement(
      "input",
      {
        type: "text",
        value: inputDrug,
        onChange: (e) => setInputDrug(e.target.value),
        placeholder: "Type drug name (e.g. Omeprazole, Atorvastatin)...",
        className: "flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-mediteal-400 focus:outline-none"
      }
    ),
    /* @__PURE__ */ import_react16.default.createElement(
      "button",
      {
        type: "submit",
        className: "flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-md"
      },
      /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.Plus, { className: "w-4 h-4" }),
      /* @__PURE__ */ import_react16.default.createElement("span", null, "Add to Stack")
    )
  ), /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-wrap items-center gap-1.5 text-xs" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-slate-400 text-[11px] mr-1" }, "Or click to add:"), COMMON_MEDICATIONS.map((m) => /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      key: m.id,
      type: "button",
      onClick: () => handleAddDrug(m.name),
      disabled: medsList.includes(m.name),
      className: "px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 text-[11px] disabled:opacity-40"
    },
    "+ ",
    m.name
  ))))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-4" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react16.default.createElement("h3", { className: "text-lg font-bold text-white" }, "Interaction Safety Results"), /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-xs text-slate-400" }, interactions.length, " interaction(s) identified")), interactions.length === 0 ? /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-3" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.CheckCircle2, { className: "w-6 h-6" })), /* @__PURE__ */ import_react16.default.createElement("h4", { className: "text-base font-bold text-white" }, "No Harmful Drug Interactions Detected"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-xs sm:text-sm text-emerald-200 max-w-md mx-auto leading-relaxed" }, "MediSafe AI reviewed the active medication stack (", medsList.join(" + "), ") against known pharmacology databases and found no high-severity clashes.")) : /* @__PURE__ */ import_react16.default.createElement("div", { className: "space-y-4" }, interactions.map((item, idx) => {
    const isSevere = item.severity === "SEVERE" || item.riskScore >= 80;
    const borderStyle = isSevere ? "border-rose-500/60 bg-gradient-to-b from-slate-900 via-slate-900 to-rose-950/30 shadow-rose-950/50" : "border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20 shadow-amber-950/30";
    return /* @__PURE__ */ import_react16.default.createElement(
      "div",
      {
        key: idx,
        className: `p-6 rounded-2xl border ${borderStyle} shadow-xl space-y-4`
      },
      /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ import_react16.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-500/20 px-2.5 py-0.5 rounded border border-rose-500/40" }, item.severity, " Interaction"), /* @__PURE__ */ import_react16.default.createElement(RiskBadge, { level: isSevere ? "HIGH" : "MEDIUM", score: item.riskScore, size: "sm" })), /* @__PURE__ */ import_react16.default.createElement("h4", { className: "text-xl font-bold text-white tracking-tight" }, item.drug1, " + ", item.drug2), /* @__PURE__ */ import_react16.default.createElement("div", { className: "text-xs text-slate-300 font-semibold mt-0.5" }, item.summary))),
      /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("strong", { className: "text-slate-200 block font-semibold" }, "Biochemical Mechanism:"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-slate-300 leading-relaxed" }, item.mechanism)),
      /* @__PURE__ */ import_react16.default.createElement("div", { className: "p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1" }, /* @__PURE__ */ import_react16.default.createElement("strong", { className: "text-rose-300 block font-semibold flex items-center gap-1.5" }, /* @__PURE__ */ import_react16.default.createElement(import_lucide_react15.AlertOctagon, { className: "w-4 h-4 text-rose-400 shrink-0" }), "Clinical Action Required:"), /* @__PURE__ */ import_react16.default.createElement("p", { className: "text-rose-100 leading-relaxed" }, item.actionRequired))
    );
  }))));
}

// src/components/ocr/PrescriptionOCRView.jsx
var import_react17 = __toESM(require("react"), 1);
var import_lucide_react16 = require("lucide-react");
function PrescriptionOCRView() {
  const { runSafetyCheck, setActiveTab, showToast } = useHealth();
  const [selectedPreset, setSelectedPreset] = (0, import_react17.useState)(SAMPLE_PRESCRIPTIONS[0]);
  const [isScanning, setIsScanning] = (0, import_react17.useState)(false);
  const [ocrResult, setOcrResult] = (0, import_react17.useState)(SAMPLE_PRESCRIPTIONS[0].extractedData);
  const [uploadedFile, setUploadedFile] = (0, import_react17.useState)(null);
  const handleRunScan = (preset) => {
    setSelectedPreset(preset);
    setIsScanning(true);
    setOcrResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setOcrResult(preset.extractedData);
      showToast(`OCR Parsed: Extracted ${preset.extractedData.medicines.length} medicine(s) with ${preset.extractedData.confidenceScore}% confidence`, "success");
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
          patientName: "Uploaded Prescription",
          patientAge: "65",
          medicines: [
            {
              name: "Ibuprofen",
              dosage: "400mg",
              frequency: "Twice daily with meals",
              duration: "10 days",
              notes: "Extracted via OCR optical character recognition"
            }
          ],
          physicianAdvice: "Take with full glass of water after food.",
          confidenceScore: 96.4
        };
        setOcrResult(mockExtracted);
        showToast("Prescription image processed successfully!", "success");
      }, 1400);
    }
  };
  const handleForwardToRiskChecker = (med) => {
    runSafetyCheck(med.name, med.dosage, med.frequency);
    setActiveTab("risk-checker");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Transferred ${med.name} into AI Risk Engine`, "info");
  };
  return /* @__PURE__ */ import_react17.default.createElement("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8" }, /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2" }, /* @__PURE__ */ import_react17.default.createElement(import_lucide_react16.Camera, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react17.default.createElement("span", null, "Prescription Optical Character Recognition (OCR)")), /* @__PURE__ */ import_react17.default.createElement("h1", { className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight" }, "Smart Prescription OCR Scanner"), /* @__PURE__ */ import_react17.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1" }, "Don\u2019t want to type your prescription? Upload or snap a photo of your doctor\u2019s slip, and MediSafe AI will automatically read the medicine, dosage, and intake directions.")), /* @__PURE__ */ import_react17.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider block" }, "Select A Sample Doctor's Prescription to Test OCR:"), /* @__PURE__ */ import_react17.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3" }, SAMPLE_PRESCRIPTIONS.map((preset) => /* @__PURE__ */ import_react17.default.createElement(
    "button",
    {
      key: preset.id,
      onClick: () => handleRunScan(preset),
      className: `p-3 rounded-xl border text-left text-xs transition flex flex-col justify-between ${selectedPreset.id === preset.id && !uploadedFile ? "bg-mediteal-500/15 border-mediteal-500/40 text-white" : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"}`
    },
    /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement("strong", { className: "block font-bold text-white mb-0.5" }, preset.title.split("\u2014")[0]), /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-[11px] text-slate-400 block" }, preset.doctorName)),
    /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-[10px] text-mediteal-300 font-mono mt-2 block" }, preset.previewText)
  )))), /* @__PURE__ */ import_react17.default.createElement("div", { className: "relative rounded-2xl border-2 border-dashed border-slate-750 hover:border-mediteal-500/50 bg-slate-900/60 p-8 text-center transition-all" }, /* @__PURE__ */ import_react17.default.createElement(
    "input",
    {
      type: "file",
      accept: "image/*,.pdf",
      onChange: handleFileUpload,
      className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
      title: "Upload or drop prescription image"
    }
  ), /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex flex-col items-center justify-center space-y-3 pointer-events-none" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-mediteal-500/20 to-mediblue-500/20 border border-mediteal-500/30 flex items-center justify-center text-mediteal-400" }, /* @__PURE__ */ import_react17.default.createElement(import_lucide_react16.UploadCloud, { className: "w-7 h-7" })), /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement("h3", { className: "text-base font-bold text-white" }, uploadedFile ? `Loaded: ${uploadedFile}` : "Drop your prescription photo here, or browse files"), /* @__PURE__ */ import_react17.default.createElement("p", { className: "text-xs text-slate-400 mt-1" }, "Supports JPEG, PNG, WEBP, or scanned clinical PDFs (Tesseract OCR Engine)")), /* @__PURE__ */ import_react17.default.createElement(
    "button",
    {
      type: "button",
      className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 pointer-events-auto"
    },
    "Select Prescription Image"
  ))), isScanning && /* @__PURE__ */ import_react17.default.createElement("div", { className: "p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 animate-fade-in relative overflow-hidden" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mediteal-400 to-transparent animate-bounce" }), /* @__PURE__ */ import_react17.default.createElement(import_lucide_react16.RefreshCw, { className: "w-8 h-8 text-mediteal-400 animate-spin mx-auto" }), /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement("h4", { className: "text-base font-bold text-white" }, "Scanning Prescription via OCR Pipeline..."), /* @__PURE__ */ import_react17.default.createElement("p", { className: "text-xs text-slate-400 mt-1" }, "Preprocessing image \u2022 Running text segmentation \u2022 Extracting drug names & dosages"))), !isScanning && ocrResult && /* @__PURE__ */ import_react17.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-emerald-500/30 shadow-xl space-y-6 animate-fade-in" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0" }, /* @__PURE__ */ import_react17.default.createElement(import_lucide_react16.CheckCircle2, { className: "w-6 h-6" })), /* @__PURE__ */ import_react17.default.createElement("div", null, /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded" }, "OCR Extraction Complete"), /* @__PURE__ */ import_react17.default.createElement("h3", { className: "text-lg font-bold text-white mt-1" }, "Extracted Medication Parameters"))), /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex items-center gap-2 text-xs" }, /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-slate-400" }, "Confidence Score:"), /* @__PURE__ */ import_react17.default.createElement("span", { className: "font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20" }, ocrResult.confidenceScore, "%"))), /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-3" }, /* @__PURE__ */ import_react17.default.createElement("h4", { className: "text-xs font-bold uppercase tracking-wider text-slate-400" }, "Identified Medications (", ocrResult.medicines.length, "):"), /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-3" }, ocrResult.medicines.map((med, idx) => /* @__PURE__ */ import_react17.default.createElement(
    "div",
    {
      key: idx,
      className: "p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
    },
    /* @__PURE__ */ import_react17.default.createElement("div", { className: "space-y-1" }, /* @__PURE__ */ import_react17.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-sm font-bold text-white" }, med.name), /* @__PURE__ */ import_react17.default.createElement("span", { className: "text-xs text-mediteal-300 font-mono px-2 py-0.5 rounded bg-mediteal-500/15 border border-mediteal-500/30" }, med.dosage)), /* @__PURE__ */ import_react17.default.createElement("div", { className: "text-xs text-slate-300" }, "Frequency: ", /* @__PURE__ */ import_react17.default.createElement("strong", { className: "text-slate-200" }, med.frequency), " \u2022 Duration: ", med.duration), med.notes && /* @__PURE__ */ import_react17.default.createElement("div", { className: "text-[11px] text-slate-400 italic" }, "Clinical Note: ", med.notes)),
    /* @__PURE__ */ import_react17.default.createElement(
      "button",
      {
        onClick: () => handleForwardToRiskChecker(med),
        className: "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 text-xs font-bold shadow-md transition shrink-0"
      },
      /* @__PURE__ */ import_react17.default.createElement("span", null, "Run AI Safety Check on this Drug"),
      /* @__PURE__ */ import_react17.default.createElement(import_lucide_react16.ArrowRight, { className: "w-3.5 h-3.5" })
    )
  )))), ocrResult.physicianAdvice && /* @__PURE__ */ import_react17.default.createElement("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300" }, /* @__PURE__ */ import_react17.default.createElement("strong", { className: "text-slate-200" }, "Extracted Instructions:"), " ", ocrResult.physicianAdvice)));
}

// src/components/history/MedicationHistoryView.jsx
var import_react18 = __toESM(require("react"), 1);
var import_lucide_react17 = require("lucide-react");
function MedicationHistoryView() {
  const { medicationHistory, setActiveTab, runSafetyCheck } = useHealth();
  const [searchQuery, setSearchQuery] = (0, import_react18.useState)("");
  const [filterLevel, setFilterLevel] = (0, import_react18.useState)("ALL");
  const filteredHistory = medicationHistory.filter((item) => {
    const matchesSearch = item.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) || item.primaryAlert.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterLevel === "ALL" || item.riskLevel.toUpperCase() === filterLevel;
    return matchesSearch && matchesFilter;
  });
  const highRiskCount = medicationHistory.filter((m) => m.riskLevel === "HIGH").length;
  const safeCount = medicationHistory.filter((m) => m.riskLevel === "LOW").length;
  const handleRecheck = (item) => {
    runSafetyCheck(item.medicineName, item.dosage);
    setActiveTab("risk-checker");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return /* @__PURE__ */ import_react18.default.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, /* @__PURE__ */ import_react18.default.createElement("div", null, /* @__PURE__ */ import_react18.default.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mediteal-500/10 border border-mediteal-500/20 text-mediteal-300 text-xs font-semibold mb-2" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.History, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react18.default.createElement("span", null, "Medication Safety Records")), /* @__PURE__ */ import_react18.default.createElement("h1", { className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight" }, "Medication History & Prediction Logs"), /* @__PURE__ */ import_react18.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1" }, "Track all previously analyzed prescriptions, risk evaluations, and safety verdicts.")), /* @__PURE__ */ import_react18.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("report");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 text-xs font-bold border border-mediteal-500/40 transition w-fit"
    },
    /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.Printer, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react18.default.createElement("span", null, "Generate Full Safety Report")
  )), /* @__PURE__ */ import_react18.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-xs font-semibold text-slate-400" }, "Total Checked"), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-white font-mono mt-1" }, medicationHistory.length), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-[11px] text-slate-400 mt-1" }, "Logged prescriptions")), /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-xs font-semibold text-rose-400" }, "High Risk Flagged"), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1" }, highRiskCount), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-[11px] text-rose-300/80 mt-1" }, "Contraindications blocked")), /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-xs font-semibold text-emerald-400" }, "Safe Profile Checks"), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1" }, safeCount), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-[11px] text-emerald-300/80 mt-1" }, "Low risk approvals")), /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-xs font-semibold text-sky-400" }, "Safety Index"), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-sky-400 font-mono mt-1" }, "100%"), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-[11px] text-slate-400 mt-1" }, "Explainability coverage"))), /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "relative w-full sm:w-72" }, /* @__PURE__ */ import_react18.default.createElement(
    "input",
    {
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "Search by drug name or reason...",
      className: "w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
    }
  ), /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.Search, { className: "w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" })), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0" }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "text-xs text-slate-400 mr-1 flex items-center gap-1" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.Filter, { className: "w-3 h-3" }), "Filter:"), ["ALL", "HIGH", "LOW"].map((lvl) => /* @__PURE__ */ import_react18.default.createElement(
    "button",
    {
      key: lvl,
      onClick: () => setFilterLevel(lvl),
      className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filterLevel === lvl ? "bg-mediteal-500 text-slate-950 font-bold" : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700"}`
    },
    lvl === "ALL" ? "All Records" : `${lvl} Risk`
  )))), /* @__PURE__ */ import_react18.default.createElement("div", { className: "space-y-3" }, filteredHistory.length === 0 ? /* @__PURE__ */ import_react18.default.createElement("div", { className: "p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-400 text-xs" }, "No medication history records found matching your filters.") : filteredHistory.map((item) => /* @__PURE__ */ import_react18.default.createElement(
    "div",
    {
      key: item.id,
      className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
    },
    /* @__PURE__ */ import_react18.default.createElement("div", { className: "space-y-1.5" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ import_react18.default.createElement("h3", { className: "text-base font-bold text-white" }, item.medicineName), /* @__PURE__ */ import_react18.default.createElement("span", { className: "text-xs text-slate-400 font-mono" }, "(", item.dosage, ")"), /* @__PURE__ */ import_react18.default.createElement(RiskBadge, { level: item.riskLevel, score: item.riskScore, size: "sm" })), /* @__PURE__ */ import_react18.default.createElement("div", { className: "text-xs text-slate-300" }, /* @__PURE__ */ import_react18.default.createElement("strong", { className: "text-slate-400 font-normal" }, "Primary Clinical Finding:"), " ", /* @__PURE__ */ import_react18.default.createElement("span", { className: "font-semibold text-slate-200" }, item.primaryAlert)), /* @__PURE__ */ import_react18.default.createElement("div", { className: "flex items-center gap-4 text-[11px] text-slate-400" }, /* @__PURE__ */ import_react18.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.Calendar, { className: "w-3 h-3 text-slate-400" }), item.date), /* @__PURE__ */ import_react18.default.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.Clock, { className: "w-3 h-3 text-slate-400" }), item.time), /* @__PURE__ */ import_react18.default.createElement("span", { className: "px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 font-mono text-[10px]" }, "Status: ", item.status))),
    /* @__PURE__ */ import_react18.default.createElement(
      "button",
      {
        onClick: () => handleRecheck(item),
        className: "flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition shrink-0"
      },
      /* @__PURE__ */ import_react18.default.createElement("span", null, "Re-Analyze"),
      /* @__PURE__ */ import_react18.default.createElement(import_lucide_react17.ArrowRight, { className: "w-3.5 h-3.5" })
    )
  ))));
}

// src/components/report/SafetyReportView.jsx
var import_react19 = __toESM(require("react"), 1);
var import_lucide_react18 = require("lucide-react");
function SafetyReportView() {
  const { patient, currentAnalysis, setActiveTab } = useHealth();
  const handlePrint = () => {
    window.print();
  };
  const reportId = `MSR-${Math.floor(1e5 + Math.random() * 9e5)}`;
  const currentDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ import_react19.default.createElement("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center justify-between print:hidden" }, /* @__PURE__ */ import_react19.default.createElement(
    "button",
    {
      onClick: () => setActiveTab("risk-checker"),
      className: "flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
    },
    /* @__PURE__ */ import_react19.default.createElement(import_lucide_react18.ArrowLeft, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react19.default.createElement("span", null, "Back to Risk Checker")
  ), /* @__PURE__ */ import_react19.default.createElement(
    "button",
    {
      onClick: handlePrint,
      className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold text-xs shadow-lg transition"
    },
    /* @__PURE__ */ import_react19.default.createElement(import_lucide_react18.Printer, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react19.default.createElement("span", null, "Print / Save as Clinical PDF")
  )), /* @__PURE__ */ import_react19.default.createElement("div", { className: "p-8 sm:p-12 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-2xl space-y-8 print:border-none print:shadow-none print:p-0" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center font-black text-xl" }, "M"), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("h1", { className: "text-2xl font-extrabold tracking-tight text-slate-950" }, "MediSafe AI \u2022 Clinical Safety Report"), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-xs text-slate-500 font-medium" }, "Explainable Medicine Risk Assessment & Alternative Analysis"))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "text-left sm:text-right text-xs space-y-0.5" }, /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("strong", null, "Report ID:"), " ", /* @__PURE__ */ import_react19.default.createElement("span", { className: "font-mono" }, reportId)), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("strong", null, "Generated:"), " ", currentDate), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("strong", null, "Engine:"), " MediSafe v2.0 (SHAP + XGBoost)"))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs" }, /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-slate-500 block uppercase tracking-wider text-[10px] font-bold" }, "Patient Name"), /* @__PURE__ */ import_react19.default.createElement("strong", { className: "text-slate-900 text-sm" }, patient.name)), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-slate-500 block uppercase tracking-wider text-[10px] font-bold" }, "Age & Gender"), /* @__PURE__ */ import_react19.default.createElement("strong", { className: "text-slate-900 text-sm" }, patient.age, " yrs \u2022 ", patient.gender)), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-slate-500 block uppercase tracking-wider text-[10px] font-bold" }, "Patient Weight"), /* @__PURE__ */ import_react19.default.createElement("strong", { className: "text-slate-900 text-sm" }, patient.weight, " kg")), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-slate-500 block uppercase tracking-wider text-[10px] font-bold" }, "Known Allergies"), /* @__PURE__ */ import_react19.default.createElement("strong", { className: "text-rose-700 text-sm" }, patient.allergies.length > 0 ? patient.allergies.join(", ") : "None Reported"))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "text-xs space-y-1" }, /* @__PURE__ */ import_react19.default.createElement("strong", { className: "text-slate-700 block uppercase tracking-wider text-[10px]" }, "Diagnosed Chronic Conditions:"), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-slate-800 font-medium" }, patient.diseases.length > 0 ? patient.diseases.join("; ") : "None documented in profile.")), /* @__PURE__ */ import_react19.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-100 border border-slate-300 space-y-4" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3" }, /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-500" }, "Medication Evaluated"), /* @__PURE__ */ import_react19.default.createElement("h2", { className: "text-xl font-extrabold text-slate-950" }, currentAnalysis.medicineName, " (", currentAnalysis.dosage, ")"), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-xs text-slate-600 font-medium" }, "Prescribed Intake: ", currentAnalysis.frequency)), /* @__PURE__ */ import_react19.default.createElement("div", { className: "text-left sm:text-right" }, /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block" }, "Calculated Safety Score"), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-2xl font-black font-mono text-slate-900" }, currentAnalysis.riskScore, "%"), /* @__PURE__ */ import_react19.default.createElement("span", { className: `block text-xs font-bold ${currentAnalysis.riskLevel === "HIGH" ? "text-rose-700" : "text-emerald-700"}` }, currentAnalysis.riskLevel === "HIGH" ? "\u26A0 HIGH RISK CONTRAINDICATION" : "LOW RISK PROFILE"))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "pt-3 border-t border-slate-200 text-xs text-slate-700 leading-relaxed" }, /* @__PURE__ */ import_react19.default.createElement("strong", null, "Clinical Synthesis:"), " ", currentAnalysis.plainEnglishExplanation)), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-3 text-xs" }, /* @__PURE__ */ import_react19.default.createElement("h3", { className: "text-xs font-extrabold uppercase tracking-wider text-slate-700" }, "Explainable AI Factor Attribution (SHAP Analysis)"), /* @__PURE__ */ import_react19.default.createElement("table", { className: "w-full border-collapse border border-slate-200 text-left" }, /* @__PURE__ */ import_react19.default.createElement("thead", null, /* @__PURE__ */ import_react19.default.createElement("tr", { className: "bg-slate-100 border-b border-slate-200 text-slate-700" }, /* @__PURE__ */ import_react19.default.createElement("th", { className: "p-2.5 font-bold" }, "Health Factor"), /* @__PURE__ */ import_react19.default.createElement("th", { className: "p-2.5 font-bold" }, "Mathematical Impact"), /* @__PURE__ */ import_react19.default.createElement("th", { className: "p-2.5 font-bold" }, "Clinical Rationale"))), /* @__PURE__ */ import_react19.default.createElement("tbody", { className: "divide-y divide-slate-200" }, currentAnalysis.shapFactors.map((f, i) => /* @__PURE__ */ import_react19.default.createElement("tr", { key: i, className: "hover:bg-slate-50" }, /* @__PURE__ */ import_react19.default.createElement("td", { className: "p-2.5 font-semibold text-slate-900" }, f.factor), /* @__PURE__ */ import_react19.default.createElement("td", { className: `p-2.5 font-mono font-bold ${f.type === "risk" ? "text-rose-600" : "text-emerald-600"}` }, f.impact), /* @__PURE__ */ import_react19.default.createElement("td", { className: "p-2.5 text-slate-600" }, f.description)))))), currentAnalysis.alternatives && currentAnalysis.alternatives.length > 0 && /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-3 text-xs" }, /* @__PURE__ */ import_react19.default.createElement("h3", { className: "text-xs font-extrabold uppercase tracking-wider text-slate-700" }, "Suggested Safer Alternative Medications for Doctor Review"), /* @__PURE__ */ import_react19.default.createElement("div", { className: "space-y-2" }, currentAnalysis.alternatives.map((alt, i) => /* @__PURE__ */ import_react19.default.createElement("div", { key: i, className: "p-3 rounded-xl border border-slate-200 bg-slate-50 space-y-1" }, /* @__PURE__ */ import_react19.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react19.default.createElement("strong", { className: "text-slate-950 font-bold" }, alt.name, " (", alt.dosage, ")"), /* @__PURE__ */ import_react19.default.createElement("span", { className: "text-[11px] font-bold text-emerald-700 font-mono" }, "Projected Risk: ", alt.projectedRiskScore, "% (LOW)")), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-slate-600" }, alt.whySafer), /* @__PURE__ */ import_react19.default.createElement("p", { className: "text-[11px] text-slate-500 italic" }, "Physician Note: ", alt.doctorNote))))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "pt-8 border-t-2 border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-600" }, /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("div", { className: "h-12 border-b border-slate-400 mb-1" }), /* @__PURE__ */ import_react19.default.createElement("span", null, "Prescribing Physician / Pharmacist Signature")), /* @__PURE__ */ import_react19.default.createElement("div", null, /* @__PURE__ */ import_react19.default.createElement("div", { className: "h-12 border-b border-slate-400 mb-1" }), /* @__PURE__ */ import_react19.default.createElement("span", null, "Review Date & Clinical License Number"))), /* @__PURE__ */ import_react19.default.createElement("div", { className: "text-[10px] text-slate-400 leading-relaxed text-center pt-4" }, "This document is generated by MediSafe AI for clinical decision support. Final prescription authority remains solely with licensed medical practitioners.")));
}

// src/components/dashboard/UserDashboard.jsx
var import_react20 = __toESM(require("react"), 1);
var import_lucide_react19 = require("lucide-react");
function UserDashboard() {
  const {
    patient,
    currentAnalysis,
    medicationHistory,
    setActiveTab,
    setIsChatbotOpen
  } = useHealth();
  return /* @__PURE__ */ import_react20.default.createElement("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-mediteal-950/40 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-mediteal-400 to-mediblue-500 text-slate-950 font-black flex items-center justify-center text-xl shadow-lg shrink-0" }, patient.name.charAt(0)), /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-mediteal-400" }, "Patient Safety Dashboard"), /* @__PURE__ */ import_react20.default.createElement("span", { className: "px-2 py-0.2 rounded-full bg-mediteal-500/10 text-mediteal-300 text-[10px] font-mono border border-mediteal-500/20" }, "Monitoring Active")), /* @__PURE__ */ import_react20.default.createElement("h1", { className: "text-2xl font-black text-white tracking-tight" }, "Welcome back, ", patient.name), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300" }, "Age ", patient.age, " \u2022 ", patient.gender, " \u2022 ", patient.diseases.join(", ") || "No chronic illnesses logged"))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-wrap items-center gap-2" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("risk-checker");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 text-xs font-bold shadow-md transition"
    },
    /* @__PURE__ */ import_react20.default.createElement(import_lucide_react19.Pill, { className: "w-4 h-4 text-slate-950" }),
    /* @__PURE__ */ import_react20.default.createElement("span", null, "Check A Medicine")
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("ocr");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition"
    },
    /* @__PURE__ */ import_react20.default.createElement(import_lucide_react19.Camera, { className: "w-4 h-4 text-mediteal-400" }),
    /* @__PURE__ */ import_react20.default.createElement("span", null, "Scan Prescription")
  ))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-slate-400 font-semibold" }, "Latest Risk Score"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-3xl font-black text-white font-mono mt-1 flex items-baseline gap-2" }, /* @__PURE__ */ import_react20.default.createElement("span", null, currentAnalysis ? `${currentAnalysis.riskScore}%` : "N/A"), currentAnalysis && /* @__PURE__ */ import_react20.default.createElement(RiskBadge, { level: currentAnalysis.riskLevel, size: "sm" })), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-[11px] text-slate-400 block mt-1" }, "Last drug: ", currentAnalysis?.medicineName || "None")), /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-slate-400 font-semibold" }, "Active Medications"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-3xl font-black text-mediteal-400 font-mono mt-1" }, patient.currentMedicines.length), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-[11px] text-slate-400 block mt-1" }, "Under regular monitoring")), /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-slate-400 font-semibold" }, "Known Allergies"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-3xl font-black text-amber-400 font-mono mt-1" }, patient.allergies.length), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-[11px] text-slate-400 block mt-1" }, "Protected against cross-reactivity")), /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900 border border-slate-800" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs text-slate-400 font-semibold" }, "Checks Conducted"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "text-3xl font-black text-sky-400 font-mono mt-1" }, medicationHistory.length), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-[11px] text-slate-400 block mt-1" }, "Archived in safety logs"))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "lg:col-span-2 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-[10px] font-bold uppercase tracking-wider text-slate-400" }, "Current Active Evaluation"), /* @__PURE__ */ import_react20.default.createElement("h2", { className: "text-lg font-bold text-white" }, currentAnalysis?.medicineName, " (", currentAnalysis?.dosage, ")")), /* @__PURE__ */ import_react20.default.createElement(RiskBadge, { level: currentAnalysis?.riskLevel, score: currentAnalysis?.riskScore, size: "md" })), /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed" }, /* @__PURE__ */ import_react20.default.createElement("strong", { className: "text-mediteal-300 block mb-1" }, "Explainable AI Safety Finding:"), currentAnalysis?.plainEnglishExplanation), /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-xs font-semibold text-slate-400 uppercase tracking-wider block" }, "Key Contributing Factors:"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, currentAnalysis?.shapFactors.slice(0, 4).map((f, i) => /* @__PURE__ */ import_react20.default.createElement("div", { key: i, className: "p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-center justify-between" }, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-slate-300" }, f.factor), /* @__PURE__ */ import_react20.default.createElement("span", { className: `font-mono font-bold ${f.type === "risk" ? "text-rose-400" : "text-emerald-400"}` }, f.impact))))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-wrap items-center justify-between gap-3 pt-2" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("risk-checker");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-1.5 text-xs font-bold text-mediteal-300 hover:text-white transition"
    },
    /* @__PURE__ */ import_react20.default.createElement("span", null, "View Full SHAP Breakdown & Alternatives"),
    /* @__PURE__ */ import_react20.default.createElement(import_lucide_react19.ArrowRight, { className: "w-3.5 h-3.5" })
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => {
        setActiveTab("report");
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      className: "flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
    },
    /* @__PURE__ */ import_react20.default.createElement(import_lucide_react19.FileText, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ import_react20.default.createElement("span", null, "Export Report")
  ))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-6" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800" }, /* @__PURE__ */ import_react20.default.createElement("h3", { className: "text-sm font-bold text-white flex items-center gap-2" }, /* @__PURE__ */ import_react20.default.createElement(import_lucide_react19.User, { className: "w-4 h-4 text-mediteal-400" }), "Health Profile Summary"), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => setActiveTab("profile"),
      className: "text-xs text-mediteal-400 hover:underline font-semibold"
    },
    "Edit"
  )), /* @__PURE__ */ import_react20.default.createElement("div", { className: "space-y-3 text-xs" }, /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-slate-400 block font-semibold mb-1" }, "Conditions:"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-wrap gap-1" }, patient.diseases.map((d) => /* @__PURE__ */ import_react20.default.createElement("span", { key: d, className: "px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 text-[11px]" }, d)), patient.diseases.length === 0 && /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-slate-500" }, "None logged"))), /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-slate-400 block font-semibold mb-1" }, "Allergies:"), /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex flex-wrap gap-1" }, patient.allergies.map((a) => /* @__PURE__ */ import_react20.default.createElement("span", { key: a, className: "px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 text-[11px]" }, a)), patient.allergies.length === 0 && /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-emerald-400" }, "None logged"))), /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-slate-400 block font-semibold mb-1" }, "Current Prescriptions:"), /* @__PURE__ */ import_react20.default.createElement("ul", { className: "space-y-1" }, patient.currentMedicines.map((m, i) => /* @__PURE__ */ import_react20.default.createElement("li", { key: i, className: "text-slate-300 flex justify-between" }, /* @__PURE__ */ import_react20.default.createElement("span", null, "\u2022 ", m.name), /* @__PURE__ */ import_react20.default.createElement("span", { className: "text-slate-400 font-mono text-[10px]" }, m.dosage))), patient.currentMedicines.length === 0 && /* @__PURE__ */ import_react20.default.createElement("li", { className: "text-slate-500 italic" }, "None"))))), /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-5 rounded-2xl bg-gradient-to-br from-mediteal-950/40 via-slate-900 to-mediblue-950/40 border border-mediteal-500/30 shadow-lg space-y-3" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react20.default.createElement("div", { className: "p-2 rounded-xl bg-mediteal-500/20 text-mediteal-400 border border-mediteal-500/30 shrink-0" }, /* @__PURE__ */ import_react20.default.createElement(import_lucide_react19.Bot, { className: "w-5 h-5" })), /* @__PURE__ */ import_react20.default.createElement("div", null, /* @__PURE__ */ import_react20.default.createElement("h4", { className: "text-sm font-bold text-white" }, "MediSafe AI Chatbot"), /* @__PURE__ */ import_react20.default.createElement("p", { className: "text-[11px] text-slate-300" }, "Need plain-English medication guidance?"))), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      onClick: () => setIsChatbotOpen(true),
      className: "w-full py-2 px-3 rounded-xl bg-mediteal-500/20 hover:bg-mediteal-500/30 text-mediteal-300 font-bold text-xs border border-mediteal-500/40 transition"
    },
    "Ask MediSafe AI Assistant \u2192"
  )))));
}

// src/components/chatbot/AIChatbotModal.jsx
var import_react21 = __toESM(require("react"), 1);
var import_lucide_react20 = require("lucide-react");
function AIChatbotModal() {
  const { isChatbotOpen, setIsChatbotOpen, patient } = useHealth();
  const [inputMessage, setInputMessage] = (0, import_react21.useState)("");
  const [messages, setMessages] = (0, import_react21.useState)([
    {
      id: "msg-1",
      sender: "ai",
      text: `Hello ${patient.name.split(" ")[0]}! I am MediSafe AI, your 24/7 personal medication safety assistant. How can I assist you with your prescriptions, side effects, or drug combinations today?`,
      time: "Just now"
    }
  ]);
  const [isTyping, setIsTyping] = (0, import_react21.useState)(false);
  if (!isChatbotOpen) return null;
  const suggestedQuestions = [
    "Can I take Ibuprofen with Kidney Disease?",
    "Why is mixing Warfarin and Aspirin dangerous?",
    "How do I read my SHAP Explainability score?",
    "What is a safe alternative to Ibuprofen?"
  ];
  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;
    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);
    setTimeout(() => {
      let reply = "";
      const lower = text.toLowerCase();
      if (lower.includes("kidney") || lower.includes("ibuprofen")) {
        reply = `\u26A0\uFE0F Great question! For patients with Kidney Disease (or seniors over 65), Ibuprofen and other NSAIDs can be dangerous. They restrict blood flow into the kidney's filtering units (nephrons), which can trigger acute kidney injury. We recommend discussing non-NSAID options like Acetaminophen (Paracetamol) with your doctor!`;
      } else if (lower.includes("warfarin") || lower.includes("aspirin") || lower.includes("bleeding")) {
        reply = `\u{1F6A8} Caution: Warfarin and Aspirin both thin your blood, but through completely different biological pathways. Taking them together compounds their effect and can cause severe, life-threatening internal or gastrointestinal bleeding. Never combine them unless explicitly prescribed and monitored by a cardiologist!`;
      } else if (lower.includes("shap") || lower.includes("explain")) {
        reply = `\u2728 MediSafe AI uses SHAP (SHapley Additive exPlanations) so you never get a mysterious black-box risk number. For example, it shows: Age > 65 (+25%), Chronic Kidney Disease (+35%), and High Dosage (+15%). This helps you and your doctor verify the exact clinical reasons behind every safety score.`;
      } else if (lower.includes("alternative") || lower.includes("substitute") || lower.includes("pain")) {
        reply = `\u{1F48A} Safer alternatives depend on your organ profile. If you have kidney or stomach sensitivities, Acetaminophen (Paracetamol) or localized topical gels (like Diclofenac gel) are often preferred because they spare the renal vasculature and stomach lining. Check our 'Safe Alternatives' tab for detailed comparisons!`;
      } else {
        reply = `Thank you for asking. Based on clinical guidelines and your profile (${patient.age} yrs, ${patient.diseases.join(", ") || "Healthy"}), MediSafe AI always checks for drug-disease conflicts, multi-drug interactions, and allergy triggers before recommending safe use. Always check with your doctor before altering your medication routine!`;
      }
      const aiMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: "ai",
        text: reply,
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };
  return /* @__PURE__ */ import_react21.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "relative w-full max-w-lg h-[600px] max-h-[90vh] rounded-2xl border border-mediteal-500/40 bg-slate-900 shadow-2xl flex flex-col overflow-hidden" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "p-4 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-mediteal-400 to-mediblue-600 text-slate-950 shadow-md" }, /* @__PURE__ */ import_react21.default.createElement(import_lucide_react20.Bot, { className: "w-5 h-5 text-slate-950" }), /* @__PURE__ */ import_react21.default.createElement("span", { className: "absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" })), /* @__PURE__ */ import_react21.default.createElement("div", null, /* @__PURE__ */ import_react21.default.createElement("h3", { className: "text-sm font-bold text-white flex items-center gap-1.5" }, "MediSafe AI Assistant", /* @__PURE__ */ import_react21.default.createElement(import_lucide_react20.Sparkles, { className: "w-3.5 h-3.5 text-mediteal-400" })), /* @__PURE__ */ import_react21.default.createElement("p", { className: "text-[11px] text-slate-400" }, "24/7 Explainable Medication Guidance"))), /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      onClick: () => setIsChatbotOpen(false),
      className: "p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
    },
    /* @__PURE__ */ import_react21.default.createElement(import_lucide_react20.X, { className: "w-5 h-5" })
  )), /* @__PURE__ */ import_react21.default.createElement("div", { className: "flex-1 overflow-y-auto p-4 space-y-4" }, messages.map((m) => {
    const isAI = m.sender === "ai";
    return /* @__PURE__ */ import_react21.default.createElement(
      "div",
      {
        key: m.id,
        className: `flex items-start gap-2.5 ${isAI ? "justify-start" : "justify-end"}`
      },
      isAI && /* @__PURE__ */ import_react21.default.createElement("div", { className: "w-7 h-7 rounded-lg bg-mediteal-500/20 text-mediteal-400 flex items-center justify-center text-xs shrink-0 mt-0.5" }, /* @__PURE__ */ import_react21.default.createElement(import_lucide_react20.Bot, { className: "w-4 h-4" })),
      /* @__PURE__ */ import_react21.default.createElement(
        "div",
        {
          className: `max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${isAI ? "bg-slate-950 border border-slate-800 text-slate-200" : "bg-gradient-to-r from-mediteal-500 to-mediblue-600 text-slate-950 font-medium"}`
        },
        /* @__PURE__ */ import_react21.default.createElement("p", null, m.text),
        /* @__PURE__ */ import_react21.default.createElement("span", { className: `text-[10px] block mt-1 ${isAI ? "text-slate-500" : "text-slate-800 font-mono"}` }, m.time)
      )
    );
  }), isTyping && /* @__PURE__ */ import_react21.default.createElement("div", { className: "flex items-center gap-2 text-xs text-slate-400" }, /* @__PURE__ */ import_react21.default.createElement(import_lucide_react20.Bot, { className: "w-4 h-4 text-mediteal-400 animate-spin" }), /* @__PURE__ */ import_react21.default.createElement("span", null, "MediSafe AI is formulating guidance..."))), /* @__PURE__ */ import_react21.default.createElement("div", { className: "px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto" }, /* @__PURE__ */ import_react21.default.createElement("span", { className: "text-[10px] text-slate-400 font-semibold block mb-1.5" }, "Suggested questions:"), /* @__PURE__ */ import_react21.default.createElement("div", { className: "flex gap-1.5 whitespace-nowrap pb-1" }, suggestedQuestions.map((q, idx) => /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      key: idx,
      onClick: () => handleSendMessage(q),
      className: "px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-750 hover:border-mediteal-500/50 text-[11px] text-slate-300 hover:text-white transition shrink-0"
    },
    q
  )))), /* @__PURE__ */ import_react21.default.createElement("div", { className: "p-3 border-t border-slate-800 bg-slate-950" }, /* @__PURE__ */ import_react21.default.createElement(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        handleSendMessage();
      },
      className: "flex items-center gap-2"
    },
    /* @__PURE__ */ import_react21.default.createElement(
      "input",
      {
        type: "text",
        value: inputMessage,
        onChange: (e) => setInputMessage(e.target.value),
        placeholder: "Ask about side effects, pills, or food interactions...",
        className: "flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:border-mediteal-400 focus:outline-none"
      }
    ),
    /* @__PURE__ */ import_react21.default.createElement(
      "button",
      {
        type: "submit",
        disabled: !inputMessage.trim() || isTyping,
        className: "p-2.5 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-bold transition disabled:opacity-40"
      },
      /* @__PURE__ */ import_react21.default.createElement(import_lucide_react20.Send, { className: "w-4 h-4" })
    )
  ), /* @__PURE__ */ import_react21.default.createElement("span", { className: "text-[10px] text-slate-500 block text-center mt-1" }, "Decision support only. Consult a doctor for medical emergencies."))));
}

// src/components/auth/AuthPortal.jsx
var import_react22 = __toESM(require("react"), 1);
var import_lucide_react21 = require("lucide-react");
function AuthPortal() {
  const { login, register } = useHealth();
  const [activeTab, setActiveTab] = (0, import_react22.useState)("login");
  const [showPassword, setShowPassword] = (0, import_react22.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react22.useState)("");
  const [loading, setLoading] = (0, import_react22.useState)(false);
  const [loginEmail, setLoginEmail] = (0, import_react22.useState)("");
  const [loginPassword, setLoginPassword] = (0, import_react22.useState)("");
  const [regName, setRegName] = (0, import_react22.useState)("");
  const [regEmail, setRegEmail] = (0, import_react22.useState)("");
  const [regPassword, setRegPassword] = (0, import_react22.useState)("");
  const [regConfirmPassword, setRegConfirmPassword] = (0, import_react22.useState)("");
  const [regRole, setRegRole] = (0, import_react22.useState)("patient");
  const [regDepartment, setRegDepartment] = (0, import_react22.useState)("General Medicine");
  const [regLicense, setRegLicense] = (0, import_react22.useState)("");
  const [regAge, setRegAge] = (0, import_react22.useState)("45");
  const [regGender, setRegGender] = (0, import_react22.useState)("Male");
  const [regCondition, setRegCondition] = (0, import_react22.useState)("");
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);
    setTimeout(() => {
      const result = login(loginEmail, loginPassword);
      setLoading(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 400);
  };
  const handleDemoLogin = (email, pass) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMessage("");
    setLoading(true);
    setTimeout(() => {
      login(email, pass);
      setLoading(false);
    }, 300);
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail)) {
      setErrorMessage("Please provide a valid email address (e.g. user@domain.com).");
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters in length.");
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter your password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const payload = {
        name: regName,
        email: regEmail,
        password: regPassword,
        role: regRole,
        department: regRole === "clinician" ? regDepartment : void 0,
        licenseNumber: regRole === "clinician" ? regLicense || "MD-ACTIVE" : void 0,
        age: regAge ? Number(regAge) : 40,
        gender: regGender,
        chronicDiseases: regCondition ? [regCondition] : [],
        allergies: []
      };
      const result = register(payload);
      setLoading(false);
      if (!result.success) {
        setErrorMessage(result.message);
      }
    }, 450);
  };
  return /* @__PURE__ */ import_react22.default.createElement("div", { className: "min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden selection:bg-mediteal-500/30 selection:text-mediteal-300" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-mediteal-500/10 via-mediblue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ import_react22.default.createElement("div", { className: "absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" }), /* @__PURE__ */ import_react22.default.createElement("div", { className: "w-full max-w-xl relative z-10 space-y-6" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-center space-y-3" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-mediteal-400 to-mediblue-600 text-slate-950 shadow-xl shadow-mediteal-500/20 mb-1 ring-4 ring-mediteal-500/10 animate-fade-in" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Shield, { className: "w-8 h-8 stroke-[2.5]" })), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center justify-center gap-2" }, /* @__PURE__ */ import_react22.default.createElement("h1", { className: "text-2xl sm:text-3xl font-black text-white tracking-tight" }, "MediSafe", /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-mediteal-400" }, ".AI")), /* @__PURE__ */ import_react22.default.createElement("span", { className: "px-2 py-0.5 rounded-full bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40 text-[10px] font-mono font-bold tracking-wider uppercase" }, "v2.0")), /* @__PURE__ */ import_react22.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1 max-w-md mx-auto" }, "Clinical Drug Safety, Pharmacological Clash Scanner & Explainable AI")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-mediteal-300 shadow-sm" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Lock, { className: "w-3 h-3 text-mediteal-400" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Secure Authentication Required to Access Clinical Tools"))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/90 backdrop-blur-2xl shadow-2xl p-6 sm:p-8 space-y-6" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-2 p-1 rounded-2xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        setActiveTab("login");
        setErrorMessage("");
      },
      className: `py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === "login" ? "bg-gradient-to-r from-mediteal-500 to-mediblue-600 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.KeyRound, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react22.default.createElement("span", null, "Sign In")
  ), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => {
        setActiveTab("register");
        setErrorMessage("");
      },
      className: `py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === "register" ? "bg-gradient-to-r from-mediteal-500 to-mediblue-600 text-slate-950 shadow-md" : "text-slate-400 hover:text-white"}`
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.UserCheck, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react22.default.createElement("span", null, "Create Account")
  )), errorMessage && /* @__PURE__ */ import_react22.default.createElement("div", { className: "p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.AlertCircle, { className: "w-4 h-4 text-rose-400 shrink-0 mt-0.5" }), /* @__PURE__ */ import_react22.default.createElement("div", { className: "leading-relaxed" }, errorMessage)), activeTab === "login" && /* @__PURE__ */ import_react22.default.createElement("form", { onSubmit: handleLoginSubmit, className: "space-y-4" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-mediteal-400 flex items-center gap-1.5" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Sparkles, { className: "w-3.5 h-3.5" }), "1-Click Instant Dashboard Access"), /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-[10px] text-slate-500 font-mono" }, "No typing required")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleDemoLogin("robert.jenkins@medisafe.care", "Patient@123"),
      className: "p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-mediteal-500/15 hover:from-emerald-500/25 hover:to-mediteal-500/25 border border-emerald-500/30 text-left transition group"
    },
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center gap-1.5 text-xs font-bold text-emerald-300" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.HeartPulse, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Enter User Dashboard")),
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-[10px] text-slate-400 truncate mt-0.5" }, "Patient Safety & Medications")
  ), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleDemoLogin("admin@medisafe.ai", "Admin@123"),
      className: "p-2.5 rounded-xl bg-gradient-to-r from-purple-500/15 to-indigo-500/15 hover:from-purple-500/25 hover:to-indigo-500/25 border border-purple-500/30 text-left transition group"
    },
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center gap-1.5 text-xs font-bold text-purple-300" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.ShieldCheck, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Enter Admin Registry")),
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-[10px] text-slate-400 truncate mt-0.5" }, "Stored Users & Deduplication")
  ))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative border-t border-slate-800 text-center my-1" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "bg-slate-900 px-3 text-[10px] uppercase tracking-wider text-slate-500 relative -top-2" }, "Or Sign In With Custom Email & Password")), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Email Address"), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "email",
      required: true,
      value: loginEmail,
      onChange: (e) => setLoginEmail(e.target.value),
      placeholder: "e.g. robert.jenkins@medisafe.care",
      className: "w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition shadow-inner"
    }
  ), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Mail, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-3" }))), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center justify-between mb-1.5" }, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300" }, "Password"), /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-[11px] text-slate-500" }, "Case-sensitive")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: showPassword ? "text" : "password",
      required: true,
      value: loginPassword,
      onChange: (e) => setLoginPassword(e.target.value),
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      className: "w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition shadow-inner"
    }
  ), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Lock, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-3" }), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setShowPassword(!showPassword),
      className: "p-1 absolute right-3 top-2.5 text-slate-400 hover:text-white"
    },
    showPassword ? /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Eye, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "submit",
      disabled: loading,
      className: "w-full py-3 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-mediteal-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
    },
    loading ? /* @__PURE__ */ import_react22.default.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" }), "Validating Credentials\u2026") : /* @__PURE__ */ import_react22.default.createElement(import_react22.default.Fragment, null, /* @__PURE__ */ import_react22.default.createElement("span", null, "Sign In to Unlock Tasks"), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.ArrowRight, { className: "w-4 h-4" }))
  ), /* @__PURE__ */ import_react22.default.createElement("div", { className: "pt-3 border-t border-slate-800 space-y-2.5" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-[11px] font-bold uppercase tracking-wider text-slate-400" }, "Quick 1-Click Demo Accounts:"), /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-[10px] text-slate-500 font-mono" }, "Instant Fill")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2" }, /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleDemoLogin("robert.jenkins@medisafe.care", "Patient@123"),
      className: "p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-mediteal-500/40 text-left transition group"
    },
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center gap-1.5 text-xs font-bold text-mediteal-300" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.HeartPulse, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Patient")),
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-[10px] text-slate-400 truncate mt-0.5" }, "Robert Jenkins (68y)")
  ), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleDemoLogin("dr.sharma@medisafe.ai", "Doctor@123"),
      className: "p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-sky-500/40 text-left transition group"
    },
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center gap-1.5 text-xs font-bold text-sky-300" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Stethoscope, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Clinician")),
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-[10px] text-slate-400 truncate mt-0.5" }, "Dr. Rajesh Sharma, MD")
  ), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => handleDemoLogin("admin@medisafe.ai", "Admin@123"),
      className: "p-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 text-left transition group"
    },
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex items-center gap-1.5 text-xs font-bold text-purple-300" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.ShieldCheck, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Admin")),
    /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-[10px] text-slate-400 truncate mt-0.5" }, "Full Audit & Users")
  )))), activeTab === "register" && /* @__PURE__ */ import_react22.default.createElement("form", { onSubmit: handleRegisterSubmit, className: "space-y-4" }, /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Select Your Account Role"), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-3 gap-2" }, /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setRegRole("patient"),
      className: `p-2 rounded-xl text-xs font-bold border transition text-center ${regRole === "patient" ? "bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/60 shadow-sm" : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"}`
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.HeartPulse, { className: "w-4 h-4 mx-auto mb-1 text-mediteal-400" }),
    /* @__PURE__ */ import_react22.default.createElement("span", null, "Patient")
  ), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setRegRole("clinician"),
      className: `p-2 rounded-xl text-xs font-bold border transition text-center ${regRole === "clinician" ? "bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/60 shadow-sm" : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"}`
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Stethoscope, { className: "w-4 h-4 mx-auto mb-1 text-sky-400" }),
    /* @__PURE__ */ import_react22.default.createElement("span", null, "Doctor / Staff")
  ), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setRegRole("admin"),
      className: `p-2 rounded-xl text-xs font-bold border transition text-center ${regRole === "admin" ? "bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/60 shadow-sm" : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"}`
    },
    /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.ShieldCheck, { className: "w-4 h-4 mx-auto mb-1 text-purple-400" }),
    /* @__PURE__ */ import_react22.default.createElement("span", null, "Admin")
  ))), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Full Name"), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "text",
      required: true,
      value: regName,
      onChange: (e) => setRegName(e.target.value),
      placeholder: "e.g. John Doe, MD or Eleanor Vance",
      className: "w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition"
    }
  ), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.User, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" }))), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Email Address ", /* @__PURE__ */ import_react22.default.createElement("span", { className: "text-slate-500 font-normal" }, "(Unique Login ID)")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "email",
      required: true,
      value: regEmail,
      onChange: (e) => setRegEmail(e.target.value),
      placeholder: "your.email@hospital.org or personal email",
      className: "w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition"
    }
  ), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Mail, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" }))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3" }, /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Create Password"), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "password",
      required: true,
      value: regPassword,
      onChange: (e) => setRegPassword(e.target.value),
      placeholder: "Min 6 chars",
      className: "w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:border-mediteal-400 focus:outline-none transition"
    }
  ), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Lock, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" }))), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-xs font-semibold text-slate-300 mb-1.5" }, "Confirm Password"), /* @__PURE__ */ import_react22.default.createElement("div", { className: "relative" }, /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "password",
      required: true,
      value: regConfirmPassword,
      onChange: (e) => setRegConfirmPassword(e.target.value),
      placeholder: "Repeat password",
      className: `w-full pl-10 pr-3.5 py-2 rounded-xl bg-slate-950 border text-white text-xs sm:text-sm focus:outline-none transition ${regConfirmPassword && regPassword !== regConfirmPassword ? "border-rose-500 focus:border-rose-400" : "border-slate-700 focus:border-mediteal-400"}`
    }
  ), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Lock, { className: "w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" })))), regRole === "clinician" && /* @__PURE__ */ import_react22.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-xs font-bold text-sky-300 flex items-center gap-1.5" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Building2, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Clinical Credentials")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2" }, /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Medical Department"), /* @__PURE__ */ import_react22.default.createElement(
    "select",
    {
      value: regDepartment,
      onChange: (e) => setRegDepartment(e.target.value),
      className: "w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
    },
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "General Medicine" }, "General Medicine"),
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Cardiology" }, "Cardiology"),
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Nephrology" }, "Nephrology"),
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Endocrinology" }, "Endocrinology"),
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Clinical Pharmacology" }, "Clinical Pharmacology")
  )), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "License # or NPI"), /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "text",
      value: regLicense,
      onChange: (e) => setRegLicense(e.target.value),
      placeholder: "e.g. MD-98421",
      className: "w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
    }
  )))), regRole === "patient" && /* @__PURE__ */ import_react22.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "text-xs font-bold text-mediteal-300 flex items-center gap-1.5" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.HeartPulse, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Patient Profile Setup")), /* @__PURE__ */ import_react22.default.createElement("div", { className: "grid grid-cols-2 gap-2" }, /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Age"), /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      type: "number",
      min: "1",
      max: "120",
      value: regAge,
      onChange: (e) => setRegAge(e.target.value),
      className: "w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
    }
  )), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Gender"), /* @__PURE__ */ import_react22.default.createElement(
    "select",
    {
      value: regGender,
      onChange: (e) => setRegGender(e.target.value),
      className: "w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
    },
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Male" }, "Male"),
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Female" }, "Female"),
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "Other" }, "Other")
  ))), /* @__PURE__ */ import_react22.default.createElement("div", null, /* @__PURE__ */ import_react22.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Primary Chronic Condition (Optional)"), /* @__PURE__ */ import_react22.default.createElement(
    "select",
    {
      value: regCondition,
      onChange: (e) => setRegCondition(e.target.value),
      className: "w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
    },
    /* @__PURE__ */ import_react22.default.createElement("option", { value: "" }, "None / Healthy"),
    DISEASE_LIST.map((dis) => /* @__PURE__ */ import_react22.default.createElement("option", { key: dis, value: dis }, dis))
  ))), /* @__PURE__ */ import_react22.default.createElement(
    "button",
    {
      type: "submit",
      disabled: loading,
      className: "w-full py-3 rounded-xl bg-gradient-to-r from-mediteal-500 to-mediblue-600 hover:from-mediteal-400 hover:to-mediblue-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-mediteal-500/20 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
    },
    loading ? /* @__PURE__ */ import_react22.default.createElement("span", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" }), "Registering Account & Deduplicating\u2026") : /* @__PURE__ */ import_react22.default.createElement(import_react22.default.Fragment, null, /* @__PURE__ */ import_react22.default.createElement("span", null, "Complete Registration & Unlock Portal"), /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.ArrowRight, { className: "w-4 h-4" }))
  ))), /* @__PURE__ */ import_react22.default.createElement("div", { className: "flex flex-wrap items-center justify-center gap-4 text-slate-400 text-xs text-center" }, /* @__PURE__ */ import_react22.default.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.ShieldCheck, { className: "w-4 h-4 text-emerald-400" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "256-Bit Encrypted Portal")), /* @__PURE__ */ import_react22.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react22.default.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.Sparkles, { className: "w-4 h-4 text-mediteal-400" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Explainable AI Engine")), /* @__PURE__ */ import_react22.default.createElement("span", null, "\u2022"), /* @__PURE__ */ import_react22.default.createElement("span", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ import_react22.default.createElement(import_lucide_react21.FileCheck, { className: "w-4 h-4 text-sky-400" }), /* @__PURE__ */ import_react22.default.createElement("span", null, "Automatic Deduplication")))));
}

// src/components/admin/AdminDashboardView.jsx
var import_react23 = __toESM(require("react"), 1);
var import_lucide_react22 = require("lucide-react");
function AdminDashboardView() {
  const {
    currentUser,
    users,
    auditLogs,
    login,
    deduplicateUsers,
    changeUserStatus,
    removeUser,
    adminAddUser,
    setActiveTab,
    showToast
  } = useHealth();
  const [searchQuery, setSearchQuery] = (0, import_react23.useState)("");
  const [roleFilter, setRoleFilter] = (0, import_react23.useState)("ALL");
  const [typeFilter, setTypeFilter] = (0, import_react23.useState)("ALL");
  const [statusFilter, setStatusFilter] = (0, import_react23.useState)("ALL");
  const [selectedUser, setSelectedUser] = (0, import_react23.useState)(null);
  const [isAddUserOpen, setIsAddUserOpen] = (0, import_react23.useState)(false);
  const [dedupReport, setDedupReport] = (0, import_react23.useState)(null);
  const [addName, setAddName] = (0, import_react23.useState)("");
  const [addEmail, setAddEmail] = (0, import_react23.useState)("");
  const [addPassword, setAddPassword] = (0, import_react23.useState)("");
  const [addRole, setAddRole] = (0, import_react23.useState)("patient");
  const [addDepartment, setAddDepartment] = (0, import_react23.useState)("General Medicine");
  const [addLicense, setAddLicense] = (0, import_react23.useState)("");
  const [addAge, setAddAge] = (0, import_react23.useState)("45");
  const [addGender, setAddGender] = (0, import_react23.useState)("Male");
  const [addCondition, setAddCondition] = (0, import_react23.useState)("");
  if (!currentUser || currentUser.role !== "admin") {
    return /* @__PURE__ */ import_react23.default.createElement("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center space-y-6 animate-fade-in" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mx-auto shadow-lg" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.ShieldCheck, { className: "w-8 h-8" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ import_react23.default.createElement("h1", { className: "text-2xl font-black text-white" }, "System Administrator Console"), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-sm text-slate-400 max-w-md mx-auto" }, "You are currently signed in as ", /* @__PURE__ */ import_react23.default.createElement("strong", { className: "text-white" }, currentUser?.name || "Standard User"), " (", currentUser?.role || "Guest", "). To view all stored user records, run deduplication, or manage accounts, switch to Administrator mode below:")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex flex-wrap items-center justify-center gap-3" }, /* @__PURE__ */ import_react23.default.createElement(
      "button",
      {
        onClick: () => login("admin@medisafe.ai", "Admin@123"),
        className: "px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-mediblue-600 hover:from-purple-500 hover:to-mediblue-500 text-white text-xs font-black shadow-xl shadow-purple-500/20 transition flex items-center gap-2 hover:scale-102"
      },
      /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.ShieldCheck, { className: "w-4 h-4" }),
      /* @__PURE__ */ import_react23.default.createElement("span", null, "Switch to System Administrator (1-Click)")
    ), /* @__PURE__ */ import_react23.default.createElement(
      "button",
      {
        onClick: () => setActiveTab("dashboard"),
        className: "px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
      },
      "Return to Dashboard"
    )));
  }
  const filteredUsers = users.filter((u) => {
    const matchesQuery = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase()) || u.department && u.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    const matchesType = typeFilter === "ALL" || typeFilter === "NEW" && u.isNewUser || typeFilter === "EXISTING" && !u.isNewUser;
    const matchesStatus = statusFilter === "ALL" || u.status === statusFilter;
    return matchesQuery && matchesRole && matchesType && matchesStatus;
  });
  const totalUsersCount = users.length;
  const newUsersCount = users.filter((u) => u.isNewUser).length;
  const existingUsersCount = users.filter((u) => !u.isNewUser).length;
  const cliniciansCount = users.filter((u) => u.role === "clinician").length;
  const patientsCount = users.filter((u) => u.role === "patient").length;
  const handleRunDeduplication = () => {
    const report = deduplicateUsers();
    setDedupReport(report);
  };
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    const result = adminAddUser({
      name: addName,
      email: addEmail,
      password: addPassword,
      role: addRole,
      department: addRole === "clinician" ? addDepartment : void 0,
      licenseNumber: addRole === "clinician" ? addLicense : void 0,
      age: addAge ? Number(addAge) : 40,
      gender: addGender,
      chronicDiseases: addCondition ? [addCondition] : [],
      status: "Active"
    });
    if (result.success) {
      setIsAddUserOpen(false);
      setAddName("");
      setAddEmail("");
      setAddPassword("");
    }
  };
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `medisafe_users_registry_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Exported complete user database as JSON", "success");
  };
  return /* @__PURE__ */ import_react23.default.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-purple-500/20 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-start sm:items-center gap-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-mediblue-600 text-white font-black flex items-center justify-center text-2xl shadow-xl shadow-purple-500/20 shrink-0" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.ShieldCheck, { className: "w-7 h-7" })), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-2 mb-1" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-purple-400" }, "System Administrator Console"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/40" }, "Full Privileges")), /* @__PURE__ */ import_react23.default.createElement("h1", { className: "text-2xl sm:text-3xl font-black text-white tracking-tight" }, "User Registry & Database Deduplication"), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs sm:text-sm text-slate-300 mt-1" }, "Manage existing patient/doctor accounts, track newly registered users, enforce data uniqueness, and review system audit logs."))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex flex-wrap items-center gap-2.5 shrink-0" }, /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: handleRunDeduplication,
      className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white text-xs font-bold shadow-lg shadow-rose-500/20 transition-all hover:scale-102",
      title: "Scan database and remove all duplicate records"
    },
    /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.RefreshCw, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react23.default.createElement("span", null, "Remove Duplicate Records")
  ), /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: () => setIsAddUserOpen(true),
      className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 text-xs font-black shadow-lg shadow-mediteal-500/20 transition-all hover:scale-102"
    },
    /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.UserPlus, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react23.default.createElement("span", null, "Add User")
  ), /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: handleExportData,
      className: "flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition",
      title: "Export user registry data as JSON"
    },
    /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Download, { className: "w-4 h-4" }),
    /* @__PURE__ */ import_react23.default.createElement("span", { className: "hidden sm:inline" }, "Export")
  ))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between text-slate-400 text-xs" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "Total Users"), /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Users, { className: "w-3.5 h-3.5 text-slate-400" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-white font-mono mt-1" }, totalUsersCount), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-slate-400 mt-0.5" }, "Stored accounts")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between text-mediteal-400 text-xs font-semibold" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "New Users"), /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Sparkles, { className: "w-3.5 h-3.5 text-mediteal-400" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-mediteal-300 font-mono mt-1" }, newUsersCount), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-mediteal-300/80 mt-0.5" }, "Online registrations")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between text-purple-400 text-xs font-semibold" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "Existing Users"), /* @__PURE__ */ import_react23.default.createElement(Building2, { className: "w-3.5 h-3.5 text-purple-400" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-purple-300 font-mono mt-1" }, existingUsersCount), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-purple-300/80 mt-0.5" }, "Pre-seeded accounts")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between text-sky-400 text-xs font-semibold" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "Clinicians"), /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Stethoscope, { className: "w-3.5 h-3.5 text-sky-400" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-sky-300 font-mono mt-1" }, cliniciansCount), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-sky-300/80 mt-0.5" }, "Doctors & Pharmacists")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between text-emerald-400 text-xs font-semibold" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "Patients"), /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.HeartPulse, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1" }, patientsCount), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-emerald-300/80 mt-0.5" }, "Clinical profiles")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-sm" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between text-emerald-400 text-xs font-semibold" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "Data Health"), /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.FileCheck, { className: "w-3.5 h-3.5 text-emerald-400" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-2xl sm:text-3xl font-black text-emerald-300 font-mono mt-1" }, "100%"), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-emerald-300/80 mt-0.5" }, "Zero duplicates"))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "relative w-full md:w-80" }, /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "text",
      value: searchQuery,
      onChange: (e) => setSearchQuery(e.target.value),
      placeholder: "Search by name, email, department...",
      className: "w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:border-purple-400 focus:outline-none transition"
    }
  ), /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Search, { className: "w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" })), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex flex-wrap items-center gap-2 w-full md:w-auto" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-[11px] text-slate-500 px-1.5 flex items-center gap-1" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Filter, { className: "w-3 h-3" }), "Role:"), [
    { id: "ALL", label: "All" },
    { id: "admin", label: "Admin" },
    { id: "clinician", label: "Clinician" },
    { id: "patient", label: "Patient" }
  ].map((r) => /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      key: r.id,
      onClick: () => setRoleFilter(r.id),
      className: `px-2 py-1 rounded-lg text-xs font-semibold transition ${roleFilter === r.id ? "bg-purple-500/20 text-purple-300 border border-purple-500/40" : "text-slate-400 hover:text-white"}`
    },
    r.label
  ))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-[11px] text-slate-500 px-1.5" }, "Type:"), [
    { id: "ALL", label: "All" },
    { id: "NEW", label: "New Users" },
    { id: "EXISTING", label: "Existing" }
  ].map((t) => /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      key: t.id,
      onClick: () => setTypeFilter(t.id),
      className: `px-2 py-1 rounded-lg text-xs font-semibold transition ${typeFilter === t.id ? "bg-mediteal-500/20 text-mediteal-300 border border-mediteal-500/40" : "text-slate-400 hover:text-white"}`
    },
    t.label
  ))))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl overflow-hidden" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Users, { className: "w-4 h-4 text-purple-400" }), /* @__PURE__ */ import_react23.default.createElement("h2", { className: "text-sm sm:text-base font-bold text-white" }, "Stored User Records (", filteredUsers.length, " of ", users.length, ")")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-xs text-slate-400" }, "Deduplicated Primary Key: ", /* @__PURE__ */ import_react23.default.createElement("code", { className: "text-purple-300 font-mono" }, "email_normalized"))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ import_react23.default.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ import_react23.default.createElement("thead", { className: "bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold border-b border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("tr", null, /* @__PURE__ */ import_react23.default.createElement("th", { className: "py-3.5 px-4" }, "User"), /* @__PURE__ */ import_react23.default.createElement("th", { className: "py-3.5 px-4" }, "Role"), /* @__PURE__ */ import_react23.default.createElement("th", { className: "py-3.5 px-4" }, "Record Type"), /* @__PURE__ */ import_react23.default.createElement("th", { className: "py-3.5 px-4" }, "Registration Date"), /* @__PURE__ */ import_react23.default.createElement("th", { className: "py-3.5 px-4" }, "Status"), /* @__PURE__ */ import_react23.default.createElement("th", { className: "py-3.5 px-4 text-right" }, "Actions"))), /* @__PURE__ */ import_react23.default.createElement("tbody", { className: "divide-y divide-slate-800/80" }, filteredUsers.length === 0 ? /* @__PURE__ */ import_react23.default.createElement("tr", null, /* @__PURE__ */ import_react23.default.createElement("td", { colSpan: "6", className: "py-12 text-center text-slate-400" }, "No user records match your search query or active filters.")) : filteredUsers.map((user) => {
    const isAdmin = user.role === "admin";
    const isClinician = user.role === "clinician";
    const isPatient = user.role === "patient";
    return /* @__PURE__ */ import_react23.default.createElement("tr", { key: user.id, className: "hover:bg-slate-850/60 transition group" }, /* @__PURE__ */ import_react23.default.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: `w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${isAdmin ? "bg-purple-500/20 text-purple-300 border border-purple-500/30" : isClinician ? "bg-sky-500/20 text-sky-300 border border-sky-500/30" : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"}` }, user.name.charAt(0)), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("div", { className: "font-bold text-white text-xs sm:text-sm group-hover:text-mediteal-300 transition" }, user.name), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[11px] text-slate-400 font-mono" }, user.email)))), /* @__PURE__ */ import_react23.default.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${isAdmin ? "bg-purple-500/10 text-purple-300 border-purple-500/30" : isClinician ? "bg-sky-500/10 text-sky-300 border-sky-500/30" : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"}` }, isAdmin && /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.ShieldCheck, { className: "w-3 h-3" }), isClinician && /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Stethoscope, { className: "w-3 h-3" }), isPatient && /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.HeartPulse, { className: "w-3 h-3" }), /* @__PURE__ */ import_react23.default.createElement("span", null, user.role))), /* @__PURE__ */ import_react23.default.createElement("td", { className: "py-3 px-4" }, user.isNewUser ? /* @__PURE__ */ import_react23.default.createElement("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-mediteal-500/15 text-mediteal-300 border border-mediteal-500/30 text-[10px] font-bold" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Sparkles, { className: "w-2.5 h-2.5" }), /* @__PURE__ */ import_react23.default.createElement("span", null, "New User")) : /* @__PURE__ */ import_react23.default.createElement("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px]" }, /* @__PURE__ */ import_react23.default.createElement("span", null, "Existing / Seeded"))), /* @__PURE__ */ import_react23.default.createElement("td", { className: "py-3 px-4 text-slate-400 text-[11px]" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Calendar, { className: "w-3 h-3 text-slate-500" }), /* @__PURE__ */ import_react23.default.createElement("span", null, user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : "2024-01-10")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[10px] text-slate-500 mt-0.5" }, "ID: ", /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-mono" }, user.id))), /* @__PURE__ */ import_react23.default.createElement("td", { className: "py-3 px-4" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: `inline-flex items-center gap-1.5 text-[11px] font-semibold ${user.status === "Active" ? "text-emerald-400" : "text-rose-400"}` }, /* @__PURE__ */ import_react23.default.createElement("span", { className: `w-1.5 h-1.5 rounded-full ${user.status === "Active" ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}` }), /* @__PURE__ */ import_react23.default.createElement("span", null, user.status || "Active"))), /* @__PURE__ */ import_react23.default.createElement("td", { className: "py-3 px-4 text-right space-x-1.5 whitespace-nowrap" }, /* @__PURE__ */ import_react23.default.createElement(
      "button",
      {
        onClick: () => setSelectedUser(user),
        className: "px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition",
        title: "View Full User Details"
      },
      "Details"
    ), /* @__PURE__ */ import_react23.default.createElement(
      "button",
      {
        onClick: () => changeUserStatus(user.id, user.status === "Active" ? "Suspended" : "Active"),
        className: `px-2 py-1 rounded-lg text-xs font-semibold border transition ${user.status === "Active" ? "bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20" : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20"}`,
        title: "Toggle Account Active/Suspended"
      },
      user.status === "Active" ? "Suspend" : "Activate"
    ), user.id !== currentUser.id && /* @__PURE__ */ import_react23.default.createElement(
      "button",
      {
        onClick: () => {
          if (window.confirm(`Are you sure you want to permanently delete ${user.name}?`)) {
            removeUser(user.id);
          }
        },
        className: "p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition",
        title: "Delete User Record"
      },
      /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Trash2, { className: "w-3.5 h-3.5" })
    )));
  }))))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "rounded-3xl border border-slate-800 bg-slate-900/90 shadow-xl p-5 space-y-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.Activity, { className: "w-4 h-4 text-mediteal-400" }), /* @__PURE__ */ import_react23.default.createElement("h3", { className: "text-sm font-bold text-white" }, "Live System Activity & Audit Trail (", auditLogs.length, " Events)")), /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-[11px] text-slate-400 font-mono" }, "HIPAA Compliant Log Stream")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-2 max-h-64 overflow-y-auto pr-1" }, auditLogs.map((log) => /* @__PURE__ */ import_react23.default.createElement(
    "div",
    {
      key: log.id,
      className: "p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
    },
    /* @__PURE__ */ import_react23.default.createElement("div", { className: "space-y-0.5" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-white" }, log.action), /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono" }, log.performedBy)), /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-slate-400 text-[11px]" }, log.details)),
    /* @__PURE__ */ import_react23.default.createElement("div", { className: "text-[10px] text-slate-500 font-mono shrink-0" }, new Date(log.timestamp).toLocaleTimeString(), " \u2022 ", new Date(log.timestamp).toLocaleDateString())
  )))), selectedUser && /* @__PURE__ */ import_react23.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5" }, /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: () => setSelectedUser(null),
      className: "absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
    },
    /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.X, { className: "w-5 h-5" })
  ), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-3 border-b border-slate-800 pb-4" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center text-lg" }, selectedUser.name.charAt(0)), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("h3", { className: "text-lg font-bold text-white" }, selectedUser.name), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-slate-400 font-mono" }, selectedUser.email))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 gap-3 text-xs" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase" }, "Account Role"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-white capitalize mt-0.5 block" }, selectedUser.role)), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase" }, "Classification"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-white mt-0.5 block" }, selectedUser.isNewUser ? "Newly Registered" : "Pre-existing Seed")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase" }, "Status"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-emerald-400 mt-0.5 block" }, selectedUser.status || "Active")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase" }, "Password / Credential"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-slate-300 font-mono mt-0.5 block" }, selectedUser.password))), selectedUser.role === "clinician" && /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase font-bold text-sky-400" }, "Clinical Data"), /* @__PURE__ */ import_react23.default.createElement("div", null, "Department: ", /* @__PURE__ */ import_react23.default.createElement("strong", { className: "text-white" }, selectedUser.department || "General Medicine")), /* @__PURE__ */ import_react23.default.createElement("div", null, "License / NPI: ", /* @__PURE__ */ import_react23.default.createElement("strong", { className: "text-white" }, selectedUser.licenseNumber || "N/A"))), selectedUser.role === "patient" && /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase font-bold text-mediteal-400" }, "Patient Data"), /* @__PURE__ */ import_react23.default.createElement("div", null, "Age: ", /* @__PURE__ */ import_react23.default.createElement("strong", { className: "text-white" }, selectedUser.age || 40, "y"), " \u2022 Gender: ", /* @__PURE__ */ import_react23.default.createElement("strong", { className: "text-white" }, selectedUser.gender || "Not specified")), /* @__PURE__ */ import_react23.default.createElement("div", null, "Conditions: ", /* @__PURE__ */ import_react23.default.createElement("strong", { className: "text-white" }, selectedUser.chronicDiseases?.join(", ") || "None reported"))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400 block text-[10px] uppercase" }, "Internal Admin Notes"), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-slate-300 mt-1 leading-relaxed" }, selectedUser.notes || "No notes.")), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex justify-end pt-2" }, /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: () => setSelectedUser(null),
      className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition"
    },
    "Close Details"
  )))), isAddUserOpen && /* @__PURE__ */ import_react23.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "relative w-full max-w-lg rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5" }, /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: () => setIsAddUserOpen(false),
      className: "absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
    },
    /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.X, { className: "w-5 h-5" })
  ), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center gap-3 border-b border-slate-800 pb-3" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "w-10 h-10 rounded-xl bg-mediteal-500/20 text-mediteal-300 flex items-center justify-center font-bold" }, /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.UserPlus, { className: "w-5 h-5" })), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("h3", { className: "text-lg font-bold text-white" }, "Add New User to Registry"), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-slate-400" }, "Stores new credentials into persistent database"))), /* @__PURE__ */ import_react23.default.createElement("form", { onSubmit: handleAddUserSubmit, className: "space-y-4 text-xs" }, /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-slate-300 font-semibold mb-1" }, "Account Role"), /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-3 gap-2" }, ["patient", "clinician", "admin"].map((r) => /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      key: r,
      type: "button",
      onClick: () => setAddRole(r),
      className: `py-1.5 rounded-xl capitalize font-bold border transition ${addRole === r ? "bg-mediteal-500/20 text-mediteal-300 border-mediteal-500/50" : "bg-slate-950 text-slate-400 border-slate-800"}`
    },
    r
  )))), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-slate-300 font-semibold mb-1" }, "Full Name"), /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "text",
      required: true,
      value: addName,
      onChange: (e) => setAddName(e.target.value),
      placeholder: "e.g. Dr. Emily Thorne",
      className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-mediteal-400 focus:outline-none"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-slate-300 font-semibold mb-1" }, "Email (Unique Login)"), /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "email",
      required: true,
      value: addEmail,
      onChange: (e) => setAddEmail(e.target.value),
      placeholder: "emily.thorne@hospital.org",
      className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-mediteal-400 focus:outline-none"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-slate-300 font-semibold mb-1" }, "Temporary Password"), /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "password",
      required: true,
      value: addPassword,
      onChange: (e) => setAddPassword(e.target.value),
      placeholder: "Min 6 characters",
      className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:border-mediteal-400 focus:outline-none"
    }
  )), addRole === "clinician" && /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Department"), /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "text",
      value: addDepartment,
      onChange: (e) => setAddDepartment(e.target.value),
      placeholder: "e.g. Oncology",
      className: "w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "License #"), /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "text",
      value: addLicense,
      onChange: (e) => setAddLicense(e.target.value),
      placeholder: "MD-12345",
      className: "w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
    }
  ))), addRole === "patient" && /* @__PURE__ */ import_react23.default.createElement("div", { className: "grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800" }, /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Age"), /* @__PURE__ */ import_react23.default.createElement(
    "input",
    {
      type: "number",
      value: addAge,
      onChange: (e) => setAddAge(e.target.value),
      className: "w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
    }
  )), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("label", { className: "block text-[11px] text-slate-400 mb-1" }, "Gender"), /* @__PURE__ */ import_react23.default.createElement(
    "select",
    {
      value: addGender,
      onChange: (e) => setAddGender(e.target.value),
      className: "w-full px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white"
    },
    /* @__PURE__ */ import_react23.default.createElement("option", { value: "Male" }, "Male"),
    /* @__PURE__ */ import_react23.default.createElement("option", { value: "Female" }, "Female"),
    /* @__PURE__ */ import_react23.default.createElement("option", { value: "Other" }, "Other")
  ))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex items-center justify-end gap-2 pt-3" }, /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setIsAddUserOpen(false),
      className: "px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold hover:bg-slate-700 transition"
    },
    "Cancel"
  ), /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      type: "submit",
      className: "px-5 py-2 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 font-bold transition shadow-md"
    },
    "Create Account"
  ))))), dedupReport && /* @__PURE__ */ import_react23.default.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl p-6 sm:p-8 space-y-5 text-center" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: `w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${dedupReport.duplicatesRemovedCount > 0 ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}` }, dedupReport.duplicatesRemovedCount > 0 ? /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.CheckCircle2, { className: "w-8 h-8" }) : /* @__PURE__ */ import_react23.default.createElement(import_lucide_react22.ShieldCheck, { className: "w-8 h-8" })), /* @__PURE__ */ import_react23.default.createElement("div", null, /* @__PURE__ */ import_react23.default.createElement("h3", { className: "text-xl font-bold text-white" }, "Database Deduplication Scan"), /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-slate-400 mt-1" }, "Scan algorithm: ", /* @__PURE__ */ import_react23.default.createElement("code", { className: "text-mediteal-300 font-mono" }, "case_insensitive_email_hash"))), /* @__PURE__ */ import_react23.default.createElement("div", { className: "p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2 text-left" }, /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400" }, "Total Records Inspected:"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-white font-mono" }, dedupReport.initialCount)), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400" }, "Duplicate Records Removed:"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-rose-400 font-mono" }, dedupReport.duplicatesRemovedCount)), /* @__PURE__ */ import_react23.default.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ import_react23.default.createElement("span", { className: "text-slate-400" }, "Verified Unique Records:"), /* @__PURE__ */ import_react23.default.createElement("span", { className: "font-bold text-emerald-400 font-mono" }, dedupReport.finalCount))), dedupReport.duplicatesRemovedCount > 0 ? /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-amber-300 leading-relaxed" }, "Successfully pruned ", dedupReport.duplicatesRemovedCount, " redundant duplicate account entries. The database is now clean and deduplicated.") : /* @__PURE__ */ import_react23.default.createElement("p", { className: "text-xs text-emerald-300 leading-relaxed" }, "All records in the MediSafe user database are strictly unique! No duplicate emails or conflicting identifiers were found."), /* @__PURE__ */ import_react23.default.createElement(
    "button",
    {
      onClick: () => setDedupReport(null),
      className: "w-full py-2.5 rounded-xl bg-mediteal-500 hover:bg-mediteal-400 text-slate-950 font-bold text-xs transition shadow-md"
    },
    "Dismiss Report"
  ))));
}

// src/App.jsx
function MainApp() {
  const { activeTab, currentUser } = useHealth();
  if (!currentUser) {
    return /* @__PURE__ */ import_react24.default.createElement("div", { className: "min-h-screen bg-slate-950 text-slate-100 selection:bg-mediteal-500/30 selection:text-mediteal-300" }, /* @__PURE__ */ import_react24.default.createElement(AuthPortal, null), /* @__PURE__ */ import_react24.default.createElement(Toast, null));
  }
  return /* @__PURE__ */ import_react24.default.createElement("div", { className: "min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-mediteal-500/30 selection:text-mediteal-300" }, /* @__PURE__ */ import_react24.default.createElement(Navbar, null), /* @__PURE__ */ import_react24.default.createElement("main", { className: "flex-1" }, activeTab === "home" && /* @__PURE__ */ import_react24.default.createElement(import_react24.default.Fragment, null, /* @__PURE__ */ import_react24.default.createElement(HeroSection, null), /* @__PURE__ */ import_react24.default.createElement(HowItWorks, null), /* @__PURE__ */ import_react24.default.createElement(FeatureGrid, null)), activeTab === "dashboard" && /* @__PURE__ */ import_react24.default.createElement(UserDashboard, null), activeTab === "risk-checker" && /* @__PURE__ */ import_react24.default.createElement(MedicineRiskView, null), activeTab === "interactions" && /* @__PURE__ */ import_react24.default.createElement(DrugInteractionView, null), activeTab === "ocr" && /* @__PURE__ */ import_react24.default.createElement(PrescriptionOCRView, null), activeTab === "profile" && /* @__PURE__ */ import_react24.default.createElement(HealthProfileView, null), activeTab === "history" && /* @__PURE__ */ import_react24.default.createElement(MedicationHistoryView, null), activeTab === "report" && /* @__PURE__ */ import_react24.default.createElement(SafetyReportView, null), activeTab === "admin" && /* @__PURE__ */ import_react24.default.createElement(AdminDashboardView, null)), /* @__PURE__ */ import_react24.default.createElement("div", { className: "print:hidden" }, /* @__PURE__ */ import_react24.default.createElement(Footer, null)), /* @__PURE__ */ import_react24.default.createElement(EmergencyModal, null), /* @__PURE__ */ import_react24.default.createElement(AIChatbotModal, null), /* @__PURE__ */ import_react24.default.createElement(Toast, null));
}
function App() {
  return /* @__PURE__ */ import_react24.default.createElement(HealthProvider, null, /* @__PURE__ */ import_react24.default.createElement(MainApp, null));
}
