import React, { useState } from 'react'

const KapraForm = ({ setRecords, records }) => {
  const [forms, setForms] = useState([{ description: "Silk", amount: "500", bill: "500" }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { description: "Silk", amount: "500", bill: "500" }]);
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

    setRecords([...records, ...forms]); 
    setForms([{ description: "Silk", amount: "500", bill: "500" }]);
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
          Save
        </button>
      </div>
    </div>
  );
}

export default KapraForm;
