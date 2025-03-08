import React, { useState } from "react";
import Form from "./CustomerForm";
import Table from "./ShowroomCustomerTBL";
import MeasurementForm from "./Measurements";
import MeasurementTable from "./ShowroomMeasurementTable"; // Import Measurement Table

const ShowroomCustomerDashboard = () => {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

  const [records, setRecords] = useState([]);
  const [measurementsRecords, setMeasurementsRecords] = useState([]); // Store measurement records
  const [lastTagNumber, setLastTagNumber] = useState(101);
  const [showMeasurement, setShowMeasurement] = useState(false);

  return (
    <>
      <div className="shadow-lg rounded-lg p-4 w-[90vw] max-h-[90vh] flex flex-row gap-4">
        {/* Customer Form */}
        <div
          className={`bg-white transition-all duration-300 rounded-lg w-full ${showMeasurement ? "md:w-[70%]" : "w-full"
            } max-h-[90vh] overflow-y-auto scrollbar-purple`}
        >
          <p className="ml-2 mt-2">{formattedDate}</p>
          <p className="ml-4">{dayName}</p>
          <Form
            setRecords={setRecords}
            records={records}
            lastTagNumber={lastTagNumber}
            setLastTagNumber={setLastTagNumber}
            setShowMeasurement={setShowMeasurement}
          />
        </div>

        {showMeasurement && (
          <div className="bg-white w-[30%] p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto transition-all duration-300">
            <MeasurementForm
              setShowMeasurementForm={setShowMeasurement}
              setMeasurementsRecords={setMeasurementsRecords}
              customerRecords={records} // Pass customer records
            />
          </div>
        )}
      </div>

      {/* Customer Table */}
      <div className="bg-white shadow-lg rounded-lg p-4 w-[90vw] max-h-[100vh] overflow-auto mt-8 flex flex-col gap-4">
        <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[100vh]">
          <Table records={records} />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 w-[90vw] max-h-[100vh] overflow-auto mt-8 flex flex-col gap-4">

        {/* Measurement Table (Added Here) */}
        {measurementsRecords.length > 0 && (
          <div className="mt-6">
            <MeasurementTable records={measurementsRecords} />
          </div>
        )}
      </div>
    </>
  );
};

export default ShowroomCustomerDashboard;
