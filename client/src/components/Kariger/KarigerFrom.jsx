import React, { useEffect, useState } from "react";
import MainForm from "./MainForm";
import Modal from "./Modal";
import Given from "./Given"; // Import the Given component

const KarigerForm = ({ records, setRecords, lastTagNumber: propLastTagNumber, setLastTagNumber: propSetLastTagNumber, editIndex, setEditIndex }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenLess, setIsOpenLess] = useState(false);
  const [isGivenOpen, setIsGivenOpen] = useState(false);

  const [formDataAdd, setFormDataAdd] = useState({ billNo: "", description: "", amount: "" });
  const [formDataLess, setFormDataLess] = useState({ billNo: "", description: "", amount: "" });

  const [lastSuitNumber, setLastSuitNumber] = useState(1);
  const [lastTagNumber, setLastTagNumber] = useState(propLastTagNumber);
  const [name, setName] = useState(""); // Added state for name
  const [shortCode, setShortCode] = useState("");

  useEffect(() => {
    if (editIndex !== null) {
      const recordToEdit = records[editIndex];
      setForms([recordToEdit]);
    }
  }, [editIndex, records]);

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const nameOptions = [
    { name: "Adnan attari", code: "ADN" },
    { name: "Amir Orangi", code: "AMR" },
    { name: "Amjad Orangi", code: "AMJ" },
    { name: "Arosi Libas", code: "ALM" },
    { name: "Atta Bhai Alipur", code: "ATA" },
    { name: "Dilshad Korangi", code: "DILS" },
    { name: "Faheem bhai", code: "FHM" },
    { name: "Haider Ali qasoor", code: "HYDQ" },
    { name: "Ilyas Orangi", code: "ILY" },
    { name: "Irfan Korangi", code: "IRF" },
    { name: "Ishaq Gujranwala", code: "ISHQ" },
    { name: "Kashif Orangi", code: "KSH" },
    { name: "Qari yaseen", code: "QY" },
    { name: "Riyaz Alipur", code: "RYZ" },
    { name: "Sabir Landhi", code: "SBL" },
    { name: "Shehbaz korangi", code: "SHBZ" },
    { name: "Tanveer Orangi", code: "TANO" },
    { name: "Tanveer qasoor", code: "TANQ" },
    { name: "Waseem khanewal", code: "WS" },
  ];

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    setName(selectedName);
    const selectedOption = nameOptions.find(option => option.name === selectedName);
    setShortCode(selectedOption ? selectedOption.code : "");
  };

  const [forms, setForms] = useState([
    {
      date: formattedToday,
      role: "",
      quantity: "",
      bill: "",
      tag: `AB-${propLastTagNumber}`,
      suit: `S-1`,
      items: "",
      color: "",
      fabric: "",
      description: "",
      design: "",
      rate: "",
      payby: "",
      duePayment: "",
      payment: "",
      bank: "",
      dropdown: "",
      cheque: "",
      chequeimg: "",
      category: "",
      total: "0",
    },
  ]);

  const handleModalChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAmountChange = (isAdding) => {
    const formData = isAdding ? formDataAdd : formDataLess;
    const amountValue = parseFloat(formData.amount);

    if (!formData.suitNo || isNaN(amountValue)) {
      alert("Please enter Suit No and a valid Amount");
      return;
    }

    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.suit === formData.suitNo
          ? {
            ...record,
            description: formData.description || record.description,
            rate: (parseFloat(record.rate) + (isAdding ? amountValue : -amountValue)).toString(),
            dueAmount: (parseFloat(record.dueAmount) + (isAdding ? amountValue : -amountValue)).toString(),
            shopName: formData.shopName || record.shopName,
            tagNo: formData.tagNo || record.tagNo,
            details: formData.details || record.details,
          }
          : record
      )
    );

    if (isAdding) {
      setIsOpenAdd(false);
      setFormDataAdd({ billNo: "", suitNo: "", description: "", amount: "", order: "", shopName: "", tagNo: "", details: "" });
    } else {
      setIsOpenLess(false);
      setFormDataLess({ billNo: "", suitNo: "", description: "", amount: "", order: "", shopName: "", tagNo: "", details: "" });
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
      ...(name === "role" && value === "Shop" ? { bill: "Shop" } : {}),
      ...(name === "role" && value !== "Shop" ? { bill: "" } : {}),
    };

    if (name === "rate" || name === "category") {
      const rate = parseFloat(updatedForms[index].rate) || 0;
      const category = parseFloat(updatedForms[index].category) || 0;
      let total = category + rate;

      updatedForms[index].total = total % 1 === 0 ? total.toFixed(0) : total.toFixed(2);
    }

    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        date: formattedToday,
        role: "",
        quantity: "",
        bill: "",
        tag: `AB-${propLastTagNumber + forms.length}`,
        suit: `S-${lastSuitNumber + forms.length}`,
        items: "",
        color: "",
        fabric: "",
        description: "",
        design: "",
        payby: "",
        rate: "",
        duePayment: "",
        payment: "",
        bank: "",
        dropdown: "",
        cheque: "",
        chequeimg: "",
        category: "",
        total: "0",
      },
    ]);
  };

  const handleRemoveForm = (index) => {
    if (forms.length === 1) return;
    setForms(forms.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a name!");
      return;
    }
  
    const newRecords = forms.map((form, index) => {
      const calculateTagAmount = (total) => {
        if (!total) return '';
        const amount = parseInt(total);
        if (isNaN(amount)) return '';
  
        if (amount >= 260000 && amount < 270000) {
          const numberPart = Math.floor((amount - 260000) / 1000);
          return `Z${numberPart}k`;
        }
  
        if (amount >= 1000 && amount < 260000) {
          const letterCode = amount < 10000 ? '' :
            String.fromCharCode(65 + Math.floor((amount - 10000) / 10000));
          const numberPart = Math.floor((amount % 10000) / 1000);
          return `${letterCode}${numberPart}k`;
        }
        return '';
      };
  
      // If editing, retain the original tag and suit values
      const originalRecord = editIndex !== null ? records[editIndex] : null;
  
      return {
        ...form,
        name: name,
        shortCode: shortCode,
        tagAmount: calculateTagAmount(form.total),
        tag: originalRecord ? originalRecord.tag : `AB-${propLastTagNumber + index}`, // Use original tag if editing
        suit: originalRecord ? originalRecord.suit : `S-${lastSuitNumber + index}`, // Use original suit if editing
        date: form.date,
        duePayment: form.duePayment || "-",
        total: form.total || "0"
      };
    });
  
    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = newRecords[0];
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setRecords([...records, ...newRecords]);
    }
  
    // Only increment lastTagNumber and lastSuitNumber if not editing
    if (editIndex === null) {
      propSetLastTagNumber(propLastTagNumber + forms.length);
      setLastSuitNumber(lastSuitNumber + forms.length);
    }
  
    // Reset the form
    setForms([
      {
        date: formattedToday,
        role: "",
        quantity: "",
        bill: "",
        tag: `AB-${propLastTagNumber + forms.length}`,
        suit: `S-${lastSuitNumber + forms.length}`,
        items: "",
        color: "",
        fabric: "",
        description: "",
        design: "",
        payby: "",
        rate: "",
        duePayment: "",
        payment: "",
        bank: "",
        dropdown: "",
        cheque: "",
        chequeimg: "",
        category: "",
        total: "0",
      },
    ]);
  };

  const getSuitNumbers = (billNo) => {
    return records
      .filter(record => record.bill === billNo)
      .map(record => record.suit);
  };

  return (
    <div className="p-6 w-full max-h-[80vh] relative mb-10">
      <h2 className="text-xl font-semibold text-center mb-6">Kariger</h2>
      <div className="flex items-center justify-center w-full mb-5">
        <button
          className="bg-purple-200 ml-5 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
          onClick={() => setIsOpenAdd(true)}
        >
          Add
        </button>

        <button
          className="bg-purple-200 ml-5 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
          onClick={() => setIsOpenLess(true)}
        >
          Less
        </button>

        <button
          className="bg-purple-200 hover:bg-purple-300 ml-5 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
          onClick={() => setIsGivenOpen(!isGivenOpen)}
        >
          Given
        </button>

        <button
          className="bg-purple-200 hover:bg-purple-300 ml-5 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

      <div className="w-full">
        <div className="flex items-center justify-between w-full mb-5">
          <div className="w-1/2 mx-auto flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Name</label>
              <select
                name="name"
                value={name}
                onChange={handleNameChange}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="">Select Name</option>
                {nameOptions.map((option) => (
                  <option key={option.name} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Short Code</label>
              <input
                type="text"
                value={shortCode}
                readOnly
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 bg-gray-50"
                placeholder="Short Code"
              />
            </div>
          </div>
        </div>

        {forms.map((formData, index) => (
          <MainForm
            key={index}
            formData={formData}
            index={index}
            handleChange={handleChange}
            handleRemoveForm={handleRemoveForm}
          />
        ))}
      </div>

      {isGivenOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
          <div className="bg-white rounded-lg w-[500px]">
            <Given
              records={records}
              setRecords={setRecords}
              setIsGivenOpen={setIsGivenOpen}
            />
          </div>
        </div>
      )}

      <Modal
        title="Add"
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        formData={formDataAdd}
        handleChange={(e) => handleModalChange(e, setFormDataAdd)}
        onSubmit={() => handleSubmitAmountChange(true)}
        getSuitNumbers={getSuitNumbers}
      />

      <Modal
        title="Less"
        isOpen={isOpenLess}
        onClose={() => setIsOpenLess(false)}
        formData={formDataLess}
        handleChange={(e) => handleModalChange(e, setFormDataLess)}
        onSubmit={() => handleSubmitAmountChange(false)}
        getSuitNumbers={getSuitNumbers}
      />

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all"
        >
          {editIndex !== null ? "Update" : "Save Record"}
        </button>
      </div>
    </div>
  );
};

export default KarigerForm;   