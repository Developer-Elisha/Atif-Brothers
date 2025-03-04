import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const handlePrint = () => {
    const printContents = document.getElementById("printTable").innerHTML;
    const newWindow = window.open("", "", "width=800,height=600");
    newWindow.document.write(`
        <html>
            <head>
                <title>Measurement Details</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; border: 2px solid black; }
                    th, td { border: 2px solid black; padding: 8px; text-align: center; }
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
                <h2>Measurement Details</h2>
                ${printContents}
            </body>
        </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
};

const sampleRecords = [
    { billNo: "101", suitNo: "S001", type: "Formal", length: "40", shoulder: "18", chest: "42", hip: "40", daman: "22", sleeves: "25", bicep: "14", mori: "10", armHole: "18", backLength: "40", trouserLength: "40", thigh: "24", bottom: "16", palta: "5", balls: "Yes", clutch: "34", inner: "3" },
    { billNo: "102", suitNo: "S002", type: "Casual", length: "38", shoulder: "17", chest: "40", hip: "38", daman: "21", sleeves: "24", bicep: "13", mori: "9", armHole: "17", backLength: "38", trouserLength: "39", thigh: "23", bottom: "15", palta: "4", balls: "No", clutch: "33", inner: "2" },
];

const MeasurementTBL = ({ records }) => {
    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <div className="relative flex items-center bg-purple-300 p-3 rounded-lg">
                <h2 className="absolute left-1/2 transform -translate-x-1/2 text-black font-semibold">
                    Measurement Details
                </h2>
                <button
                    className="ml-auto w-[10%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-100 transition-all duration-200 no-print"
                    onClick={handlePrint}
                >
                    Print
                </button>
            </div>

            <div id="printTable">
                <table className="min-w-full border-collapse border-2 border-black">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-2 border-black">
                            <th rowSpan="2" className="border-2 border-black">S.No</th>
                            <th rowSpan="2" className="border-2 border-black">Bill</th>
                            <th rowSpan="2" className="border-2 border-black">Suit</th>
                            <th colSpan="9" className="border-2 border-black">Shirt/Maxi</th>
                            <th colSpan="7" className="border-2 border-black">Trouser/Sharara</th>
                            <th rowSpan="2" className="border-2 border-black no-print">Actions</th>
                        </tr>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal border-2 border-black">
                            {/* Shirt/Maxi Columns */}
                            <th className="border-2 border-black">Type</th>
                            <th className="border-2 border-black">Length</th>
                            <th className="border-2 border-black">Shoulder</th>
                            <th className="border-2 border-black">Chest</th>
                            <th className="border-2 border-black">Hip</th>
                            <th className="border-2 border-black">Daman</th>
                            <th className="border-2 border-black">Sleeves</th>
                            <th className="border-2 border-black">Bicep</th>
                            <th className="border-2 border-black">Mori</th>

                            {/* Trouser/Sharara Columns */}
                            <th className="border-2 border-black">Trouser Length</th>
                            <th className="border-2 border-black">Thigh</th>
                            <th className="border-2 border-black">Bottom</th>
                            <th className="border-2 border-black">Palta</th>
                            <th className="border-2 border-black">Balls</th>
                            <th className="border-2 border-black">Clutch</th>
                            <th rowSpan="2" className="border-2 border-black">Inner</th>
                        </tr>
                    </thead>

                    <tbody>
                        {sampleRecords.length > 0 ? (
                            sampleRecords.map((record, index) => (
                                <tr key={index} className="border-2 border-black">
                                    <td className="border-2 border-black">{index + 1}</td>
                                    <td className="border-2 border-black">{record.billNo}</td>
                                    <td className="border-2 border-black">{record.suitNo}</td>
                                    {/* Shirt/Maxi */}
                                    <td className="border-2 border-black">{record.type}</td>
                                    <td className="border-2 border-black">{record.length}</td>
                                    <td className="border-2 border-black">{record.shoulder}</td>
                                    <td className="border-2 border-black">{record.chest}</td>
                                    <td className="border-2 border-black">{record.hip}</td>
                                    <td className="border-2 border-black">{record.daman}</td>
                                    <td className="border-2 border-black">{record.sleeves}</td>
                                    <td className="border-2 border-black">{record.bicep}</td>
                                    <td className="border-2 border-black">{record.mori}</td>

                                    {/* Trouser/Sharara */}
                                    <td className="border-2 border-black">{record.trouserLength}</td>
                                    <td className="border-2 border-black">{record.thigh}</td>
                                    <td className="border-2 border-black">{record.bottom}</td>
                                    <td className="border-2 border-black">{record.palta}</td>
                                    <td className="border-2 border-black">{record.balls}</td>
                                    <td className="border-2 border-black">{record.clutch}</td>
                                    <td className="border-2 border-black">{record.inner}</td>

                                    <td className="border-2 border-black no-print">
                                        <button className="bg-green-400 text-white p-2 rounded-lg hover:bg-green-500">
                                            <FaEdit />
                                        </button>
                                        <button className="bg-red-400 text-white p-2 ml-4 rounded-lg hover:bg-red-500">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="22" className="py-4 text-center text-gray-500 border-2 border-black">
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

export default MeasurementTBL;
