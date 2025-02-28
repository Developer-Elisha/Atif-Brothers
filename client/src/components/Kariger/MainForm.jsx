import React from 'react';

const MainForm = ({ formData, index, handleChange, handleRemoveForm, bankAccounts }) => {
  return (
    <>
      <div key={index}>
        <div className="flex gap-4 my-4 mt-20">
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
            <label className="block text-gray-700 font-medium">Payment / Data Entry</label>
            <select
              name="dropdown"
              value={formData.dropdown}
              onChange={(e) => handleChange(index, e)}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              required
            >
              <option value="Data Entry">Data Entry</option>
              <option value="Payment">Payment</option>
            </select>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Due Amount</label>
            <input
              disabled
              type="number"
              name="dues"
              value="5000"
              onChange={handleChange}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            />
          </div>
        </div>

        {formData.dropdown === "Payment" ? (
          <div className="flex gap-4 my-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount || ""}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Total Balance</label>
              <input
                type="number"
                name="totalBalance"
                value={formData.totalBalance || ""}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Shop/Order</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="Shop">Shop</option>
                  <option value="Order">Order</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Tag No</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  disabled
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 bg-gray-200 text-gray-600"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Suit No</label>
                <input
                  type="text"
                  name="suit"
                  value={formData.suit}
                  disabled
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 bg-gray-200 text-gray-600"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Bill No</label>
                <input
                  type="text"
                  name="bill"
                  value={formData.bill}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Bill No"
                  required
                  disabled={formData.role === "Shop"} />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Item</label>
                <input
                  type="text"
                  name="items"
                  value={formData.items}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Item"
                />
              </div>
            </div>

            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Color"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Fabric</label>
                <input
                  name="fabric"
                  type="text"
                  value={formData.fabric}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Description"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Design</label>
                <input
                  type="text"
                  name="design"
                  value={formData.design}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Design"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Rate</label>
                <input
                  type="text"
                  name="rate"
                  value={formData.rate}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Rate"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Amount</label>
                <input
                  type="text"
                  disabled
                  name="amount"
                  value={formData.amount}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-600"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-4 my-4 mt-20">
          <div className="w-1/2">
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
            <div className="w-1/2">
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
                  <option key={i} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

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