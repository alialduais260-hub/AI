export type ActiveTab = 'codes' | 'evaluation' | 'presentation' | 'datasets';

export type DatasetId = 'creditcard' | 'heart_disease';

export interface DatasetMeta {
  id: DatasetId;
  name: string;
  nameEn: string;
  filename: string;
  description: string;
  domain: string;
  samplesCount: number;
  featuresCount: number;
  positiveClass: string;
  negativeClass: string;
  classBalanceRaw: { positive: number; negative: number; positivePct: number };
  classBalanceProcessed: { positive: number; negative: number; positivePct: number };
  defaultThreshold: number;
  optimalThreshold: number;
  aucRoc: number;
  aucPr: number;
}

export interface MetricPoint {
  threshold: number;
  accuracy: number;
  recall: number;
  precision: number;
  specificity: number;
  f1: number;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  cost: number;
  youdenJ: number;
}

export interface RocPoint {
  fpr: number;
  tpr: number;
  threshold: number;
}

export interface PrPoint {
  recall: number;
  precision: number;
  threshold: number;
}

export interface ShapFeature {
  name: string;
  nameAr: string;
  meanAbsShap: number;
  correlation: 'positive' | 'negative';
  description: string;
  oddsRatio: number;
  pValue: number;
  confidenceInterval: [number, number];
}

export interface ShapWaterfallItem {
  feature: string;
  value: string | number;
  contribution: number; // positive increases probability, negative decreases
}

export interface PresentationSlide {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  content: {
    overview: string;
    points: string[];
    equations?: { label: string; formula: string; explanation: string }[];
    metricsComparison?: { label: string; value1: string; value2: string; note: string }[];
    codeSnippet?: string;
    academicNote: string;
  };
}

export interface ProcessedRecord {
  id: string | number;
  [key: string]: any;
}
