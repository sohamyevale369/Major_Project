// Pre-configured patient profiles for 1-click testing & demo convenience
// Non-technical users and reviewers can test live scenarios with a single click

export const SAMPLE_PATIENTS = [
  {
    id: 'patient-1',
    name: 'Robert Jenkins',
    age: 68,
    gender: 'Male',
    weight: 78,
    description: 'Senior with Kidney Disease & Hypertension',
    diseases: ['Chronic Kidney Disease', 'Hypertension (High Blood Pressure)'],
    allergies: ['Sulfa Drugs (Sulfonamides)'],
    medicalHistory: 'Stage 3 CKD diagnosed in 2021. Monitored for elevated creatinine and blood pressure.',
    currentMedicines: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' }
    ],
    recommendedTestDrug: 'Ibuprofen',
    testScenarioTitle: 'Senior (68) + Kidney Disease + Ibuprofen',
    testScenarioHighlight: 'Triggers High Risk (85%) due to renal blood flow inhibition & age factor.'
  },
  {
    id: 'patient-2',
    name: 'Eleanor Vance',
    age: 54,
    gender: 'Female',
    weight: 65,
    description: 'Cardiac Patient with Penicillin Allergy & Blood Thinner',
    diseases: ['Atrial Fibrillation / Heart Failure'],
    allergies: ['Penicillin', 'Beta-lactam Allergy'],
    medicalHistory: 'Persistent A-fib managed with anticoagulant. Documented anaphylactic rash to penicillin in childhood.',
    currentMedicines: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily in evening' }
    ],
    recommendedTestDrug: 'Amoxicillin',
    testScenarioTitle: 'Allergy Test: Eleanor + Amoxicillin (Penicillin class)',
    testScenarioHighlight: 'Triggers Emergency Allergy Alert & Macrolide alternative recommendation.'
  },
  {
    id: 'patient-3',
    name: 'Marcus Brody',
    age: 58,
    gender: 'Male',
    weight: 85,
    description: 'Cardiac Patient on Blood Thinner (Drug-Drug Test)',
    diseases: ['Hypertension (High Blood Pressure)', 'History of Stroke'],
    allergies: [],
    medicalHistory: 'Mild ischemic attack in 2023. Prescribed Warfarin for stroke prevention.',
    currentMedicines: [
      { name: 'Warfarin', dosage: '5mg', frequency: 'Once daily' }
    ],
    recommendedTestDrug: 'Aspirin',
    testScenarioTitle: 'Drug Interaction Test: Warfarin + Aspirin',
    testScenarioHighlight: 'Triggers Severe Bleeding Risk (88%) between dual blood thinners.'
  },
  {
    id: 'patient-4',
    name: 'Devon Clark',
    age: 32,
    gender: 'Male',
    weight: 72,
    description: 'Young Adult with Type 2 Diabetes',
    diseases: ['Type 2 Diabetes'],
    allergies: [],
    medicalHistory: 'Early stage adult onset diabetes well-controlled through diet and Metformin.',
    currentMedicines: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily with meals' }
    ],
    recommendedTestDrug: 'Paracetamol (Acetaminophen)',
    testScenarioTitle: 'Safe Profile Test: Paracetamol for Fever',
    testScenarioHighlight: 'Demonstrates Green (Low Risk 15%) safe verification score.'
  }
];

export const DEFAULT_PATIENT = SAMPLE_PATIENTS[0];
