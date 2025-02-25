import React from "react";

const TotalExpenseTBL = ({ records }) => {
    const handlePrint = () => {
        const printContent = document.getElementById("expensePrintTable").innerHTML;
        const printWindow = window.open("", "", "width=800,height=600");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Total Expense</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid black; padding: 8px; text-align: center; }
                        th { background-color: #f2f2f2; }
                        h2 { margin-bottom: 10px; }
                    </style>
                </head>
                <body>
                    <h2>Total Expense</h2>
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
            <div className="relative flex items-center bg-purple-300 p-3 rounded-lg">
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-black font-semibold">
                Total Expense
                </h2>
                <button
                    className="ml-auto w-[10%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200 no-print"
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>

            <div id="expensePrintTable" className="p-4">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-center">S.No</th>
                            <th className="py-3 px-6 text-center">Bill No</th>
                            <th className="py-3 px-6 text-center">Kapra</th>
                            <th className="py-3 px-6 text-center">Stitching</th>
                            <th className="py-3 px-6 text-center">Kariger</th>
                            <th className="py-3 px-6 text-center">Total Cost</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm">
                        {records.length > 0 ? (
                            records.map((record, index) => (
                                <tr key={index} className="border-b border-gray-200">
                                    <td className="py-3 px-6 text-center">{index + 1}</td>
                                    <td className="py-3 px-6 text-center">{record.bill}</td>
                                    <td className="py-3 px-6 text-center">{record.kapra}</td>
                                    <td className="py-3 px-6 text-center">{record.stitching}</td>
                                    <td className="py-3 px-6 text-center">{record.kariger}</td>
                                    <td className="py-3 px-6 text-center">{record.cost}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TotalExpenseTBL;