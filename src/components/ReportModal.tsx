import React from 'react';
import { X, Printer, Download, BookOpen, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { datasetsMeta, creditcardMetricsTable, heartDiseaseMetricsTable } from '../data/evaluationData';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Container */}
      <div className="bg-slate-900 border border-slate-800 w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header Actions (Excluded from print) */}
        <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">
              التقرير الأكاديمي الشامل: تكليف تنقيب البيانات لخوارزمية الانحدار اللوجستي
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ كـ PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Academic Paper Body */}
        <div className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-slate-950 text-slate-200 text-right leading-relaxed font-sans selection:bg-cyan-500 selection:text-black">
          
          {/* Paper Cover Title */}
          <div className="text-center border-b border-slate-800 pb-8 space-y-3">
            <div className="inline-block px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-xs font-bold">
              مشروع وتكليف تنقيب البيانات والتعلم الآلي (Data Mining Course Project)
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              دراسة مقارنة متقدمة لتطبيق الانحدار اللوجستي على البيانات المالية والسريرية
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl mx-auto">
              معالجة عدم التوازن بـ SMOTE، ضبط العتبة التنبؤية لتعظيم الـ Recall، وتفسير النماذج بقيم شابلي (SHAP) ونسب الأرجحية
            </p>
            <div className="flex justify-center items-center gap-6 text-xs text-slate-400 pt-2 font-mono">
              <span>تاريخ الإعداد: {new Date().toLocaleDateString('ar-EG')}</span>
              <span>•</span>
              <span>الحالة: تم إنجاز الكودين والتفسيرات بالكامل</span>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-cyan-400 border-r-4 border-cyan-500 pr-3">
              1. الملخص التنفيذي (Executive Summary)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              يقدم هذا التقرير تحليلاً شاملاً وتطبيقاً عملياً دقيقاً لخوارزمية الانحدار اللوجستي (Logistic Regression) على قاعدتي بيانات واقعيتين تمثلان أهم تحديات تنقيب البيانات:
              <strong> الأولى: قاعدة بيانات كشف الاحتيال المصرفي (creditcard.csv)</strong> التي تتسم بعدم توازن حاد للغاية (0.17% احتيال فقط)،
              و<strong>الثانية: قاعدة بيانات مخاطر أمراض القلب السريرية (heart_disease.csv)</strong> التي تتطلب حساسية طبية فائقة لتفادي تفويت المرضى المصابين.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              أثبتت الدراسة العملية أن الاعتماد على العتبة الافتراضية $\tau = 0.50$ في تنقيب البيانات الحقيقي يؤدي إلى كوارث مالية وطبية، وأن تحسين العتبة وفقاً لمصفوفة التكلفة رفع نسبة كشف الاحتيال إلى <strong>86.7%</strong>، ورفع نسبة كشف مرضى القلب إلى <strong>91.7%</strong> دون التضحية بالاستقرار التنبؤي للنموذج.
            </p>
          </div>

          {/* Section 2: Mathematical Foundation */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-cyan-400 border-r-4 border-cyan-500 pr-3">
              2. الأساس الرياضي والاشتقاق النظري (Theoretical Formulation)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              يربط الانحدار اللوجستي بين المتغيرات التفسيرية X والاحتمال اللاحق P(Y=1|X) عبر دالة السيجمويد اللوجستية:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs sm:text-sm text-white">
              {"P(Y=1|X) = σ(z) = 1 / (1 + e^-(β0 + Σ βj Xj))"}
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              يتم تحسين الأوزان β عبر تعظيم دالة الإمكانية المشتركة، والتي تكافئ تصغير دالة الخسارة الثنائية (Binary Cross-Entropy):
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-mono text-xs sm:text-sm text-white">
              {"J(β) = - (1/N) · Σ [ y_i · ln(ŷ_i) + (1 - y_i) · ln(1 - ŷ_i) ]"}
            </div>
          </div>

          {/* Section 3: Comparative Results Table */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-cyan-400 border-r-4 border-cyan-500 pr-3">
              3. جدول المقارنة الشاملة لنتائج النمذجة عند العتبات المختلفة
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs bg-slate-900 rounded-xl border border-slate-800 overflow-hidden font-mono">
                <thead className="bg-slate-800 text-slate-200">
                  <tr>
                    <th className="p-2.5">المشروع وقاعدة البيانات</th>
                    <th className="p-2.5">العتبة ($\tau$)</th>
                    <th className="p-2.5">Recall (الاستدعاء)</th>
                    <th className="p-2.5">Precision (الدقة)</th>
                    <th className="p-2.5">Accuracy (العامة)</th>
                    <th className="p-2.5">ROC-AUC</th>
                    <th className="p-2.5">الأثر العملي</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">الاحتيال المصرفي (creditcard.csv)</td>
                    <td className="p-2.5">0.50 (افتراضية)</td>
                    <td className="p-2.5 text-amber-400">76.5%</td>
                    <td className="p-2.5">91.5%</td>
                    <td className="p-2.5">99.91%</td>
                    <td className="p-2.5" rowSpan={2}>0.978</td>
                    <td className="p-2.5 font-sans text-rose-400">تفويت 23 عملية احتيال</td>
                  </tr>
                  <tr className="bg-cyan-950/30">
                    <td className="p-2.5 font-sans font-semibold text-cyan-300">الاحتيال المصرفي (محسنة)</td>
                    <td className="p-2.5 text-cyan-400 font-bold">0.28 (محسنة)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">86.7%</td>
                    <td className="p-2.5">81.7%</td>
                    <td className="p-2.5">99.78%</td>
                    <td className="p-2.5 font-sans text-emerald-400">تم خفض التفويت لـ 13 فقط!</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-sans font-semibold">أمراض القلب (heart.csv)</td>
                    <td className="p-2.5">0.50 (افتراضية)</td>
                    <td className="p-2.5 text-amber-400">84.8%</td>
                    <td className="p-2.5">88.9%</td>
                    <td className="p-2.5">86.7%</td>
                    <td className="p-2.5" rowSpan={2}>0.915</td>
                    <td className="p-2.5 font-sans text-rose-400">تفويت 20 مريضاً مصاباً</td>
                  </tr>
                  <tr className="bg-rose-950/30">
                    <td className="p-2.5 font-sans font-semibold text-rose-300">أمراض القلب (محسنة طبياً)</td>
                    <td className="p-2.5 text-rose-400 font-bold">0.35 (محسنة)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">91.7%</td>
                    <td className="p-2.5">83.4%</td>
                    <td className="p-2.5">86.3%</td>
                    <td className="p-2.5 font-sans text-emerald-400">إنقاذ 9 مرضى إضافيين</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Explainability with SHAP */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-cyan-400 border-r-4 border-cyan-500 pr-3">
              4. قابلية التفسير بنظرية الألعاب (SHAP Interpretability)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              اعتمدنا في كلا الكودين على حزمة SHAP لاستخراج الأثر الصافي لكل متغير على مخرجات الاحتمال:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
              <li>
                <strong>في كشف الاحتيال:</strong> أظهرت تحليلات SHAP أن الميزات V14 و V10 و V12 هي الأكثر حساسية وتأثيراً سلبياً، حيث يترافق انخفاضها الحاد مع اختراق الحسابات البنكية.
              </li>
              <li>
                <strong>في أمراض القلب:</strong> تصدرت ميزات تخطيط القلب (ST_Slope_Flat بنسبة أرجحية 3.65x) والألم الصدري غير النمطي (ASY بنسبة أرجحية 3.12x) قائمة مسببات رفع احتمالية المرض.
              </li>
            </ul>
          </div>

          {/* Section 5: Conclusion & References */}
          <div className="space-y-3 border-t border-slate-800 pt-6">
            <h2 className="text-lg font-bold text-cyan-400 border-r-4 border-cyan-500 pr-3">
              5. التوصيات والمراجع الأكاديمية (Recommendations & References)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              يوصي هذا التقرير بتبني نموذج الانحدار اللوجستي كخط دفاع أولي موثوق، وتطبيق ضبط العتبة التفاعلي في كافة مشاريع تنقيب البيانات الحساسة لتقليل الخسائر إلى أدنى حد ممكن.
            </p>
            <div className="text-[11px] text-slate-500 font-mono space-y-1">
              <p>[1] Chawla, N. V., et al. (2002). "SMOTE: synthetic minority over-sampling technique." JAIR, 16, 321-357.</p>
              <p>[2] Lundberg, S. M., & Lee, S. I. (2017). "A unified approach to interpreting model predictions." NeurIPS 30.</p>
              <p>[3] Hastie, T., Tibshirani, R., & Friedman, J. (2009). The Elements of Statistical Learning. Springer.</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
