import React, { useState } from 'react';

const DealerKapraForm = ({ setRecords, records }) => {
  const [forms, setForms] = useState([
    { name: "", description: "Silk", descriptionAmount: "500", payment: "", previousPayment: "", total: "500" }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;
    
    if (name === "descriptionAmount" || name === "previousPayment") {
      const descriptionAmount = parseFloat(updatedForms[index].descriptionAmount) || 0;
      const previousPayment = parseFloat(updatedForms[index].previousPayment) || 0;
      updatedForms[index].total = descriptionAmount + previousPayment;
    }
    
    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { name: "", description: "Silk", descriptionAmount: "500", payment: "", previousPayment: "", total: "500" }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (forms.some(form => !form.name || !form.description || !form.descriptionAmount || !form.payment || !form.previousPayment)) { 
      alert("Please fill in all fields!");
      return;
    }
    setRecords([...records, ...forms]);
    setForms([{ name: "", description: "Silk", descriptionAmount: "500", payment: "", previousPayment: "", total: "500" }]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className='text-xl font-semibold text-center mb-6'>Kapra Dealer</h2>

      <div className="flex items-center justify-between w-full mb-5">
        <div className="w-1/3 mx-auto">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={forms[0].name}
            onChange={(e) => handleChange(0, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter Name"
            required
          />
        </div>

        <button
          className="bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

      {forms.map((formData, index) => (
        <div key={index} className="flex gap-4 my-4">
          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Description</label>
            <input type="text" name="description" value={formData.description} onChange={(e) => handleChange(index, e)} placeholder="Enter Description" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>
          
          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Description Amount</label>
            <input type="number" name="descriptionAmount" value={formData.descriptionAmount} onChange={(e) => handleChange(index, e)} placeholder="Enter Amount" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>
          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Payment</label>
            <input type="number" name="payment" value={formData.payment} onChange={(e) => handleChange(index, e)} placeholder="Enter Payment" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>
          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Previous Payment</label>
            <input type="number" name="previousPayment" value={formData.previousPayment} onChange={(e) => handleChange(index, e)} placeholder="Enter Previous Payment" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>
          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Total</label>
            <input type="number" name="total" value={formData.total} readOnly className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 bg-gray-200" />
          </div>
          <button onClick={() => handleRemoveForm(index)} className="bg-red-500 cursor-pointer text-white px-5 py-2 mt-5 h-12 rounded-lg hover:bg-red-600 transition-all">✕</button>
        </div>
      ))}

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleSubmit} className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all">Save</button>
      </div>
    </div>
  );
};

export default DealerKapraForm;
