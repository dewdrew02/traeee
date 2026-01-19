'use client';

import { useState, useEffect } from 'react';
import BMICalculator from '@/components/BMICalculator';
import BMIReport from '@/components/BMIReport';
import { BMIRecord } from '@/types';
import { generateMockData } from '@/utils/bmi';
import { Activity, Heart, LogIn, LogOut } from 'lucide-react';
import { logout, checkAuth } from '@/actions/auth';
import Link from 'next/link';

export default function Home() {
  const [records, setRecords] = useState<BMIRecord[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth().then(setIsLoggedIn);
  }, []);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('bmi_records');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRecords(JSON.parse(saved));
      } catch {
        // Ignore parsing errors
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever records change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('bmi_records', JSON.stringify(records));
    }
  }, [records, isLoaded]);

  const handleAddRecord = (record: BMIRecord) => {
    setRecords((prev) => [record, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleGenerateMock = () => {
    const mockData = generateMockData(50);
    setRecords((prev) => [...mockData, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setRecords([]);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin text-indigo-600">
            <Activity size={48} />
          </div>
          <p className="text-slate-500 font-medium">Loading your health data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-md bg-white/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
              <Heart size={20} fill="currentColor" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">BMI<span className="text-indigo-600">Tracker</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 font-medium hidden sm:block">
              Stay Healthy
            </div>
            {isLoggedIn ? (
              <button 
                onClick={() => logout()} 
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors bg-slate-50 hover:bg-red-50 px-3 py-1.5 rounded-lg"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            ) : (
              <Link 
                href="/login" 
                className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Track Your Health Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Monitor your Body Mass Index (BMI) over time to stay on top of your fitness goals.
            </p>
          </div>
          
          <BMICalculator 
            onAddRecord={handleAddRecord} 
            onGenerateMock={handleGenerateMock}
            onClearData={handleClearData}
          />
          
          <BMIReport records={records} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BMI Tracker. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
