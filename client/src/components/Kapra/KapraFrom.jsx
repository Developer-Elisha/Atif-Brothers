import React, { useState, useEffect } from 'react';

const KapraForm = ({ setRecords, records, lastTagNumber, setLastTagNumber, editIndex, setEditIndex }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
  const [forms, setForms] = useState([{ description: "", amount: "", bill: "", date: formattedToday }]);

  useEffect(() => {
    if (editIndex !== null) {
      const recordToEdit = records[editIndex];
      setForms([recordToEdit]); // Load the record into the form
    } else {
      setForms([{ description: "", amount: "", bill: "", date: formattedToday }]); // Reset form
    }
  }, [editIndex, records]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { description: "", amount: "", bill: "", date: formattedToday }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (forms.some(form => !form.description || !form.amount || !form.bill)) {
      alert("Please fill in all fields!");
      return;
    }

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = forms[0]; // Update the record
      setRecords(updatedRecords);
      setEditIndex(null); // Reset edit index
    } else {
      setRecords([...records, ...forms]);
    }

    setForms([{ description: "", amount: "", bill: "", date: formattedToday }]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className='text-xl font-semibold text-center mb-6'>Kapra</h2>
      <div className="flex justify-end gap-4 mt-6">
        <button
          className='bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg'
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

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
            <label className='block text-gray-700 font-medium'>Bill No</label>
            <input
              type="number"
              name="bill"
              value={formData.bill}
              onChange={(e) => handleChange(index, e)}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter Bill No"
              required
            />
          </div>
          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(index, e)}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter Description"
              required
            />
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

          <button
            onClick={() => handleRemoveForm(index)}
            className="bg-red-500 text-white mt-6 px-5 py-2 h-12 rounded-lg cursor-pointer hover:bg-red-600 transition-all"
          >
            ✕
          </button>
        </div>
      ))}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}

export default KapraForm;