// Type definitions for Agri Advisor Web Platform based on TRD schema

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  village: string;
  state: string;
  district: string;
  coordinates: Coordinates;
}

export interface LandArea {
  value: number;
  unit: string;
}

export interface NPK {
  N: number;
  P: number;
  K: number;
}

export interface SoilType {
  texture: string;
  photoUrl?: string;
  labTested: boolean;
  NPK?: NPK;
  pH?: number;
  organicContent?: string;
}

export interface WaterAvailability {
  type: string;
  depth?: number;
  frequency: string;
  irrigationAvailable: boolean;
}

export interface PastCropHistory {
  crop: string;
  season: string;
  year: number;
  disease?: string;
}

export interface FarmerProfile {
  userId: string;
  language: string;
  contactMode: string;
  location: Location;
  landArea: LandArea;
  soilType: SoilType;
  waterAvailability: WaterAvailability;
  budgetINR: number;
  timelineDays: number;
  laborCount: number;
  riskPreference: string;
  pastCropHistory?: PastCropHistory[];
}

export interface RecommendedCrop {
  name: string;
  suitabilityScore: number;
  expectedYield?: number;
  inputCost: number;
  timeToHarvest: number;
  prosCons: string;
}

export interface FertilizerPlan {
  stage: string;
  inputs: string;
  frequency: string;
  quantity: number;
}

export interface PestSchedule {
  crop: string;
  riskLevel: string;
  symptoms: string;
  recommendedAction: string;
}

export interface CropCalendar {
  period: string;
  operation: string;
  details: string;
}

export interface AdvisoryOutput {
  recommendedCrops: RecommendedCrop[];
  fertilizerPlan: FertilizerPlan[];
  pestSchedule: PestSchedule[];
  cropCalendar: CropCalendar[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FarmerRegisterRequest {
  userId: string;
  language: string;
  contactMode: string;
}

export interface FarmerInputRequest {
  userId: string;
  location: Location;
  landArea: LandArea;
  soilType: SoilType;
  waterAvailability: WaterAvailability;
  budgetINR: number;
  timelineDays: number;
  laborCount: number;
  riskPreference: string;
  pastCropHistory?: PastCropHistory[];
}

export interface SoilTestRequest {
  userId: string;
  soilPhoto: File;
  location: Location;
}

export interface PestDetectionRequest {
  userId: string;
  pestPhoto: File;
  cropName: string;
  location: Location;
}

export interface WeatherAlert {
  location: Location;
  alertType: 'rain' | 'drought' | 'storm' | 'temperature';
  severity: 'low' | 'medium' | 'high';
  message: string;
  validUntil: string;
}

export interface MarketPriceAlert {
  cropName: string;
  currentPrice: number;
  previousPrice: number;
  changePercent: number;
  market: string;
  lastUpdated: string;
}

// Form Field Types
export interface FormField {
  field: string;
  input_type: string;
  validation: string;
}

export interface AccessibilityFeatures {
  keyboard_navigation: boolean;
  large_click_targets: boolean;
  visual_and_audio_guides: boolean;
}

export interface UIDesign {
  responsive_web: boolean;
  accessibility: AccessibilityFeatures;
  multilingual_support: string[];
  input_modes: string[];
  form_structure: FormField[];
  output_components: string[];
}

export interface StorageConfig {
  type: string;
  security: {
    encryption: boolean;
    userAccessScope: string[];
  };
}

export interface IntegrationConfig {
  pestAI: string[];
  weatherAPI: boolean;
  marketAPI: boolean;
}

export interface BackendConfig {
  api_endpoints: string[];
  data_models: {
    FarmerProfile: any;
    AdvisoryOutput: any;
  };
  storage: StorageConfig;
  integration: IntegrationConfig;
}

export interface WebPlatformTRD {
  project_name: string;
  description: string;
  frontend: {
    ui_design: UIDesign;
  };
  backend: BackendConfig;
  test_cases: Array<{
    scenario: string;
    expected: string;
  }>;
  user_stories: Array<{
    role: string;
    goal: string;
  }>;
}

// Component Props Types
export interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
  languages: string[];
}

export interface FarmerFormProps {
  onSubmit: (data: FarmerInputRequest) => void;
  initialData?: Partial<FarmerInputRequest>;
  isLoading?: boolean;
}

export interface AdvisoryResultsProps {
  advisory: AdvisoryOutput;
  onDownload?: () => void;
  onPrint?: () => void;
}

export interface MapComponentProps {
  location: Location;
  onLocationChange: (location: Location) => void;
  readonly?: boolean;
}

export interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
  label: string;
}

export interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language: string;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export interface AlertComponentProps {
  alerts: (WeatherAlert | MarketPriceAlert)[];
  onDismiss: (alertId: string) => void;
}

export interface PrintableCalendarProps {
  calendar: CropCalendar[];
  language: string;
  farmerName?: string;
  cropName?: string;
}