import React from 'react';

const ExpenseTBL = ({ records }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center bg-purple-300 p-3 rounded-lg">
                <h2 className="text-black font-semibold">Daily Expense</h2>
            </div>

            <div id="printTable">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">Quantity</th>
                            <th className="py-3 px-6 text-center">Bill No</th>
                            <th className="py-3 px-6 text-center">Tag No</th>
                            <th className="py-3 px-6 text-center">Kariger</th>
                            <th className="py-3 px-6 text-center">Description</th>
                            <th className="py-3 px-6 text-center">Amount</th>
                            <th className="py-3 px-6 text-center">Balance</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {records.length > 0 ? (
                            records.map((record, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-6 text-center">{record.quantity}</td>
                                    <td className="py-3 px-6 text-center">{record.bill}</td>
                                    <td className="py-3 px-6 text-center">{record.tag}</td>
                                    <td className="py-3 px-6 text-center">{record.kariger}</td>
                                    <td className="py-3 px-6 text-center">{record.description}</td>
                                    <td className="py-3 px-6 text-center">{record.amount}</td>
                                    <td className="py-3 px-6 text-center">{record.balance}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="7" className="py-4 text-center text-gray-500">No records found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTBL;
