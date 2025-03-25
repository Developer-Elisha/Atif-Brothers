import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DealerKapraForm = ({ setRecords, records, lastTagNumber, setLastTagNumber, editingRecord, setEditingRecord }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [forms, setForms] = useState([{
    name: "",
    description: "",
    descriptionAmount: "",
    payment: "",
    duePayment: "",
    bank: "",
    cheque: "",
    total: "",
    date: formattedToday,
    dropdown: ""
  }]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState({ description: "", descriptionAmount: "" });

  useEffect(() => {
    if (editingRecord) {
      // Populate the form with the editing record data
      setForms([editingRecord]);
    }
  }, [editingRecord]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index][name] = value;

    if (name === "descriptionAmount" || name === "duePayment") {
      const descriptionAmount = parseFloat(updatedForms[index].descriptionAmount) || 0;
      const duePayment = parseFloat(updatedForms[index].duePayment) || 0;
      updatedForms[index].total = descriptionAmount + duePayment;
    }

    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([...forms, {
      name: "",
      description: "",
      descriptionAmount: "",
      payment: "",
      duePayment: "",
      bank: "",
      cheque: "",
      total: "",
      date: formattedToday,
      dropdown: ""
    }]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const validateMainForm = () => {
    return forms.every(form => form.name && form.description && form.descriptionAmount && form.payment && form.duePayment);
  };

  const handleSubmit = () => {
    if (!validateMainForm()) {
      alert("Please fill in all fields in the main form!");
      return;
    }

    if (editingRecord) {
      // Update the existing record
      const updatedRecords = records.map(record => 
        record === editingRecord ? forms[0] : record
      );
      setRecords(updatedRecords);
      setEditingRecord(null); // Clear editing record after saving
    } else {
      // Submit the main form data to the records
      setRecords([...records, ...forms]);
    }

    // Reset the main form
    setForms([{
      name: "",
      description: "",
      descriptionAmount: "",
      payment: "",
      duePayment: "",
      bank: "",
      cheque: "",
      total: "",
      date: formattedToday,
      dropdown: ""
    }]);
  };

  return (
    <div className="p-6 w-full">
      <h2 className='text-xl font-semibold text-center mb-6'>Kapra Dealer</h2>
      <div className="flex items-center justify-center w-full mb-5">
        <button
          className="bg-purple-200 hover:bg-purple-300 ml-5 mt-5 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
          onClick={handleAddForm}
        >
          +
        </button>

        <button
          className="bg-purple-200 hover:bg-purple-300 ml-5 mt-5 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Data Entry
        </button>
      </div>

      <div className="flex items-center justify-center w-full mb-5">
        <div className="w-1/5">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={forms[0].name}
            onChange={(e) => handleChange(0, e)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter Name"
            required
          />
        </div>

        <div className="w-1/5 ml-5">
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="text"
            name="date"
            value={forms[0].date}
            disabled
            className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
          />
        </div>
      </div>

      {forms.map((formData, index) => (
        <div key={index} className="flex gap-4 my-4">

          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Description</label>
            <input type="text" name="description" value={formData.description} onChange={(e) => handleChange(index, e)} placeholder="Enter Description" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>

          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Description Amount</label>
            <input type="number" name="descriptionAmount" value={formData.descriptionAmount} onChange={(e) => handleChange(index, e)} placeholder="Enter Amount" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 font-medium">Payment</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={(e) => handleChange(index, e)}
              className="h-10 w-full border-2 border-gray-300 rounded-lg p-2"
              required
            >
              <option value="" disabled>Select</option>
              <option value="Bank">Bank</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
          </div>

          {formData.payment === "Bank" && (
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Select Bank</label>
              <select
                name="bank"
                value={formData.bank}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select Bank</option>
                <option value="Meezan">Meezan</option>
                <option value="UBL">UBL</option>
                <option value="Faysal">Faysal</option>
                <option value="Easypaisa">Easypaisa</option>
                <option value="JazzCash">JazzCash</option>
              </select>
            </div>
          )}

          {formData.payment === "Cheque" && (
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Cheque No</label>
              <input
                type="text"
                name="cheque"
                value={formData.cheque}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Cheque No"
                required
              />
            </div>
          )}

          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Due Payment</label>
            <input type="number" name="duePayment" value={formData.duePayment} onChange={(e) => handleChange(index, e)} placeholder="Enter Due Payment" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" required />
          </div>

          <div className="w-1/2">
            <label className='block text-gray-700 font-medium'>Total</label>
            <input type="number" name="total" value={formData.total} readOnly className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 bg-gray-200" />
          </div>

          <button onClick={() => handleRemoveForm(index)} className="bg-red-500 cursor-pointer text-white px-5 py-2 mt-5 h-12 rounded-lg hover:bg-red-600 transition-all">✕</button>
        </div>
      ))}

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={handleSubmit} className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all">
          {editingRecord ? "Update" : "Save"} {/* Change button text based on editing state */}
        </button>
      </div>

      {/* Modal for Data Entry can be implemented here if needed */}
    </div>
  );
};

export default DealerKapraForm;