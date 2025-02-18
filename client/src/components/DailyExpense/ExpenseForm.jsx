import React, { useState } from 'react';

const ExpenseForm = ({ records, setRecords }) => {
    const [forms, setForms] = useState([{ quantity: "50", payment: "", bill: "412", tag: "563", kariger: "Kariger1", description: "Kariger ajkdfl", amount: "500", balance: "631" }]);

    const handleAddForm = () => {
        setForms([...forms, { quantity: "50", payment: "", bill: "412", tag: "563", kariger: "Kariger1", description: "Kariger ajkdfl", amount: "500", balance: "631" }]);
    };

    const handleChange = (index, e) => {
        const newForms = [...forms];
        newForms[index][e.target.name] = e.target.value;
        setForms(newForms);
    };

    const handleRemoveForm = (index) => {
        const newForms = forms.filter((_, i) => i !== index);
        setForms(newForms);
    };

    const handleSubmit = () => {
        setRecords([...records, ...forms]); 
        setForms([{ quantity: "50", payment: "", bill: "412", tag: "563", kariger: "Kariger1", description: "Kariger ajkdfl", amount: "500", balance: "631"  }]); // Clear form after submit
    };

    return (
        <div className="p-6 w-full max-h-[80vh] relative mb-10">
            <h2 className="text-xl font-semibold text-center mb-6">Daily Expense</h2>

            <div className="flex items-center justify-end w-full mb-5">
                <button
                    className="bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
                    onClick={handleAddForm}
                >
                    +
                </button>
            </div>

            {forms.map((formData, index) => (
                <div key={index}>
                    <div className="flex gap-4 my-4 mt-20">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                placeholder="Enter Quantity"
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Payment Type</label>
                            <select
                                name="payment"
                                value={formData.payment}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                required
                            >
                                <option value="" disabled>Select</option>
                                <option value="Advance">Advance</option>
                                <option value="1">1</option>
                            </select>
                        </div>


                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Bill No</label>
                            <input
                                type="number"
                                name="bill"
                                value={formData.bill}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                placeholder="Enter Bill No"
                                required
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Tag No</label>
                            <input
                                type="text"
                                name="tag"
                                value={formData.tag}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                placeholder="Enter Tag No"
                            />
                        </div>


                    </div>

                    <div className="flex gap-4 my-4">

                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Kariger</label>
                            <input
                                type="text"
                                name="kariger"
                                value={formData.kariger}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                placeholder="Enter Kariger"
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
                            <label className="block text-gray-700 font-medium">Amount</label>
                            <input
                                type="text"
                                name="amount"
                                value={formData.amount}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                placeholder="Enter Amount"
                            />
                        </div>

                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">Balance</label>
                            <input
                                type="text"
                                name="balance"
                                value={formData.balance}
                                onChange={(e) => handleChange(index, e)}
                                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                                placeholder="Enter Balance"
                                required
                            />
                        </div>
                        <div className="w-1/2"><button
                            onClick={() => handleRemoveForm(index)}
                            className="bg-red-500 mb-5 text-white px-3 cursor-pointer py-1 mt-8 rounded-lg hover:bg-red-600 transition-all"
                        >
                            ✕
                        </button></div>
                    </div>

                    <div className="mt-15"></div>

                    <div className="flex justify-end">

                    </div>

                    <hr />
                </div>
            ))}
            <div className="flex justify-center">
                <button
                    className="mt-6 w-[20%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-300 transition-all duration-200"
                    onClick={handleSubmit}
                >
                    Save Records
                </button>
            </div>
        </div>
    );
};

export default ExpenseForm;
