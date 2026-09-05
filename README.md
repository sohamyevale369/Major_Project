# MediSafe AI — Intelligent Medicine Safety & Clinical Decision Support

MediSafe AI is a clinical-grade medication safety platform powered by explainable AI (SHAP / LIME-inspired models), multi-drug interaction checking, and prescription OCR analysis.

## Key Capabilities

1. **Explainable AI Medicine Risk Engine**:
   - Comprehensive risk scoring (0–100%) based on patient age, chronic illnesses, documented allergies, and current medications.
   - Explainable SHAP factor breakdowns explaining why a medication is safe or dangerous.
   - Evidence-based safe clinical alternatives with doctor consultation notes.

2. **Multi-Drug Interaction Scanner**:
   - Pharmacological clash detection across simultaneous medications.
   - Severity categorizations (Severe, High, Moderate) with biological mechanisms and required clinical actions.

3. **Prescription OCR & Visual Extraction**:
   - Ingests prescription scans and clinic slips, parses medication dosages, and checks safety conflicts automatically.

4. **Mandatory Secure Authentication Gate**:
   - Role-based clinical security with strict access control:
     - **Patients / Caregivers**: Personalized health monitoring, dosage logging, and report generation.
     - **Doctors / Pharmacists**: In-depth clinical mechanism analysis, contraindication warnings, and alternative selection.
     - **System Administrators**: Dedicated management console for auditing existing and new user records, managing account statuses, and deduplicating records.

5. **Admin Management & User Record Deduplication**:
   - Centralized persistent database for both existing (legacy) users and newly registered accounts.
   - Search, filter, role reassignment, account suspension, and one-click database deduplication utilities.

## Tech Stack

- **Frontend**: React 18, Tailwind CSS, Lucide Icons, Vite
- **Architecture**: Context API (`HealthContext`), modular clinical components
- **Persistence**: Browser-backed clinical record storage with automatic audit logging

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```
