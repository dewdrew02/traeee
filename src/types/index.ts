export interface BMIRecord {
  id: string;
  weight: number;
  height: number;
  bmi: number;
  date: string; // YYYY-MM-DD
}

export type ReportType = 'daily' | 'monthly' | 'yearly';

export interface GroupedData {
  key: string;
  avgBMI: number;
  count: number;
  records?: BMIRecord[];
}
