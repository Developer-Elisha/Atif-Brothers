import { useState } from "react";
import MainForm from "./MainForm";
import Modal from "./Modal";

const KarigerForm = ({ records, setRecords, lastTagNumber: propLastTagNumber, setLastTagNumber: propSetLastTagNumber }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenLess, setIsOpenLess] = useState(false);

  const [formDataAdd, setFormDataAdd] = useState({ billNo: "", description: "", amount: "" });
  const [formDataLess, setFormDataLess] = useState({ billNo: "", description: "", amount: "" });

  const [lastSuitNumber, setLastSuitNumber] = useState(1);
  const [lastTagNumber, setLastTagNumber] = useState(propLastTagNumber);

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [name, setName] = useState("Kariger1");
  const [forms, setForms] = useState([
    {
      date: formattedToday,
      role: "",
      quantity: "",
      bill: "",
      tag: `AB-101`,
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
      tagamount: "", 
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

    if (name === "rate" || name === "tagamount") {
      const rate = parseFloat(updatedForms[index].rate) || 0;
      const tagAmount = parseFloat(updatedForms[index].tagamount) || 0;
      let total = tagAmount + rate;
    
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
        tag: `AB-${lastTagNumber + forms.length}`,
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
        tagamount: "",
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

    const newRecords = forms.map((form, index) => ({
      ...form,
      name,
      tag: `AB-${lastTagNumber + index}`,
      suit: `S-${lastSuitNumber + index}`,
      date: form.date,
      duePayment: form.duePayment.trim() === "" ? "-" : form.duePayment,
    }));

    setRecords([...records, ...newRecords]);
    propSetLastTagNumber(lastTagNumber + forms.length);
    setLastSuitNumber(lastSuitNumber + forms.length);

    setForms([
      {
        date: formattedToday,
        role: "",
        quantity: "",
        bill: "",
        tag: `AB-${lastTagNumber + forms.length}`,
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
        tagamount: "",
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
          className="bg-purple-200 hover:bg-purple-300 ml-5 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
          onClick={handleAddForm}
        >
          +
        </button>
      </div>

      <div className="flex items-center justify-between w-full mb-5">
        <div className="w-1/4 mx-auto">
          <label className="block text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Enter Name"
            required
          />
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
          className="mt-6 w-[20%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-300 transition-all duration-200"
          onClick={handleSubmit}
        >
          Save Records
        </button>
      </div>
    </div>
  );
};

export default KarigerForm;