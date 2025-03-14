// PaymentModal.jsx
import React from 'react';
import Modal from './Modal';

const PaymentModal = ({ isOpen, onClose, formData, handleChange }) => {
  return (
    <Modal title="Payment" isOpen={isOpen} onClose={onClose} formData={formData}>
      <div className="flex gap-4 my-4 justify-center">
        <div className="w-1/4">
          <label className="block text-gray-700 font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-gray-700 font-medium">Total Balance</label>
          <input
            type="number"
            name="totalBalance"
            value={formData.totalBalance || ""}
            onChange={handleChange}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-gray-700 font-medium">Rate</label>
          <input
            type="text"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter Rate"
            required
          />
        </div>

        <div className="w-1/4">
          <label className="block text-gray-700 font-medium">Payment</label>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
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
              onChange={handleChange}
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
          <div className="w-1/4">
            <label className="block text-gray-700 font-medium">Cheque No</label>
            <input
              type="text"
              name="cheque"
              value={formData.cheque}
              onChange={handleChange}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter Cheque No"
              required
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PaymentModal;