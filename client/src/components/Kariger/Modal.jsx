import React from 'react';

const Modal = ({ title, isOpen, onClose, formData, handleChange, onSubmit, getSuitNumbers }) => {
    if (!isOpen) return null;

    const suitOptions = getSuitNumbers(formData.billNo);
    const isShopSelected = formData.order === "Shop";

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold mb-4">{title}</h2>

                <div className="flex space-x-2 mb-3">
                    <div className="flex-1">
                        <label className="block mb-2">Bill No:</label>
                        <input
                            type="text"
                            name="billNo"
                            value={formData.billNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block mb-2">Suit No:</label>
                        <select
                            name="suitNo"
                            value={formData.suitNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="">Select Suit No</option>
                            {suitOptions.map((suit, index) => (
                                <option key={index} value={suit}>{suit}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <label className="block text-gray-700 font-medium">Shop/Order</label>
                <select
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                >
                    <option value="" disabled>Select Shop/Order</option>
                    <option value="Order">Order</option>
                    <option value="Shop">Shop</option>
                </select>

                {/* Conditional Inputs for Shop */}
                {isShopSelected && (
                    <>
                        <label className="block mt-2">Shop Name:</label>
                        <input
                            type="text"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <label className="block">Tag No:</label>
                        <input
                            type="text"
                            name="tagNo"
                            value={formData.tagNo}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />

                        <label className="block">Details:</label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            className="w-full p-2 border rounded mb-2"
                        />
                    </>
                )}
                
                <label className="block mb-2">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2">Amount:</label>
                <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full p-2 border rounded mb-3"
                />

                <div className="flex justify-end space-x-3">
                    <button className="bg-gray-300 px-4 py-2 rounded cursor-pointer" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-purple-300 text-white px-4 py-2 rounded cursor-pointer" onClick={onSubmit}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;