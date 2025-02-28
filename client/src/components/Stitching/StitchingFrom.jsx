import React, { useState } from 'react';

const StitchingForm = ({ setRecords, records }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [forms, setForms] = useState([{ date: formattedToday, bill: "50", amount: "500", description: "Black Shirt" }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { date: formattedToday, bill: "50", amount: "", description: "Black Shirt" }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (forms.some(form => !form.date || !form.bill || !form.amount || !form.description)) {
      alert("Please fill in all fields!");
      return;
    }

    setRecords([...records, ...forms]);
    setForms([{ date: formattedToday, bill: "50", amount: "500", description: "Black Shirt" }]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold text-center mb-6">Stitching Form</h2>

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
              <label className="block text-gray-700 font-medium">Bill No</label>
              <input
                type="number"
                name="bill"  // ✅ FIXED (was "Bill")
                value={formData.bill}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Bill"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Description</label>
              <input
                type="text"
                name="description"  // ✅ FIXED (was "Description")
                value={formData.description}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Description"
                required
              />
            </div>

            <div className="w-1/2">
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

            <button
              type="button"
              onClick={() => handleRemoveForm(index)}
              className="bg-red-500 text-white mt-6 px-5 py-2 h-12 rounded-lg cursor-pointer hover:bg-red-600 transition-all"
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
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StitchingForm;
