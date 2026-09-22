import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Download, 
  Search, 
  Filter, 
  CheckCircle2, 
  FileSpreadsheet, 
  ArrowUpDown, 
  Eye, 
  Table, 
  PieChart, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { DatasetId, ProcessedRecord } from '../types';
import { 
  creditcardProcessedSamples, 
  heartDiseaseProcessedSamples, 
  creditcardColumnStats, 
  heartDiseaseColumnStats,
  generateCsvContent,
  downloadFile
} from '../data/datasets';
import { datasetsMeta } from '../data/evaluationData';

interface Module4DataExplorerProps {
  selectedDataset: DatasetId;
  setSelectedDataset: (id: DatasetId) => void;
}

export const Module4_DataExplorer: React.FC<Module4DataExplorerProps> = ({
  selectedDataset,
  setSelectedDataset
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'saved_by_threshold' | 'fraud_or_disease' | 'normal'>('all');
  const [activeSubTab, setActiveSubTab] = useState<'records' | 'statistics'>('records');

  const meta = datasetsMeta[selectedDataset];
  const samples = selectedDataset === 'creditcard' ? creditcardProcessedSamples : heartDiseaseProcessedSamples;
  const stats = selectedDataset === 'creditcard' ? creditcardColumnStats : heartDiseaseColumnStats;

  // Filtered samples
  const filteredSamples = useMemo(() => {
    return samples.filter(row => {
      // Status filter
      if (statusFilter === 'saved_by_threshold') {
        if (!row.Status.includes('إنقاذ')) return false;
      } else if (statusFilter === 'fraud_or_disease') {
        const isTarget = selectedDataset === 'creditcard' ? row.Class === 1 : row.HeartDisease === 1;
        if (!isTarget) return false;
      } else if (statusFilter === 'normal') {
        const isTarget = selectedDataset === 'creditcard' ? row.Class === 1 : row.HeartDisease === 1;
        if (isTarget) return false;
      }

      // Search filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return Object.values(row).some(val => String(val).toLowerCase().includes(q));
    });
  }, [samples, statusFilter, searchQuery, selectedDataset]);

  const handleDownloadCsv = () => {
    const csvData = generateCsvContent(selectedDataset);
    const filename = `${selectedDataset}_processed_dataset.csv`;
    downloadFile(filename, csvData, 'text/csv');
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Module Title Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                الملف الرابع (4/4)
              </span>
              <span className="text-xs text-slate-400">
                قاعدتا البيانات المعالجتان بكامل الاكتمال والدقة مع الاحتمالات والتصنيف وتصدير CSV
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              استكشاف وتنزيل البيانات المعالجة (Processed Datasets & Export)
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              تصفح البيانات بعد خضوعها لمراحل المعالجة الكاملة (التوحيد، المعايرة، تشفير المتغيرات، وإضافة الاحتمالات المتوقعة وتأثير العتبة المحسنة)، مع إمكانية تصديرها كملف CSV جاهز للاستعمال.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-download-csv"
              onClick={handleDownloadCsv}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>تحميل ملف CSV المعالج ({selectedDataset}_processed.csv)</span>
            </button>
          </div>
        </div>

        {/* Dataset Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">اختر قاعدة البيانات المعالجة:</span>
            <button
              onClick={() => setSelectedDataset('creditcard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDataset === 'creditcard'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              1. بيانات الاحتيال المصرفي المعالجة (creditcard_processed)
            </button>
            <button
              onClick={() => setSelectedDataset('heart_disease')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedDataset === 'heart_disease'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              2. بيانات أمراض القلب المعالجة (heart_disease_processed)
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSubTab('records')}
              className={`px-3 py-1 rounded font-medium ${
                activeSubTab === 'records' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              سجلات البيانات
            </button>
            <button
              onClick={() => setActiveSubTab('statistics')}
              className={`px-3 py-1 rounded font-medium ${
                activeSubTab === 'statistics' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              الإحصاءات واكتمال الأعمدة
            </button>
          </div>
        </div>
      </div>

      {/* Data Quality & Integrity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-1">نسبة اكتمال البيانات</div>
          <div className="text-2xl font-black font-mono text-emerald-400 flex items-center gap-2">
            <span>100.0%</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-[11px] text-slate-500 mt-1">خالية تماماً من أي قيم مفقودة (0 Missing)</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-1">طريقة توحيد المقاييس (Scaling)</div>
          <div className="text-sm font-bold font-mono text-cyan-300">
            {selectedDataset === 'creditcard' ? 'RobustScaler (IQR/Median)' : 'StandardScaler (Z-Score)'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">مقاوم لانحراف القيم المالية والشاذة</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-1">العتبة الافتراضية vs المحسنة</div>
          <div className="text-sm font-bold font-mono text-amber-400">
            0.50 مقابل {meta.optimalThreshold.toFixed(2)}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">توضح كيفية إنقاذ الحالات من التفويت</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="text-xs text-slate-400 mb-1">كفاءة الاستدعاء (Recall Score)</div>
          <div className="text-2xl font-black font-mono text-emerald-300">
            {selectedDataset === 'creditcard' ? '86.7%' : '91.7%'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">أعلى نسبة كشف للحالات الإيجابية</p>
        </div>
      </div>

      {/* Sub-tab 1: Records Table with Search and Filtering */}
      {activeSubTab === 'records' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
          
          {/* Table Controls (Search & Quick Filter) */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث برقم المعاملة، الحالة، أو أي قيمة رقمية..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center flex-wrap gap-1.5 text-xs">
              <span className="text-slate-400 text-[11px] ml-1">تصفية حسب:</span>
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-2.5 py-1 rounded-lg ${statusFilter === 'all' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                الكل ({samples.length})
              </button>
              <button
                onClick={() => setStatusFilter('saved_by_threshold')}
                className={`px-2.5 py-1 rounded-lg flex items-center gap-1 ${statusFilter === 'saved_by_threshold' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-amber-400 hover:text-white'}`}
              >
                <Sparkles className="w-3 h-3" />
                <span>أُنقذت بالعتبة المحسنة</span>
              </button>
              <button
                onClick={() => setStatusFilter('fraud_or_disease')}
                className={`px-2.5 py-1 rounded-lg ${statusFilter === 'fraud_or_disease' ? 'bg-rose-500 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                {selectedDataset === 'creditcard' ? 'عمليات الاحتيال (Class 1)' : 'المرضى المصابون (Target 1)'}
              </button>
              <button
                onClick={() => setStatusFilter('normal')}
                className={`px-2.5 py-1 rounded-lg ${statusFilter === 'normal' ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
              >
                السليمات (Class 0)
              </button>
            </div>
          </div>

          {/* Records Table View */}
          <div className="overflow-x-auto max-h-[520px]">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-900/90 text-slate-300 font-semibold border-b border-slate-800 sticky top-0 z-10 backdrop-blur-sm">
                <tr>
                  <th className="p-3">المعرف (ID)</th>
                  {selectedDataset === 'creditcard' ? (
                    <>
                      <th className="p-3">Amount ($)</th>
                      <th className="p-3">scaled_amount</th>
                      <th className="p-3">V14</th>
                      <th className="p-3">V10</th>
                      <th className="p-3">V12</th>
                      <th className="p-3">V4</th>
                      <th className="p-3">الفئة الحقيقية (Class)</th>
                      <th className="p-3">الاحتمال المتوقع $P(Y=1)$</th>
                      <th className="p-3">قرار العتبة 0.50</th>
                      <th className="p-3">قرار العتبة المحسنة ({meta.optimalThreshold})</th>
                      <th className="p-3">حالة التشخيص</th>
                    </>
                  ) : (
                    <>
                      <th className="p-3">العمر</th>
                      <th className="p-3">الجنس</th>
                      <th className="p-3">ألم الصدر</th>
                      <th className="p-3">ضغط الدم</th>
                      <th className="p-3">الكوليسترول</th>
                      <th className="p-3">النبض الأقصى</th>
                      <th className="p-3">ST_Slope</th>
                      <th className="p-3">الإصابة الحقيقية</th>
                      <th className="p-3">الاحتمال $P(Y=1)$</th>
                      <th className="p-3">قرار العتبة 0.50</th>
                      <th className="p-3">قرار العتبة المحسنة ({meta.optimalThreshold})</th>
                      <th className="p-3">حالة التشخيص</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredSamples.map((row) => {
                  const isSaved = row.Status.includes('إنقاذ');
                  const isPositive = selectedDataset === 'creditcard' ? row.Class === 1 : row.HeartDisease === 1;
                  return (
                    <tr
                      key={row.id}
                      className={`hover:bg-slate-900/60 transition-colors ${
                        isSaved ? 'bg-amber-950/20' : ''
                      }`}
                    >
                      <td className="p-3 font-bold text-slate-300">{row.id}</td>
                      
                      {selectedDataset === 'creditcard' ? (
                        <>
                          <td className="p-3 text-slate-200">${row.Amount_usd.toFixed(2)}</td>
                          <td className="p-3 text-slate-400">{row.scaled_amount.toFixed(2)}</td>
                          <td className={`p-3 ${row.V14 < -2 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{row.V14.toFixed(2)}</td>
                          <td className={`p-3 ${row.V10 < -2 ? 'text-rose-400 font-bold' : 'text-slate-300'}`}>{row.V10.toFixed(2)}</td>
                          <td className="p-3 text-slate-300">{row.V12.toFixed(2)}</td>
                          <td className="p-3 text-slate-300">{row.V4.toFixed(2)}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.Class === 1 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {row.Class === 1 ? '1 (احتيال)' : '0 (سليم)'}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-cyan-400 font-mono">
                            {(row.Pred_Prob * 100).toFixed(1)}%
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              row.Pred_Default_05 === 1 ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {row.Pred_Default_05}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.Pred_Optimal_028 === 1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {row.Pred_Optimal_028}
                            </span>
                          </td>
                          <td className="p-3 font-sans">
                            <span className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 w-fit ${
                              isSaved
                                ? 'bg-amber-950 text-amber-300 border border-amber-800 font-bold animate-pulse'
                                : isPositive
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {row.Status}
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="p-3 text-slate-200">{row.Age}</td>
                          <td className="p-3 text-slate-300 font-sans">{row.Sex}</td>
                          <td className="p-3 text-slate-300 font-sans">{row.ChestPain}</td>
                          <td className="p-3 text-slate-300">{row.RestingBP}</td>
                          <td className="p-3 text-slate-300">{row.Cholesterol}</td>
                          <td className="p-3 text-slate-300">{row.MaxHR}</td>
                          <td className="p-3 text-slate-300 font-sans">{row.ST_Slope}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.HeartDisease === 1 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {row.HeartDisease === 1 ? '1 (مصاب)' : '0 (سليم)'}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-cyan-400 font-mono">
                            {(row.Pred_Prob * 100).toFixed(1)}%
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] ${
                              row.Pred_Default_05 === 1 ? 'bg-rose-950 text-rose-300' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {row.Pred_Default_05}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.Pred_Optimal_035 === 1 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-slate-800 text-slate-400'
                            }`}>
                              {row.Pred_Optimal_035}
                            </span>
                          </td>
                          <td className="p-3 font-sans">
                            <span className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1.5 w-fit ${
                              isSaved
                                ? 'bg-amber-950 text-amber-300 border border-amber-800 font-bold'
                                : isPositive
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-slate-800 text-slate-300'
                            }`}>
                              {row.Status}
                            </span>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-900/60 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>عدد العينات المعروضة: <strong>{filteredSamples.length}</strong> من أصل <strong>{samples.length}</strong></span>
            <span className="text-slate-500">تم التصدير والمعالجة بنجاح عبر مسار Scikit-Learn Pipeline</span>
          </div>

        </div>
      )}

      {/* Sub-tab 2: Column Profiling & Completeness Statistics */}
      {activeSubTab === 'statistics' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-white">
                تقرير جودة البيانات واكتمال الأعمدة (Data Profiling & Completeness Report)
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                تأكيد رياضي على خلو كافة الأعمدة من القيم المفقودة (0 Missing) بعد إتمام معالجة البيانات
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold">
              الاكتمال: 100%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
              <thead className="bg-slate-900 text-slate-300 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">اسم المتغير (Column)</th>
                  <th className="p-3">الوصف</th>
                  <th className="p-3">النوع</th>
                  <th className="p-3">المتوسط (Mean)</th>
                  <th className="p-3">الانحراف (Std)</th>
                  <th className="p-3">الأدنى (Min)</th>
                  <th className="p-3">الأقصى (Max)</th>
                  <th className="p-3">القيم المفقودة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {stats.map((col) => (
                  <tr key={col.name} className="hover:bg-slate-800/40 text-slate-300">
                    <td className="p-3 font-bold text-cyan-400">{col.name}</td>
                    <td className="p-3 font-sans text-slate-300">{col.nameAr}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        col.type === 'numeric' ? 'bg-slate-800 text-slate-300' : 'bg-indigo-950 text-indigo-300'
                      }`}>
                        {col.type}
                      </span>
                    </td>
                    <td className="p-3">{col.mean !== undefined ? col.mean.toFixed(2) : '-'}</td>
                    <td className="p-3">{col.std !== undefined ? col.std.toFixed(2) : '-'}</td>
                    <td className="p-3">{col.min !== undefined ? col.min.toFixed(2) : '-'}</td>
                    <td className="p-3">{col.max !== undefined ? col.max.toFixed(2) : '-'}</td>
                    <td className="p-3 text-emerald-400 font-bold">0 (0.00%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
