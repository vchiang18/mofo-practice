import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { usePractices } from "../context/PracticeContext";
import DeleteDialog from "./DeleteDialog";

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

const SettingsDrawer = () => {
  const { fetchPracticesForExport } = usePractices();
  const navigate = useNavigate();
  const { clearPractices } = usePractices();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

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

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleSettings = () => {
    navigate("/customize-values");
  };

  // const handleExport = () => {
  //   navigate("/export-practices");
  // };

  const handleClearClick = (id) => {
    handleDialog("Are you sure you want to clear practices?", true);
  };

  const handleDialogConfirmation = (answer) => {
    if (answer) {
      console.log("Clear practices confirmed");
      // clearPractices();
      handleDialog("", false);
    } else {
      console.log("Cancel clear practices");
      handleDialog("", false);
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer"
          className="btn bg-calBlue text-white drawer-button border-none"
        >
          <Bars3Icon className="h-6 w-6" />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <a onClick={handleSettings}>Settings</a>
          </li>
          <li>
            <a onClick={handleClearClick}>Clear Practices</a>
          </li>
          <li>
            <a onClick={handleDownloadCSV}>Export Practices CSV</a>
          </li>
          <li>
            <a onClick={handleDownloadCSV}>Export Practices to GDrive</a>
          </li>
        </ul>
        {dialog.isLoading && (
          <DeleteDialog
            onDialog={handleDialogConfirmation}
            message={dialog.message}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsDrawer;
