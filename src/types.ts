// src/types.ts
export interface User {
    id: string;
    email: string;
    full_name: string;
    age?: number;
    phone_number?: string;
    hospital_name?: string;
    hospital_department?: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  
  export interface SignInData {
    email: string;
    password: string;
  }
  
  export interface SignUpData extends SignInData {
    full_name: string;
    age?: number;
    phone_number?: string;
    hospital_name?: string;
    hospital_department?: string;
  }

export interface LanguageStrings {
  title: string;
  subtitle: string;
  dropzoneText: string;
  supportedFormats: string;
  analyzeButton: string;
  analyzingText: string;
  resultsTitle: string;
  diagnosisLabel: string;
  tumorSizeLabel: string;
  confidenceLabel: string;
  severityLabel: string;
  retryButton: string;
  zoomLabel: string;
  contrastLabel: string;
  compareLabel: string;
  shareLabel: string;
  languageLabel: string;
  patientInfo: {
    title: string;
    subtitle: string;
    patientId: string;
    fullName: string;
    age: string;
    sex: string;
    relatedIssues: string;
    analysisTimestamp: string;
    analysisStatus: string;
    completed: string;
    medicalHistory: string;
    previousTreatments: string;
    noMedicalHistory: string;
    noPreviousTreatments: string;
    years: string;
    noneReported: string;
    caseId: string;
    sessionId: string;
    facilityId: string;
    reportGenerated: string;
    reportStatus: string;
    analysisDate: string;
    analysisTime: string;
    timezone: string;
  };
  imageControls: {
    title: string;
    medicalFilters: string;
  };
}

export interface AnalysisResult {
  analysis: {
    size: string;
    shape: string;
    area_mm2: number;
    perimeter_mm: number;
    circularity: number;
    severity: string;
  } | null;
  tumorType: string | null;
  confidence: number;
}

export interface Languages {
  [key: string]: LanguageStrings;
}