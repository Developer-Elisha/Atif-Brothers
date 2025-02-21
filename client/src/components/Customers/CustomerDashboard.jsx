import React, { useState } from 'react';
import Form from "./CustomerForm";
import Table from "./CustomerTBL";

const CustomerDashboard = () => {
  const [records, setRecords] = useState([]);
  const [lastTagNumber, setLastTagNumber] = useState(101);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[90vh] flex flex-col gap-4">
        <div className="max-h-[90vh] overflow-y-auto scrollbar-purple">
          <Form
            setRecords={setRecords}
            records={records}
            lastTagNumber={lastTagNumber}
            setLastTagNumber={setLastTagNumber}
          />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto mt-28 flex flex-col gap-4">
        <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[100vh]">
          <Table records={records} />
        </div>
      </div>
    </>
  );
}

export default CustomerDashboard;
