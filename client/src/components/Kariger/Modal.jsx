// Modal.js
const Modal = ({ title, isOpen, onClose, formData, handleChange, onSubmit, getSuitNumbers }) => {
  if (!isOpen) return null;

  const suitOptions = getSuitNumbers(formData.billNo); // Fetch suit numbers based on bill number

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-semibold mb-4">{title}</h2>

              <div className="flex space-x-2 mb-3">
                  <div className="flex-1">
                      <label className="block mb-2">Bill No:</label>
                      <input
                          type="text"
                          name="billNo"
                          value={formData.billNo}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                      />
                  </div>
                  <div className="flex-1">
                      <label className="block mb-2">Suit No:</label>
                      <select
                          name="suitNo"
                          value={formData.suitNo}
                          onChange={handleChange}
                          className="w-full p-2 border rounded"
                      >
                          <option value="">Select Suit No</option>
                          {suitOptions.map((suit, index) => (
                              <option key={index} value={suit}>{suit}</option>
                          ))}
                      </select>
                  </div>
              </div>

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
                  <button className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={onClose}>
                      Cancel
                  </button>
                  <button className="bg-purple-300 text-white px-4 py-2 rounded cursor-pointer" onClick={onSubmit}>
                      Save
                  </button>
              </div>
          </div>
      </div>
  );
};

export default Modal;