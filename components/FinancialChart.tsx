import React, { memo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import { ChartData, Metric } from '../types';

interface FinancialChartProps {
  data: ChartData[];
  metric: Metric | null;
  companies: string[];
  onExport: () => void;
  onExportJSON: () => void;
}

const COLORS = ['#2DD4BF', '#38BDF8', '#A78BFA', '#F472B6', '#FB923C'];

const FinancialChart: React.FC<FinancialChartProps> = ({ data, metric, companies, onExport, onExportJSON }) => {
  const isExportDisabled = !companies.length || !metric || !data.length;

  if (!companies.length || !metric) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-lg">Please select one or more companies and a metric to view the chart.</p>
      </div>
    );
  }

  if (companies.length > 0 && metric && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-800 rounded-lg">
        <p className="text-gray-400 text-lg text-center p-4">No data available for the selected filters. <br/> Please adjust the year range or your selections.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-800 p-6 rounded-lg shadow-2xl relative">
       <div className="absolute top-4 right-6 z-10 flex space-x-2">
        <button
          onClick={onExport}
          disabled={isExportDisabled}
          className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
          aria-label="Export data to CSV"
          title="Export chart data to CSV"
        >
          Export CSV
        </button>
        <button
          onClick={onExportJSON}
          disabled={isExportDisabled}
          className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
          aria-label="Export data to JSON"
          title="Export chart data to JSON"
        >
          Export JSON
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 60, // Increased top margin for the export buttons
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey="year" stroke="#A0AEC0" />
          <YAxis stroke="#A0AEC0" unit="B" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A202C',
              border: '1px solid #4A5568',
              color: '#E2E8F0'
            }}
            labelStyle={{ color: '#CBD5E0' }}
            formatter={(value: number, name: string) => [`$${value}B`, `${name} (${metric})`]}
          />
          <Legend wrapperStyle={{ color: '#E2E8F0' }} />
          {companies.map((company, index) => (
            <Bar 
              key={company}
              dataKey={company}
              name={company}
              fill={COLORS[index % COLORS.length]} 
            >
              <LabelList 
                dataKey={company} 
                position="top" 
                style={{ fill: '#CBD5E0', fontSize: 12 }}
                formatter={(value: number) => (value > 0 ? value.toFixed(1) : '')}
              />
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default memo(FinancialChart);