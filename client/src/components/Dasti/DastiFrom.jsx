import React, { useEffect, useState } from 'react';

const DastiForm = ({ setRecords, records, editIndex, setEditIndex }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [forms, setForms] = useState([
    { date: formattedToday, cash: "", dasti: "", name: "", amount: "", description: "", bank: "" }
  ]);

  useEffect(() => {
    if (editIndex !== null) {
      const recordToEdit = records[editIndex];
      setForms([recordToEdit]);
    }
  }, [editIndex, records]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { date: formattedToday, cash: "", dasti: "", name: "", amount: "", description: "", bank: "" }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh

    if (forms.some(form => !form.date || !form.cash || !form.amount || !form.dasti || !form.name || !form.description)) {
      alert("Please fill in all fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = forms[0];
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setRecords([...records, ...forms]);
    }
    setForms([{ date: formattedToday, cash: "", dasti: "", name: "", amount: "", description: "", bank: "" }]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold text-center mb-6">Dasti Form</h2>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className="bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {forms.map((formData, index) => (
          <React.Fragment key={index}>
            <div className="flex justify-center gap-4 my-4">
              <div className="w-1/4">
                <label className="block text-gray-700 font-medium">Date</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  disabled
                  className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div className="w-1/4">
                <label className="block text-gray-700 font-medium">Dasti Liya/Diya</label>
                <select
                  name="dasti"
                  value={formData.dasti}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="Dasti Liya">Dasti Liya</option>
                  <option value="Dasti Diya">Dasti Diya</option>
                </select>
              </div>

              <div className="w-1/4">
                <label className="block text-gray-700 font-medium">Cash/Bank</label>
                <select
                  name="cash"
                  value={formData.cash}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="Cash">Cash</option>
                  <option value="Bank">Bank</option>
                </select>
              </div>

              {formData.cash === "Bank" && (
                <div className="w-1/4">
                  <label className="block text-gray-700 font-medium">Bank</label>
                  <select
                    name="bank"
                    value={formData.bank}
                    onChange={(e) => handleChange(index, e)}
                    className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                    required
                  >
                    <option value="" disabled>Select</option>
                    <option value="Meezan">Meezan</option>
                    <option value="UBL">UBL</option>
                    <option value="Faysal">Faysal</option>
                    <option value="Easypaisa">Easypaisa</option>
                    <option value="Jazzcash">Jazzcash</option>
                  </select>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center my-4">
              <div className="w-1/4">
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div className="w-1/4">
                <label className="block text-gray-700 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div className="w-1/4">
                <label className="block text-gray-700 font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Amount"
                  required
                />
              </div>

              {forms.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveForm(index)}
                  className="bg-red-500 text-white cursor-pointer mt-7 px-4 py-2 h-10 rounded-lg hover:bg-red-600 transition-all"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="mt-20"></div>
            <hr />
          </React.Fragment>
        ))}


        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all"
          >
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DastiForm;
