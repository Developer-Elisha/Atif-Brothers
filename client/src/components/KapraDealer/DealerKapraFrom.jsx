import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DealerKapraForm = ({ setRecords, records }) => {
  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [forms, setForms] = useState([
    {
      name: "Dealer1",
      description: "Silk",
      descriptionAmount: "500",
      payment: "",
      duePayment: "10000",
      bank: "",
      cheque: "",
      total: "500",
      date: formattedToday,
      dropdown: ""
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalFormData, setModalFormData] = useState({ description: "", descriptionAmount: "" });

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

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalFormData({ ...modalFormData, [name]: value });
  };

  const handleAddForm = () => {
    setForms([...forms, {
      name: "Dealer1",
      description: "Silk",
      descriptionAmount: "500",
      payment: "",
      duePayment: "10000",
      bank: "",
      cheque: "",
      total: "500",
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

  const validateModalForm = () => {
    return modalFormData.description && modalFormData.descriptionAmount;
  };

  const handleSubmit = () => {
    if (!validateMainForm()) {
      alert("Please fill in all fields in the main form!");
      return;
    }
    // Submit the main form data to the records
    setRecords([...records, ...forms]);

    // Reset the main form
    setForms([{
      name: "Dealer1",
      description: "Silk",
      descriptionAmount: "500",
      payment: "",
      duePayment: "10000",
      bank: "",
      cheque: "",
      total: "500",
      date: formattedToday,
      dropdown: ""
    }]);
  };

  const handleModalSubmit = () => {
    if (!validateModalForm()) {
      alert("Please fill in all fields in the modal!");
      return;
    }

    // Create a new record from modal data
    const newRecord = {
      name: forms[0].name, // Use the name from the main form
      description: modalFormData.description,
      descriptionAmount: modalFormData.descriptionAmount,
      payment: "", // Default payment
      bank: "", // No bank info in modal
      cheque: "", // No cheque info in modal
      total: modalFormData.descriptionAmount, // Set total to description amount
      date: formattedToday,
    };

    // Add the new record to the records
    setRecords([...records, newRecord]);

    // Reset modal data
    setModalFormData({ description: "", descriptionAmount: "" });
    setIsModalOpen(false);
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
        <button onClick={handleSubmit} className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all">Save</button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modal" overlayClassName="overlay">
        <div>
          <h3 className="text-lg font-semibold mb-4">Data Entry</h3>
          <div className="gap-4 my-4">
            <div className="w-full">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={forms[0].name}
                onChange={(e) => handleChange(0, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Name"
              />
            </div>

            <div className="w-full">
            <input type="text" name="form" value="Payment Form" onChange={handleModalChange} placeholder="Enter Form" hidden className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" />
            </div>

            <div className="w-full">
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="text"
                name="date"
                value={forms[0].date}
                disabled
                className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-full">
              <label className='block text-gray-700 font-medium'>Description</label>
              <input type="text" name="description" value={modalFormData.description} onChange={handleModalChange} placeholder="Enter Description" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" />
            </div>

            <div className="w-full">
              <input type="text" name="form" value="Data Entry" onChange={handleModalChange} placeholder="Enter Form" hidden className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" />
            </div>

            <div className="w-full">
              <label className='block text-gray-700 font-medium'>Description Amount</label>
              <input type="number" name="descriptionAmount" value={modalFormData.descriptionAmount} onChange={handleModalChange} placeholder="Enter Amount" className="h-10 w-full border-2 border-gray-300 rounded-lg p-2" />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={handleModalSubmit} className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all">Save</button>
            <button onClick={() => setIsModalOpen(false)} className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all">Close</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DealerKapraForm;