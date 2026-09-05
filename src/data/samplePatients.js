// Pre-configured patient profiles for 1-click testing & demo convenience
// Derived from registered patient profiles in MediSafe AI

export const SAMPLE_PATIENTS = [
  {
    id: 'usr-new-1788590733394',
    name: 'Soham Vikas Yevale',
    age: 23,
    gender: 'Male',
    weight: 70,
    description: 'Male, 23y — Verified Patient Profile',
    diseases: [],
    allergies: [],
    medicalHistory: 'Registered patient on MediSafe AI clinical portal.',
    currentMedicines: [],
    recommendedTestDrug: 'Paracetamol (Acetaminophen)',
    testScenarioTitle: 'Soham Vikas Yevale Profile Verification',
    testScenarioHighlight: 'Standard safety analysis with 0 contraindications flagged.'
  },
  {
    id: 'usr-new-1788596030403',
    name: 'Mrunali Kadam',
    age: 22,
    gender: 'Female',
    weight: 60,
    description: 'Female, 22y — Verified Patient Profile',
    diseases: [],
    allergies: [],
    medicalHistory: 'Registered patient on MediSafe AI clinical portal.',
    currentMedicines: [],
    recommendedTestDrug: 'Paracetamol (Acetaminophen)',
    testScenarioTitle: 'Mrunali Kadam Safety Evaluation',
    testScenarioHighlight: 'Demonstrates 15% Low Risk routine medication verification.'
  }
];

export const DEFAULT_PATIENT = SAMPLE_PATIENTS[0];
