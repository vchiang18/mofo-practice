import React, { useState } from "react";
import { usePractices } from "../context/PracticeContext";
import * as XLSX from "xlsx";

async function convertToCSV(fetchPracticesForExport) {
  const practices = await fetchPracticesForExport();
  if (practices.length === 0) return "";
  const headers = Object.keys(practices[0]);
  const csvRows = [
    headers.join(","),
    ...practices.map((row) => headers.map((header) => row[header]).join(",")),
  ];
  return csvRows.join("\n");
}

async function convertToExcel(fetchPracticesForExport) {
  const practices = await fetchPracticesForExport();
  if (practices.length === 0) return null;
  const worksheet = XLSX.utils.json_to_sheet(practices);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Practices");
  return XLSX.write(workbook, { bookType: "xlsx", type: "array" });
}

const ExportPractices = () => {
  const { fetchPracticesForExport } = usePractices();

  const handleDownloadCSV = async () => {
    const csvContent = await convertToCSV(fetchPracticesForExport);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "practices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadExcel = async () => {
    const excelBuffer = await convertToExcel(fetchPracticesForExport);
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "practices.xlsx");
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
        <button
          className="bg-blue-gradient text-white py-2 px-4 rounded mx-2 hover:bg-gold-gradient hover:text-black"
          onClick={handleDownloadExcel}
        >
          Download Excel
        </button>
      </div>
    </div>
  );
};

export default ExportPractices;
