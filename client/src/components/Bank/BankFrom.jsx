import React, { useState, useEffect } from 'react';

const BankForm = ({ setRecords, records, editIndex, setEditIndex }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [forms, setForms] = useState([
    { date: formattedToday, credit: "", amount: "", bank: "", current: "10000" }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;

    let amount = parseFloat(updatedForms[index].amount) || 0;
    let initialBalance = parseFloat(updatedForms[index].current) || 10000; // Default balance

    if (updatedForms[index].credit === "Credit") {
      updatedForms[index].current = (initialBalance + amount).toString();
    } else if (updatedForms[index].credit === "Debit") {
      updatedForms[index].current = (initialBalance - amount).toString();
    }

    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { date: formattedToday, credit: "", amount: "", bank: "", current: "10000" }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents form refresh

    if (forms.some(form => !form.date || !form.credit || !form.amount || !form.bank)) {
      alert("Please fill in all fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = forms[0]; // Update the record at editIndex
      setRecords(updatedRecords);
      setEditIndex(null); // Reset edit index
    } else {
      setRecords([...records, ...forms]);
    }

    setForms([{ date: formattedToday, credit: "", amount: "", bank: "", current: "10000" }]);
  };

  // Populate form with existing data if editing
  useEffect(() => {
    if (editIndex !== null) {
      setForms([records[editIndex]]);
    }
  }, [editIndex, records]);

  return (
    <div className="p-6 w-full">
      <h2 className='text-xl font-semibold text-center mb-6'>Bank Form</h2>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className='bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg'
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {forms.map((formData, index) => (
          <div key={index} className="flex gap-4 my-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                disabled
                className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/2">
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

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Credit/Debit</label>
              <select
                name="credit"
                value={formData.credit}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className='block text-gray-700 font-medium'>Amount</label>
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

            {formData.bank && (
              <div className="w-1/2">
                <label className='block text-gray-700 font-medium'>Current Balance</label>
                <input
                  type="text"
                  name="current"
                  value={formData.current}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  disabled
                  required
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => handleRemoveForm(index)}
              className="bg-red-500 text-white cursor-pointer mt-6 px-5 py-2 h-12 rounded-lg hover:bg-red-600 transition-all"
            >
              ✕
            </button>
          </div>
        ))}

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="submit"
            className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all"
          >
            {editIndex !== null ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BankForm;