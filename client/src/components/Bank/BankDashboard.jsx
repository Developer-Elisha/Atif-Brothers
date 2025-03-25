import React, { useState } from 'react';
import Form from "./BankFrom";
import Table from "./BankTBL";
import ConfirmationModal from "./ConfirmationModal";

const BankDashboard = () => {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${today.getFullYear()}`;
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" }); 
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [recordToEdit, setRecordToEdit] = useState(null);

  const handleEdit = (index) => {
    setRecordToEdit(index);
    setIsEditModalOpen(true); // Open confirmation modal for edit
  };

  const confirmEdit = () => {
    setEditIndex(recordToEdit); // Proceed with the edit
    setIsEditModalOpen(false);
    setRecordToEdit(null);
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setRecordToEdit(null);
  };

  const handleDelete = (index) => {
    setRecordToDelete(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setRecords(records.filter((_, i) => i !== recordToDelete));
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-h-[100vh] overflow-auto flex flex-col gap-4">
        <div className="max-h-[80vh] overflow-y-auto scrollbar-purple">
          <p>{formattedDate}</p>
          <p>{dayName}</p>
          <Form
            setRecords={setRecords} 
            records={records}
            editIndex={editIndex}
            setEditIndex={setEditIndex}
          />
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 w-full mt-28 max-h-[100vh] overflow-auto flex flex-col gap-4">
        <div className="overflow-x-auto flex-1 scrollbar-purple max-h-[50vh]">
          <Table records={records} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isEditModalOpen} 
        onClose={cancelEdit} 
        onConfirm={confirmEdit} 
        message="Are you sure you want to edit this record?" 
      />
      <ConfirmationModal 
        isOpen={isDeleteModalOpen} 
        onClose={cancelDelete} 
        onConfirm={confirmDelete} 
        message="Are you sure you want to delete this record?" 
      />
    </>
  );
}

export default BankDashboard;