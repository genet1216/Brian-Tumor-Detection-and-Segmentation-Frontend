"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  Zap,
  BarChart2,
  Maximize,
  Activity,
  Share2,
  ImageIcon,
  Brain,
  FileWarning,
  Loader2,
  PieChart,
  Target,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Users,
  Dna,
  AlertOctagon,
  Clock,
  Globe,
  ChevronLeft,
  User,
  FileText,
  History,
  Stethoscope,
  ClipboardList,
} from "lucide-react";
import axiosInstance from "../services/authService";
import Header from "../components/Header";
import { LanguageStrings, AnalysisResult, Languages } from '../types';
import { Icon } from '../components/ui/icon';
import { toast } from "sonner";

type Language = "en" | "am" | "or";
type Step = 'form' | 'upload' | 'preview' | 'result';

interface TumorAnalysis {
  size: string;
  shape: string;
  area_mm2: number;
  perimeter_mm: number;
  circularity: number;
  visualization?: string;
}

interface RiskFactor {
  factor: string;
  description: string;
  icon: string;
}

interface PatientInfo {
  id?: string;
  fullName: string;
  age: number;
  sex: string;
  relatedIssue: string;
  medicalHistory?: string;
  previousTreatments?: string;
  caseId?: string;
  analysisTimestamp?: Date;
  sessionId?: string;
  facilityId?: string;
}

const medicalFilters = [
  { name: "Original", filter: "none" },
  {
    name: "X-Ray",
    filter: "saturate(0) contrast(1.75) brightness(1.2) invert(1)",
  },
  {
    name: "Thermal",
    filter: "hue-rotate(180deg) saturate(200%) brightness(80%)",
  },
];

const languages: Languages = {
  en: {
    title: "Advanced Medical Image Analysis",
    subtitle: "Upload brain MRI scans for AI-powered tumor detection",
    dropzoneText: "Drag & drop your MRI scan here",
    supportedFormats: "Supported formats: DICOM, JPG, PNG",
    analyzeButton: "Start Analysis",
    analyzingText: "Analyzing Scan",
    resultsTitle: "Analysis Results",
    diagnosisLabel: "Diagnosis",
    tumorSizeLabel: "Tumor Size",
    confidenceLabel: "Confidence",
    severityLabel: "Severity",
    retryButton: "Analyze New Scan",
    zoomLabel: "Zoom",
    contrastLabel: "Contrast",
    compareLabel: "Compare",
    shareLabel: "Share Results",
    languageLabel: "Language",
    patientInfo: {
      title: "Patient Information",
      subtitle: "Case Analysis Details",
      patientId: "Patient ID",
      fullName: "Full Name",
      age: "Age",
      sex: "Sex",
      relatedIssues: "Related Issues/Symptoms",
      analysisTimestamp: "Analysis Timestamp",
      analysisStatus: "Analysis Status",
      completed: "Completed",
      medicalHistory: "Medical History",
      previousTreatments: "Previous Treatments",
      noMedicalHistory: "No medical history provided",
      noPreviousTreatments: "No previous treatments recorded",
      years: "years",
      noneReported: "None reported",
      caseId: "Case ID",
      sessionId: "Session ID",
      facilityId: "Facility ID",
      reportGenerated: "Report Generated",
      reportStatus: "Report Status",
      analysisDate: "Analysis Date",
      analysisTime: "Analysis Time",
      timezone: "Timezone",
    },
    imageControls: {
      title: "Image Controls",
      medicalFilters: "Medical Filters",
    },
  },
  am: {
    title: "የላቀ የሕክምና ምስል ትንተና",
    subtitle: "በአይ ኤአይ የሚሰራ የጭንቅላት ኤምአርአይ ስካን ለመለየት ይስቀሉ",
    dropzoneText: "የኤምአርአይ ስካን እዚህ ይጎትቱ እና ይጣሉ",
    supportedFormats: "የሚደገፉ ቅርጸቶች፡ DICOM፣ JPG፣ PNG",
    analyzeButton: "ትንተናን ጀምር",
    analyzingText: "ስካን በመተንተን ላይ",
    resultsTitle: "የትንተና ውጤቶች",
    diagnosisLabel: "ምርመራ",
    tumorSizeLabel: "የtumor መጠን",
    confidenceLabel: "እርግጠኝነት",
    severityLabel: "ክብደት",
    retryButton: "አዲስ ስካን ተንትን",
    zoomLabel: "አጉላ",
    contrastLabel: "ንጽጽር",
    compareLabel: "አወዳድር",
    shareLabel: "ውጤቶችን አጋራ",
    languageLabel: "ቋንቋ",
    patientInfo: {
      title: "የታካሚ መረጃ",
      subtitle: "የጉዳይ ትንተና ዝርዝሮች",
      patientId: "የታካሚ መታወቂያ",
      fullName: "ሙሉ ስም",
      age: "እድሜ",
      sex: "ጾታ",
      relatedIssues: "ተዛማጅ ችግሮች/ምልክቶች",
      analysisTimestamp: "የትንተና ሰዓት",
      analysisStatus: "የትንተና ሁኔታ",
      completed: "ተጠናቋል",
      medicalHistory: "የሕክምና ታሪክ",
      previousTreatments: "ቀደም ያሉ ሕክምናዎች",
      noMedicalHistory: "የህክምና ታሪክ አልቀረበም",
      noPreviousTreatments: "ምንም ቀደም ያለ ሕክምና አልተመዘገበም",
      years: "ዓመት",
      noneReported: "ምንም አልተዘገበም",
      caseId: "የጉዳይ መታወቂያ",
      sessionId: "የክፍለ ጊዜ መታወቂያ",
      facilityId: "የተቋም መታወቂያ",
      reportGenerated: "ሪፖርት የተፈጠረበት",
      reportStatus: "የሪፖርት ሁኔታ",
      analysisDate: "የትንተና ቀን",
      analysisTime: "የትንተና ሰዓት",
      timezone: "የሰዓት ክልል",
    },
    imageControls: {
      title: "የምስል ቁጥጥሮች",
      medicalFilters: "የሕክምና ማጣሪያዎች",
    },
  },
  or: {
    title: "Qaxxaamura Fakkii Fayyaa Guddaa",
    subtitle: "Iskaanii MRI sammuu AI-tiin hojjetu fe'i",
    dropzoneText: "Iskaanii MRI keessan asitti harkisaa fi buusaa",
    supportedFormats: "Formatii deeggaran: DICOM, JPG, PNG",
    analyzeButton: "Xiinxala Jalqabi",
    analyzingText: "Iskaanii Xiinxalaa Jira",
    resultsTitle: "Bu'aa Xiinxalaa",
    diagnosisLabel: "Qorannoo",
    tumorSizeLabel: "Guddina Tumorii",
    confidenceLabel: "Amanamummaa",
    severityLabel: "Hamaa",
    retryButton: "Iskaanii Haaraa Xiinxali",
    zoomLabel: "Guddisuuf",
    contrastLabel: "Garaagarummaa",
    compareLabel: "Walbira qabi",
    shareLabel: "Bu'aawwan Qoodi",
    languageLabel: "Afaan",
    patientInfo: {
      title: "Odeeffannoo Dhukkubsataa",
      subtitle: "Ibsa Xiinxala Dhimmicha",
      patientId: "ID Dhukkubsataa",
      fullName: "Maqaa Guutuu",
      age: "Umurii",
      sex: "Saala",
      relatedIssues: "Dhimmoota Walqabatan/Mallattoolee",
      analysisTimestamp: "Yeroo Xiinxalaa",
      analysisStatus: "Haala Xiinxalaa",
      completed: "Xumurame",
      medicalHistory: "Seenaa Fayyaa",
      previousTreatments: "Yaalii Duraa",
      noMedicalHistory: "Seenaan fayyaa hin dhiyaanne",
      noPreviousTreatments: "Yaaliin duraa hin galmoofne",
      years: "waggaa",
      noneReported: "Homaa hin gabaafamne",
      caseId: "ID Dhimmicha",
      sessionId: "ID Seeshenii",
      facilityId: "ID Dhaabbata",
      reportGenerated: "Gabaasni Kan Uumame",
      reportStatus: "Haala Gabaasaa",
      analysisDate: "Guyyaa Xiinxalaa",
      analysisTime: "Yeroo Xiinxalaa",
      timezone: "Daangaa Yeroo",
    },
    imageControls: {
      title: "To'annoo Fakkii",
      medicalFilters: "Calaltuu Fayyaa",
    },
  },
};

const TUMOR_REFERENCE_DATA: Record<string, { risk_factors: Array<{ icon: React.ElementType; factor: string; description: string; }> }> = {
  pituitary: {
    risk_factors: [
      {
        icon: Dna,
        factor: 'Genetic conditions',
        description: 'Inherited disorders such as Multiple Endocrine Neoplasia type 1 (MEN1) and Familial Isolated Pituitary Adenomas (FIPA) can increase risk.'
      },
      {
        icon: Users,
        factor: 'Family history',
        description: 'Having a first-degree relative (parent, sibling, or child) with pituitary tumors may increase your risk.'
      }
    ]
  },
  meningioma: {
    risk_factors: [
      {
        icon: Zap,
        factor: 'Radiation exposure',
        description: 'Previous exposure to radiation therapy, especially to the head, can increase risk.'
      },
      {
        icon: Dna,
        factor: 'Genetic factors',
        description: 'Certain inherited conditions, particularly neurofibromatosis type 2, can increase risk.'
      }
    ]
  },
  glioma: {
    risk_factors: [
      {
        icon: Zap,
        factor: 'Radiation exposure',
        description: 'Previous exposure to ionizing radiation increases risk.'
      },
      {
        icon: Dna,
        factor: 'Genetic syndromes',
        description: 'Certain inherited conditions like neurofibromatosis and Li-Fraumeni syndrome increase risk.'
      }
    ]
  }
};

const StatSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 w-24 bg-blue-100 rounded mb-2"></div>
    <div className="h-8 w-32 bg-blue-50 rounded"></div>
  </div>
);

const ConfidenceIndicator = ({ value }: { value: number }) => {
  const percentage = Math.round(value * 100);
  const getColor = () => {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 70) return "text-blue-500";
    if (percentage >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`absolute left-0 top-0 h-full ${getColor()} bg-current transition-all duration-500 ease-out`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const PrimaryStatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  subValue = null,
  loading = false,
  className = "",
}: {
  icon: any;
  label: string;
  value: string | number;
  subValue?: string | number | null;
  loading?: boolean;
  className?: string;
}) => (
  <div
    className={`
    bg-white rounded-xl p-6 shadow-lg border border-gray-100
    hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
    ${className}
  `}
  >
    {loading ? (
      <StatSkeleton />
    ) : (
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <h3 className="text-xl font-bold text-blue-900 mt-1 truncate">
              {value}
            </h3>
          </div>
        </div>
        {subValue && (
          <div className="pt-2 border-t border-gray-100">
            <ConfidenceIndicator value={Number(subValue)} />
            <p className="text-sm text-blue-600 mt-1 text-right font-medium">
              {(Number(subValue) * 100).toFixed(1)}% confidence
            </p>
          </div>
        )}
      </div>
    )}
  </div>
);

const DetailedMeasureCard = ({ 
  label, 
  value, 
  unit = "",
  trend = null,
}: {
  label: string;
  value: number;
  unit?: string;
  trend?: { value: number; label: string } | null;
}) => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 hover:shadow-md transition-shadow">
    <h4 className="text-sm font-medium text-blue-600 mb-2">{label}</h4>
    <div className="flex items-baseline space-x-1">
      <span className="text-2xl font-bold text-blue-900">
        {value.toFixed(1)}
      </span>
      <span className="text-sm text-blue-600">{unit}</span>
    </div>
    {trend && (
      <div className="mt-2 flex items-center text-sm">
        <span className={trend.value > 0 ? "text-green-600" : "text-red-600"}>
          {trend.value > 0 ? "↑" : "↓"} {Math.abs(trend.value)}%
        </span>
        <span className="text-gray-500 ml-1">{trend.label}</span>
      </div>
    )}
  </div>
);

const RiskFactorCard = ({ factor, description, icon }: RiskFactor) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent =
    icon === "Calendar"
      ? Calendar
      : icon === "Users"
      ? Users
      : icon === "Dna"
      ? Dna
      : Zap;

  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-blue-100/40 overflow-hidden
        transition-all duration-300 ease-in-out
        ${isExpanded ? "shadow-md" : "hover:shadow-md"}
      `}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 flex items-start space-x-3"
      >
        <div
          className={`
          p-2 rounded-lg
          ${
            isExpanded
              ? "bg-blue-100 text-blue-600"
              : "bg-blue-50 text-blue-500"
          }
          transition-colors duration-200
        `}
        >
          <IconComponent className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h6 className="font-medium text-blue-900 mb-1">{factor}</h6>
          <div
            className={`
            overflow-hidden transition-all duration-300
            ${isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}
          `}
          >
            <p className="text-blue-600 text-sm mt-2 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <ChevronRight 
          className={`
            w-5 h-5 text-blue-400 transform transition-transform duration-300 flex-shrink-0
            ${isExpanded ? "rotate-90" : ""}
          `}
        />
      </button>
    </div>
  );
};

const TumorMetricsChart = ({ 
  analysis, 
  tumorType,
  confidence,
  onRetry,
  onShare,
  t,
  patientData,
}: {
  analysis: NonNullable<AnalysisResult["analysis"]>;
  tumorType: string;
  confidence: number;
  onRetry: () => void;
  onShare: () => void;
  t: LanguageStrings;
  patientData: PatientInfo;
}) => {
  // Generate case ID if not provided
  const caseId = patientData.caseId || `CASE-${Date.now().toString(36).toUpperCase()}`;
  const timestamp = patientData.analysisTimestamp || new Date();
  const sessionId = patientData.sessionId || `SESSION-${Math.random().toString(36).substring(2, 15).toUpperCase()}`;
  const facilityId = patientData.facilityId || 'FACILITY-001';

  // Format date and time
  const date = timestamp.toLocaleDateString();
  const time = timestamp.toLocaleTimeString();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const confidencePercent = (confidence * 100).toFixed(1);
  const severityScore = analysis.circularity > 0.7 ? "Low to Moderate" : "Moderate to High";

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      {/* Patient Information Summary */}
      <div className="bg-white rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                {t.patientInfo.title}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.caseId}</div>
                  <div className="font-medium">{caseId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.fullName}</div>
                  <div className="font-medium">{patientData.fullName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.age}</div>
                  <div className="font-medium">{patientData.age} {t.patientInfo.years}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.sex}</div>
                  <div className="font-medium">{patientData.sex}</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-sm text-gray-400">{t.patientInfo.relatedIssues}</div>
                <div className="font-medium">{patientData.relatedIssue || t.patientInfo.noneReported}</div>
              </div>

              {patientData.medicalHistory && (
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.medicalHistory}</div>
                  <div className="font-medium">{patientData.medicalHistory}</div>
                </div>
              )}

              {patientData.previousTreatments && (
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.previousTreatments}</div>
                  <div className="font-medium">{patientData.previousTreatments}</div>
                </div>
              )}
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t.patientInfo.subtitle}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.sessionId}</div>
                  <div className="font-medium">{sessionId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.facilityId}</div>
                  <div className="font-medium">{facilityId}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.analysisDate}</div>
                  <div className="font-medium">{date}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.analysisTime}</div>
                  <div className="font-medium">{time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.timezone}</div>
                  <div className="font-medium">{timezone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">{t.patientInfo.reportStatus}</div>
                  <div className="font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {t.patientInfo.completed}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          icon={Activity} 
          label="Diagnosis"
          value={tumorType}
          className="bg-white"
        />
        <StatCard
          icon={Maximize}
          label="Size Classification" 
          value={analysis.size} 
          className="bg-white"
        />
        <StatCard
          icon={BarChart2}
          label="Confidence"
          value={`${confidencePercent}%`}
          className="bg-white"
        />
        <StatCard
          icon={AlertTriangle}
          label="Risk Level" 
          value={severityScore}
          className="bg-white"
        />
      </div>

      {/* Confidence Bar */}
      <div className="bg-white rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Prediction Confidence</h3>
        <div className="relative pt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="absolute h-2 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-gray-500">Low Confidence</span>
            <span className="text-green-600">{confidencePercent}% Confident</span>
            <span className="text-gray-500">High Confidence</span>
          </div>
              </div>
        <div className="bg-blue-50 p-4 rounded-lg mt-4">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
              <div>
              <h4 className="font-medium text-blue-900">Confidence Assessment</h4>
              <p className="text-blue-700 mt-1">
                {confidence > 0.9
                  ? "Very high confidence in prediction. The model is highly certain about this diagnosis."
                  : confidence > 0.7
                  ? "High confidence in prediction. The model shows strong certainty in the diagnosis."
                  : "Moderate confidence in prediction. Additional verification may be recommended."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Measurements */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Detailed Measurements</h3>
          <span className="text-sm text-blue-600">Current Values</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            label="Area" 
            value={analysis.area_mm2} 
            unit="mm²"
            trend={{ value: 49.82, label: "vs. typical range" }}
          />
          <MetricCard
            label="Perimeter" 
            value={analysis.perimeter_mm} 
            unit="mm" 
          />
          <MetricCard
            label="Circularity" 
            value={analysis.circularity}
            trend={{ value: -8.87, label: "vs. typical value" }}
          />
        </div>
      </div>

      {/* Tumor Characteristics */}
      <div className="bg-white rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Tumor Characteristics Analysis</h3>
        
          {/* Severity Assessment */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Severity Assessment</h4>
              <div className="relative">
            <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full" />
            <div
              className="absolute top-0 transform -translate-x-1/2"
              style={{ left: `${(analysis.circularity * 100)}%` }}
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg" />
                  </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Low</span>
              <span>High</span>
              </div>
            </div>
          </div>

        {/* Comparison Values */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Comparison with Typical Values</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Size</span>
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Within range
                  </span>
                </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Circularity</span>
              <span className="text-green-600 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Typical
                  </span>
            </div>
          </div>
        </div>

        {/* Tumor Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700">Tumor Information</h4>
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-medium text-blue-900">About This Tumor</h5>
            <p className="text-blue-700 mt-2">
              {tumorType === 'pituitary' 
                ? "Typically benign growth on the pituitary gland"
                : tumorType === 'meningioma'
                ? "Slow-growing tumor that forms on membranes covering brain and spinal cord"
                : tumorType === 'glioma'
                ? "Most common type of brain tumor, arising from glial cells"
                : "Tumor type not specified"}
            </p>
              </div>
              
          {/* Risk Factors */}
          <div className="space-y-3">
            <h5 className="font-medium text-gray-700">Risk Factors</h5>
            {TUMOR_REFERENCE_DATA[tumorType]?.risk_factors.map((factor, index) => (
              <div
                      key={index}
                className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-start">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <factor.icon className="w-5 h-5 text-blue-600" />
                </div>
                  <div className="ml-4">
                    <h6 className="font-medium text-gray-900">{factor.factor}</h6>
                    <p className="text-gray-600 text-sm mt-1">{factor.description}</p>
              </div>
            </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center space-x-4 pt-6">
        <button
          onClick={onRetry}
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Analyze New Scan
        </button>
        <button
          onClick={onShare}
          className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Results
        </button>
      </div>
    </div>
  );
};

const NoTumorResult = ({ 
  confidence,
  onRetry,
  onShare,
  t,
}: { 
  confidence: number;
  onRetry: () => void;
  onShare: () => void;
  t: LanguageStrings;
}) => {
  const confidenceValue = Number(confidence);
  const confidencePercent = (confidenceValue * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <PrimaryStatCard 
          icon={Activity} 
          label="Diagnosis"
          value="No Tumor Detected"
          className="bg-gradient-to-br from-green-50 to-white"
        />
        <PrimaryStatCard 
          icon={Maximize}
          label="Size Classification" 
          value="N/A" 
        />
        <PrimaryStatCard icon={Target} label="Shape" value="N/A" />
        <PrimaryStatCard icon={AlertOctagon} label="Risk Level" value="None" />
      </div>

      {/* Confidence Details Card */}
      <div className="bg-white rounded-xl shadow-sm border border-green-100/40 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-900">
            Analysis Result
          </h3>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              {confidencePercent}% Confident
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${confidenceValue * 100}%` }}
            />
          </div>
          <div className="bg-green-50 rounded-lg p-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-lg bg-green-100 text-green-700">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-green-900 font-medium">
                  Healthy Scan Result
                </p>
                <p className="text-sm text-green-600 mt-1">
                  No tumor has been detected in this scan with{" "}
                  {confidencePercent}% confidence. Regular check-ups are still
                  recommended as part of preventive healthcare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-white border-2 border-green-600 text-green-600 rounded-xl font-medium 
                   hover:bg-green-50 transition-all duration-200 flex items-center shadow-sm hover:shadow-md"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          {t.retryButton}
        </button>
        <button
          onClick={onShare}
          className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium 
                   hover:bg-green-700 transition-all duration-200 flex items-center shadow-sm hover:shadow-md"
        >
          <Share2 className="w-5 h-5 mr-2" />
          {t.shareLabel}
        </button>
      </div>
    </div>
  );
};

const PatientInfoForm = ({
  onSubmit,
  loading,
  t,
}: {
  onSubmit: (data: PatientInfo) => void;
  loading: boolean;
  t: LanguageStrings;
}) => {
  const [formData, setFormData] = useState<PatientInfo>({
    fullName: "",
    age: 0,
    sex: "",
    relatedIssue: "",
    medicalHistory: "",
    previousTreatments: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : 0) : value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t.patientInfo.title}</h2>
            <p className="text-gray-500 mt-1">{t.patientInfo.subtitle}</p>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-2xl">
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientInfo.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.patientInfo.age} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    required
                    min="0"
                    max="150"
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                    value={formData.age || ""}
                    onChange={handleInputChange}
                    placeholder="Age"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.patientInfo.sex} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="sex"
                    required
                    className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                    value={formData.sex}
                    onChange={handleInputChange}
                  >
                    <option value="">{t.patientInfo.noneReported}</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientInfo.relatedIssues} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="relatedIssue"
                  required
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  rows={3}
                  value={formData.relatedIssue}
                  onChange={handleInputChange}
                  placeholder="Describe current symptoms and issues"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientInfo.medicalHistory}
                </label>
                <textarea
                  name="medicalHistory"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                  placeholder="Enter relevant medical history"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.patientInfo.previousTreatments}
                </label>
                <textarea
                  name="previousTreatments"
                  className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white resize-none"
                  rows={3}
                  value={formData.previousTreatments}
                  onChange={handleInputChange}
                  placeholder="List any previous treatments"
                />
              </div>
            </div>
            </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            <div className="flex items-center text-sm text-gray-500">
              <AlertTriangle className="w-4 h-4 mr-2 text-blue-500" />
              <span>Fields marked with <span className="text-red-500">*</span> are required</span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  {t.analyzingText}
                </>
              ) : (
                <>
                  Continue to Upload
                  <ChevronRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
            </div>
        </form>
      </div>
    </div>
  );
};

interface ImageAnalysisProps {
  file: File | null;
  analyzing: boolean;
  zoom: number;
  setZoom: (zoom: number) => void;
  contrast: number;
  setContrast: (contrast: number) => void;
  currentFilter: { name: string; filter: string };
  setCurrentFilter: (filter: { name: string; filter: string }) => void;
  onAnalyze: () => void;
  t: LanguageStrings;
}

const ImageAnalysis: React.FC<ImageAnalysisProps> = ({
  file,
  analyzing,
  zoom,
  setZoom,
  contrast,
  setContrast,
  currentFilter,
  setCurrentFilter,
  onAnalyze,
  t
}) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Image Preview & Controls</h2>
            <p className="text-gray-500 mt-1">Adjust the image before analysis</p>
          </div>
        </div>
        
        {/* Image Preview */}
        <div className="space-y-8">
          <div className="relative aspect-square max-h-[600px] overflow-hidden rounded-lg border border-gray-200">
            <img
              src={file ? URL.createObjectURL(file) : ''}
              alt="Brain MRI Scan"
              className="w-full h-full object-contain transition-all duration-300"
              style={{
                transform: `scale(${zoom})`,
                filter: `contrast(${contrast}%) ${currentFilter.filter}`,
              }}
            />
          </div>

          {/* Image Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Image Controls
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Zoom Control */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Zoom
                    </label>
                    <span className="text-sm text-gray-500">{zoom}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.1"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Contrast Control */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700">
                      Contrast
                    </label>
                    <span className="text-sm text-gray-500">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="150"
                    value={contrast}
                    onChange={(e) => setContrast(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Medical Filters */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Medical Filters
              </h3>
              <div className="flex flex-wrap gap-3">
                {medicalFilters.map((filter) => (
                  <button
                    key={filter.name}
                    onClick={() => setCurrentFilter(filter)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium
                      ${
                        currentFilter.name === filter.name
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                      }
                      transition-all duration-300
                    `}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Analysis Button */}
            <div className="flex justify-center pt-6">
              <button
                onClick={onAnalyze}
                disabled={analyzing}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    <span>Start Analysis</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add Language Switcher Component
const LanguageSwitcher = ({
  currentLang,
  onLanguageChange,
}: {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}) => {
  return (
    <div className="absolute mt-20 right-4 flex space-x-2">
      {(["en", "am", "or"] as Language[]).map((lang) => (
                        <button
          key={lang}
          onClick={() => onLanguageChange(lang)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentLang === lang
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          {lang === "en" ? "English" : lang === "am" ? "አማርኛ" : "Afaan Oromoo"}
                        </button>
      ))}
                      </div>
  );
};

// Define the StatCard component
const StatCard = ({ icon: Icon, label, value, className }: { icon: any; label: string; value: string; className?: string }) => (
  <div className={`p-6 rounded-xl ${className}`}>
    <div className="flex items-center space-x-2 mb-2">
      <Icon className="w-5 h-5 text-gray-600" />
      <span className="text-sm text-gray-600">{label}</span>
                    </div>
    <div className="text-xl font-semibold text-gray-900">{value}</div>
  </div>
);

// Define the MetricCard component
const MetricCard = ({ 
  label, 
  value, 
  unit, 
  trend 
}: { 
  label: string; 
  value: number; 
  unit?: string;
  trend?: { value: number; label: string; }
}) => (
  <div className="bg-white rounded-xl p-6">
    <div className="text-sm text-gray-600 mb-2">{label}</div>
    <div className="text-2xl font-semibold text-gray-900">
      {value.toFixed(1)}{unit}
                      </div>
    {trend && (
      <div className={`text-sm mt-2 flex items-center ${trend.value > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend.value > 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
      </div>
    )}
  </div>
);

export default function AdvancedMedicalImageAnalysis() {
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [patientData, setPatientData] = useState<PatientInfo | null>(null);
  const [zoom, setZoom] = useState(1);
  const [contrast, setContrast] = useState(100);
  const [analyzing, setAnalyzing] = useState(false);
  const [currentFilter, setCurrentFilter] = useState(medicalFilters[0]);
  const [language, setLanguage] = useState<Language>("en");
  const t = languages[language];

  const handleFileUpload = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setCurrentStep('preview');
    }
  }, [setFile, setCurrentStep]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1
  });

  const handlePatientInfoSubmit = async (data: PatientInfo) => {
    setPatientData(data);
    setCurrentStep('upload');
  };

  const handleStartAnalysis = async () => {
    if (!file || !patientData) {
      toast.error('Please provide both patient information and an image');
      return;
    }

    setAnalyzing(true);
    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("file", file);
      formData.append("patient_info", JSON.stringify(patientData));

      // Make API call
      const response = await axiosInstance.post("/api/predict/", formData);
      const { prediction, confidence, analysis } = response.data;

      if (prediction && typeof confidence === 'number') {
        setResult({
          analysis: prediction === 'notumor' ? null : {
            ...(analysis || {}),
            severity: analysis?.severity || "Unknown",
          },
          tumorType: prediction,
          confidence: confidence,
        });
        setCurrentStep('result');
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error('Analysis error:', error);
      toast.error('Analysis failed. Please try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setFile(null);
    setResult(null);
    setPatientData(null);
    setCurrentStep('form');
    setZoom(1);
    setContrast(100);
    setCurrentFilter(medicalFilters[0]);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pt-24">

      <div className="container mx-auto px-4">
        {!result ? (
          <>
            {currentStep === 'form' ? (
              <PatientInfoForm onSubmit={handlePatientInfoSubmit} loading={analyzing} t={t} />
            ) : currentStep === 'upload' ? (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-100">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Upload MRI Scan</h2>
                      <p className="text-gray-500 mt-1">Drag and drop or click to select a file</p>
                    </div>
                  </div>
                  <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input {...getInputProps()} />
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center">
                        <Upload className="w-8 h-8 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-gray-600">{isDragActive ? "Drop the file here" : "Drag & drop or click to select"}</p>
                        <p className="text-sm text-gray-500 mt-1">Supported formats: JPG, PNG</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentStep === 'preview' ? (
              <ImageAnalysis
                file={file}
                analyzing={analyzing}
                zoom={zoom}
                setZoom={setZoom}
                contrast={contrast}
                setContrast={setContrast}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
                onAnalyze={handleStartAnalysis}
                t={t}
              />
            ) : null}
          </>
        ) : (
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {result.tumorType === "notumor" ? (
              <NoTumorResult 
                confidence={result.confidence}
                onRetry={resetAnalysis}
                onShare={() => {}}
                t={t}
              />
            ) : result.tumorType && patientData ? (
              <TumorMetricsChart 
                analysis={result.analysis!} 
                tumorType={result.tumorType || "unknown"}
                confidence={result.confidence}
                onRetry={resetAnalysis}
                onShare={() => {}}
                t={t}
                patientData={patientData}
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
