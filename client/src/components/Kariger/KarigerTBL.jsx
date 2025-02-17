const KarigerTBL = ({ records }) => {
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
        <h2 className="text-black font-semibold">Record List</h2>
        <button
          className="w-[10%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>

      {/* Add ID to the div wrapping the table */}
      <div id="printTable">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-center">Bill No</th>
              <th className="py-3 px-6 text-center">Tag No</th>
              <th className="py-3 px-6 text-center">Item</th>
              <th className="py-3 px-6 text-center">Color</th>
              <th className="py-3 px-6 text-center">Fabric</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Design</th>
              <th className="py-3 px-6 text-center">Rate</th>
              <th className="py-3 px-6 text-center">Payment</th>
              <th className="py-3 px-6 text-center">Dues</th>
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
                  <td className="py-3 px-6 text-center">{record.items}</td>
                  <td className="py-3 px-6 text-center">{record.color}</td>
                  <td className="py-3 px-6 text-center">{record.fabric}</td>
                  <td className="py-3 px-6 text-center">{record.description}</td>
                  <td className="py-3 px-6 text-center">{record.design}</td>
                  <td className="py-3 px-6 text-center">{record.rate}</td>
                  <td className="py-3 px-6 text-center">{record.payment}</td>
                  <td className="py-3 px-6 text-center">{record.duePayment}</td>
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

export default KarigerTBL;
