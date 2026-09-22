import React from 'react';
import { 
  FileCode2, 
  BarChart3, 
  Presentation, 
  Database, 
  FileText, 
  CreditCard, 
  HeartPulse,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { ActiveTab, DatasetId } from '../types';
import { datasetsMeta } from '../data/evaluationData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedDataset: DatasetId;
  setSelectedDataset: (id: DatasetId) => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  selectedDataset,
  setSelectedDataset,
  onOpenReport
}) => {
  const currentMeta = datasetsMeta[selectedDataset];

  return (
    <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
      {/* Top Banner with App Title and Global Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Project Info */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold text-lg">
              LR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white tracking-wide">
                  معمل تنقيب البيانات | خوارزمية الانحدار اللوجستي
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                  Data Mining Lab
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                تقرير وتكاليف متكاملة: كودين معالجة، تقييمات تفاعلية، شروحات SHAP، عتبة القرار، وعرض تقديمي
              </p>
            </div>
          </div>

          {/* Dataset Switcher & Report Button */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Dataset Pill Switcher */}
            <div className="bg-slate-950/80 p-1 rounded-xl border border-slate-800 flex items-center gap-1 shadow-inner">
              <button
                id="btn-select-creditcard"
                onClick={() => setSelectedDataset('creditcard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDataset === 'creditcard'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>الاحتيال المصرفي (creditcard.csv)</span>
              </button>

              <button
                id="btn-select-heart"
                onClick={() => setSelectedDataset('heart_disease')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedDataset === 'heart_disease'
                    ? 'bg-rose-500 text-white font-semibold shadow-md shadow-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <HeartPulse className="w-3.5 h-3.5" />
                <span>أمراض القلب (heart_disease.csv)</span>
              </button>
            </div>

            {/* Comprehensive Report Action */}
            <button
              id="btn-open-report"
              onClick={onOpenReport}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/25 transition-all active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>التقرير الأكاديمي الشامل (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 4 Modules Tabs (Corresponding to User's 4 Files) */}
      <div className="border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-3 rtl:space-x-reverse overflow-x-auto py-2 scrollbar-none" aria-label="Tabs">
            
            {/* Tab 1 */}
            <button
              id="tab-codes"
              onClick={() => setActiveTab('codes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === 'codes'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileCode2 className={`w-4 h-4 ${activeTab === 'codes' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>الملف 1: الأكواد البرمجية والمعالجة</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-700/60 text-slate-300">
                2 كود Python
              </span>
            </button>

            {/* Tab 2 */}
            <button
              id="tab-evaluation"
              onClick={() => setActiveTab('evaluation')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === 'evaluation'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className={`w-4 h-4 ${activeTab === 'evaluation' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>الملف 2: التقييمات والرسوم و SHAP والعتبة</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                تفاعلي
              </span>
            </button>

            {/* Tab 3 */}
            <button
              id="tab-presentation"
              onClick={() => setActiveTab('presentation')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === 'presentation'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Presentation className={`w-4 h-4 ${activeTab === 'presentation' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>الملف 3: التحليل النظري والعرض التقديمي</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-900/60 text-violet-300 border border-violet-700/50">
                8 شرائح
              </span>
            </button>

            {/* Tab 4 */}
            <button
              id="tab-datasets"
              onClick={() => setActiveTab('datasets')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === 'datasets'
                  ? 'bg-slate-800 text-cyan-400 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Database className={`w-4 h-4 ${activeTab === 'datasets' ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>الملف 4: استكشاف وتحميل البيانات المعالجة</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                تصدير CSV
              </span>
            </button>

          </nav>
        </div>
      </div>

      {/* Dataset quick context banner */}
      <div className="bg-slate-900/60 border-t border-slate-800/40 px-4 sm:px-8 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-slate-300 font-medium">قاعدة البيانات النشطة:</span>
          <strong className="text-cyan-300">{currentMeta.name}</strong>
          <span className="text-slate-500">({currentMeta.filename})</span>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span>العينات: <strong className="text-slate-200">{currentMeta.samplesCount.toLocaleString()}</strong></span>
          <span className="text-slate-600">|</span>
          <span>الميزات: <strong className="text-slate-200">{currentMeta.featuresCount}</strong></span>
          <span className="text-slate-600">|</span>
          <span>ROC-AUC: <strong className="text-emerald-400 font-mono">{currentMeta.aucRoc.toFixed(3)}</strong></span>
          <span className="text-slate-600">|</span>
          <span>العتبة المثلى: <strong className="text-amber-400 font-mono">{currentMeta.optimalThreshold.toFixed(2)}</strong></span>
        </div>
      </div>
    </header>
  );
};
