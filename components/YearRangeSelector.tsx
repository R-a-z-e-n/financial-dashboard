import React from 'react';
import { YearRange } from '../types';

interface YearRangeSelectorProps {
  title: string;
  availableYears: number[];
  selectedRange: YearRange;
  onRangeChange: (newRange: YearRange) => void;
}

const YearRangeSelector: React.FC<YearRangeSelectorProps> = ({
  title,
  availableYears,
  selectedRange,
  onRangeChange,
}) => {
  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const startYear = e.target.value ? parseInt(e.target.value, 10) : null;
    onRangeChange({ ...selectedRange, start: startYear });
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const endYear = e.target.value ? parseInt(e.target.value, 10) : null;
    onRangeChange({ ...selectedRange, end: endYear });
  };

  const startYearOptions = availableYears.filter(year => 
    selectedRange.end === null || year <= selectedRange.end
  );
  
  const endYearOptions = availableYears.filter(year => 
    selectedRange.start === null || year >= selectedRange.start
  );

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">{title}</h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="start-year" className="block text-sm font-medium text-gray-400 mb-1">
            Start Year
          </label>
          <select
            id="start-year"
            value={selectedRange.start ?? ''}
            onChange={handleStartChange}
            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Select start year"
          >
            <option value="">All</option>
            {startYearOptions.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="end-year" className="block text-sm font-medium text-gray-400 mb-1">
            End Year
          </label>
          <select
            id="end-year"
            value={selectedRange.end ?? ''}
            onChange={handleEndChange}
            className="w-full bg-gray-700 text-gray-200 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-label="Select end year"
          >
            <option value="">All</option>
            {endYearOptions.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default YearRangeSelector;
