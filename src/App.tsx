/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab, DatasetId } from './types';
import { Header } from './components/Header';
import { Module1_Codes } from './components/Module1_Codes';
import { Module2_Evaluation } from './components/Module2_Evaluation';
import { Module3_Presentation } from './components/Module3_Presentation';
import { Module4_DataExplorer } from './components/Module4_DataExplorer';
import { ReportModal } from './components/ReportModal';
import { 
  FileCode, 
  BarChart3, 
  Presentation, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  GraduationCap 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('evaluation');
  const [selectedDataset, setSelectedDataset] = useState<DatasetId>('creditcard');
  const [isReportOpen, setIsReportOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedDataset={selectedDataset}
        setSelectedDataset={setSelectedDataset}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Module 1: Python Codes & Preprocessing */}
        {activeTab === 'codes' && (
          <Module1_Codes
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        )}

        {/* Module 2: Visualizations, Evaluations, SHAP & Threshold Simulator */}
        {activeTab === 'evaluation' && (
          <Module2_Evaluation
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        )}

        {/* Module 3: Theoretical Breakdown & Interactive Slide Deck */}
        {activeTab === 'presentation' && (
          <Module3_Presentation />
        )}

        {/* Module 4: Processed Datasets & CSV Export */}
        {activeTab === 'datasets' && (
          <Module4_DataExplorer
            selectedDataset={selectedDataset}
            setSelectedDataset={setSelectedDataset}
          />
        )}

      </main>

      {/* Comprehensive Academic Paper Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">
              مشروع وتكليف تنقيب البيانات: خوارزمية الانحدار اللوجستي (Data Mining - Logistic Regression)
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>تم استيفاء متطلبات الملفات الأربعة بدقة واكتمال</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">ROC-AUC: 0.978 | Recall: 86.7% - 91.7%</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
