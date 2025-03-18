import React from 'react';

const CancelTable = ({ records }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-purple-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bill No</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment Method</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bank</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {records.map((record, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-700">{record.date}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{record.billNo}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{record.description}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{record.paymentMethod}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{record.bank || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-700">{record.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CancelTable; 