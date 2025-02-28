import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const handlePrint = () => {
    const printContents = document.getElementById("printTable").innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(`
        <html>
            <head>
                <title>Kapra Details</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid black; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                    .no-print { display: none !important; }
                    h2 { margin: 0; padding: 10px 0; font-size: 20px; }
                    @media print {
                        th:last-child, td:last-child {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <h2>Kapra Details</h2>
                ${printContents}
            </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
};

const ExpenseTBL = ({ records }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="relative flex items-center bg-purple-300 p-3 rounded-lg">
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-black font-semibold">
                    Kapra Details
                </h2>
                <button
                    className="ml-auto w-[10%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200 no-print"
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>

            <div id="printTable">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">S.No</th>
                            <th className="py-3 px-6 text-center">Bill No</th>
                            <th className="py-3 px-6 text-center">Date</th>
                            <th className="py-3 px-6 text-center">Description</th>
                            <th className="py-3 px-6 text-center">Amount</th>
                            <th className="py-3 px-6 text-center no-print">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {records.length > 0 ? (
                            records.map((record, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-6 text-center">{index + 1}</td>
                                    <td className="py-3 px-6 text-center">{record.bill}</td>
                                    <td className="py-3 px-6 text-center">{record.date}</td>
                                    <td className="py-3 px-6 text-center">{record.description}</td>
                                    <td className="py-3 px-6 text-center">{record.amount}</td>
                                    <td className="py-3 px-6 text-center no-print">
                                        <button className="bg-green-400 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-200">
                                            <FaEdit />
                                        </button>
                                        <button className="bg-red-400 text-white p-2 ml-4 cursor-pointer rounded-lg hover:bg-red-500 transition-all duration-200">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">
                                    No records found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseTBL;
