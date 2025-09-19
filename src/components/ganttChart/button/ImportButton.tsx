// components/ImportButton.tsx
import React, { useRef } from "react";
import { CiImport } from "react-icons/ci";
import { parse } from "papaparse";
  import Swal from 'sweetalert2';
interface CsvRow {
  [key: string]: string;
}

interface ImportButtonProps {
  onDataImported: (data: CsvRow[]) => void;
}

const ImportButton: React.FC<ImportButtonProps> = ({ onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
console.log(onDataImported);
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

 

const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        localStorage.setItem("importedCsvData", JSON.stringify(result.data));
        event.target.value = "";

        //  Show SweetAlert2 Toast
        Swal.fire({
          toast: true,
          icon: "success",
          title: "CSV imported successfully",
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title: "Import failed",
          text: err.message || "Unknown error occurred",
        });
      },
    });
  }
};

 

  return (
    <>
      <button
        className="flex items-center px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
        onClick={triggerFileInput}
      >
        <CiImport className="w-5 h-5 mr-2" />
        Import CSV
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleImport}
      />
    </>
  );
};

export default ImportButton;

 