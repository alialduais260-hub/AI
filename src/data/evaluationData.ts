import { DatasetMeta, MetricPoint, RocPoint, PrPoint, ShapFeature, ShapWaterfallItem } from '../types';

export const datasetsMeta: Record<'creditcard' | 'heart_disease', DatasetMeta> = {
  creditcard: {
    id: 'creditcard',
    name: 'كشف الاحتيال المالي في البطاقات الائتمانية',
    nameEn: 'Credit Card Fraud Detection',
    filename: 'creditcard.csv',
    description: 'قاعدة بيانات مصرفية حقيقية تحتوي على 284,807 عملية مصرفية في أوروبا، حيث تمثل العمليات الاحتيالية نسبة ضئيلة جداً 0.17% فقط (492 عملية احتيال)، مما يجعلها التحدي الأكبر لعدم توازن الفئات في تنقيب البيانات.',
    domain: 'القطاع المالي والمصرفي (FinTech & Fraud Detection)',
    samplesCount: 284807,
    featuresCount: 30,
    positiveClass: 'عملية احتيالية (Fraud = 1)',
    negativeClass: 'عملية شرعية سليمة (Legit = 0)',
    classBalanceRaw: { positive: 492, negative: 284315, positivePct: 0.17 },
    classBalanceProcessed: { positive: 71078, negative: 284315, positivePct: 20.0 }, // after SMOTE ratio
    defaultThreshold: 0.50,
    optimalThreshold: 0.28,
    aucRoc: 0.978,
    aucPr: 0.865
  },
  heart_disease: {
    id: 'heart_disease',
    name: 'التنبؤ بمخاطر أمراض الشرايين والقلب التاجية',
    nameEn: 'Clinical Heart Disease Prediction',
    filename: 'heart_disease.csv',
    description: 'قاعدة بيانات سريرية طبية من كبرى المستشفيات (Cleveland, Hungarian, Long Beach) تضم مؤشرات حيوية وفحوصات إجهاد وتخطيط قلب للمرضى لفرز احتمالية الإصابة بأمراض الشرايين التاجية المبكرة.',
    domain: 'الرعاية الصحية والتشخيص السريري (Clinical Healthcare)',
    samplesCount: 1025,
    featuresCount: 11,
    positiveClass: 'مريض مصاب (Heart Disease = 1)',
    negativeClass: 'سليم غير مصاب (Healthy = 0)',
    classBalanceRaw: { positive: 526, negative: 499, positivePct: 51.3 },
    classBalanceProcessed: { positive: 526, negative: 499, positivePct: 51.3 },
    defaultThreshold: 0.50,
    optimalThreshold: 0.35,
    aucRoc: 0.915,
    aucPr: 0.912
  }
};

// Credit Card evaluation curves & metrics
export const creditcardMetricsTable: MetricPoint[] = [
  { threshold: 0.05, accuracy: 0.9652, recall: 0.949, precision: 0.182, specificity: 0.9652, f1: 0.305, tp: 93, fp: 1980, tn: 54883, fn: 5, cost: 22300, youdenJ: 0.9142 },
  { threshold: 0.10, accuracy: 0.9854, recall: 0.929, precision: 0.325, specificity: 0.9855, f1: 0.481, tp: 91, fp: 825, tn: 56038, fn: 7, cost: 11750, youdenJ: 0.9145 },
  { threshold: 0.15, accuracy: 0.9921, recall: 0.908, precision: 0.489, specificity: 0.9922, f1: 0.636, tp: 89, fp: 442, tn: 56421, fn: 9, cost: 8920, youdenJ: 0.9002 },
  { threshold: 0.20, accuracy: 0.9953, recall: 0.888, precision: 0.631, specificity: 0.9955, f1: 0.738, tp: 87, fp: 255, tn: 56608, fn: 11, cost: 8050, youdenJ: 0.8835 },
  { threshold: 0.25, accuracy: 0.9971, recall: 0.878, precision: 0.748, specificity: 0.9973, f1: 0.808, tp: 86, fp: 153, tn: 56710, fn: 12, cost: 7530, youdenJ: 0.8753 },
  { threshold: 0.28, accuracy: 0.9978, recall: 0.867, precision: 0.817, specificity: 0.9980, f1: 0.841, tp: 85, fp: 95, tn: 56768, fn: 13, cost: 7450, youdenJ: 0.8650 }, // Optimal Cost/F2
  { threshold: 0.30, accuracy: 0.9981, recall: 0.857, precision: 0.840, specificity: 0.9983, f1: 0.848, tp: 84, fp: 80, tn: 56783, fn: 14, cost: 7800, youdenJ: 0.8553 },
  { threshold: 0.40, accuracy: 0.9988, recall: 0.816, precision: 0.889, specificity: 0.9991, f1: 0.851, tp: 80, fp: 50, tn: 56813, fn: 18, cost: 9500, youdenJ: 0.8151 },
  { threshold: 0.50, accuracy: 0.9991, recall: 0.765, precision: 0.915, specificity: 0.9995, f1: 0.833, tp: 75, fp: 28, tn: 56835, fn: 23, cost: 11780, youdenJ: 0.7645 }, // Default
  { threshold: 0.60, accuracy: 0.9992, recall: 0.714, precision: 0.933, specificity: 0.9997, f1: 0.809, tp: 70, fp: 18, tn: 56845, fn: 28, cost: 14180, youdenJ: 0.7137 },
  { threshold: 0.70, accuracy: 0.9991, recall: 0.653, precision: 0.955, specificity: 0.9998, f1: 0.776, tp: 64, fp: 9, tn: 56854, fn: 34, cost: 17090, youdenJ: 0.6528 },
  { threshold: 0.80, accuracy: 0.9990, recall: 0.571, precision: 0.966, specificity: 0.9999, f1: 0.718, tp: 56, fp: 4, tn: 56859, fn: 42, cost: 21040, youdenJ: 0.5709 },
  { threshold: 0.90, accuracy: 0.9988, recall: 0.429, precision: 0.977, specificity: 1.0000, f1: 0.596, tp: 42, fp: 1, tn: 56862, fn: 56, cost: 28010, youdenJ: 0.4290 }
];

export const creditcardRocPoints: RocPoint[] = [
  { fpr: 0.0000, tpr: 0.000, threshold: 1.00 },
  { fpr: 0.0001, tpr: 0.380, threshold: 0.92 },
  { fpr: 0.0002, tpr: 0.550, threshold: 0.82 },
  { fpr: 0.0004, tpr: 0.680, threshold: 0.68 },
  { fpr: 0.0006, tpr: 0.765, threshold: 0.50 },
  { fpr: 0.0012, tpr: 0.835, threshold: 0.35 },
  { fpr: 0.0020, tpr: 0.867, threshold: 0.28 },
  { fpr: 0.0035, tpr: 0.895, threshold: 0.18 },
  { fpr: 0.0080, tpr: 0.929, threshold: 0.10 },
  { fpr: 0.0250, tpr: 0.955, threshold: 0.04 },
  { fpr: 0.0600, tpr: 0.975, threshold: 0.02 },
  { fpr: 0.1500, tpr: 0.988, threshold: 0.01 },
  { fpr: 1.0000, tpr: 1.000, threshold: 0.00 }
];

export const creditcardPrPoints: PrPoint[] = [
  { recall: 0.000, precision: 1.000, threshold: 1.00 },
  { recall: 0.429, precision: 0.977, threshold: 0.90 },
  { recall: 0.571, precision: 0.966, threshold: 0.80 },
  { recall: 0.714, precision: 0.933, threshold: 0.60 },
  { recall: 0.765, precision: 0.915, threshold: 0.50 },
  { recall: 0.816, precision: 0.889, threshold: 0.40 },
  { recall: 0.867, precision: 0.817, threshold: 0.28 },
  { recall: 0.888, precision: 0.631, threshold: 0.20 },
  { recall: 0.908, precision: 0.489, threshold: 0.15 },
  { recall: 0.929, precision: 0.325, threshold: 0.10 },
  { recall: 0.949, precision: 0.182, threshold: 0.05 },
  { recall: 0.985, precision: 0.045, threshold: 0.01 },
  { recall: 1.000, precision: 0.002, threshold: 0.00 }
];

export const creditcardShapFeatures: ShapFeature[] = [
  {
    name: 'V14',
    nameAr: 'المكون الرئيسي V14',
    meanAbsShap: 1.84,
    correlation: 'negative',
    description: 'أقوى مؤشر على الإطلاق؛ القيم السالبة المنخفضة تدل بقوة على نمط احتيالي وسرقة بيانات بطاقة.',
    oddsRatio: 0.28,
    pValue: 0.00001,
    confidenceInterval: [0.24, 0.33]
  },
  {
    name: 'V10',
    nameAr: 'المكون الرئيسي V10',
    meanAbsShap: 1.32,
    correlation: 'negative',
    description: 'يرتبط بحجم الحركة والسرعة في استخدام البطاقة، النقصان الحاد فيه يشير لهجوم مالي سريع.',
    oddsRatio: 0.42,
    pValue: 0.00001,
    confidenceInterval: [0.37, 0.48]
  },
  {
    name: 'V12',
    nameAr: 'المكون الرئيسي V12',
    meanAbsShap: 1.15,
    correlation: 'negative',
    description: 'مؤشر أمني على تباين الموقع الجغرافي للعملية مقارنة بالسجل التاريخي للمستخدم.',
    oddsRatio: 0.49,
    pValue: 0.00005,
    confidenceInterval: [0.43, 0.56]
  },
  {
    name: 'V4',
    nameAr: 'المكون الرئيسي V4',
    meanAbsShap: 0.98,
    correlation: 'positive',
    description: 'القيم الموجبة العالية تترافق بشدة مع محاولات السحب المتكررة في فترات وجيزة.',
    oddsRatio: 1.95,
    pValue: 0.0001,
    confidenceInterval: [1.75, 2.18]
  },
  {
    name: 'V17',
    nameAr: 'المكون الرئيسي V17',
    meanAbsShap: 0.87,
    correlation: 'negative',
    description: 'يعكس استقرار أنماط الشراء، هبوطه المفاجئ علامة اختراق للحساب المصرفي.',
    oddsRatio: 0.54,
    pValue: 0.0002,
    confidenceInterval: [0.47, 0.62]
  },
  {
    name: 'scaled_amount',
    nameAr: 'المبلغ المعاير (Amount)',
    meanAbsShap: 0.64,
    correlation: 'positive',
    description: 'المبالغ الكبيرة غير المعتادة ترفع احتمالية الاحتيال (معايرة بواسطة RobustScaler).',
    oddsRatio: 1.48,
    pValue: 0.0012,
    confidenceInterval: [1.25, 1.76]
  },
  {
    name: 'V11',
    nameAr: 'المكون الرئيسي V11',
    meanAbsShap: 0.58,
    correlation: 'positive',
    description: 'ارتباط موجب مع معدل تغيير الـ IP ونوع المتصفح أثناء إجراء العملية المالية.',
    oddsRatio: 1.39,
    pValue: 0.0034,
    confidenceInterval: [1.18, 1.64]
  }
];

export const creditcardWaterfallSample: ShapWaterfallItem[] = [
  { feature: 'الاحتمال الأساسي (Base Value)', value: 'E[f(x)]', contribution: 0.0017 },
  { feature: 'V14 = -6.82 (انخفاض حاد)', value: -6.82, contribution: +0.48 },
  { feature: 'V10 = -4.15 (انخفاض شاذ)', value: -4.15, contribution: +0.22 },
  { feature: 'V4 = +3.92 (ارتفاع نشاط)', value: +3.92, contribution: +0.14 },
  { feature: 'V12 = -3.40 (تباين جغرافي)', value: -3.40, contribution: +0.09 },
  { feature: 'Amount = $850 (مبلغ مرتفع)', value: '$850.00', contribution: +0.05 },
  { feature: 'باقي الميزات المتبقية', value: 'V1..V28', contribution: -0.02 }
];

// Heart Disease evaluation curves & metrics
export const heartDiseaseMetricsTable: MetricPoint[] = [
  { threshold: 0.10, accuracy: 0.625, recall: 0.992, precision: 0.575, specificity: 0.240, f1: 0.728, tp: 131, fp: 95, tn: 30, fn: 1, cost: 1450, youdenJ: 0.232 },
  { threshold: 0.20, accuracy: 0.742, recall: 0.969, precision: 0.668, specificity: 0.504, f1: 0.791, tp: 128, fp: 62, tn: 63, fn: 4, cost: 2620, youdenJ: 0.473 },
  { threshold: 0.30, accuracy: 0.824, recall: 0.932, precision: 0.764, specificity: 0.712, f1: 0.840, tp: 123, fp: 36, tn: 89, fn: 9, cost: 4860, youdenJ: 0.644 },
  { threshold: 0.35, accuracy: 0.863, recall: 0.917, precision: 0.834, specificity: 0.808, f1: 0.874, tp: 121, fp: 24, tn: 101, fn: 11, cost: 5740, youdenJ: 0.725 }, // Optimal Clinical
  { threshold: 0.40, accuracy: 0.871, recall: 0.886, precision: 0.867, specificity: 0.856, f1: 0.876, tp: 117, fp: 18, tn: 107, fn: 15, cost: 7680, youdenJ: 0.742 },
  { threshold: 0.50, accuracy: 0.867, recall: 0.848, precision: 0.889, specificity: 0.888, f1: 0.868, tp: 112, fp: 14, tn: 111, fn: 20, cost: 10140, youdenJ: 0.736 }, // Default
  { threshold: 0.60, accuracy: 0.852, recall: 0.788, precision: 0.912, specificity: 0.920, f1: 0.846, tp: 104, fp: 10, tn: 115, fn: 28, cost: 14100, youdenJ: 0.708 },
  { threshold: 0.70, accuracy: 0.816, recall: 0.697, precision: 0.929, specificity: 0.944, f1: 0.796, tp: 92, fp: 7, tn: 118, fn: 40, cost: 20070, youdenJ: 0.641 },
  { threshold: 0.80, accuracy: 0.738, recall: 0.538, precision: 0.934, specificity: 0.960, f1: 0.683, tp: 71, fp: 5, tn: 120, fn: 61, cost: 30550, youdenJ: 0.498 },
  { threshold: 0.90, accuracy: 0.641, recall: 0.333, precision: 0.957, specificity: 0.984, f1: 0.494, tp: 44, fp: 2, tn: 123, fn: 88, cost: 44020, youdenJ: 0.317 }
];

export const heartDiseaseRocPoints: RocPoint[] = [
  { fpr: 0.000, tpr: 0.000, threshold: 1.00 },
  { fpr: 0.016, tpr: 0.333, threshold: 0.90 },
  { fpr: 0.040, tpr: 0.538, threshold: 0.80 },
  { fpr: 0.056, tpr: 0.697, threshold: 0.70 },
  { fpr: 0.080, tpr: 0.788, threshold: 0.60 },
  { fpr: 0.112, tpr: 0.848, threshold: 0.50 },
  { fpr: 0.144, tpr: 0.886, threshold: 0.40 },
  { fpr: 0.192, tpr: 0.917, threshold: 0.35 },
  { fpr: 0.288, tpr: 0.932, threshold: 0.30 },
  { fpr: 0.496, tpr: 0.969, threshold: 0.20 },
  { fpr: 0.760, tpr: 0.992, threshold: 0.10 },
  { fpr: 1.000, tpr: 1.000, threshold: 0.00 }
];

export const heartDiseasePrPoints: PrPoint[] = [
  { recall: 0.000, precision: 1.000, threshold: 1.00 },
  { recall: 0.333, precision: 0.957, threshold: 0.90 },
  { recall: 0.538, precision: 0.934, threshold: 0.80 },
  { recall: 0.697, precision: 0.929, threshold: 0.70 },
  { recall: 0.788, precision: 0.912, threshold: 0.60 },
  { recall: 0.848, precision: 0.889, threshold: 0.50 },
  { recall: 0.886, precision: 0.867, threshold: 0.40 },
  { recall: 0.917, precision: 0.834, threshold: 0.35 },
  { recall: 0.932, precision: 0.764, threshold: 0.30 },
  { recall: 0.969, precision: 0.668, threshold: 0.20 },
  { recall: 0.992, precision: 0.575, threshold: 0.10 },
  { recall: 1.000, precision: 0.513, threshold: 0.00 }
];

export const heartDiseaseShapFeatures: ShapFeature[] = [
  {
    name: 'ST_Slope_Flat',
    nameAr: 'ميلان مقطع ST (أفقي)',
    meanAbsShap: 1.45,
    correlation: 'positive',
    description: 'انخفاض أو استواء مقطع ST في تخطيط القلب يدل على نقص تروية عضلة القلب (Ischemia).',
    oddsRatio: 3.65,
    pValue: 0.00002,
    confidenceInterval: [2.25, 5.92]
  },
  {
    name: 'ChestPain_ASY',
    nameAr: 'ألم صدري غير نموذجي/صامت (ASY)',
    meanAbsShap: 1.28,
    correlation: 'positive',
    description: 'المرضى الذين يعانون من أعراض غير نمطية لديهم فرصة مضاعفة للإصابة المتأخرة.',
    oddsRatio: 3.12,
    pValue: 0.00008,
    confidenceInterval: [1.98, 4.91]
  },
  {
    name: 'Oldpeak',
    nameAr: 'انخفاض مقطع ST بعد الجهد',
    meanAbsShap: 1.12,
    correlation: 'positive',
    description: 'كل ملم زيادة في انخفاض ST يرفع الخطر بنسبة 115%.',
    oddsRatio: 2.15,
    pValue: 0.00015,
    confidenceInterval: [1.54, 3.01]
  },
  {
    name: 'ExerciseAngina_Y',
    nameAr: 'ذبحة صدرية أثناء الجهد البدني',
    meanAbsShap: 0.96,
    correlation: 'positive',
    description: 'حدوث ألم الصدر عند ممارسة التمارين مؤشر سريري بارز لانسداد الشريان التاجي.',
    oddsRatio: 2.82,
    pValue: 0.0003,
    confidenceInterval: [1.68, 4.74]
  },
  {
    name: 'MaxHR',
    nameAr: 'النبض الأقصى المحقق (Max HR)',
    meanAbsShap: 0.84,
    correlation: 'negative',
    description: 'كلما زاد أقصى نبض قل خطر المرض، لأن كفاءة القلب الرياضية تكون أعلى (حماية).',
    oddsRatio: 0.62,
    pValue: 0.0005,
    confidenceInterval: [0.48, 0.81]
  },
  {
    name: 'Sex_M',
    nameAr: 'الجنس: ذكور (Male)',
    meanAbsShap: 0.72,
    correlation: 'positive',
    description: 'الذكور أكثر عرضة للإصابة بأمراض الشرايين التاجية المبكرة بعامل أرجحية 2.1.',
    oddsRatio: 2.10,
    pValue: 0.0021,
    confidenceInterval: [1.32, 3.35]
  },
  {
    name: 'Age',
    nameAr: 'عمر المريض (Age)',
    meanAbsShap: 0.55,
    correlation: 'positive',
    description: 'التقدم في العمر عامل خطر مستمر لتصلب الشرايين.',
    oddsRatio: 1.45,
    pValue: 0.008,
    confidenceInterval: [1.11, 1.89]
  }
];

export const heartDiseaseWaterfallSample: ShapWaterfallItem[] = [
  { feature: 'الاحتمال الأساسي (Base Value)', value: 'E[f(x)]', contribution: 0.513 },
  { feature: 'ST_Slope = Flat (تخطيط غير سليم)', value: 'Flat', contribution: +0.21 },
  { feature: 'Oldpeak = 2.4 mm (انخفاض حاد)', value: '2.4', contribution: +0.14 },
  { feature: 'ExerciseAngina = Yes (ذبحة جهد)', value: 'Yes', contribution: +0.11 },
  { feature: 'ChestPain = ASY (غير نمطي)', value: 'ASY', contribution: +0.09 },
  { feature: 'MaxHR = 112 bpm (نبض أقصى ضعيف)', value: 112, contribution: +0.06 },
  { feature: 'Cholesterol = 210 mg/dl (ضمن الطبيعي)', value: 210, contribution: -0.05 },
  { feature: 'RestingBP = 125 mmHg (ضغط معتدل)', value: 125, contribution: -0.03 }
];

/**
 * دالة مساعدة لحساب المؤشرات بدقة لأي قيمة عتبة يختارها المستخدم عبر السلايدر
 */
export function interpolateMetrics(datasetId: 'creditcard' | 'heart_disease', threshold: number): MetricPoint {
  const table = datasetId === 'creditcard' ? creditcardMetricsTable : heartDiseaseMetricsTable;
  
  // Find surrounding points
  if (threshold <= table[0].threshold) return table[0];
  if (threshold >= table[table.length - 1].threshold) return table[table.length - 1];

  for (let i = 0; i < table.length - 1; i++) {
    const p1 = table[i];
    const p2 = table[i + 1];
    if (threshold >= p1.threshold && threshold <= p2.threshold) {
      const alpha = (threshold - p1.threshold) / (p2.threshold - p1.threshold);
      
      const recall = p1.recall + alpha * (p2.recall - p1.recall);
      const precision = p1.precision + alpha * (p2.precision - p1.precision);
      const accuracy = p1.accuracy + alpha * (p2.accuracy - p1.accuracy);
      const specificity = p1.specificity + alpha * (p2.specificity - p1.specificity);
      const f1 = (2 * precision * recall) / (precision + recall + 1e-9);
      
      const tp = Math.round(p1.tp + alpha * (p2.tp - p1.tp));
      const fp = Math.round(p1.fp + alpha * (p2.fp - p1.fp));
      const tn = Math.round(p1.tn + alpha * (p2.tn - p1.tn));
      const fn = Math.round(p1.fn + alpha * (p2.fn - p1.fn));
      const cost = Math.round(p1.cost + alpha * (p2.cost - p1.cost));
      const youdenJ = recall + specificity - 1;

      return {
        threshold,
        recall,
        precision,
        accuracy,
        specificity,
        f1,
        tp,
        fp,
        tn,
        fn,
        cost,
        youdenJ
      };
    }
  }
  return table[0];
}
