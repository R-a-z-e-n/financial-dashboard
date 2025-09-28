export type Metric = "Revenue" | "EBITDA" | "PAT";

export interface YearlyData {
  year: number;
  revenue: number;
  ebitda: number;
  pat: number;
}

export interface Company {
  name: string;
  data: YearlyData[];
}

export interface ChartData {
  year: string;
  [companyName: string]: number | string;
}

export interface YearRange {
  start: number | null;
  end: number | null;
}
