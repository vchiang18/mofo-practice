import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
// import { usePractices } from "../context/PracticeContext.js";
import { useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import DeleteDialog from "./DeleteDialog.js";
import { generateFileName, makeLabels } from "../utils.js";
import { useAuth } from "../context/AuthContext.js";
import Popup from "./Popup.js";
import { useDispatch, useSelector } from "react-redux";
import { clearSelections } from "../redux/slices/selections.js";
import { clearAll } from "../redux/slices/savedPlays.js";


function convertToCSV(practices, columnOrder) {
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

const uploadToGoogleDrive = async (token, csvContent) => {
  gapi.client.setToken({ access_token: token });
  const fileName = generateFileName();

  const fileMetadata = {
    name: fileName,
    mimeType: "text/csv",
  };

  const form = new FormData();
  form.append(
    "metadata",
    new Blob([JSON.stringify(fileMetadata)], { type: "application/json" })
  );
  form.append("file", new Blob([csvContent], { type: "text/csv" }));

  try {
    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&convert",
      {
        method: "POST",
        headers: new Headers({ Authorization: "Bearer " + token }),
        body: form,
      }
    );
    if (!response.ok) {
      throw new Error(`Error uploading file: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("File uploaded successfully: ", data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

const SettingsDrawer = () => {
  // const { fetchPracticesForExport } = usePractices();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch()
  const plays = useSelector((state) => state.plays.plays)
  const {fields, headers} = useSelector((state) => state.fields)

  const labels = ["id"].concat(makeLabels(fields, headers).map((x) => x.accessor))


  // const columnOrder = [
  //   "id",
  //   "practiceNo",
  //   "practiceDate",
  //   "period",
  //   "practiceType",
  //   "situation",
  //   "rep",
  //   "offensivePersonnel",
  //   "formation",
  //   "formationVariation",
  //   "backfield",
  //   "motion",
  //   "FIB",
  //   "formationFamily",
  //   "unbalanced",
  // ];

  const handleDownloadCSV = async () => {
    const csvContent = await convertToCSV(plays, labels);
    const download = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(download);
    const fileName = generateFileName();
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(URL.createObjectURL(download));
  };

  const handleUploadToGDrive = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const csvContent = await convertToCSV(
          plays,
          labels
        );
        await uploadToGoogleDrive(tokenResponse.access_token, csvContent);
        setShowPopup(true);
      } catch (error) {
        console.error("Upload failed: ", error);
      }
    },
    onError: (errorResponse) => console.error("Login Failed:", errorResponse),
    scope: "https://www.googleapis.com/auth/drive.file",
  });

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleClearClick = (id) => {
    handleDialog("Are you sure you want to clear practices?", true);
  };

  const handleDialogConfirmation = (answer) => {
    if (answer) {
      console.log("Clear practices confirmed");
      dispatch(clearSelections())
      dispatch(clearAll())
      handleDialog("", false);
    } else {
      console.log("Cancel clear practices");
      handleDialog("", false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
            <button onClick={handleSettings}>Settings</button>
          </li>
          <li>
            <button onClick={handleClearClick}>Clear Data</button>
          </li>
          <li>
            <button onClick={handleDownloadCSV}>Export to CSV</button>
          </li>
          <li>
            <button onClick={handleUploadToGDrive}>Export to GDrive</button>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
        {dialog.isLoading && (
          <DeleteDialog
            onDialog={handleDialogConfirmation}
            message={dialog.message}
          />
        )}
        {showPopup && (
          <Popup
            message="CSV uploaded to GDrive"
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsDrawer;
