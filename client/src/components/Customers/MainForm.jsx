import React from "react";

const MainForm = ({ formData, index, handleChange, handleRemoveForm }) => {
  return (
    <div key={index}>
      <div className="flex gap-4 my-4 mt-20">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            disabled
            className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium">Phone No:</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={(e) => handleChange(index, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
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
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium">Kariger Name</label>
          <input
            type="text"
            name="kariger"
            value={formData.kariger}
            onChange={(e) => handleChange(index, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => handleChange(index, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter Quantity"
          />
        </div>
      </div>

      <div className="flex gap-4 my-4">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium">Payment Type</label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={(e) => handleChange(index, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          >
            <option value="">Select Payment Type</option>
            <option value="Advance">Advance</option>
            <option value="Final Pay">Final Pay</option>
          </select>
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

        {formData.paymentType === "Advance" && (
          <>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Advance Payment</label>
              <input
                type="text"
                name="advancePayment"
                value={formData.advancePayment}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Advance Payment"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Due Amount</label>
              <input
                type="text"
                name="dueAmount"
                disabled
                value={formData.dueAmount}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Due Amount"
                required
              />
            </div>
          </>
        )}

        <div className="w-10 mt-8">
          <button
            onClick={() => handleRemoveForm(index)}
            className="bg-red-500 mb-5 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
          >
            ✕
          </button>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default MainForm;
