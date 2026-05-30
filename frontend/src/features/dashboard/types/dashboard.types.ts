export interface StatCardProps {
  title: string;
  value: string | number;
  trend: string;
  color: 'green' | 'red';
}

export interface PeriodStatProps {
  label: string;
  value: number;
  percent: string;
}

export interface ReferralBarProps {
  label: string;
  value: number;
  total: number;
  color: string;
}