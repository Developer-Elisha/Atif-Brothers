// CancelModal Component
import React from 'react';

const CancelModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const [paymentMethod, setPaymentMethod] = React.useState('');
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                <h2 className="text-lg font-semibold">Cancel</h2>
                <form onSubmit={onConfirm}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <input
                            type="date"
                            value={currentDate}
                            disabled
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Bill No</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Payment Method</label>
                        <select
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Bank">Bank</option>
                        </select>
                    </div>

                    {paymentMethod === "Bank" && (
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Select Bank</label>
                            <select
                                required
                                className="w-full border border-gray-300 rounded-lg p-2"
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

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Amount</label>
                        <input
                            type="number"
                            required
                            className="w-full border border-gray-300 rounded-lg p-2"
                        />
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="submit" className="bg-purple-300 hover:bg-purple-400 px-4 py-2 rounded-lg mr-2">
                            Submit
                        </button>
                        <button type="button" className="bg-purple-300 hover:bg-purple-400 px-4 py-2 rounded-lg" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CancelModal;