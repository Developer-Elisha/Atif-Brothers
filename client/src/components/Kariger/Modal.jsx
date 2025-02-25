const Modal = ({ title, isOpen, onClose, formData, handleChange, onSubmit }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
  
          <label className="block mb-2">Bill No:</label>
          <input
            type="text"
            name="billNo"
            value={formData.billNo}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
  
          <label className="block mb-2">Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
  
          <label className="block mb-2">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-3"
          />
  
          <div className="flex justify-end space-x-3">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button className="bg-purple-300 text-white px-4 py-2 rounded" onClick={onSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Modal