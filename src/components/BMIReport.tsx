'use client';

import { useState } from 'react';
import { BMIRecord, ReportType } from '@/types';
import { groupDataByPeriod, getBMICategory } from '@/utils/bmi';
import { History, CalendarDays, CalendarRange, Calendar, FileText } from 'lucide-react';

interface BMIReportProps {
  records: BMIRecord[];
}

export default function BMIReport({ records }: BMIReportProps) {
  const [activeTab, setActiveTab] = useState<ReportType>('daily');

  const groupedData = groupDataByPeriod(records, activeTab);

  const getCategoryColor = (bmi: number) => {
    const category = getBMICategory(bmi);
    switch (category) {
      case 'Underweight': return 'text-blue-600 bg-blue-50';
      case 'Normal weight': return 'text-green-600 bg-green-50';
      case 'Overweight': return 'text-yellow-600 bg-yellow-50';
      case 'Obese': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-xl text-indigo-600">
            <History size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">History Report</h2>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'daily'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
            onClick={() => setActiveTab('daily')}
          >
            <CalendarDays size={16} />
            Daily
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'monthly'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
            onClick={() => setActiveTab('monthly')}
          >
            <CalendarRange size={16} />
            Monthly
          </button>
          <button
            className={`flex items-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'yearly'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
            onClick={() => setActiveTab('yearly')}
          >
            <Calendar size={16} />
            Yearly
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                {activeTab === 'daily' ? 'Date' : activeTab === 'monthly' ? 'Month' : 'Year'}
              </th>
              {activeTab === 'daily' && (
                <>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Weight</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Height</th>
                </>
              )}
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                {activeTab === 'daily' ? 'BMI' : 'Avg BMI'}
              </th>
              {activeTab !== 'daily' && (
                 <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Entries</th>
              )}
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-50">
            {groupedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
                  <FileText size={48} className="opacity-20" />
                  <p>No records found.</p>
                </td>
              </tr>
            ) : (
              groupedData.map((group) => {
                if (activeTab === 'daily') {
                    return group.records?.map(record => (
                        <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{record.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{record.weight} <span className="text-xs text-slate-400">kg</span></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{record.height} <span className="text-xs text-slate-400">cm</span></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{record.bmi}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(record.bmi)}`}>
                                {getBMICategory(record.bmi)}
                              </span>
                            </td>
                        </tr>
                    ));
                } else {
                    return (
                        <tr key={group.key} className="hover:bg-slate-50/80 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{group.key}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800">{group.avgBMI}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                                {group.count} records
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(group.avgBMI)}`}>
                                {getBMICategory(group.avgBMI)}
                              </span>
                            </td>
                        </tr>
                    );
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
