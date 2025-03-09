import React from 'react';

const InputField = ({ label, name, value, onChange, placeholder, type = "text", disabled = false }) => (
  <div className="w-1/5">
    <label className="block text-gray-700 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
      placeholder={placeholder}
    />
  </div>
);

const MainForm = ({ formData, index, handleChange, handleRemoveForm, bankAccounts = [] }) => {
  const balanceAmount = 5000; // Static for now, can be dynamic

  const handleAmountChange = (e) => {
    const newAmount = Number(e.target.value) || 0;
    const totalBalance = balanceAmount - newAmount;
    handleChange(index, { target: { name: 'amount', value: newAmount } });
    handleChange(index, { target: { name: 'totalBalance', value: totalBalance } });
  };

  return (
    <div key={index}>
      {/* Top Section: Date, Dropdown, and Balance */}
      <div className="flex gap-4 justify-center my-4 mt-20">
        <InputField label="Date" name="date" value={formData.date} disabled />
        <div className="w-1/5">
          <label className="block text-gray-700 font-medium">Payment / Data Entry / Receiving</label>
          <select
            name="dropdown"
            value={formData.dropdown}
            onChange={(e) => handleChange(index, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            required
          >
            <option value="" disabled>Select</option>
            <option value="Data Entry">Data Entry</option>
            <option value="Payment">Payment</option>
            <option value="Receiving">Receiving</option>
          </select>
        </div>
        <InputField label="Balance Amount" name="dues" value={balanceAmount} disabled type="number" />
      </div>

      {/* Payment Section */}
      {formData.dropdown === "Payment" && (
        <div className="flex gap-4 my-4 justify-center">
          <div className="w-1/5">
            <label className="block text-gray-700 font-medium">Payment</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={(e) => handleChange(index, e)}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              required
            >
              <option value="" disabled>Select</option>
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
            </select>
          </div>

          {formData.payment === "Bank" && (
            <div className="w-1/5">
              <label className="block text-gray-700 font-medium">Select Bank</label>
              <select
                name="bank"
                value={formData.bank}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select Bank</option>
                {bankAccounts.map((bank, i) => (
                  <option key={i} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
          )}

          <InputField label="Pay By" name="payby" value={formData.payby} onChange={(e) => handleChange(index, e)} placeholder="Enter Pay By" />
          <InputField label="Amount" name="amount" value={formData.amount} onChange={handleAmountChange} type="number" />
          <InputField label="Total Balance" name="totalBalance" value={formData.totalBalance} disabled type="number" />
        </div>
      )}

      {/* Receiving & Data Entry Section (Reused Fields) */}
      {["Receiving", "Data Entry"].includes(formData.dropdown) && (
        <>
          <div className="flex gap-4 my-4 justify-center">
            <InputField label="Quantity" name="quantity" value={formData.quantity} onChange={(e) => handleChange(index, e)} type="number" />
            <InputField label="Bill No" name="bill" value={formData.bill} onChange={(e) => handleChange(index, e)} placeholder="Enter Bill No" />
            <InputField label="Tag No" name="tag" value={formData.tag} onChange={(e) => handleChange(index, e)} placeholder="Enter Tag No" />
            <InputField label="Item" name="items" value={formData.items} onChange={(e) => handleChange(index, e)} placeholder="Enter Item" />
          </div>

          <div className="flex gap-4 my-4 justify-center">
            <InputField label="Color" name="color" value={formData.color} onChange={(e) => handleChange(index, e)} placeholder="Enter Color" />
            <InputField label="Fabric" name="fabric" value={formData.fabric} onChange={(e) => handleChange(index, e)} required />
            <InputField label="Description" name="description" value={formData.description} onChange={(e) => handleChange(index, e)} placeholder="Enter Description" />
            <InputField label="Design" name="design" value={formData.design} onChange={(e) => handleChange(index, e)} placeholder="Enter Design" />
          </div>

          {formData.dropdown === "Receiving" && (
            <div className="flex gap-4 my-4 justify-center">
              <InputField label="Rate" name="receivingRate" value={formData.receivingRate} onChange={(e) => handleChange(index, e)} placeholder="Enter Rate" />
            </div>
          )}
        </>
      )}

      {/* Remove Button */}
      <div className="flex justify-end">
        <button
          onClick={() => handleRemoveForm(index)}
          className="bg-red-500 mb-5 text-white px-3 cursor-pointer py-1 rounded-lg hover:bg-red-600 transition-all"
        >
          ✕
        </button>
      </div>

      <hr />
    </div>
  );
};

export default MainForm;
