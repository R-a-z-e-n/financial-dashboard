import React, { useState, useMemo } from 'react';
import { Metric, ChartData, YearRange } from './types';
import { COMPANIES, METRICS, FINANCIAL_DATA } from './data/financialData';
import FinancialChart from './components/FinancialChart';
import SelectorGroup from './components/SelectorGroup';
import YearRangeSelector from './components/YearRangeSelector';

function App() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);
  const [yearRange, setYearRange] = useState<YearRange>({ start: null, end: null });

  const availableYears = useMemo(() => 
    FINANCIAL_DATA.length > 0 
      ? [...new Set(FINANCIAL_DATA.flatMap(c => c.data.map(d => d.year)))].sort()
      : [], 
  []);

  const handleCompanySelect = (company: string) => {
    setSelectedCompanies(prevSelected =>
      prevSelected.includes(company)
        ? prevSelected.filter(c => c !== company)
        : [...prevSelected, company]
    );
  };

  const chartData = useMemo<ChartData[]>(() => {
    if (selectedCompanies.length === 0 || !selectedMetric) {
      return [];
    }

    const metricKey = selectedMetric.toLowerCase() as keyof Omit<typeof FINANCIAL_DATA[0]['data'][0], 'year'>;
    
    const filteredYears = availableYears.filter(year => {
      const startMatch = yearRange.start === null || year >= yearRange.start;
      const endMatch = yearRange.end === null || year <= yearRange.end;
      return startMatch && endMatch;
    }).map(String);

    return filteredYears.map(year => {
      const dataPoint: ChartData = { year };
      selectedCompanies.forEach(companyName => {
        const companyData = FINANCIAL_DATA.find(c => c.name === companyName);
        const yearData = companyData?.data.find(d => String(d.year) === year);
        dataPoint[companyName] = yearData ? yearData[metricKey] : 0;
      });
      return dataPoint;
    });

  }, [selectedCompanies, selectedMetric, yearRange, availableYears]);

  const handleExportCSV = () => {
    if (chartData.length === 0 || !selectedMetric || selectedCompanies.length === 0) return;

    const headers = ['Year', ...selectedCompanies];
    const rows = chartData.map(dataPoint =>
      [
        dataPoint.year,
        ...selectedCompanies.map(company => dataPoint[company] ?? ''),
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);

    const startYear = yearRange.start ?? availableYears[0];
    const endYear = yearRange.end ?? availableYears[availableYears.length - 1];
    link.setAttribute(
      'download',
      `financial_data_${selectedMetric}_${startYear}-${endYear}.csv`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (chartData.length === 0 || !selectedMetric || selectedCompanies.length === 0) return;

    const jsonContent = JSON.stringify(chartData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);

    const startYear = yearRange.start ?? availableYears[0];
    const endYear = yearRange.end ?? availableYears[availableYears.length - 1];
    link.setAttribute(
      'download',
      `financial_data_${selectedMetric}_${startYear}-${endYear}.json`
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
      <main className="container mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-500">
            Corporate Financial Dashboard
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Visualize financial performance of leading tech companies.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1 bg-gray-800/50 p-6 rounded-lg shadow-lg">
            <SelectorGroup
              title="Select Companies"
              options={COMPANIES}
              selectedOption={selectedCompanies}
              onSelect={handleCompanySelect}
              multiSelect
            />
            <SelectorGroup
              title="Select Metric"
              options={METRICS}
              selectedOption={selectedMetric}
              onSelect={setSelectedMetric}
            />
            <YearRangeSelector
              title="Select Year Range"
              availableYears={availableYears}
              selectedRange={yearRange}
              onRangeChange={setYearRange}
            />
          </aside>

          <section className="lg:col-span-3 min-h-[500px]">
            <FinancialChart 
              data={chartData} 
              metric={selectedMetric} 
              companies={selectedCompanies}
              onExport={handleExportCSV}
              onExportJSON={handleExportJSON}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;