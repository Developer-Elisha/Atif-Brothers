import { FaEdit, FaTrash } from "react-icons/fa";

const ReturnTBL = ({ records, onEdit, onDelete }) => {
  const handlePrint = () => {
    const printContent = document.getElementById("printTable").innerHTML;
    const printWindow = window.open("", "", "width=800,height=600");

    printWindow.document.write(`
      <html>
        <head> 
          <title>Dasti Records</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            h2 { margin-bottom: 10px; }
            /* Hide action buttons when printing */
            @media print {
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h2>Dasti Return</h2>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center bg-purple-300 p-3 rounded-lg">
        <h2 className="text-black font-semibold text-xl text-center flex-grow">Dasti Return</h2>
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
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Return Liya/Diya</th>
              <th className="py-3 px-6 text-center">Cash/Bank</th>
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Previous Amount</th>
              <th className="py-3 px-6 text-center">Amount</th>
              <th className="py-3 px-6 text-center">Balance</th>
              <th className="py-3 px-6 text-center no-print">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center">{record.date}</td>
                  <td className="py-3 px-6 text-center">{record.dasti}</td>
                  <td className="py-3 px-6 text-center">{record.cash}</td>
                  <td className="py-3 px-6 text-center">{record.name}</td>
                  <td className="py-3 px-6 text-center">{record.description}</td>
                  <td className="py-3 px-6 text-center">{record.previous}</td>
                  <td className="py-3 px-6 text-center">{record.amount}</td>
                  <td className="py-3 px-6 text-center">{record.balance}</td>
                  <td className="py-3 px-6 text-center no-print">
                    <button  onClick={() => onEdit(index)} className="bg-green-400 text-white p-2 rounded-lg cursor-pointer hover:bg-green-500 transition-all duration-200">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(index)} className="bg-red-400 text-white p-2 ml-4 cursor-pointer rounded-lg hover:bg-red-500 transition-all duration-200">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-4 text-center text-gray-500">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReturnTBL;