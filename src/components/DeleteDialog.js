import React from "react";

function DeleteDialog({ message, onDialog }) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={() => onDialog(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 rounded-lg flex flex-col items-center"
      >
        <h3 className="text-gray-900 text-lg mb-4">{message}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onDialog(true)}
            className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Yes
          </button>
          <button
            onClick={() => onDialog(false)}
            className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
