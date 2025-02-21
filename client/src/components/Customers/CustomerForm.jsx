import { useState } from "react";
import MeasurementForm from "./Measurements";

const CustomerForm = ({ records, setRecords, lastTagNumber, setLastTagNumber }) => {
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
      payment: "",
      advance: "",
      due: "",
    },
  ]);

  const [showMeasurementForm, setShowMeasurementForm] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];

    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
    };

    if (name === "rate" || name === "advancePayment") {
      const rate = parseFloat(updatedForms[index].rate) || 0;
      const quantity = parseFloat(updatedForms[index].quantity) || 0;
      const advance = parseFloat(updatedForms[index].advancePayment) || 0;
      updatedForms[index].dueAmount = (rate * quantity - advance).toFixed(2);
    }

    setForms(updatedForms);
  };

  const [name, setName] = useState("Customer1");

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
        payment: "",
        advance: "",
        due: "",
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

      if (form.paymentType === "Advance") {
        if (!form.advancePayment?.trim() || !form.dueAmount?.trim()) return false;
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
      <div className={`p-6 ${showMeasurementForm ? "w-[70%]" : "w-full"}`}>
        <h2 className="text-xl font-semibold text-center mb-6">Customer</h2>
        <div className="flex items-center justify-between w-full mb-5">
          <button
            className="bg-purple-200 hover:bg-purple-300 text-black text-lg cursor-pointer py-2 px-4 rounded-lg"
            onClick={() => setShowMeasurementForm(true)}
          >
            + Measurements
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
        <div key={index}>
          <div className="flex gap-4 my-4 mt-20">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                disabled
                className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Phone No:</label>
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Bill No</label>
              <input
                type="text"
                name="bill"
                value={formData.bill}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Bill No"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Kariger Name</label>
              <input
                type="text"
                name="kariger"
                value={formData.kariger}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Quantity"
              />
            </div>
          </div>

          <div className="flex gap-4 my-4">

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Payment Type</label>
              <select name="paymentType" value={formData.paymentType} onChange={(e) => handleChange(index, e)} className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1">
                <option value="">Select Payment Type</option>
                <option value="Advance">Advance</option>
                <option value="Final Pay">Final Pay</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Description"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Rate</label>
              <input
                type="text"
                name="rate"
                value={formData.rate}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Rate"
                required
              />
            </div>

            {formData.paymentType === "Advance" && (
              <>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">Advance Payment</label>
                  <input type="text" name="advancePayment" value={formData.advancePayment} onChange={(e) => handleChange(index, e)} className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1" placeholder="Enter Advance Payment" required />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 font-medium">Due Amount</label>
                  <input type="text" name="dueAmount" disabled value={formData.dueAmount} onChange={(e) => handleChange(index, e)} className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1" placeholder="Enter Due Amount" required />
                </div>
              </>
            )}

            <div className="w-10 mt-8">
              <button
                onClick={() => handleRemoveForm(index)}
                className="bg-red-500 mb-5 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="mt-15 flex justify-end">

          </div>
          <hr />
        </div>
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
      {showMeasurementForm && (
  <div className="w-[30%]  p-6 rounded-lg shadow-lg transition-all duration-300 max-h-[60vh] overflow-y-auto">
    <MeasurementForm setShowMeasurementForm={setShowMeasurementForm} />
  </div>
)}

    </div>
  );
};

export default CustomerForm;
