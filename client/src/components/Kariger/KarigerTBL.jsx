import React, { useState } from "react";
import { FaEdit, FaTrash, FaTag } from "react-icons/fa";

const KarigerTBL = ({ records }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);

  const handleCheckboxChange = (record) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(record)
        ? prevSelected.filter((r) => r !== record)
        : [...prevSelected, record]
    );
  };

  const handlePrint = () => {
    const printContent = document.getElementById("printTable").innerHTML;
    const printWindow = window.open("", "", "width=1000,height=700");

    printWindow.document.write(`
      <html>
        <head>
          <title>Karigar</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            h2 { margin-bottom: 10px; }
            @media print {
              button, .no-print { display: none; }
              th:last-child, td:last-child { display: none; }
            }
          </style>
        </head>
        <body>
          <h2>Karigar</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handlePrintTags = () => {
    if (selectedRecords.length === 0) {
      alert("Please select at least one record");
      return;
    }

    const printWindow = window.open("", "", "width=500,height=600");

    const tagCards = selectedRecords.map(record => `
      <div style="
        border: 2px solid #333;
        border-radius: 8px;
        padding: 20px;
        margin: 15px auto;
        width: 300px;
        page-break-inside: avoid;
      ">
        <h3 style="text-align: center; margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
          TAG CARD
        </h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 5px;"><strong>Code:</strong></td><td><strong>${record.shortCode || '-'}</strong></td></tr>
          <tr><td style="padding: 5px;"><strong>Color:</strong></td><td><strong>${record.color || '-'}</strong></td></tr>
          <tr><td style="padding: 5px;"><strong>Design:</strong></td><td><strong>${record.design || '-'}</strong></td></tr>
          <tr><td style="padding: 5px;"><strong>Tag No:</strong></td><td><strong>${record.tag || '-'}</strong></td></tr>
          <tr><td style="padding: 5px;"><strong>Tag:</strong></td><td><strong>${record.tagAmount || '0'}</strong></td></tr>
        </table>
      </div>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>Tag Cards</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            @media print { @page { margin: 10mm; } }
          </style>
        </head>
        <body>${tagCards}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center bg-purple-300 p-3 w-full rounded-lg">
        <h2 className="text-black font-semibold text-xl text-center flex-grow">Karigar</h2>
        <div className="flex gap-2">
          <button
            className="bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className={`${selectedRecords.length > 0 ? 'bg-purple-200' : 'bg-gray-300'
              } text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200 flex items-center gap-2`}
            onClick={handlePrintTags}
            disabled={selectedRecords.length === 0}
          >
            <FaTag /> Print Tags ({selectedRecords.length})
          </button>
        </div>
      </div>

      <div id="printTable" className="p-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse relative">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center no-print">Select</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">Code</th>
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
                <th className="py-3 px-6 text-center">Shop Name</th>
                <th className="py-3 px-6 text-center">Rate</th>
                <th className="py-3 px-6 text-center">Tag Amount</th>
                <th className="py-3 px-6 text-center">Pay By</th>
                <th className="py-3 px-6 text-center">Pay</th>
                <th className="py-3 px-6 text-center">Bank / Cheque</th>
                <th className="py-3 px-6 text-center">Cheque</th>
                <th className="py-3 px-6 text-center">Due Pay</th>
                <th className="py-3 px-6 text-center">Tag</th>
                <th className="py-3 px-6 text-center">Details</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-center no-print">
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(record)}
                        onChange={() => handleCheckboxChange(record)}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-6 text-center">{record.name}</td>
                    <td className="py-3 px-6 text-center">{record.shortCode}</td>
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
                    <td className="py-3 px-6 text-center">{record.shopName}</td>
                    <td className="py-3 px-6 text-center">{record.rate}</td>
                    <td className="py-3 px-6 text-center">{record.tagAmount}</td>
                    <td className="py-3 px-6 text-center">{record.payby}</td>
                    <td className="py-3 px-6 text-center">{record.payment}</td>
                    <td className="py-3 px-6 text-center">{record.bank || record.cheque}</td>
                    <td className="py-3 px-6 text-center">{record.chequeimg}</td>
                    <td className="py-3 px-6 text-center">{record.duePayment}</td>
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
                  <td colSpan="25" className="py-4 text-center text-gray-500">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KarigerTBL;
