import { useEffect, useState } from "react";
import MainForm from "./MainForm"; // Ensure this component is correctly implemented
import Modal from "./Modal"; // Ensure this component is correctly implemented

const TailorForm = ({ records, setRecords, editIndex, setEditIndex }) => {
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenLess, setIsOpenLess] = useState(false);

  const [formDataAdd, setFormDataAdd] = useState({ billNo: "", description: "", amount: "" });
  const [formDataLess, setFormDataLess] = useState({ billNo: "", description: "", amount: "" });

  const [bankAccounts, setBankAccounts] = useState(["Faysal"]);

  const today = new Date();
  const formattedToday = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;

  const [name, setName] = useState("Tailor");
  const [forms, setForms] = useState([
    {
      date: formattedToday,
      quantity: "",
      bill: "",
      tag: "",
      payby: "",
      items: "",
      color: "",
      fabric: "",
      description: "",
      design: "",
      rate: "",
      duePayment: "",
      payment: "",
      bank: "",
      dropdown: "",
    },
  ]);

  useEffect(() => {
    if (editIndex !== null) {
      const recordToEdit = records[editIndex];
      setForms([recordToEdit]);
    }
  }, [editIndex, records]);

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

    setRecords((prevRecords) => {
      let isUpdated = false;
      const updatedRecords = prevRecords.map((record) => {
        if (record.suit === formData.suitNo) {
          const newRate = (parseFloat(record.rate) + (isAdding ? amountValue : -amountValue)).toString();
          const newDueAmount = (parseFloat(record.dueAmount) + (isAdding ? amountValue : -amountValue)).toString();

          if (record.rate !== newRate || record.dueAmount !== newDueAmount) {
            isUpdated = true;
            return { ...record, rate: newRate, dueAmount: newDueAmount };
          }
        }
        return record;
      });

      return isUpdated ? updatedRecords : prevRecords;
    });


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

    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(updatedForms[index].rate) || 0;
      const quantity = parseFloat(updatedForms[index].quantity) || 0;
      updatedForms[index].amount = (rate * quantity).toFixed(2);
    }

    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        date: formattedToday,

        quantity: "",
        bill: "",
        tag: "",
        payby: "",
        items: "",
        color: "",
        fabric: "",
        description: "",
        design: "",
        rate: "",
        duePayment: "",
        payment: "",
        bank: "",
        dropdown: "",
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
      date: form.date,
      duePayment: form.duePayment.trim() === "" ? "-" : form.duePayment,
    }));

    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = forms[0];
      setRecords(updatedRecords);
      setEditIndex(null);
    } else {
      setRecords([...records, ...forms]);
    }

    setForms([
      {
        date: formattedToday,

        quantity: "",
        bill: "",
        tag: "",
        payby: "",
        items: "",
        color: "",
        fabric: "",
        description: "",
        design: "",
        rate: "",
        duePayment: "",
        payment: "",
        bank: "",
        dropdown: "",
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
      <h2 className="text-xl font-semibold text-center mb-6">Tailor</h2>
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
          bankAccounts={bankAccounts} // Pass bank accounts to MainForm
        />
      ))}

      <Modal
        title="Add"
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        formData={formDataAdd}
        handleChange={(e) => handleModalChange(e, setFormDataAdd)}
        onSubmit={() => handleSubmitAmountChange(true)}
        getSuitNumbers={getSuitNumbers} // Pass the function to the Modal
      />

      <Modal
        title="Less"
        isOpen={isOpenLess}
        onClose={() => setIsOpenLess(false)}
        formData={formDataLess}
        handleChange={(e) => handleModalChange(e, setFormDataLess)}
        onSubmit={() => handleSubmitAmountChange(false)}
        getSuitNumbers={getSuitNumbers} // Pass the function to the Modal
      />

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-purple-200 text-black px-4 py-2 w-[15%] rounded-lg cursor-pointer hover:bg-purple-300 transition-all"
        >
          {editIndex !== null ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default TailorForm;