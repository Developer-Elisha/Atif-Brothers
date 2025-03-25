import React, { useState } from 'react';
import Form from "./DealerKapraFrom";
import Table from "./DealerKapraTBL";

const DealerDashboard = () => {
  const [records, setRecords] = useState([]);
  const [lastTagNumber, setLastTagNumber] = useState(101);
  const [editingRecord, setEditingRecord] = useState(null); // State to hold the record being edited
  
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });   

  return (
    <>
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
      <div className="max-h-[50vh] overflow-y-auto scrollbar-purple">
        
      <p>{formattedDate}</p>
        <p>{dayName}</p>
        <Form
          setRecords={setRecords}
          records={records}
          lastTagNumber={lastTagNumber}
          setLastTagNumber={setLastTagNumber}
          editingRecord={editingRecord} // Pass the editing record
          setEditingRecord={setEditingRecord} // Pass the setter for editing record
        />
      </div>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] mt-28 overflow-auto flex flex-col gap-4">
      <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[50vh]">
        <Table records={records} setRecords={setRecords} setEditingRecord={setEditingRecord} /> {/* Pass setEditingRecord here */}
      </div>
    </div>
    </>
  );
}

export default DealerDashboard;