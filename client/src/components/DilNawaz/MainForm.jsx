import React, { useState } from 'react';
import { XCircle } from "lucide-react";

const MainForm = ({ formData, index, handleChange, handleRemoveForm = [] }) => {

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleCancel = () => {
    setFile(null);
    document.getElementById("fileInput").value = "";
  };

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

          <div className="w-1/5">
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
          <div className="flex gap-4 my-4 justify-center">

            <div className="w-1/4">
              <label className="block text-gray-700 font-medium">Pay By</label>
              <input
                type="text"
                name="payby"
                value={formData.payby}
                onChange={(e) => { handleChange(index, e) }}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Pay By"
                required
              />
            </div>

            <div className="w-1/4">
              <label className="block text-gray-700 font-medium">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount || ""}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/4">
              <label className="block text-gray-700 font-medium">Total Balance</label>
              <input
                type="number"
                name="totalBalance"
                value={formData.totalBalance || ""}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/4">
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
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            {formData.payment === "Bank" && (
              <div className="w-1/4">
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
                  <option value="Faysal">Faysal</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="JazzCash">JazzCash</option>
                </select>
              </div>
            )}
            {formData.payment === "Cheque" && (
              <>
                <div className="w-1/4">
                  <label className="block text-gray-700 font-medium">Cheque No</label>
                  <input
                    type="text"
                    name="cheque"
                    value={formData.chequeimg}
                    onChange={(e) => handleChange(index, e)}
                    className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                    placeholder="Enter Cheque No"
                    required
                  />
                </div>

                <div className="w-1/4">
                  {file && (
                    <div className="mt-2 relative">
                      <p className="text-sm text-gray-600">Preview:</p>
                      <img
                        src={file}
                        alt="Selected file preview"
                        className="mt-2 w-full h-auto rounded-lg"
                      />
                      {/* Cancel Button */}
                      <button
                        onClick={handleCancel}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-200 transition-all"
                      >
                        <XCircle className="w-5 h-5 text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  )}
                  
                  <label className="block text-gray-700 font-medium">Upload Cheque</label>

                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    onChange={handleFileChange}
                    accept="image/*" // Restrict to image files
                  />

                  <label
                    htmlFor="fileInput"
                    className="h-10 w-full flex items-center justify-center border-2 border-gray-300 rounded-lg p-2 mt-1 bg-purple-200 cursor-pointer hover:bg-purple-300 transition-all"
                  >
                    Choose File
                  </label>
                </div>
              </>
            )}
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
                <label className="block text-gray-700 font-medium">Tag Amount</label>
                <select
                  name="tagamount"
                  value={formData.tagamount}
                  onChange={(e) => {
                    handleChange(index, e);
                    formData.total = calculateTotal();
                  }}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                >
                  <option value="" disabled>Select</option>
                  <option value="4000">Praty Ware</option>
                  <option value="10000">Bridal</option>
                  <option value="25000">Heavy Bridal</option>
                </select>
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={(e) => {
                    handleChange(index, e);
                    formData.total = calculateTotal();
                  }}
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
            </div>

            <div className="flex gap-4 my-4">
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
                  onChange={(e) => {
                    handleChange(index, e);
                    formData.total = calculateTotal();
                  }}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Rate"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Total</label>
                <input
                  type="text"
                  name="total"
                  value={formData.total || calculateTotal()}
                  readOnly
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 bg-gray-200 text-gray-600"
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