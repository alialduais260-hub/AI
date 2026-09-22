import { ProcessedRecord } from '../types';

export interface ColumnStat {
  name: string;
  nameAr: string;
  type: 'numeric' | 'categorical';
  mean?: number;
  std?: number;
  min?: number;
  max?: number;
  missingCount: number;
  uniqueValues?: number;
  categories?: { label: string; count: number }[];
}

export const creditcardProcessedSamples: ProcessedRecord[] = [
  { id: 'TX-10492', Time_sec: 406.0, scaled_time: -0.995, V1: -2.31, V2: 1.95, V3: -1.61, V4: 3.99, V10: -2.77, V12: -2.90, V14: -4.29, V17: -2.83, Amount_usd: 129.99, scaled_amount: 1.54, Class: 1, Pred_Prob: 0.942, Pred_Default_05: 1, Pred_Optimal_028: 1, Status: 'احتيال مكتشف (TP)' },
  { id: 'TX-10493', Time_sec: 412.0, scaled_time: -0.994, V1: 1.23, V2: -0.12, V3: 0.45, V4: -0.21, V10: 0.18, V12: 0.32, V14: 0.15, V17: -0.10, Amount_usd: 14.50, scaled_amount: -0.11, Class: 0, Pred_Prob: 0.012, Pred_Default_05: 0, Pred_Optimal_028: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'TX-10494', Time_sec: 472.0, scaled_time: -0.992, V1: -3.04, V2: -3.16, V3: 1.09, V4: -0.88, V10: -0.85, V12: -0.21, V14: -0.88, V17: 0.48, Amount_usd: 529.00, scaled_amount: 7.10, Class: 0, Pred_Prob: 0.045, Pred_Default_05: 0, Pred_Optimal_028: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'TX-10495', Time_sec: 539.0, scaled_time: -0.991, V1: -1.82, V2: 2.11, V3: -2.45, V4: 3.82, V10: -3.12, V12: -3.55, V14: -5.41, V17: -3.19, Amount_usd: 0.00, scaled_amount: -0.31, Class: 1, Pred_Prob: 0.981, Pred_Default_05: 1, Pred_Optimal_028: 1, Status: 'احتيال مكتشف (TP)' },
  { id: 'TX-10496', Time_sec: 620.0, scaled_time: -0.988, V1: -0.92, V2: 0.81, V3: -1.15, V4: 1.95, V10: -1.82, V12: -1.94, V14: -2.31, V17: -1.45, Amount_usd: 85.00, scaled_amount: 0.91, Class: 1, Pred_Prob: 0.384, Pred_Default_05: 0, Pred_Optimal_028: 1, Status: 'احتيال تم إنقاذه بالعتبة المحسنة!' },
  { id: 'TX-10497', Time_sec: 755.0, scaled_time: -0.985, V1: 0.95, V2: 0.05, V3: 0.82, V4: 0.44, V10: -0.05, V12: 0.11, V14: 0.08, V17: -0.02, Amount_usd: 35.80, scaled_amount: 0.22, Class: 0, Pred_Prob: 0.008, Pred_Default_05: 0, Pred_Optimal_028: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'TX-10498', Time_sec: 810.0, scaled_time: -0.983, V1: -1.10, V2: 1.25, V3: -1.42, V4: 2.11, V10: -1.95, V12: -2.05, V14: -2.85, V17: -1.80, Amount_usd: 210.00, scaled_amount: 2.65, Class: 1, Pred_Prob: 0.420, Pred_Default_05: 0, Pred_Optimal_028: 1, Status: 'احتيال تم إنقاذه بالعتبة المحسنة!' },
  { id: 'TX-10499', Time_sec: 940.0, scaled_time: -0.980, V1: 1.15, V2: -0.22, V3: 0.65, V4: 0.18, V10: 0.05, V12: -0.15, V14: 0.22, V17: -0.14, Amount_usd: 5.00, scaled_amount: -0.24, Class: 0, Pred_Prob: 0.004, Pred_Default_05: 0, Pred_Optimal_028: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'TX-10500', Time_sec: 1025.0, scaled_time: -0.978, V1: -4.39, V2: 3.88, V3: -4.80, V4: 4.57, V10: -5.11, V12: -6.21, V14: -7.52, V17: -5.92, Amount_usd: 1.00, scaled_amount: -0.29, Class: 1, Pred_Prob: 0.999, Pred_Default_05: 1, Pred_Optimal_028: 1, Status: 'احتيال مكتشف (TP)' },
  { id: 'TX-10501', Time_sec: 1110.0, scaled_time: -0.975, V1: 0.88, V2: -0.41, V3: 1.12, V4: 0.55, V10: 0.14, V12: 0.25, V14: 0.31, V17: -0.05, Amount_usd: 62.40, scaled_amount: 0.59, Class: 0, Pred_Prob: 0.015, Pred_Default_05: 0, Pred_Optimal_028: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'TX-10502', Time_sec: 1205.0, scaled_time: -0.972, V1: -0.75, V2: 0.95, V3: -1.02, V4: 1.62, V10: -1.45, V12: -1.58, V14: -2.10, V17: -1.22, Amount_usd: 145.00, scaled_amount: 1.74, Class: 1, Pred_Prob: 0.315, Pred_Default_05: 0, Pred_Optimal_028: 1, Status: 'احتيال تم إنقاذه بالعتبة المحسنة!' },
  { id: 'TX-10503', Time_sec: 1330.0, scaled_time: -0.969, V1: 1.45, V2: -0.35, V3: -0.15, V4: -0.42, V10: 0.28, V12: 0.44, V14: -0.05, V17: -0.18, Amount_usd: 22.00, scaled_amount: 0.01, Class: 0, Pred_Prob: 0.009, Pred_Default_05: 0, Pred_Optimal_028: 0, Status: 'سليم مؤكد (TN)' }
];

export const heartDiseaseProcessedSamples: ProcessedRecord[] = [
  { id: 'PT-0101', Age: 63, Sex: 'ذكر (M)', ChestPain: 'ألم غير نمطي (ASY)', RestingBP: 145, Cholesterol: 233, FastingBS: 1, RestingECG: 'طبيعي (Normal)', MaxHR: 150, ExerciseAngina: 'لا (N)', Oldpeak: 2.3, ST_Slope: 'منحدر لأسفل (Down)', HeartDisease: 1, Pred_Prob: 0.884, Pred_Default_05: 1, Pred_Optimal_035: 1, Status: 'مريض مصاب مكتشف (TP)' },
  { id: 'PT-0102', Age: 37, Sex: 'ذكر (M)', ChestPain: 'ألم غير وعائي (NAP)', RestingBP: 130, Cholesterol: 250, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 187, ExerciseAngina: 'لا (N)', Oldpeak: 3.5, ST_Slope: 'منحدر لأسفل (Down)', HeartDisease: 1, Pred_Prob: 0.745, Pred_Default_05: 1, Pred_Optimal_035: 1, Status: 'مريض مصاب مكتشف (TP)' },
  { id: 'PT-0103', Age: 41, Sex: 'أنثى (F)', ChestPain: 'ألم لا نموذجي (ATA)', RestingBP: 130, Cholesterol: 204, FastingBS: 0, RestingECG: 'تضخم (LVH)', MaxHR: 172, ExerciseAngina: 'لا (N)', Oldpeak: 1.4, ST_Slope: 'صاعد (Up)', HeartDisease: 0, Pred_Prob: 0.125, Pred_Default_05: 0, Pred_Optimal_035: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'PT-0104', Age: 56, Sex: 'ذكر (M)', ChestPain: 'ألم غير نمطي (ASY)', RestingBP: 120, Cholesterol: 236, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 178, ExerciseAngina: 'لا (N)', Oldpeak: 0.8, ST_Slope: 'صاعد (Up)', HeartDisease: 0, Pred_Prob: 0.180, Pred_Default_05: 0, Pred_Optimal_035: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'PT-0105', Age: 57, Sex: 'ذكر (M)', ChestPain: 'ألم غير نمطي (ASY)', RestingBP: 140, Cholesterol: 192, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 148, ExerciseAngina: 'نعم (Y)', Oldpeak: 0.4, ST_Slope: 'أفقي (Flat)', HeartDisease: 1, Pred_Prob: 0.442, Pred_Default_05: 0, Pred_Optimal_035: 1, Status: 'مريض تم إنقاذه بالعتبة الطبية المحسنة!' },
  { id: 'PT-0106', Age: 57, Sex: 'ذكر (M)', ChestPain: 'ألم غير نمطي (ASY)', RestingBP: 132, Cholesterol: 207, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 168, ExerciseAngina: 'نعم (Y)', Oldpeak: 1.0, ST_Slope: 'صاعد (Up)', HeartDisease: 0, Pred_Prob: 0.220, Pred_Default_05: 0, Pred_Optimal_035: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'PT-0107', Age: 56, Sex: 'أنثى (F)', ChestPain: 'ألم غير وعائي (NAP)', RestingBP: 140, Cholesterol: 294, FastingBS: 0, RestingECG: 'تضخم (LVH)', MaxHR: 153, ExerciseAngina: 'لا (N)', Oldpeak: 1.3, ST_Slope: 'أفقي (Flat)', HeartDisease: 1, Pred_Prob: 0.380, Pred_Default_05: 0, Pred_Optimal_035: 1, Status: 'مريض تم إنقاذه بالعتبة الطبية المحسنة!' },
  { id: 'PT-0108', Age: 44, Sex: 'ذكر (M)', ChestPain: 'ألم لا نموذجي (ATA)', RestingBP: 120, Cholesterol: 263, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 173, ExerciseAngina: 'لا (N)', Oldpeak: 0.0, ST_Slope: 'صاعد (Up)', HeartDisease: 0, Pred_Prob: 0.082, Pred_Default_05: 0, Pred_Optimal_035: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'PT-0109', Age: 52, Sex: 'ذكر (M)', ChestPain: 'ألم غير نمطي (ASY)', RestingBP: 172, Cholesterol: 199, FastingBS: 1, RestingECG: 'طبيعي (Normal)', MaxHR: 162, ExerciseAngina: 'لا (N)', Oldpeak: 0.5, ST_Slope: 'صاعد (Up)', HeartDisease: 1, Pred_Prob: 0.410, Pred_Default_05: 0, Pred_Optimal_035: 1, Status: 'مريض تم إنقاذه بالعتبة الطبية المحسنة!' },
  { id: 'PT-0110', Age: 54, Sex: 'ذكر (M)', ChestPain: 'ألم نموذجي (TA)', RestingBP: 110, Cholesterol: 239, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 126, ExerciseAngina: 'نعم (Y)', Oldpeak: 2.8, ST_Slope: 'أفقي (Flat)', HeartDisease: 1, Pred_Prob: 0.920, Pred_Default_05: 1, Pred_Optimal_035: 1, Status: 'مريض مصاب مكتشف (TP)' },
  { id: 'PT-0111', Age: 48, Sex: 'أنثى (F)', ChestPain: 'ألم لا نموذجي (ATA)', RestingBP: 130, Cholesterol: 275, FastingBS: 0, RestingECG: 'طبيعي (Normal)', MaxHR: 139, ExerciseAngina: 'لا (N)', Oldpeak: 0.2, ST_Slope: 'صاعد (Up)', HeartDisease: 0, Pred_Prob: 0.095, Pred_Default_05: 0, Pred_Optimal_035: 0, Status: 'سليم مؤكد (TN)' },
  { id: 'PT-0112', Age: 65, Sex: 'ذكر (M)', ChestPain: 'ألم غير نمطي (ASY)', RestingBP: 135, Cholesterol: 254, FastingBS: 0, RestingECG: 'تضخم (LVH)', MaxHR: 127, ExerciseAngina: 'نعم (Y)', Oldpeak: 2.8, ST_Slope: 'أفقي (Flat)', HeartDisease: 1, Pred_Prob: 0.952, Pred_Default_05: 1, Pred_Optimal_035: 1, Status: 'مريض مصاب مكتشف (TP)' }
];

export const creditcardColumnStats: ColumnStat[] = [
  { name: 'Time', nameAr: 'الوقت بالثواني', type: 'numeric', mean: 94813.86, std: 47488.15, min: 0.0, max: 172792.0, missingCount: 0 },
  { name: 'scaled_time', nameAr: 'الوقت المعاير', type: 'numeric', mean: 0.01, std: 0.56, min: -1.0, max: 1.04, missingCount: 0 },
  { name: 'Amount', nameAr: 'قيمة العملية ($)', type: 'numeric', mean: 88.35, std: 250.12, min: 0.0, max: 25691.16, missingCount: 0 },
  { name: 'scaled_amount', nameAr: 'المبلغ المعاير', type: 'numeric', mean: 0.92, std: 3.49, min: -0.31, max: 358.68, missingCount: 0 },
  { name: 'V14', nameAr: 'المكون الرئيسي V14', type: 'numeric', mean: 0.00, std: 0.96, min: -19.21, max: 10.53, missingCount: 0 },
  { name: 'V10', nameAr: 'المكون الرئيسي V10', type: 'numeric', mean: 0.00, std: 1.09, min: -24.59, max: 23.75, missingCount: 0 },
  { name: 'V12', nameAr: 'المكون الرئيسي V12', type: 'numeric', mean: 0.00, std: 1.00, min: -18.68, max: 7.85, missingCount: 0 },
  { name: 'V4', nameAr: 'المكون الرئيسي V4', type: 'numeric', mean: 0.00, std: 1.42, min: -5.68, max: 16.88, missingCount: 0 },
  { name: 'Class', nameAr: 'فئة الاحتيال (الهدف)', type: 'categorical', missingCount: 0, categories: [{ label: '0 (سليم)', count: 284315 }, { label: '1 (احتيال)', count: 492 }] }
];

export const heartDiseaseColumnStats: ColumnStat[] = [
  { name: 'Age', nameAr: 'عمر المريض (سنة)', type: 'numeric', mean: 53.51, std: 9.43, min: 28, max: 77, missingCount: 0 },
  { name: 'Sex', nameAr: 'الجنس', type: 'categorical', missingCount: 0, categories: [{ label: 'ذكر (M)', count: 725 }, { label: 'أنثى (F)', count: 300 }] },
  { name: 'ChestPainType', nameAr: 'نوع ألم الصدر', type: 'categorical', missingCount: 0, categories: [{ label: 'ASY (غير نمطي)', count: 496 }, { label: 'NAP (غير وعائي)', count: 203 }, { label: 'ATA (لا نموذجي)', count: 173 }, { label: 'TA (نموذجي)', count: 46 }] },
  { name: 'RestingBP', nameAr: 'ضغط الدم الانقباضي (mmHg)', type: 'numeric', mean: 132.4, std: 17.9, min: 90, max: 200, missingCount: 0 },
  { name: 'Cholesterol', nameAr: 'كوليسترول المصل (mg/dl)', type: 'numeric', mean: 244.6, std: 53.2, min: 126, max: 603, missingCount: 0 },
  { name: 'FastingBS', nameAr: 'سكر الصيام (>120 mg/dl)', type: 'categorical', missingCount: 0, categories: [{ label: '0 (طبيعي)', count: 792 }, { label: '1 (مرتفع)', count: 233 }] },
  { name: 'MaxHR', nameAr: 'أقصى نبض محقق (bpm)', type: 'numeric', mean: 136.8, std: 25.4, min: 60, max: 202, missingCount: 0 },
  { name: 'ExerciseAngina', nameAr: 'ذبحة أثناء الجهد', type: 'categorical', missingCount: 0, categories: [{ label: 'لا (N)', count: 628 }, { label: 'نعم (Y)', count: 397 }] },
  { name: 'Oldpeak', nameAr: 'انخفاض ST بالجهد (mm)', type: 'numeric', mean: 0.89, std: 1.07, min: -2.6, max: 6.2, missingCount: 0 },
  { name: 'HeartDisease', nameAr: 'الإصابة بالمرض (الهدف)', type: 'categorical', missingCount: 0, categories: [{ label: '1 (مصاب)', count: 526 }, { label: '0 (سليم)', count: 499 }] }
];

export function generateCsvContent(datasetId: 'creditcard' | 'heart_disease'): string {
  const samples = datasetId === 'creditcard' ? creditcardProcessedSamples : heartDiseaseProcessedSamples;
  if (!samples.length) return '';
  const headers = Object.keys(samples[0]);
  const rows = samples.map(row => 
    headers.map(h => {
      const val = row[h];
      return typeof val === 'string' ? `"${val}"` : val;
    }).join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}

export function downloadFile(filename: string, content: string, contentType: string = 'text/csv') {
  const blob = new Blob([content], { type: `${contentType};charset=utf-8;` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
