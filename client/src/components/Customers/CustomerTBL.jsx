import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const CustomerTBL = ({ records }) => {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const [singlePrintRecord, setSinglePrintRecord] = useState(null);

  const handleCheckboxChange = (record) => {
    setSelectedRecords((prevSelected) =>
      prevSelected.includes(record)
        ? prevSelected.filter((r) => r !== record)
        : [...prevSelected, record]
    );
  };

  const handlePrintSelected = () => {
    setSinglePrintRecord(null);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintSingle = (record) => {
    setSinglePrintRecord(record);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  // Calculate totals
  const totalAmount = selectedRecords.reduce((sum, r) => sum + Number(r.rate), 0);
  const totalAdvance = selectedRecords.reduce((sum, r) => sum + Number(r.advancePayment), 0);
  const totalDue = selectedRecords.reduce((sum, r) => sum + Number(r.dueAmount), 0);

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center bg-purple-300 p-3 rounded-lg">
        <h2 className="text-white font-semibold">Customer Invoice</h2>
        <button
          className="bg-purple-200 text-black px-4 py-2 cursor-pointer rounded-lg hover:bg-purple-400 transition"
          onClick={handlePrintSelected}
          disabled={selectedRecords.length === 0}
        >
          Print Selected
        </button>
      </div>

      <div id="printTable">
        {/* Web Table View */}
        <div className="overflow-x-auto"> {/* Added this div for horizontal scrolling */}
          <table className="min-w-full border-collapse table-auto print:hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Select</th>
                <th className="py-3 px-6 text-center">S.No</th>
                <th className="py-3 px-6 text-center">Date</th>
                <th className="py-3 px-6 text-center">Bill No</th>
                <th className="py-3 px-6 text-center">Suit No</th>
                <th className="py-3 px-6 text-center">Sales Man</th>
                <th className="py-3 px-6 text-center">Name</th>
                <th className="py-3 px-6 text-center">Phone No</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-center">Rate</th>
                <th className="py-3 px-6 text-center">Pay Status</th>
                <th className="py-3 px-6 text-center">Pay With</th>
                <th className="py-3 px-6 text-center">Bank</th>
                <th className="py-3 px-6 text-center">Description</th>
                <th className="py-3 px-6 text-center">Received</th>
                <th className="py-3 px-6 text-center">Advance Payment</th>
                <th className="py-3 px-6 text-center">Due Payment</th>
                <th className="py-3 px-6 text-center">Payment</th>
                <th className="py-3 px-6 text-center">Actions</th>
                <th className="py-3 px-6 text-center">Edit/Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-center">
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxChange(record)}
                        checked={selectedRecords.includes(record)}
                      />
                    </td>
                    <td className="py-3 px-6 text-center">{index + 1}</td>
                    <td className="py-3 px-6 text-center">{record.date}</td>
                    <td className="py-3 px-6 text-center">{record.bill}</td>
                    <td className="py-3 px-6 text-center">{record.suit}</td>
                    <td className="py-3 px-6 text-center">{record.sale}</td>
                    <td className="py-3 px-6 text-center">{record.name}</td>
                    <td className="py-3 px-6 text-center">{record.phone}</td>
                    <td className="py-3 px-6 text-center">{record.quantity}</td>
                    <td className="py-3 px-6 text-center">{record.rate}</td>
                    <td className="py-3 px-6 text-center">{record.paymentType}</td>
                    <td className="py-3 px-6 text-center">{record.payment}</td>
                    <td className="py-3 px-6 text-center">{record.bank}</td>
                    <td className="py-3 px-6 text-center">{record.description}</td>
                    <td className="py-3 px-6 text-center">{record.received}</td>
                    <td className="py-3 px-6 text-center">{record.advancePayment}</td>
                    <td className="py-3 px-6 text-center">{record.dueAmount}</td>
                    <td className="py-3 px-6 text-center">{record.currentPayment}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-purple-400 text-white py-1 px-3 cursor-pointer rounded-lg hover:bg-purple-500 transition"
                        onClick={() => handlePrintSingle(record)}
                      >
                        Print
                      </button>
                    </td>
                    <td className="py-3 px-6 text-center">

                      <button className="bg-green-400 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-200">
                        <FaEdit />
                      </button>
                      <button className="bg-red-400 text-white p-2 ml-3 cursor-pointer rounded-lg hover:bg-red-500 transition-all duration-200">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="py-4 text-center text-gray-500">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Print Bill Format (for selected records in one receipt) */}
        {(selectedRecords.length > 0 || singlePrintRecord) && (
          <div className="hidden print:block p-6 border border-gray-500 text-sm w-80 mx-auto bg-white">
            <h2 className="text-center font-bold text-lg">Atif Brothers</h2>
            <p className="text-center text-sm">
              Shop# G231-232 Ground Floor GULF Shopping Mall, Near Teen Talwar, Clifton Karachi
            </p>
            <hr className="my-2 border-gray-400" />

            {/* Customer Details */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p><strong>Name:</strong> {singlePrintRecord ? singlePrintRecord.name : selectedRecords[0].name}</p>
              <p><strong>Date:</strong> {singlePrintRecord ? singlePrintRecord.date : selectedRecords[0].date}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p><strong>Phone:</strong> {singlePrintRecord ? singlePrintRecord.phone : selectedRecords[0].phone}</p>
              <p><strong>Bill No:</strong> {singlePrintRecord ? singlePrintRecord.bill : selectedRecords[0].bill}</p>
            </div>

            <hr className="my-2 border-gray-400" />

            {/* Table */}
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="border px-1 py-1">QTY</th>
                  <th className="border px-1 py-1">DESC</th>
                  <th className="border px-1 py-1">RATE</th>
                  <th className="border px-1 py-1">ADV Pay</th>
                  <th className="border px-1 py-1">DUE Pay</th>
                </tr>
              </thead>
              <tbody>
                {(singlePrintRecord ? [singlePrintRecord] : selectedRecords).map((record, index) => (
                  <tr key={index}>
                    <td className="border px-1 py-1 text-center">{record.quantity}</td>
                    <td className="border px-1 py-1">{record.description}</td>
                    <td className="border px-1 py-1">{record.rate}</td>
                    <td className="border px-1 py-1">{record.advancePayment}</td>
                    <td className="border px-1 py-1">{record.dueAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="my-2 border-gray-400" />
            <p className="text-right font-bold">Total Advance Payment: Rs. {singlePrintRecord ? singlePrintRecord.advancePayment : totalAdvance}</p>
            <p className="text-right font-bold">Total Due Payment: Rs. {singlePrintRecord ? singlePrintRecord.dueAmount : totalDue}</p>
            <p className="text-right font-bold">
              Grand Total: Rs. {singlePrintRecord
                ? Number(singlePrintRecord.advancePayment) + Number(singlePrintRecord.dueAmount)
                : totalAmount + totalAdvance + totalDue}
            </p>

            <hr className="my-2 border-gray-400" />
            <p className="text-center text-sm">Thank you for your purchase!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerTBL;