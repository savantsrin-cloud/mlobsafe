export type Language = "en" | "km";

export type SeverityLevel = "mild" | "moderate" | "danger";

export interface SymptomItem {
  id: string;
  labelEn: string;
  labelKm: string;
  severity: SeverityLevel;
  iconName: string;
}

export interface HeatIllness {
  id: string;
  nameEn: string;
  nameKm: string;
  shortDescEn: string;
  shortDescKm: string;
  severity: "mild" | "moderate" | "emergency";
  severityLabelEn: string;
  severityLabelKm: string;
  symptomsEn: string[];
  symptomsKm: string[];
  whatToDoEn: string[];
  whatToDoKm: string[];
  seekMedicalEn: string;
  seekMedicalKm: string;
  colorScheme: "green" | "orange" | "red";
  cdcCompliant?: boolean;
  imageUrl?: string;
  imageAltEn?: string;
  imageAltKm?: string;
}

export type JobCategory = "all" | "garment" | "transport" | "food_seller";

export interface JobTip {
  id: string;
  category: "garment" | "transport" | "food_seller";
  titleEn: string;
  titleKm: string;
  roleEn: string;
  roleKm: string;
  environmentEn: string;
  environmentKm: string;
  keyActionEn: string;
  keyActionKm: string;
  tipsEn: string[];
  tipsKm: string[];
  icon: string;
  imageUrl?: string;
  imageAltEn?: string;
  imageAltKm?: string;
  imageCreditEn?: string;
  imageCreditKm?: string;
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionKm: string;
  optionsEn: string[];
  optionsKm: string[];
  correctIndex: number;
  explanationEn: string;
  explanationKm: string;
}

export interface HeatStatItem {
  metric: string;
  titleEn: string;
  titleKm: string;
  descriptionEn: string;
  descriptionKm: string;
  source: string;
}

export interface HeatStatGroup {
  id: string;
  groupTitleEn: string;
  groupTitleKm: string;
  items: HeatStatItem[];
}

export interface HeatTimelineItem {
  monthEn: string;
  monthKm: string;
  targetGroupEn: string;
  targetGroupKm: string;
  riskFactorEn: string;
  riskFactorKm: string;
  adviceEn: string;
  adviceKm: string;
  source: string;
  imageUrl?: string;
  imageAltEn?: string;
  imageAltKm?: string;
  imageCreditEn?: string;
  imageCreditKm?: string;
}

export interface SourceCitation {
  name: string;
  year: string;
  titleEn: string;
  titleKm: string;
  detailEn: string;
  detailKm: string;
}

export interface CambodiaHeatRegion {
  id: string;
  nameEn: string;
  nameKm: string;
  zoneEn: string;
  zoneKm: string;
  lat: number;
  lng: number;
  x?: number;
  y?: number;
  peakTemp: number;
  peakHumidity: number;
  peakHeatIndex: number;
  peakRisk: "extreme" | "danger" | "caution";
  uvIndex: number;
  morningTemp: number;
  morningHeatIndex: number;
  morningRisk: "danger" | "caution" | "safe";
  aprilPeakTemp: number;
  aprilHeatIndex: number;
  aprilRisk: "extreme" | "danger";
  isGarmentHub?: boolean;
  isTransportHub?: boolean;
  isMarketHub?: boolean;
  garmentAlertEn: string;
  garmentAlertKm: string;
  transportAlertEn: string;
  transportAlertKm: string;
  foodSellerAlertEn: string;
  foodSellerAlertKm: string;
  waterAdviceEn: string;
  waterAdviceKm: string;
  shadeAdviceEn: string;
  shadeAdviceKm: string;
}
