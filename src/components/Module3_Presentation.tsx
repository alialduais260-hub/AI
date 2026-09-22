import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Code2, 
  Check, 
  Lightbulb, 
  ArrowLeft, 
  ArrowRight,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { presentationSlides } from '../data/presentationSlides';

export const Module3_Presentation: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTheoreticalGuide, setShowTheoreticalGuide] = useState(false);

  const currentSlide = presentationSlides[currentSlideIndex];
  const totalSlides = presentationSlides.length;

  const nextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        // In RTL, ArrowRight usually goes back, or next depending on preference
        prevSlide();
      } else if (e.key === 'ArrowLeft') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-950 text-violet-400 border border-violet-800">
                الملف الثالث (3/4)
              </span>
              <span className="text-xs text-slate-400">
                تحليل علمي ونبذة شاملة عن خوارزمية الانحدار اللوجستي وعرض تقديمي أكاديمي
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              العرض التقديمي الأكاديمي والتحليل النظري المعمق (Slide Deck)
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              عرض تقديمي متكامل من 8 شرائح محكمة تغطي الأسس الرياضية، دالة الخسارة، معالجة عدم التوازن، هندسة العتبة، وقابلية التفسير بالـ SHAP، جاهزة للمناقشة الجامعية والتسليم المهني.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTheoreticalGuide(!showTheoreticalGuide)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
            >
              <BookOpen className="w-4 h-4 text-violet-400" />
              <span>{showTheoreticalGuide ? 'إخفاء الدليل النظري' : 'الدليل الرياضي الكامل'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className={`bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col justify-between bg-slate-950' : ''
      }`}>
        
        {/* Slide Stage Header */}
        <div className="bg-slate-900/90 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-violet-950 text-violet-300 text-xs font-mono font-bold border border-violet-800">
              الشريحة {currentSlideIndex + 1} من {totalSlides}
            </span>
            <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
              {currentSlide.category}
            </span>
          </div>

          {/* Slide Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="الشريحة السابقة (السهم الأيمن)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-slate-400 px-2">
              {currentSlideIndex + 1} / {totalSlides}
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="الشريحة التالية (السهم الأيسر)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all ml-2"
              title={isFullscreen ? 'تصغير' : 'وضع ملء الشاشة'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Slide Body Content */}
        <div className="p-6 sm:p-10 space-y-6 overflow-y-auto max-h-[620px]">
          
          {/* Slide Heading */}
          <div>
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider block mb-1">
              {currentSlide.subtitle}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {currentSlide.title}
            </h3>
          </div>

          {/* Overview Paragraph */}
          <div className="bg-slate-900/60 p-4 sm:p-5 rounded-xl border border-slate-800/80 text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
            {currentSlide.content.overview}
          </div>

          {/* Key Bullet Points */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              النقاط الجوهرية والتحليل التقني:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentSlide.content.points.map((pt, idx) => (
                <div key={idx} className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60 flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-violet-950 text-violet-400 flex items-center justify-center shrink-0 mt-0.5 border border-violet-800 text-xs font-mono font-bold">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {pt}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Equations if available */}
          {currentSlide.content.equations && currentSlide.content.equations.length > 0 && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                الصيغ الرياضية والمعادلات المعتمدة:
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {currentSlide.content.equations.map((eq, idx) => (
                  <div key={idx} className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-cyan-400 block mb-1.5">{eq.label}</span>
                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-center font-mono text-sm sm:text-base text-white tracking-wider my-2 overflow-x-auto">
                      {eq.formula}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{eq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Metrics comparison if available */}
          {currentSlide.content.metricsComparison && (
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                مقارنة الأداء والنتائج العملية:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentSlide.content.metricsComparison.map((m, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                    <div className="text-xs text-slate-400 mb-1">{m.label}</div>
                    <div className="text-sm font-bold text-white font-mono">{m.value1}</div>
                    <div className="text-xs font-semibold text-cyan-400 font-mono mt-0.5">{m.value2}</div>
                    <div className="text-[11px] text-slate-500 mt-2 border-t border-slate-800 pt-1.5">{m.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Notes / Speaker Defense Hint */}
          <div className="bg-violet-950/30 border border-violet-800/40 p-4 rounded-xl flex items-start gap-3">
            <GraduationCap className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-violet-300 block mb-0.5">
                ملاحظة المناقشة الأكاديمية (Academic Defense Note):
              </span>
              <p className="text-xs text-violet-200/90 leading-relaxed">
                {currentSlide.content.academicNote}
              </p>
            </div>
          </div>

        </div>

        {/* Slide Deck Bottom Thumbnails / Stepper */}
        <div className="bg-slate-900/80 p-3 border-t border-slate-800 flex items-center justify-between overflow-x-auto scrollbar-none gap-2">
          {presentationSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all ${
                currentSlideIndex === idx
                  ? 'bg-violet-600 text-white font-bold shadow-md shadow-violet-600/30'
                  : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{idx + 1}.</span>
              <span className="truncate max-w-[120px]">{slide.title.split(' ')[0]} {slide.title.split(' ')[1]}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Comprehensive Theoretical Guide (Collapsible) */}
      {showTheoreticalGuide && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-950 text-violet-400 flex items-center justify-center border border-violet-800">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                الدليل الأكاديمي المفصل: افتراضات واشتقاقات الانحدار اللوجستي
              </h3>
              <p className="text-xs text-slate-400">
                مرجع توثيقي شامل للتقرير وللإجابة على أسئلة لجنة التحكيم والمناقشة
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            
            {/* Box 1: Core Assumptions */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-cyan-400" />
                <span>الافتراضات الإحصائية الرئيسية للانحدار اللوجستي</span>
              </h4>
              <ul className="space-y-2 list-disc list-inside text-slate-300">
                <li><strong>ثنائية الهدف (Binary Target):</strong> المتغير التابع ثنائي الفئة (0 أو 1).</li>
                <li><strong>الخطية في اللوجيت (Linearity in Logit):</strong> العلاقة بين المتغيرات المستقلة ولوغاريتم الأرجحية $\ln(p/(1-p))$ يجب أن تكون خطية.</li>
                <li><strong>استقلال الملاحظات (Independence of Errors):</strong> العينات مستقلة إحصائياً ولا يوجد ارتباط ذاتي.</li>
                <li><strong>غياب التعدد الخطي الشديد (No Severe Multicollinearity):</strong> يجب ألا تكون الميزات مرتبطة ببعضها بشدة (نطمح لـ VIF &lt; 5).</li>
                <li><strong>حجم عينة كافٍ (Sample Size):</strong> قاعدة EPV (Events Per Variable) تتطلب على الأقل 10 إلى 20 عينة إيجابية لكل ميزة.</li>
              </ul>
            </div>

            {/* Box 2: Regularization L1 vs L2 */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-violet-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-violet-400" />
                <span>المعايرة المنتظمة (Regularization: L1 vs L2)</span>
              </h4>
              <p className="leading-relaxed">
                لمنع فرط المطابقة (Overfitting) عند زيادة عدد الميزات:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <strong className="text-white">معايرة L1 (Lasso Penalty):</strong>
                  <br />تضيف $\lambda \sum |\beta_j|$ إلى دالة الخسارة. تؤدي إلى تصفير المعاملات غير المهمة وتعمل كأداة لاختيار الميزات (Feature Selection).
                </li>
                <li>
                  <strong className="text-white">معايرة L2 (Ridge Penalty):</strong>
                  <br />تضيف (λ/2) Σ β_j² إلى دالة الخسارة. تقلص قيم المعاملات نحو الصفر دون تصفيرها تماماً، وتعتبر ممتازة عند وجود ميزات مترابطة.
                </li>
              </ul>
            </div>

            {/* Box 3: Derivation of Sigmoid Derivative */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>اشتقاق مشتقة دالة السيجمويد رياضياً</span>
              </h4>
              <div className="leading-relaxed font-mono text-[11px] bg-slate-900 p-3 rounded border border-slate-800 text-slate-200 space-y-1">
                <div>{"σ(z) = 1 / (1 + e^-z)"}</div>
                <div>{"d/dz [σ(z)] = -1(1 + e^-z)^-2 · (-e^-z) = e^-z / (1 + e^-z)^2"}</div>
                <div>{"= [1 / (1 + e^-z)] · [e^-z / (1 + e^-z)] = σ(z) · (1 - σ(z))"}</div>
              </div>
              <p className="text-[11px] text-slate-400">
                هذه النتيجة الأنيقة {"σ'(z) = σ(z)(1 - σ(z))"} هي السبب في الكفاءة الحسابية الفائقة للانحدار التدريجي.
              </p>
            </div>

            {/* Box 4: Maximum Likelihood Estimation */}
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-amber-400" />
                <span>لماذا MLE بدلاً من OLS في الانحدار اللوجستي؟</span>
              </h4>
              <p className="leading-relaxed">
                في الانحدار الخطي نستخدم طريقة المربعات الصغرى (OLS). لكن في المتغير الثنائي {"Y ∈ {0, 1}"} يكون توزع الخطأ برنولياً (Bernoulli) وليس طبيعياً (Gaussian)، كما أن التباين ليس ثابتاً (Heteroscedasticity).
              </p>
              <p className="text-[11px] text-slate-400">
                لذلك نلجأ إلى تقدير الإمكانية القصوى (MLE) لتعظيم احتمالية ظهور البيانات التي تمت مشاهدتها بالفعل.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
