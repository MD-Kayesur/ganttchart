 





import React, { useEffect, useState } from "react";
import ImportButton from "./ImportButton";
import ExportButton from "./ExportButton";
interface CsvRow {
  [key: string]: string;
}

const ImportExportWrapper: React.FC = () => {
  const [csvData, setCsvData] = useState<CsvRow[]>([]);

  //  Load CSV data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("importedCsvData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCsvData(parsed);
        }
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  return (
    <div className="flex gap-4 p-4">
      <ImportButton onImport={setCsvData} />
      <ExportButton data={csvData} />
    </div>
  );
};

export default ImportExportWrapper;
