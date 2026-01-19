import { BMIRecord, GroupedData } from '@/types';

export const calculateBMI = (weight: number, height: number): number => {
  if (height <= 0) return 0;
  const heightInMeters = height / 100;
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
};

export const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const generateMockData = (count: number): BMIRecord[] => {
  const records: BMIRecord[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    // Random date within the last 365 days
    const daysAgo = Math.floor(Math.random() * 365);
    date.setDate(date.getDate() - daysAgo);
    
    const height = 150 + Math.random() * 50; // 150-200cm
    const weight = 50 + Math.random() * 60; // 50-110kg
    const bmi = calculateBMI(weight, height);
    
    records.push({
      id: crypto.randomUUID(),
      weight: parseFloat(weight.toFixed(1)),
      height: parseFloat(height.toFixed(1)),
      bmi,
      date: date.toISOString().split('T')[0],
    });
  }
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const groupDataByPeriod = (records: BMIRecord[], period: 'daily' | 'monthly' | 'yearly'): GroupedData[] => {
  const groups: { [key: string]: { sumBMI: number; count: number; records: BMIRecord[] } } = {};

  records.forEach(record => {
    let key = record.date;
    if (period === 'monthly') {
      key = record.date.substring(0, 7); // YYYY-MM
    } else if (period === 'yearly') {
      key = record.date.substring(0, 4); // YYYY
    }

    if (!groups[key]) {
      groups[key] = { sumBMI: 0, count: 0, records: [] };
    }
    groups[key].sumBMI += record.bmi;
    groups[key].count += 1;
    groups[key].records.push(record);
  });

  return Object.keys(groups).sort().reverse().map(key => ({
    key,
    avgBMI: parseFloat((groups[key].sumBMI / groups[key].count).toFixed(2)),
    count: groups[key].count,
    records: groups[key].records
  }));
};
