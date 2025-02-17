import React, { useState } from 'react';
import Form from "./StaffFrom";
import Table from "./StaffTBL";

const StaffDashboard = () => {
  const [records, setRecords] = useState([]);
  const [lastTagNumber, setLastTagNumber] = useState(101);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
      <div className="max-h-[50vh] overflow-y-auto scrollbar-purple">
        <Form
          records={records}
          setRecords={setRecords}
          lastTagNumber={lastTagNumber}
          setLastTagNumber={setLastTagNumber}
        />
      </div>
      <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[50vh]">
        <Table records={records} />
      </div>
    </div>
  );
}

export default StaffDashboard;
