const ExpenseTBL = ({ records }) => {
  const handlePrint = () => {
    const printContent = document.getElementById("printTable").innerHTML;
    const printWindow = window.open("", "", "width=1000,height=700");

    printWindow.document.write(`
      <html>
        <head>
          <title>Kapra Dealer</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            h2 { margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h2>Kapra Dealer</h2>
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
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-center">{record.date}</td>
                    <td className="py-3 px-6 text-center">{record.item}</td>
                    <td className="py-3 px-6 text-center">{record.amount}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="14" className="py-4 text-center text-gray-500">No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ExpenseTBL;
  