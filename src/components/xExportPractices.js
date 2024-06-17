import React from "react";
import { usePractices } from "../context/PracticeContext";

async function convertToCSV(fetchPracticesForExport, columnOrder) {
  const practices = await fetchPracticesForExport();
  if (practices.length === 0) return "";

  const headers = columnOrder;
  const csvRows = [
    headers.join(","),
    ...practices.map((row) =>
      headers.map((header) => row[header] || "").join(",")
    ),
  ];
  return csvRows.join("\n");
}

const ExportPractices = () => {
  const { fetchPracticesForExport } = usePractices();
  const columnOrder = [
    "id",
    "practiceNo",
    "practiceDate",
    "period",
    "practiceType",
    "situation",
    "rep",
    "offensivePersonnel",
    "formation",
    "formationVariation",
    "backfield",
    "motion",
    "FIB",
    "formationFamily",
    "unbalanced",
  ];

  const handleDownloadCSV = async () => {
    const csvContent = await convertToCSV(fetchPracticesForExport, columnOrder);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "practices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap items-center justify-center h-screen">
      <div className="flex flex-wrap items-center">
        <button
          className="bg-blue-gradient text-white py-2 px-4 rounded mx-2 hover:bg-gold-gradient hover:text-black"
          onClick={handleDownloadCSV}
        >
          Download CSV
        </button>
      </div>
    </div>
  );
};

export default ExportPractices;
