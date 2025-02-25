import { useState } from "react";
import OrderForm from "./MainForm";
import Modal from "./Modal";

const CustomerForm = ({ records, setRecords, lastTagNumber, setLastTagNumber, setShowMeasurement }) => {
  const today = new Date().toISOString().split("T")[0];

  const [forms, setForms] = useState([
    {
      date: today,
      phone: "03123456789",
      bill: "10",
      kariger: "Kariger1",
      quantity: "5",
      description: "Black Suit",
      rate: "5000",
      paymentType: "",
      advancePayment: "",
      dueAmount: "",
    },
  ]);

  const [name, setName] = useState("Customer1");
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenLess, setIsOpenLess] = useState(false);

  const [formDataAdd, setFormDataAdd] = useState({
    billNo: "",
    description: "",
    amount: "",
  });

  const [formDataLess, setFormDataLess] = useState({
    billNo: "",
    description: "",
    amount: "",
  });

  const handleModalChange = (e, setFormData) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitAmountChange = (isAdding) => {
    const formData = isAdding ? formDataAdd : formDataLess;
    const amountValue = parseFloat(formData.amount);

    if (!formData.billNo || isNaN(amountValue)) {
      alert("Please enter Bill No and a valid Amount");
      return;
    }

    setRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.bill === formData.billNo
          ? {
              ...record,
              description: formData.description || record.description,
              rate: (parseFloat(record.rate) + (isAdding ? amountValue : -amountValue)).toString(),
              dueAmount: (parseFloat(record.dueAmount) + amountValue).toString(),
            }
          : record
      )
    );

    if (isAdding) {
      setIsOpenAdd(false);
      setFormDataAdd({ billNo: "", description: "", amount: "" });
    } else {
      setIsOpenLess(false);
      setFormDataLess({ billNo: "", description: "", amount: "" });
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setForms((prevForms) => {
      const updatedForms = prevForms.map((form, i) =>
        i === index ? { ...form, [name]: value } : form
      );

      if (["rate", "quantity", "advancePayment"].includes(name)) {
        const rate = parseFloat(updatedForms[index].rate) || 0;
        const quantity = parseFloat(updatedForms[index].quantity) || 0;
        const advance = parseFloat(updatedForms[index].advancePayment) || 0;
        const due = rate * quantity - advance;

        updatedForms[index].dueAmount = due % 1 === 0 ? due.toString() : due.toFixed(2);
      }

      return updatedForms;
    });
  };

  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        date: today,
        phone: "03123456789",
        bill: "10",
        kariger: "Kariger1",
        quantity: "5",
        description: "Black Suit",
        rate: "5000",
        paymentType: "",
        advancePayment: "",
        dueAmount: "",
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

    const isValid = forms.every((form) => {
      const requiredFields = ["phone", "bill", "kariger", "description", "rate", "paymentType"];
      if (requiredFields.some((field) => !form[field]?.trim())) return false;

      if (form.paymentType === "Advance" && (!form.advancePayment?.trim() || !form.dueAmount?.trim())) {
        return false;
      }

      return true;
    });

    if (!isValid) {
      alert("Please fill all required fields correctly.");
      return;
    }

    const newRecords = forms.map((form) => ({
      ...form,
      name,
      date: today.split("-").reverse().join("-"),
      paymentType: form.paymentType || "-",
      advancePayment: form.paymentType === "Advance" ? form.advancePayment : "-",
      dueAmount: form.paymentType === "Advance" ? form.dueAmount : "-",
    }));

    setRecords([...records, ...newRecords]);
    setLastTagNumber(lastTagNumber + forms.length);

    setForms([
      {
        date: today,
        phone: "03123456789",
        bill: "10",
        kariger: "Kariger1",
        quantity: "5",
        description: "Black Suit",
        rate: "5000",
        paymentType: "",
        advancePayment: "",
        dueAmount: "",
      },
    ]);
  };

  return (
    <div className="p-6 w-full max-h-[100vh] relative mb-10 flex">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-center mb-6">Customer</h2>
        <div className="flex items-center justify-between w-full mb-5">
          <button
            className="bg-purple-200 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
            onClick={() => setShowMeasurement((prev) => !prev)} // Toggle Measurement Form
          >
            + Measurements
          </button>
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
          <div className="w-1/3 mx-auto">
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
          <button
            className="bg-purple-200 hover:bg-purple-300 text-black text-2xl cursor-pointer py-2 px-4 rounded-lg"
            onClick={handleAddForm}
          >
            +
          </button>
        </div>

        {forms.map((formData, index) => (
          <OrderForm
            key={index}
            formData={formData}
            index={index}
            handleChange={handleChange}
            handleRemoveForm={handleRemoveForm}
          />
        ))}

        <div className="flex justify-center">
          <button
            className="mt-6 w-[20%] bg-purple-200 text-black cursor-pointer py-2 px-4 rounded-lg hover:bg-purple-300 transition-all duration-200"
            onClick={handleSubmit}
          >
            Save Records
          </button>
        </div>
      </div>

      <Modal
        title="Add"
        isOpen={isOpenAdd}
        onClose={() => setIsOpenAdd(false)}
        formData={formDataAdd}
        handleChange={(e) => handleModalChange(e, setFormDataAdd)}
        onSubmit={() => handleSubmitAmountChange(true)}
      />

      <Modal
        title="Less"
        isOpen={isOpenLess}
        onClose={() => setIsOpenLess(false)}
        formData={formDataLess}
        handleChange={(e) => handleModalChange(e, setFormDataLess)}
        onSubmit={() => handleSubmitAmountChange(false)}
      />
    </div>
  );
};

export default CustomerForm;
