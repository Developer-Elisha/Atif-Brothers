import React from "react";

const MeasurementTable = ({ records }) => {
  return (
    <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-lg">
      <h4 className="font-semibold mb-2 border-b pb-1 px-4 py-2 bg-purple-300 text-white">
        Saved Measurements
      </h4>
      <div className="overflow-x-auto"> {/* Added this div for horizontal scrolling */}
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-2 px-4 border text-center" rowSpan="2">Bill No</th>
              <th className="py-2 px-4 border text-center" rowSpan="2">Suit No</th>
              <th className="py-2 px-4 border text-center" colSpan="10">Shirt / Maxi Measurements</th>
              <th className="py-2 px-4 border text-center" colSpan="7">Trouser / Sharara Measurements</th>
            </tr>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {/* Shirt/Maxi Measurements */}
              {["Length", "Shoulder", "Chest", "Waist", "Hip", "Daman", "Sleeves", "Bicep", "Mori", "Arm Hole", "Back Length"]
                .map((header, index) => <th key={index} className="py-2 px-4 border">{header}</th>)}

              {/* Trouser/Sharara Measurements */}
              {["Length", "Thigh", "Bottom", "Palta", "Balls", "Clutch", "Inner"]
                .map((header, index) => <th key={index + 10} className="py-2 px-4 border">{header}</th>)}
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={index} className="border-b border-gray-200 text-center">
                  <td className="py-2 px-4 border">{record.billNo}</td>
                  <td className="py-2 px-4 border">{record.suitNo}</td>

                  {/* Shirt/Maxi Measurements */}
                  {["length", "shoulder", "chest", "waist", "hip", "daman", "sleeves", "bicep", "mori", "armHole", "backLength"]
                    .map((key, idx) => (
                      <td key={idx} className="py-2 px-4 border">
                        {record.measurements?.shirtMaxi?.[key] ?? "-"}
                      </td>
                    ))}

                  {/* Trouser/Sharara Measurements */}
                  {["length", "thigh", "bottom", "palta", "balls", "clutch", "inner"]
                    .map((key, idx) => (
                      <td key={idx + 10} className="py-2 px-4 border">
                        {record.measurements?.trouserSharara?.[key] ?? "-"}
                      </td>
                    ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="18" className="py-4 text-center text-gray-500">
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

export default MeasurementTable;