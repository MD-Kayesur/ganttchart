// components/ExportButton.tsx
import React from "react";
import { CiExport } from "react-icons/ci";
import { unparse } from "papaparse";
import Swal from "sweetalert2";

interface CsvRow {
  [key: string]: string;
}

interface ExportButtonProps {
  data: CsvRow[];
}

const ExportButton: React.FC<ExportButtonProps> = ({ data }) => {
  const handleExport = () => {
    if (data.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No data to export",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    const csv = unparse(data);
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "exported_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    Swal.fire({
      toast: true,
      icon: "success",
      title: "CSV exported successfully",
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  return (
    <button
      className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      onClick={handleExport}
      disabled={data.length === 0}
    >
      <CiExport className="w-5 h-5 mr-2" />
      Export CSV
    </button>
  );
};

export default ExportButton;
