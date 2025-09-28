import React from 'react';

interface SelectorGroupProps<T extends string> {
  title: string;
  options: T[];
  selectedOption: T | T[] | null;
  onSelect: (option: T) => void;
  multiSelect?: boolean;
}

const SelectorGroup = <T extends string,>({
  title,
  options,
  selectedOption,
  onSelect,
  multiSelect = false,
}: SelectorGroupProps<T>): React.ReactElement => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">{title}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((option) => {
          const isSelected = multiSelect
            ? Array.isArray(selectedOption) && selectedOption.includes(option)
            : selectedOption === option;
            
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full text-left px-4 py-2 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isSelected
                  ? 'bg-cyan-500 text-white font-bold shadow-lg'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SelectorGroup;