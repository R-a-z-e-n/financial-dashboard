
import { Company, Metric } from '../types';

export const COMPANIES: string[] = ["HCL Tech", "Infosys", "TCS", "Wipro", "Tech Mahindra"];

export const METRICS: Metric[] = ["Revenue", "EBITDA", "PAT"];

export const FINANCIAL_DATA: Company[] = [
  {
    name: "HCL Tech",
    data: [
      { year: 2020, revenue: 10, ebitda: 2.5, pat: 1.8 },
      { year: 2021, revenue: 11, ebitda: 2.7, pat: 2.0 },
      { year: 2022, revenue: 12.5, ebitda: 3.1, pat: 2.3 },
      { year: 2023, revenue: 13.2, ebitda: 3.3, pat: 2.5 },
      { year: 2024, revenue: 14.5, ebitda: 3.6, pat: 2.8 },
    ],
  },
  {
    name: "Infosys",
    data: [
      { year: 2020, revenue: 12.8, ebitda: 3.0, pat: 2.2 },
      { year: 2021, revenue: 13.6, ebitda: 3.2, pat: 2.4 },
      { year: 2022, revenue: 16.3, ebitda: 3.8, pat: 2.9 },
      { year: 2023, revenue: 17.5, ebitda: 4.1, pat: 3.1 },
      { year: 2024, revenue: 18.2, ebitda: 4.3, pat: 3.3 },
    ],
  },
  {
    name: "TCS",
    data: [
      { year: 2020, revenue: 22.0, ebitda: 5.5, pat: 4.4 },
      { year: 2021, revenue: 23.5, ebitda: 6.0, pat: 4.8 },
      { year: 2022, revenue: 25.7, ebitda: 6.5, pat: 5.2 },
      { year: 2023, revenue: 27.9, ebitda: 7.0, pat: 5.6 },
      { year: 2024, revenue: 29.1, ebitda: 7.3, pat: 5.9 },
    ],
  },
  {
    name: "Wipro",
    data: [
      { year: 2020, revenue: 8.1, ebitda: 1.8, pat: 1.3 },
      { year: 2021, revenue: 8.5, ebitda: 1.9, pat: 1.4 },
      { year: 2022, revenue: 9.6, ebitda: 2.1, pat: 1.6 },
      { year: 2023, revenue: 10.2, ebitda: 2.3, pat: 1.7 },
      { year: 2024, revenue: 10.8, ebitda: 2.4, pat: 1.8 },
    ],
  },
  {
    name: "Tech Mahindra",
    data: [
      { year: 2020, revenue: 5.1, ebitda: 1.0, pat: 0.7 },
      { year: 2021, revenue: 5.4, ebitda: 1.1, pat: 0.8 },
      { year: 2022, revenue: 6.0, ebitda: 1.2, pat: 0.9 },
      { year: 2023, revenue: 6.5, ebitda: 1.3, pat: 1.0 },
      { year: 2024, revenue: 7.0, ebitda: 1.4, pat: 1.1 },
    ],
  },
];
