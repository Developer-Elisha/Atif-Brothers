import React, { useState } from 'react';
import Form from "./StaffFrom";
import Table from "./StaffTBL";

const StaffDashboard = () => {
  const [records, setRecords] = useState([]);
  const [lastTagNumber, setLastTagNumber] = useState(101);
  
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }); 

  const handleEdit = (record) => {
    // Find the record in the records array
    const recordIndex = records.findIndex(r => 
      r.name === record.name && 
      r.date === record.date && 
      r.amount === record.amount
    );

    if (recordIndex !== -1) {
      // Remove the record from the records array
      const updatedRecords = records.filter((_, index) => index !== recordIndex);
      setRecords(updatedRecords);
    }
  };

  return (
    <>
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
      <div className="max-h-[50vh] overflow-y-auto scrollbar-purple">
        
      <p>{formattedDate}</p>
        <p>{dayName}</p>
        <Form
          records={records}
          setRecords={setRecords}
          lastTagNumber={lastTagNumber}
          setLastTagNumber={setLastTagNumber}
        />
      </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] mt-28 overflow-auto flex flex-col gap-4">
      <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[50vh]">
        <Table records={records} onEdit={handleEdit} />
      </div>
    </div>
    </>
  );
}

export default StaffDashboard;
