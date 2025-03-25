import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal

const ExpenseTBL = ({ records, setRecords, setEditingRecord }) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState(null); // State to hold the record to edit
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const handlePrint = () => {
    const printContent = document.getElementById("printTable").innerHTML;
    const printWindow = window.open("", "", "width=1000,height=700");

    printWindow.document.write(`
      <html>
        <head>
          <title>Expense</title>
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
          <h2>Expense</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleEdit = (record) => {
    setRecordToEdit(record); // Set the record to be edited
    setIsConfirmationOpen(true); // Open the confirmation modal
  };

  const confirmEdit = () => {
    setEditingRecord(recordToEdit); // Set the editing record
    setIsConfirmationOpen(false); // Close the confirmation modal
  };

  const handleDelete = (record) => {
    setRecordToDelete(record);
    setIsDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    setRecords(records.filter(r => r !== recordToDelete)); // Update records state
    setIsDeleteConfirmationOpen(false); // Close the confirmation modal
};

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-purple-300 p-3 rounded-lg">
        <h2 className="text-black font-semibold text-xl text-center flex-grow">Expense</h2>
        <button
          className="bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      <div id="printTable">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Item</th>
              <th className="py-3 px-6 text-center">Amount</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center">{record.date}</td>
                  <td className="py-3 px-6 text-center">{record.item}</td>
                  <td className="py-3 px-6 text-center">{record.amount}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-green-400 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-200"
                      onClick={() => handleEdit(record)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="bg-red-400 text-white p-2 ml-4 cursor-pointer rounded-lg hover:bg-red-500 transition-all duration-200"
                      onClick={() => handleDelete(record)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={confirmEdit}
        message="Are you sure you want to edit this record?"
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this record?"
      />
    </div>
  );
};

export default ExpenseTBL;