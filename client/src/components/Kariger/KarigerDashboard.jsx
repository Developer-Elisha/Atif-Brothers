import { useState } from "react";
import Form from "./KarigerFrom";
import Table from "./KarigerTBL";
import ConfirmationModal from './ConfirmationModal';

const KarigerDashboard = () => {
  const [records, setRecords] = useState([]);
  const [lastTagNumber, setLastTagNumber] = useState(101);
      const [editIndex, setEditIndex] = useState(null);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [actionType, setActionType] = useState(null);
      const [recordIndex, setRecordIndex] = useState(null);
    
      const handleEdit = (index) => {
        setActionType('edit');
        setRecordIndex(index);
        setIsModalOpen(true);
      };
    
      const handleDelete = (index) => {
        setActionType('delete');
        setRecordIndex(index);
        setIsModalOpen(true);
      };
    
      const confirmAction = () => {
        if (actionType === 'edit') {
          setEditIndex(recordIndex);
        } else if (actionType === 'delete') {
          setRecords(records.filter((_, i) => i !== recordIndex));
        }
        setIsModalOpen(false);
      };
  
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }); 

  return (
    <>
    <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmAction}
        message={`Are you sure you want to ${actionType === 'edit' ? 'edit' : 'delete'} this record?`}
      />
     <div className="bg-white shadow-lg rounded-lg p-4 w-[90vw] max-h-[100vh] overflow-auto flex flex-col gap-4">
      <div className="max-h-[80vh] overflow-y-auto scrollbar-purple">
        
      <p>{formattedDate}</p>
        <p>{dayName}</p>  
        <Form
          records={records}
          setRecords={setRecords}
          lastTagNumber={lastTagNumber}
          setLastTagNumber={setLastTagNumber}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
      </div>
    </div>

    
    <div className="bg-white shadow-lg rounded-lg p-4 w-[90vw] max-h-[100vh] mt-28 overflow-auto flex flex-col gap-4">
      <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[80%]">
        <Table records={records} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
    </>
  );
};

export default KarigerDashboard;
