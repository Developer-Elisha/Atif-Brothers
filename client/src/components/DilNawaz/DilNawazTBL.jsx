import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const KarigerTBL = ({ records }) => {
  const handlePrint = () => {
    const printContent = document.getElementById("printTable").innerHTML;
    const printWindow = window.open("", "", "width=1000,height=700");

    printWindow.document.write(`
      <html>
        <head>
          <title>Dil Nawaz</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            h2 { margin-bottom: 10px; }
            @media print {
              button {
                display: none;
              }
              th:last-child, td:last-child {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h2>Dil Nawaz</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-purple-300 p-3 w-full rounded-lg">
        <h2 className="text-black font-semibold text-xl text-center flex-grow">Dil Nawaz</h2>
        <button
          className="bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      {/* Printable Section */}
      <div id="printTable" className="p-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Qty</th>
              <th className="py-3 px-6 text-center">Bill</th>
              <th className="py-3 px-6 text-center">Tag</th>
              <th className="py-3 px-6 text-center">Suit</th>
              <th className="py-3 px-6 text-center">Item</th>
              <th className="py-3 px-6 text-center">Color</th>
              <th className="py-3 px-6 text-center">Fabric</th>
              <th className="py-3 px-6 text-center">Desc</th>
              <th className="py-3 px-6 text-center">Design</th>
              <th className="py-3 px-6 text-center">Rate</th>
              <th className="py-3 px-6 text-center">Pay By</th>
              <th className="py-3 px-6 text-center">Pay</th>
              <th className="py-3 px-6 text-center">Bank / Cheque</th>
              <th className="py-3 px-6 text-center">Cheque</th>
              <th className="py-3 px-6 text-center">Due Pay</th>
              <th className="py-3 px-6 text-center">Shop</th>
              <th className="py-3 px-6 text-center">Tag</th>
              <th className="py-3 px-6 text-center">Details</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center">{record.name}</td>
                  <td className="py-3 px-6 text-center">{record.role}</td>
                  <td className="py-3 px-6 text-center">{record.date}</td>
                  <td className="py-3 px-6 text-center">{record.quantity}</td>
                  <td className="py-3 px-6 text-center">{record.bill}</td>
                  <td className="py-3 px-6 text-center">{record.tag}</td>
                  <td className="py-3 px-6 text-center">{record.suit}</td>
                  <td className="py-3 px-6 text-center">{record.items}</td>
                  <td className="py-3 px-6 text-center">{record.color}</td>
                  <td className="py-3 px-6 text-center">{record.fabric}</td>
                  <td className="py-3 px-6 text-center">{record.description}</td>
                  <td className="py-3 px-6 text-center">{record.design}</td>
                  <td className="py-3 px-6 text-center">{record.rate}</td>
                  <td className="py-3 px-6 text-center">{record.payby}</td>
                  <td className="py-3 px-6 text-center">{record.payment}</td>
                  <td className="py-3 px-6 text-center">{record.bank || record.cheque}</td>
                  <td className="py-3 px-6 text-center">{record.chequeimg}</td>
                  <td className="py-3 px-6 text-center">{record.duePayment}</td>
                  <td className="py-3 px-6 text-center">{record.shopName}</td>
                  <td className="py-3 px-6 text-center">{record.tagNo}</td>
                  <td className="py-3 px-6 text-center">{record.details}</td>
                  <td className="py-3 px-6 text-center">
                    <button className="bg-green-400 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-200">
                      <FaEdit />
                    </button>
                    <button className="bg-red-400 text-white p-2 cursor-pointer rounded-lg hover:bg-red-500 transition-all duration-200">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="17" className="py-4 text-center text-gray-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KarigerTBL;
