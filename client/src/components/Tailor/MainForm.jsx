import React, { useEffect } from 'react';

const MainForm = ({ formData, index, handleChange, handleRemoveForm, bankAccounts = [] }) => {
  // Assuming balance amount is a constant for now, you can replace it with a prop or state if needed
  const balanceAmount = 5000; // This can be dynamic based on your application logic

  // Effect to calculate total balance
  useEffect(() => {
    if (formData.amount) {
      const totalBalance = balanceAmount - formData.amount;
      handleChange(index, { target: { name: 'totalBalance', value: totalBalance } });
    } else {
      handleChange(index, { target: { name: 'totalBalance', value: balanceAmount } });
    }
  }, [formData.amount, balanceAmount, index, handleChange]);

  return (
    <>
      <div key={index}>
        <div className="flex gap-4 justify-center my-4 mt-20">
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

          <div className="w-1/5">
            <label className="block text-gray-700 font-medium">Balance Amount</label>
            <input
              disabled
              type="number"
              name="dues"
              value={balanceAmount} // Use the dynamic balance amount
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        {formData.dropdown === "Payment" ? (
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
                  <option value="Meezan">Meezan</option>
                  <option value="UBL">UBL</option>
                  <option value="Faisal">Faisal</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="JazzCash">JazzCash</option>
                </select>
              </div>
            )}

            <div className="w-1/5">
              <label className="block text-gray-700 font-medium">Pay By</label>
              <input
                type="text"
                name="payby"
                value={formData.payby || ""}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Pay By"
                required
              />
            </div>

            <div className="w-1/5">
              <label className="block text-gray-700 font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount || ""}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/5">
              <label className="block text-gray-700 font-medium">Total Balance</label>
              <input
                type="number"
                name="totalBalance"
                value={formData.totalBalance || ""}
                readOnly
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
          </div>
        ) : formData.dropdown === "Receiving" ? (
          <>
            <div className="flex gap-4 my-4 justify-center">
              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Bill No</label>
                <input
                  type="text"
                  name="bill"
                  value={formData.bill || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Bill No"
                  required
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Tag No</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Tag No"
                  required
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Item</label>
                <input
                  type="text"
                  name="items"
                  value={formData.items || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Item"
                />
              </div>
            </div>
            
            <div className="flex gap-4 my-4 justify-center">
              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Color"
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Fabric</label>
                <input
                  name="fabric"
                  type="text"
                  value={formData.fabric || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Description"
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Design</label>
                <input
                  type="text"
                  name="design"
                  value={formData.design || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Design"
                />
              </div>
            </div>
            <div className="flex gap-4 my-4 justify-center">
              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Rate</label>
                <input
                  type="text"
                  name="receivingRate"
                  value={formData.receivingRate || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Rate"
                  required
                />
              </div>
            </div>
          </>
        ) : (
          <div>
            {/* Data Entry Fields */}
            <div className="flex gap-4 my-4 justify-center">
              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Bill No</label>
                <input
                  type="text"
                  name="bill"
                  value={formData.bill || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Bill No"
                  required
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Tag No</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Tag No"
                  required
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Item</label>
                <input
                  type="text"
                  name="items"
                  value={formData.items || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Item"
                />
              </div>
            </div>

            <div className="flex gap-4 my-4 justify-center">
              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Color"
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Fabric</label>
                <input
                  name="fabric"
                  type="text"
                  value={formData.fabric || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Description"
                />
              </div>

              <div className="w-1/5">
                <label className="block text-gray-700 font-medium">Design</label>
                <input
                  type="text"
                  name="design"
                  value={formData.design || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Design"
                />
              </div>
            </div>
          </div>
        )}

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
    </>
  );
};

export default MainForm;