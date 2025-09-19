// components/FieldDataInput.tsx

import React, { useRef } from 'react';
import Papa from 'papaparse';

interface FieldDataInputProps {
  fieldOptions: string[];
  onDataImported: (data: any[]) => void;
}

const FieldDataInput: React.FC<FieldDataInputProps> = ({ fieldOptions, onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFieldClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data);
        onDataImported(result.data); // pass to parent
      },
      error: (err) => {
        console.error("CSV parsing error:", err);
      }
    });

    e.target.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Input all field Data:
      </label>
      <select
        defaultValue={fieldOptions[0]}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {fieldOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <div className="mt-2 space-y-2">
        {fieldOptions.slice(1).map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
            readOnly
            onClick={handleFieldClick}
          />
        ))}
      </div>

      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FieldDataInput;
