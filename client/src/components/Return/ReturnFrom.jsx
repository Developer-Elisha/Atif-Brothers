import React, { useState } from 'react';

const ReturnForm = ({ setRecords, records }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [forms, setForms] = useState([
    { date: formattedToday, cash: "", dasti: "", name: "dasti 1", amount: "", description: "dasti 1", previous: "50000", balance: "" }
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;

    if (name === 'amount' || name === 'previous') {
      const previousAmount = parseFloat(updatedForms[index].previous) || 0;
      const amount = parseFloat(updatedForms[index].amount) || 0;
      updatedForms[index].balance = (previousAmount - amount).toString();
    }

    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, { date: formattedToday, cash: "", dasti: "", name: "dasti 1", amount: "", description: "dasti 1", previous: "50000", balance: "" }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (forms.some(form => !form.date || !form.cash || !form.amount || !form.dasti || !form.name || !form.description)) {
      alert("Please fill in all fields!");
      return;
    }

    setRecords([...records, ...forms]);
    setForms([{ date: formattedToday, cash: "", dasti: "", name: "dasti 1", amount: "", description: "dasti 1", previous: "50000", balance: "" }]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className="text-xl font-semibold text-center mb-6">Dasti Return Form</h2>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className="bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

      {forms.map((formData, index) => (
  <div key={index}> {/* Add the key here */}
    <div className="flex gap-4 my-4 justify-center mt-20">
      <div className="w-1/5">
        <label className="block text-gray-700 font-medium">Date</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          disabled
          className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
        />
      </div>

      <div className="w-1/5">
        <label className="block text-gray-700 font-medium">Return Liya/Diya</label>
        <select
          name="dasti"
          value={formData.dasti}
          onChange={(e) => handleChange(index, e)}
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          required
        >
          <option value="" disabled>Select</option>
          <option value="Dasti Liya">Return Liya</option>
          <option value="Dasti Diya">Return Diya</option>
        </select>
      </div>

      <div className="w-1/5">
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
        <div className="w-1/5">
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

      <div className="w-1/5">
        <label className="block text-gray-700 font-medium">Name</label>
        <select
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(index, e)}
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          required
        >
          <option value="" disabled>Select</option>
          <option value="Name 1">Name 1</option>
          <option value="Name 2">Name 2</option>
        </select>
      </div>
    </div>

    <div className="flex gap-4 my-4 justify-center">
      <div className="w-1/5">
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

      <div className="w-1/5">
        <label className="block text-gray-700 font-medium">Previous Amount</label>
        <input
          type="number"
          name="previous"
          value={formData.previous}
          onChange={(e) => handleChange(index, e)}
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          placeholder="Enter Previous Amount"
          required
        />
      </div>

      <div className="w-1/5">
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

      <div className="w-1/5">
        <label className="block text-gray-700 font-medium">Balance</label>
        <input
          type="text"
          name="balance"
          value={formData.balance}
          readOnly
          className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          placeholder="Balance will be calculated"
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
  </div> // Here you should ensure you are wrapping the form inputs with a unique key
))}

    </div>
  );
};

export default ReturnForm;