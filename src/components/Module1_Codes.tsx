import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Download, 
  Terminal, 
  FileCode, 
  Sparkles, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Sliders,
  Cpu,
  BookOpen
} from 'lucide-react';
import { DatasetId } from '../types';
import { pythonCodes } from '../data/pythonCodes';
import { downloadFile } from '../data/datasets';

interface Module1CodesProps {
  selectedDataset: DatasetId;
  setSelectedDataset: (id: DatasetId) => void;
}

export const Module1_Codes: React.FC<Module1CodesProps> = ({
  selectedDataset,
  setSelectedDataset
}) => {
  const [copied, setCopied] = useState(false);
  const currentCodeItem = pythonCodes[selectedDataset];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCodeItem.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadPy = () => {
    downloadFile(currentCodeItem.filename, currentCodeItem.code, 'text/x-python');
  };

  const handleDownloadIpynb = () => {
    // Generate valid Jupyter notebook structure
    const notebook = {
      cells: [
        {
          cell_type: 'markdown',
          metadata: {},
          source: [
            `# ${currentCodeItem.titleEn}\n`,
            `## ${currentCodeItem.titleAr}\n`,
            `### Data Mining Course - Logistic Regression Assignment\n`,
            `\n`,
            `${currentCodeItem.descriptionAr}\n`
          ]
        },
        {
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: currentCodeItem.code.split('\n').map(line => line + '\n')
        }
      ],
      metadata: {
        language_info: { name: 'python', version: '3.10' }
      },
      nbformat: 4,
      nbformat_minor: 2
    };

    const filename = currentCodeItem.filename.replace('.py', '.ipynb');
    downloadFile(filename, JSON.stringify(notebook, null, 2), 'application/json');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Module Title & Overview Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800">
                الملف الأول (1/4)
              </span>
              <span className="text-xs text-slate-400">
                أكواد برمجية بايثون تنفيذية متكاملة للتعامل مع البيانات واستخراج أعلى دقة واكتمال
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              {currentCodeItem.titleAr}
            </h2>
            <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
              {currentCodeItem.descriptionAr}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-copy-code"
              onClick={handleCopy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-all active:scale-95 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">تم نسخ الكود!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>نسخ الكود بالكامل</span>
                </>
              )}
            </button>

            <button
              id="btn-download-py"
              onClick={handleDownloadPy}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 text-sm font-bold shadow-lg shadow-cyan-600/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تحميل ملف Python (.py)</span>
            </button>

            <button
              id="btn-download-ipynb"
              onClick={handleDownloadIpynb}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
            >
              <FileCode className="w-4 h-4" />
              <span>دفتر Jupyter (.ipynb)</span>
            </button>
          </div>
        </div>

        {/* Dataset Switcher in Header */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 ml-2">اختر الكود المطلوب استعراضه:</span>
          <button
            onClick={() => setSelectedDataset('creditcard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedDataset === 'creditcard'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            الكود 1: الاحتيال المصرفي (creditcard.csv)
          </button>
          <button
            onClick={() => setSelectedDataset('heart_disease')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedDataset === 'heart_disease'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            الكود 2: أمراض القلب السريرية (heart_disease.csv)
          </button>
        </div>
      </div>

      {/* Key Architectural & Preprocessing Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-800/60">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              معالجة واكتمال البيانات (100%)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedDataset === 'creditcard'
                ? 'تطبيق RobustScaler المقاوم للقيم الشاذة على المبالغ والوقت، وإلغاء أي قيم مفقودة لضمان أقصى اكتمال.'
                : 'معالجة وتصحيح القيم الصفرية غير المنطقية بيولوجياً في الكوليسترول والضغط، وتشفير One-Hot.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-800/60">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              {selectedDataset === 'creditcard' ? 'معالجة عدم التوازن بـ SMOTE' : 'ضبط المعايرة ومكافحة التعدد الخطي'}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {selectedDataset === 'creditcard'
                ? 'تطبيق خوارزمية SMOTE داخل مسار التدريب فقط (Training Pipeline) لمنع حدوث تسريب بيانات (Data Leakage).'
                : 'استخدام جزاء L2 Ridge للحد من التعدد الخطي وحساب نسب الأرجحية (Odds Ratios = exp(beta)) مع فترات الثقة.'}
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-800/60">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              تحسين العتبة وتفسيرات SHAP
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              البحث عن العتبة المثلى لتعظيم الـ Recall وتقليل تفويت الحالات الحرجة، مع شروحات SHAP و Waterfall Plot للحالات الفردية.
            </p>
          </div>
        </div>
      </div>

      {/* Code Display Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* Terminal Header Bar */}
        <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <span className="text-xs text-slate-400 font-mono mr-3">
              {currentCodeItem.filename}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-mono">
              Python 3.10+ | Scikit-Learn | Imbalanced-Learn | SHAP
            </span>
            <button
              onClick={handleCopy}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 transition-colors"
            >
              {copied ? 'تم النسخ' : 'نسخ'}
            </button>
          </div>
        </div>

        {/* Code Content with syntax-like styling */}
        <div className="p-4 sm:p-6 overflow-x-auto max-h-[650px] overflow-y-auto font-mono text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#0a0f1d] selection:bg-cyan-800 selection:text-white">
          <pre className="whitespace-pre">{currentCodeItem.code}</pre>
        </div>

        {/* Requirements and Execution Guide Footer */}
        <div className="bg-slate-900/90 border-t border-slate-800 p-4 sm:p-6">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>متطلبات التشغيل والتثبيت (Requirements & Quick Run)</span>
          </h4>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 flex items-center justify-between mb-4">
            <code>pip install {currentCodeItem.requirements.join(' ')}</code>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`pip install ${currentCodeItem.requirements.join(' ')}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-slate-400 hover:text-white text-[11px] px-2 py-1 rounded bg-slate-800"
            >
              نسخ الأمر
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>الكود متوافق تماماً مع بيئات Google Colab، Kaggle Kernels، و VS Code المحلية.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>يتضمن محاكاة ذكية للبيانات في حال عدم وجود ملف الـ CSV محلياً لضمان التشغيل الفوري.</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
