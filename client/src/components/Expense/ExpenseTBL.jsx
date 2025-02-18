const ExpenseTBL = ({ records }) => {
    const handlePrint = () => {
      const printContents = document.getElementById("printTable").innerHTML;
      const originalContents = document.body.innerHTML;
  
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); 
    };
  
    return (
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center bg-purple-300 p-3 rounded-lg">
          <h2 className="text-black font-semibold">Expense</h2>
          {/* <button
            className="w-[10%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200"
            onClick={handlePrint}
          >
            Print
          </button> */}
        </div>
  
        <div id="printTable">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">Item</th>
                <th className="py-3 px-6 text-center">Amount</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={index} className="border-b border-gray-200">
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
  