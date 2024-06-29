const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Success!</h2>
        <p className="mb-4 text-center">{message}</p>
        <div className="flex justify-center">
          <button
            className="bg-blue-gradient text-white px-4 py-2 rounded hover:bg-blue-600 items-center"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
