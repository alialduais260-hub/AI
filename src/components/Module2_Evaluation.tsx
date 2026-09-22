import React, { useState } from 'react';
import { 
  Sliders, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  HelpCircle, 
  Layers, 
  DollarSign, 
  Activity, 
  Info,
  Maximize2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HeartCrack
} from 'lucide-react';
import { DatasetId } from '../types';
import { 
  datasetsMeta, 
  interpolateMetrics, 
  creditcardRocPoints, 
  heartDiseaseRocPoints,
  creditcardPrPoints,
  heartDiseasePrPoints,
  creditcardShapFeatures,
  heartDiseaseShapFeatures,
  creditcardWaterfallSample,
  heartDiseaseWaterfallSample,
  creditcardMetricsTable,
  heartDiseaseMetricsTable
} from '../data/evaluationData';

interface Module2EvaluationProps {
  selectedDataset: DatasetId;
  setSelectedDataset: (id: DatasetId) => void;
}

export const Module2_Evaluation: React.FC<Module2EvaluationProps> = ({
  selectedDataset,
  setSelectedDataset
}) => {
  const meta = datasetsMeta[selectedDataset];
  
  // Threshold state (initialized to the dataset's optimal threshold)
  const [threshold, setThreshold] = useState<number>(meta.optimalThreshold);
  const [activeChartTab, setActiveChartTab] = useState<'roc_pr' | 'metrics_curve' | 'shap_summary' | 'shap_waterfall' | 'balance'>('roc_pr');

  // Compute live interpolated metrics for the active threshold
  const metrics = interpolateMetrics(selectedDataset, threshold);
  
  // Calculate baseline metrics at 0.50 for comparison
  const baselineMetrics = interpolateMetrics(selectedDataset, 0.50);
  const recallDelta = (metrics.recall - baselineMetrics.recall) * 100;
  const precisionDelta = (metrics.precision - baselineMetrics.precision) * 100;
  const costSavings = baselineMetrics.cost - metrics.cost;

  // Curves data for current dataset
  const rocPoints = selectedDataset === 'creditcard' ? creditcardRocPoints : heartDiseaseRocPoints;
  const prPoints = selectedDataset === 'creditcard' ? creditcardPrPoints : heartDiseasePrPoints;
  const shapFeatures = selectedDataset === 'creditcard' ? creditcardShapFeatures : heartDiseaseShapFeatures;
  const waterfallSample = selectedDataset === 'creditcard' ? creditcardWaterfallSample : heartDiseaseWaterfallSample;
  const metricsTable = selectedDataset === 'creditcard' ? creditcardMetricsTable : heartDiseaseMetricsTable;

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Module Title Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
                الملف الثاني (2/4)
              </span>
              <span className="text-xs text-slate-400">
                التقييمات الشاملة، الرسوم البيانية التفاعلية، شروحات SHAP، وهندسة العتبة (Threshold Tuning)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              تقييم الأداء والمقاييس التنافسية: Recall و Precision و Accuracy و AUC
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              استكشف في هذا المعمل التفاعلي كيف يؤدي تعديل عتبة القرار (Classification Threshold) إلى تغيير جذري في نتائج التشخيص وكشف الاحتيال، مع تفسير القرارات بنظرية الألعاب وقيم شابلي (SHAP).
            </p>
          </div>

          {/* Quick Dataset Switcher */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                setSelectedDataset('creditcard');
                setThreshold(datasetsMeta.creditcard.optimalThreshold);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDataset === 'creditcard'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              الاحتيال المصرفي (creditcard)
            </button>
            <button
              onClick={() => {
                setSelectedDataset('heart_disease');
                setThreshold(datasetsMeta.heart_disease.optimalThreshold);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDataset === 'heart_disease'
                  ? 'bg-rose-500 text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              أمراض القلب (heart_disease)
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Threshold Controller Panel (The Core Focus!) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">
                مختبر عتبة القرار التفاعلية (Decision Threshold Simulator)
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              اسحب السلايدر لتغيير العتبة الاحتمالية $\tau$ وشاهد التأثير الفوري المباشر على الحساسية (Recall)، مصفوفة الارتباك، والتكلفة
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              onClick={() => setThreshold(0.50)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                threshold === 0.50
                  ? 'bg-slate-700 text-white border-slate-500'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:bg-slate-800'
              }`}
            >
              العتبة الافتراضية (0.50)
            </button>

            <button
              onClick={() => setThreshold(meta.optimalThreshold)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                threshold === meta.optimalThreshold
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-cyan-950/60 text-cyan-300 border-cyan-800 hover:bg-cyan-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>العتبة المحسنة لتعظيم الـ Recall ({meta.optimalThreshold.toFixed(2)})</span>
            </button>

            <button
              onClick={() => setThreshold(selectedDataset === 'creditcard' ? 0.15 : 0.40)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-slate-800 transition-all"
            >
              عتبة مؤشر يودن (Youden J)
            </button>
          </div>
        </div>

        {/* Big Slider & Value Badge */}
        <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/90 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-300">
              قيمة عتبة التصنيف الحالية (Threshold $\tau$):
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-mono text-cyan-400">
                {threshold.toFixed(2)}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {threshold < 0.50 ? 'حساسية مرتفعة لتقليل التفويت' : threshold > 0.50 ? 'تحفظ عالي لتقليل الإنذار الكاذب' : 'محايد إحصائياً'}
              </span>
            </div>
          </div>

          <input
            type="range"
            min="0.05"
            max="0.90"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
          />

          <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2">
            <span>0.05 (أقصى استدعاء Recall)</span>
            <span className="text-cyan-400 font-bold">العتبة المثلى: {meta.optimalThreshold}</span>
            <span>0.50 (افتراضي)</span>
            <span>0.90 (أقصى دقة موجبة Precision)</span>
          </div>
        </div>

        {/* 4 Core Pillars KPI Cards (Recall, Precision, Accuracy, AUC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* 1. Recall Card (The Star Metric) */}
          <div className="bg-slate-950/90 border border-emerald-500/40 rounded-xl p-4 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-1">
              <span>الاستدعاء / الحساسية (Recall)</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-[10px]">
                الأهم طبياً ومالياً
              </span>
            </div>
            <div className="text-3xl font-black font-mono text-emerald-300">
              {(metrics.recall * 100).toFixed(1)}%
            </div>
            <div className="flex items-center gap-1.5 text-xs mt-2">
              <span className={`font-bold font-mono ${recallDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {recallDelta >= 0 ? `+${recallDelta.toFixed(1)}%` : `${recallDelta.toFixed(1)}%`}
              </span>
              <span className="text-slate-400 text-[11px]">مقارنة بالعتبة 0.50</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 border-t border-slate-800/80 pt-1.5">
              نسبة الحالات المصابة أو الاحتيالية التي التقطها النموذج بنجاح من إجمالي الحالات.
            </p>
          </div>

          {/* 2. Precision Card */}
          <div className="bg-slate-950/90 border border-cyan-500/30 rounded-xl p-4 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between text-xs text-cyan-400 font-semibold mb-1">
              <span>الدقة الموجبة (Precision)</span>
              <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[10px]">
                موثوقية الإنذار
              </span>
            </div>
            <div className="text-3xl font-black font-mono text-cyan-300">
              {(metrics.precision * 100).toFixed(1)}%
            </div>
            <div className="flex items-center gap-1.5 text-xs mt-2">
              <span className={`font-bold font-mono ${precisionDelta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {precisionDelta >= 0 ? `+${precisionDelta.toFixed(1)}%` : `${precisionDelta.toFixed(1)}%`}
              </span>
              <span className="text-slate-400 text-[11px]">مقارنة بالعتبة 0.50</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 border-t border-slate-800/80 pt-1.5">
              عندما يُطلق النموذج إنذاراً، ما مدى احتمالية أن يكون صحيحاً وليس إنذاراً كاذباً.
            </p>
          </div>

          {/* 3. Accuracy Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-4 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>الدقة العامة (Accuracy)</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                (TP+TN)/N
              </span>
            </div>
            <div className="text-3xl font-black font-mono text-white">
              {(metrics.accuracy * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[11px] text-slate-400">
                {selectedDataset === 'creditcard'
                  ? 'تنبيه: مقياس مضلل في البيانات غير المتوازنة!'
                  : 'مقياس عادل هنا لأن الفئات متوازنة'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 border-t border-slate-800/80 pt-1.5">
              إجمالي التوقعات الصحيحة كنسبة مئوية من كافة البيانات المشاهدة.
            </p>
          </div>

          {/* 4. ROC-AUC & PR-AUC Card */}
          <div className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 relative overflow-hidden shadow-lg">
            <div className="flex items-center justify-between text-xs text-indigo-400 font-semibold mb-1">
              <span>المساحة تحت المنحنى (AUC)</span>
              <span className="px-1.5 py-0.5 rounded bg-indigo-950 border border-indigo-800 text-[10px]">
                ثابتة عبر العتبات
              </span>
            </div>
            <div className="text-3xl font-black font-mono text-indigo-300">
              {meta.aucRoc.toFixed(3)}
            </div>
            <div className="text-xs text-slate-400 mt-2 flex items-center justify-between">
              <span>PR-AUC (صرامة عالية):</span>
              <span className="font-mono font-bold text-indigo-400">{meta.aucPr.toFixed(3)}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 border-t border-slate-800/80 pt-1.5">
              يقيس كفاءة الترتيب الاحتمالي للنموذج واستقلاليته عن عتبة معينة.
            </p>
          </div>

        </div>

        {/* Dynamic Economic & Medical Impact Notice */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            {selectedDataset === 'creditcard' ? (
              <DollarSign className="w-5 h-5 text-emerald-400" />
            ) : (
              <Activity className="w-5 h-5 text-rose-400" />
            )}
            <span className="text-xs text-slate-300 font-medium">
              {selectedDataset === 'creditcard'
                ? `التكلفة المالية المتوقعة عند العتبة الحالية (${threshold.toFixed(2)}): $${metrics.cost.toLocaleString()} ${costSavings > 0 ? `(وفرت $${costSavings.toLocaleString()} مقارنة بالعتبة الافتراضية 0.50)` : ''}`
                : `المرضى الذين تم إنقاذهم وتفادي تفويتهم خطأً عند هذه العتبة: ${Math.max(0, baselineMetrics.fn - metrics.fn)} مريض`}
            </span>
          </div>

          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>مقياس يودن (Youden J):</span>
            <strong className="font-mono text-cyan-400">{metrics.youdenJ.toFixed(3)}</strong>
          </div>
        </div>

      </div>

      {/* Interactive Confusion Matrix Section */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              <span>مصفوفة الارتباك التفاعلية (Interactive Confusion Matrix)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              تتغير الأعداد والنسب فورياً حسب العتبة المختارة $\tau = {threshold.toFixed(2)}$
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            إجمالي العينات المفحوصة: <strong className="text-white font-mono">{(metrics.tp + metrics.fp + metrics.tn + metrics.fn).toLocaleString()}</strong>
          </div>
        </div>

        {/* The 2x2 Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          
          {/* True Negatives (TN) */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold">السلبيات الحقيقية (True Negatives - TN)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">سليم صُنّف سليماً</span>
            </div>
            <div className="text-3xl font-black font-mono text-slate-200">
              {metrics.tn.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              عمليات شرعية أو أشخاص أصحاء تم التأكد بنجاح من عدم وجود خطر لديهم.
            </p>
          </div>

          {/* False Positives (FP) - Type I Error */}
          <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/40 hover:border-amber-500/60 transition-all">
            <div className="flex items-center justify-between text-xs text-amber-400 mb-2">
              <span className="font-semibold">الإيجابيات الكاذبة (False Positives - FP)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">خطأ نوع أول (Type I)</span>
            </div>
            <div className="text-3xl font-black font-mono text-amber-300">
              {metrics.fp.toLocaleString()}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              إنذار كاذب: عملية سليمة حُظرت مؤقتاً أو شخص سليم طُلب منه فحص إضافي.
            </p>
          </div>

          {/* False Negatives (FN) - Type II Error - The most dangerous! */}
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/50 hover:border-rose-500 transition-all shadow-md shadow-rose-950/20">
            <div className="flex items-center justify-between text-xs text-rose-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>السلبيات الكاذبة (False Negatives - FN)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300 font-bold">
                الخطأ الأخطر (Type II)
              </span>
            </div>
            <div className="text-3xl font-black font-mono text-rose-400">
              {metrics.fn.toLocaleString()}
            </div>
            <p className="text-xs text-rose-300/80 mt-2">
              {selectedDataset === 'creditcard'
                ? 'تفويت عملية احتيال لم يتم كشفها! (خسارة مالية مباشرة للمصرف والعميل).'
                : 'تفويت مريض مصاب بالقلب أُعطي تشخيصاً سليماً خاطئاً! (خطر يهدد الحياة).'}
            </p>
          </div>

          {/* True Positives (TP) */}
          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/50 hover:border-emerald-500 transition-all shadow-md shadow-emerald-950/20">
            <div className="flex items-center justify-between text-xs text-emerald-400 mb-2">
              <span className="font-semibold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>الإيجابيات الحقيقية (True Positives - TP)</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300">الهدف المكتشف</span>
            </div>
            <div className="text-3xl font-black font-mono text-emerald-300">
              {metrics.tp.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-400/80 mt-2">
              {selectedDataset === 'creditcard'
                ? 'عمليات احتيالية حقيقية تم اعتراضها وإيقافها بنجاح.'
                : 'مرضى مصابون تم تشخيصهم مبكراً بنجاح وبدء علاجهم.'}
            </p>
          </div>

        </div>
      </div>

      {/* Comprehensive Visualizations Hub (Tabs) */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
        
        {/* Navigation Tabs for Charts */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-4 gap-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">معرض الرسوم والتحليلات البيانية:</span>
          </div>

          <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveChartTab('roc_pr')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'roc_pr' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              منحنيات ROC & PR
            </button>
            <button
              onClick={() => setActiveChartTab('metrics_curve')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'metrics_curve' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              تغير المقاييس مع العتبة (Trade-off)
            </button>
            <button
              onClick={() => setActiveChartTab('shap_summary')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'shap_summary' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              أهمية وتفسير SHAP
            </button>
            <button
              onClick={() => setActiveChartTab('shap_waterfall')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'shap_waterfall' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              تفسير الحالة الفردية (Waterfall)
            </button>
            <button
              onClick={() => setActiveChartTab('balance')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeChartTab === 'balance' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              أثر SMOTE وتوازن الفئات
            </button>
          </div>
        </div>

        {/* Tab 1: ROC & PR Curves */}
        {activeChartTab === 'roc_pr' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
            
            {/* ROC Curve SVG */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>منحنى خاصية تشغيل المستقبل (ROC Curve)</span>
                </h4>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  AUC = {meta.aucRoc.toFixed(3)}
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative aspect-square max-h-72 w-full mx-auto">
                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  {[0, 60, 120, 180, 240, 300].map((pos) => (
                    <React.Fragment key={pos}>
                      <line x1="0" y1={pos} x2="300" y2={pos} stroke="#1e293b" strokeDasharray="3,3" />
                      <line x1={pos} y1="0" x2={pos} y2="300" stroke="#1e293b" strokeDasharray="3,3" />
                    </React.Fragment>
                  ))}

                  {/* Random Chance Diagonal Line (AUC = 0.5) */}
                  <line x1="0" y1="300" x2="300" y2="0" stroke="#475569" strokeDasharray="4,4" strokeWidth="1.5" />

                  {/* ROC Curve Path */}
                  <path
                    d={`M 0 300 ` + rocPoints.map(p => `L ${p.fpr * 300} ${300 - (p.tpr * 300)}`).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Current Active Threshold Marker on ROC */}
                  {(() => {
                    const currentTpr = metrics.recall;
                    const currentFpr = 1 - metrics.specificity;
                    const cx = currentFpr * 300;
                    const cy = 300 - (currentTpr * 300);
                    return (
                      <g>
                        <circle cx={cx} cy={cy} r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="2" />
                        <text x={Math.min(220, cx + 10)} y={Math.max(20, cy - 10)} fill="#06b6d4" fontSize="10" fontWeight="bold">
                          τ = {threshold.toFixed(2)}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-3">
                <span>معدل الإنذار الكاذب (FPR = 1 - Specificity)</span>
                <span>الحساسية (TPR = Recall)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                كلما اقترب المنحنى من الزاوية العلوية اليسرى (AUC اقترب من 1.0)، دل ذلك على قدرة تمييزية استثنائية للنموذج.
              </p>
            </div>

            {/* Precision-Recall Curve SVG */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>منحنى الدقة والاستدعاء (Precision-Recall Curve)</span>
                </h4>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  PR-AUC = {meta.aucPr.toFixed(3)}
                </span>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative aspect-square max-h-72 w-full mx-auto">
                <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible">
                  {/* Grid Lines */}
                  {[0, 60, 120, 180, 240, 300].map((pos) => (
                    <React.Fragment key={pos}>
                      <line x1="0" y1={pos} x2="300" y2={pos} stroke="#1e293b" strokeDasharray="3,3" />
                      <line x1={pos} y1="0" x2={pos} y2="300" stroke="#1e293b" strokeDasharray="3,3" />
                    </React.Fragment>
                  ))}

                  {/* PR Curve Path */}
                  <path
                    d={`M 0 ${300 - (prPoints[0].precision * 300)} ` + prPoints.map(p => `L ${p.recall * 300} ${300 - (p.precision * 300)}`).join(' ')}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                  />

                  {/* Current Active Threshold Marker on PR */}
                  {(() => {
                    const cx = metrics.recall * 300;
                    const cy = 300 - (metrics.precision * 300);
                    return (
                      <g>
                        <circle cx={cx} cy={cy} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                        <text x={Math.max(10, cx - 45)} y={Math.max(20, cy - 10)} fill="#f59e0b" fontSize="10" fontWeight="bold">
                          τ = {threshold.toFixed(2)}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 font-mono mt-3">
                <span>الاستدعاء (Recall)</span>
                <span>الدقة الموجبة (Precision)</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 text-center">
                المعيار الأهم في البيانات غير المتوازنة (مثل الاحتيال)؛ يوضح انخفاض الدقة التدريجي عند السعي لكشف كافة الحالات.
              </p>
            </div>

          </div>
        )}

        {/* Tab 2: Metrics vs Threshold Curve */}
        {activeChartTab === 'metrics_curve' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-base font-bold text-white">
                    منحنى تقايض المقاييس مع العتبة (Metrics vs. Threshold Curve)
                  </h4>
                  <p className="text-xs text-slate-400">
                    لاحظ كيف يتقاطع منحنى Recall (الأخضر) مع Precision (الأزرق) وموقع العتبة المثلى
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-3 h-0.5 bg-emerald-400 inline-block"></span>
                    <span>Recall (الاستدعاء)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
                    <span>Precision (الدقة)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-indigo-400">
                    <span className="w-3 h-0.5 bg-indigo-400 inline-block"></span>
                    <span>F1-Score</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-3 h-0.5 bg-slate-400 inline-block"></span>
                    <span>Accuracy (الدقة العامة)</span>
                  </div>
                </div>
              </div>

              {/* Wide SVG Chart */}
              <div className="relative h-64 w-full">
                <svg viewBox="0 0 600 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 60, 120, 180, 240].map(y => (
                    <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
                  ))}

                  {/* Vertical line for Current Active Threshold */}
                  <line
                    x1={threshold * 600}
                    y1="0"
                    x2={threshold * 600}
                    y2="240"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />

                  {/* Recall Path (Green) */}
                  <path
                    d={`M 0 ${240 - metricsTable[0].recall * 240} ` + metricsTable.map(m => `L ${m.threshold * 600} ${240 - (m.recall * 240)}`).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                  />

                  {/* Precision Path (Cyan) */}
                  <path
                    d={`M 0 ${240 - metricsTable[0].precision * 240} ` + metricsTable.map(m => `L ${m.threshold * 600} ${240 - (m.precision * 240)}`).join(' ')}
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="3"
                  />

                  {/* F1 Path (Indigo) */}
                  <path
                    d={`M 0 ${240 - metricsTable[0].f1 * 240} ` + metricsTable.map(m => `L ${m.threshold * 600} ${240 - (m.f1 * 240)}`).join(' ')}
                    fill="none"
                    stroke="#818cf8"
                    strokeWidth="2"
                    strokeDasharray="2,2"
                  />

                  {/* Marker at current threshold on Recall */}
                  <circle
                    cx={threshold * 600}
                    cy={240 - (metrics.recall * 240)}
                    r="5"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  {/* Marker at current threshold on Precision */}
                  <circle
                    cx={threshold * 600}
                    cy={240 - (metrics.precision * 240)}
                    r="5"
                    fill="#06b6d4"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="flex justify-between text-xs font-mono text-slate-500 mt-3">
                <span>0.00</span>
                <span>0.25</span>
                <span className="text-amber-400 font-bold">العتبة المختارة: {threshold.toFixed(2)}</span>
                <span>0.75</span>
                <span>1.00</span>
              </div>
            </div>

            {/* Metrics Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-3">العتبة ($\tau$)</th>
                    <th className="p-3">الاستدعاء (Recall)</th>
                    <th className="p-3">الدقة الموجبة (Precision)</th>
                    <th className="p-3">الدقة العامة (Accuracy)</th>
                    <th className="p-3">مقياس F1</th>
                    <th className="p-3">مؤشر يودن (Youden J)</th>
                    <th className="p-3">تفويتات خطأ (FN)</th>
                    <th className="p-3">إنذارات كاذبة (FP)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {metricsTable.map((row) => (
                    <tr
                      key={row.threshold}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        Math.abs(row.threshold - threshold) < 0.02 ? 'bg-cyan-950/40 text-cyan-300 font-bold' : 'text-slate-300'
                      }`}
                    >
                      <td className="p-3 flex items-center gap-1.5">
                        {Math.abs(row.threshold - threshold) < 0.02 && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
                        <span>{row.threshold.toFixed(2)}</span>
                      </td>
                      <td className="p-3 text-emerald-400">{(row.recall * 100).toFixed(1)}%</td>
                      <td className="p-3 text-cyan-400">{(row.precision * 100).toFixed(1)}%</td>
                      <td className="p-3 text-slate-300">{(row.accuracy * 100).toFixed(2)}%</td>
                      <td className="p-3 text-indigo-400">{row.f1.toFixed(3)}</td>
                      <td className="p-3 text-amber-400">{row.youdenJ.toFixed(3)}</td>
                      <td className="p-3 text-rose-400 font-bold">{row.fn}</td>
                      <td className="p-3 text-amber-400">{row.fp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: SHAP Summary & Feature Importance */}
        {activeChartTab === 'shap_summary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>تفسيرات SHAP ونسب الأرجحية (Odds Ratios)</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    ترتيب الميزات حسب متوسط التأثير المطلق لمخرجات النموذج (Mean |SHAP Value|) مع نسب الأرجحية $e^\beta$
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-rose-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                    <span>يرفع احتمالية الخطر (موجب)</span>
                  </span>
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span>
                    <span>يخفض احتمالية الخطر (وقائي)</span>
                  </span>
                </div>
              </div>

              {/* Visual SHAP Bars with Odds Ratios */}
              <div className="space-y-4">
                {shapFeatures.map((feat) => {
                  const maxShap = shapFeatures[0].meanAbsShap;
                  const pct = (feat.meanAbsShap / maxShap) * 100;
                  return (
                    <div key={feat.name} className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800/80">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-slate-800">
                            {feat.name}
                          </span>
                          <span className="text-xs text-slate-300 font-semibold">{feat.nameAr}</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs font-mono">
                          <span className="text-slate-400">
                            Mean |SHAP|: <strong className="text-white">{feat.meanAbsShap.toFixed(2)}</strong>
                          </span>
                          <span className="text-slate-400">
                            Odds Ratio (OR): <strong className={feat.oddsRatio > 1 ? 'text-rose-400' : 'text-cyan-400'}>{feat.oddsRatio.toFixed(2)}x</strong>
                          </span>
                          <span className="text-slate-500 text-[11px]">
                            p-val: {feat.pValue < 0.001 ? '<0.001' : feat.pValue}
                          </span>
                        </div>
                      </div>

                      {/* Progress bar visualizing impact */}
                      <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden flex">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            feat.correlation === 'positive'
                              ? 'bg-gradient-to-r from-rose-600 to-amber-500'
                              : 'bg-gradient-to-r from-cyan-600 to-blue-500'
                          }`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-2">
                        {feat.description}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: SHAP Waterfall Plot (Individual Case) */}
        {activeChartTab === 'shap_waterfall' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="mb-6">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>مخطط شلال التفسير الفردي (SHAP Waterfall Plot)</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                    تفسير حالة محددة
                  </span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  شرح شفاف يوضح كيف دفعت كل ميزة في هذه العينة الاحتمالية من القيمة الأساسية $E[f(x)]$ حتى القرار النهائي.
                </p>
              </div>

              {/* Waterfall Steps */}
              <div className="space-y-3">
                {waterfallSample.map((step, idx) => {
                  const isPositive = step.contribution > 0;
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-mono font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-white">{step.feature}</div>
                          <div className="text-[11px] text-slate-400 font-mono">القيمة الفعلية: {String(step.value)}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold px-2 py-1 rounded ${
                          step.contribution === 0.0017 || step.contribution === 0.513
                            ? 'bg-slate-800 text-slate-300'
                            : isPositive
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                            : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                        }`}>
                          {step.contribution > 0 ? `+${step.contribution.toFixed(3)}` : `${step.contribution.toFixed(3)}`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Final Prediction Outcome */}
              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-rose-950/60 to-slate-900 border border-rose-500/40 flex items-center justify-between">
                <div>
                  <div className="text-xs text-rose-400 font-semibold">الاحتمال النهائي المتوقع $f(x)$:</div>
                  <div className="text-2xl font-black font-mono text-white">
                    {selectedDataset === 'creditcard' ? '94.2% (احتيال مؤكد)' : '88.4% (إصابة مؤكدة)'}
                  </div>
                </div>

                <div className="text-left text-xs text-slate-400">
                  <span>تم التبرير الكامل للقرار دون أي غموض (Explainable AI)</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 5: Balance & SMOTE */}
        {activeChartTab === 'balance' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h4 className="text-base font-bold text-white mb-2">
                مقارنة توازن الفئات قبل وبعد تطبيق تقنية SMOTE
              </h4>
              <p className="text-xs text-slate-400 mb-6">
                شرح كيف غيّرت خوارزمية SMOTE فضاء التدريب لتمكين الانحدار اللوجستي من رؤية الأنماط النادرة
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Before Preprocessing */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>البيانات الخام قبل المعالجة (Raw Data)</span>
                    <span className="text-rose-400 font-mono">{meta.classBalanceRaw.positivePct.toFixed(2)}% أقلية</span>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{meta.negativeClass}</span>
                        <span>{meta.classBalanceRaw.negative.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: '99.8%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{meta.positiveClass}</span>
                        <span>{meta.classBalanceRaw.positive.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-rose-500" style={{ width: `${Math.max(1, meta.classBalanceRaw.positivePct)}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-amber-400 mt-4">
                    عدم التوازن الشديد هنا كان سيؤدي لتفويت نصف حالات الاحتيال إذا اعتمدنا على العتبة 0.50 بدون SMOTE.
                  </p>
                </div>

                {/* After Preprocessing & SMOTE */}
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>بيانات التدريب بعد مسار SMOTE المتوازن</span>
                    <span className="text-emerald-400 font-mono">
                      {selectedDataset === 'creditcard' ? '20.0% أقلية متوازنة' : '51.3% متوازنة طبيعياً'}
                    </span>
                  </div>

                  <div className="space-y-3 mt-4">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{meta.negativeClass}</span>
                        <span>{meta.classBalanceProcessed.negative.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: selectedDataset === 'creditcard' ? '80%' : '49%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{meta.positiveClass} (معززة بـ SMOTE)</span>
                        <span>{meta.classBalanceProcessed.positive.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: selectedDataset === 'creditcard' ? '20%' : '51%' }}></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-400 mt-4">
                    توليد عينات اصطناعية ذكية رفع قدرة النموذج على التعميم، ومكننا من الوصول إلى استدعاء (Recall) يتجاوز 86%.
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
