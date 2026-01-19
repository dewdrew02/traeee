'use client';

import { useState } from 'react';
import { calculateBMI, getBMICategory } from '@/utils/bmi';
import { BMIRecord } from '@/types';
import { Calculator, Calendar, Ruler, Weight, Trash2, Database, Activity } from 'lucide-react';

interface BMICalculatorProps {
  onAddRecord: (record: BMIRecord) => void;
  onGenerateMock: () => void;
  onClearData: () => void;
}

export default function BMICalculator({ onAddRecord, onGenerateMock, onClearData }: BMICalculatorProps) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w > 0 && h > 0 && date) {
      const bmi = calculateBMI(w, h);
      const category = getBMICategory(bmi);
      setResult({ bmi, category });

      const newRecord: BMIRecord = {
        id: crypto.randomUUID(),
        weight: w,
        height: h,
        bmi,
        date,
      };
      onAddRecord(newRecord);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'Normal weight': return 'text-green-500 bg-green-50 border-green-200';
      case 'Overweight': return 'text-yellow-500 bg-yellow-50 border-yellow-200';
      case 'Obese': return 'text-red-500 bg-red-50 border-red-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-8 transition-all hover:shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
          <Activity size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Calculate BMI</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Weight size={16} /> Weight (kg)
          </label>
          <div className="relative">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium placeholder:text-slate-400"
              placeholder="e.g. 70"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Ruler size={16} /> Height (cm)
          </label>
          <div className="relative">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium placeholder:text-slate-400"
              placeholder="e.g. 175"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <Calendar size={16} /> Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleCalculate}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:-translate-y-0.5"
        >
          <Calculator size={20} />
          Calculate & Save
        </button>
        
        <div className="flex gap-2">
            <button
            onClick={onGenerateMock}
            className="flex-1 sm:flex-none bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 border border-emerald-200 flex items-center justify-center gap-2"
            title="Generate Mock Data"
            >
            <Database size={20} />
            <span className="hidden sm:inline">Mock Data</span>
            </button>
            <button
            onClick={onClearData}
            className="flex-1 sm:flex-none bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 border border-rose-200 flex items-center justify-center gap-2"
            title="Clear Data"
            >
            <Trash2 size={20} />
            <span className="hidden sm:inline">Clear</span>
            </button>
        </div>
      </div>

      {result && (
        <div className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-500 ${getCategoryColor(result.category)}`}>
          <p className="text-slate-600 font-medium mb-1 uppercase tracking-wider text-xs">Result</p>
          <div className="flex items-baseline gap-1 mb-2">
            <span className="text-5xl font-black tracking-tighter">{result.bmi}</span>
            <span className="text-sm font-bold opacity-70">BMI</span>
          </div>
          <div className="px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm font-bold text-sm border border-black/5 shadow-sm">
            {result.category}
          </div>
        </div>
      )}
    </div>
  );
}
