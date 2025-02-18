
import { useState } from "react";

const KarigerForm = ({ records, setRecords, lastTagNumber, setLastTagNumber }) => {
  const today = new Date().toISOString().split("T")[0];
  const [forms, setForms] = useState([
    {
      date: today,
      role: "",
      quantity: "",
      bill: "",
      tag: `AB-${lastTagNumber}`,
      items: "",
      color: "",
      fabric: "",
      description: "",
      design: "",
      rate: "",
      payment: "",
      duePayment: "",
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
      ...(name === "role" && value === "Shop" ? { bill: "Shop" } : {}),
    };
    setForms(updatedForms);
  };

  const [name, setName] = useState("");

  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        date: today,
        role: "",
        quantity: "",
        bill: "",
        tag: `AB-${lastTagNumber + forms.length}`,
        items: "",
        color: "",
        fabric: "",
        description: "",
        design: "",
        rate: "",
        payment: "",
        duePayment: "",
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

    if (forms.some(form => Object.values({ ...form, duePayment: "ignored" }).some(v => v === ""))) {
      alert("Please fill in required fields!");
      return;
    }

    const newRecords = forms.map((form, index) => ({
      ...form,
      name,
      tag: `AB-${lastTagNumber + index}`,
      date: today.split("-").reverse().join("-"),
      duePayment: form.duePayment.trim() === "" ? "-" : form.duePayment,
    }));

    setRecords([...records, ...newRecords]);
    setLastTagNumber(lastTagNumber + forms.length);

    setForms([
      {
        date: today,
        role: "",
        quantity: "",
        bill: "",
        tag: `AB-${lastTagNumber + forms.length}`,
        items: "",
        color: "",
        fabric: "",
        description: "",
        design: "",
        rate: "",
        payment: "",
        duePayment: "",
      },
    ]);
  };

  return (
    <div className="p-6 w-full max-h-[80vh] relative mb-10">
      <h2 className="text-xl font-semibold text-center mb-6">Kariger</h2>

      <div className="flex items-center justify-between w-full mb-5">
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
              <label className="block text-gray-700 font-medium">Due Amount</label>
              <input
                disabled
                type="number"
                name="dues"
                value="5000"
                onChange={handleChange}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

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
              <label className="block text-gray-700 font-medium">Shop/Order</label>
              <select
                name="role"
                value={formData.role}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select</option>
                <option value="Shop">Shop</option>
                <option value="Order">Order</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Tag No</label>
              <input
                type="text"
                name="tag"
                value={formData.tag}
                disabled
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 bg-gray-200 text-gray-600"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Bill No</label>
              <input
                type="number"
                name="bill"
                value={formData.role === "Shop" ? "Shop" : formData.bill}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Bill No"
                required
                disabled={formData.role === "Shop"} 
              />
            </div>


            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Item</label>
              <input
                type="text"
                name="items"
                value={formData.items}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Item"
              />
            </div>
          </div>

          <div className="flex gap-4 my-4">

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Color"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Fabric</label>
              <input
                name="fabric"
                type="text"
                value={formData.fabric}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              />
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
              <label className="block text-gray-700 font-medium">Design</label>
              <input
                type="text"
                name="design"
                value={formData.design}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Design"
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

            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Payment</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select Payment</option>
                <option value="Paid">Paid</option>
                <option value="To be Paid">To be Paid</option>
              </select>
            </div>

            {formData.payment === "To be Paid" && (
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Due Payment</label>
                <input
                  type="text"
                  name="duePayment"
                  value={formData.duePayment}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Due Payment"
                />
              </div>

            )}
          </div>

          <div className="mt-15"></div>

          <div className="flex justify-end">
            <button
              onClick={() => handleRemoveForm(index)}
              className="bg-red-500 mb-5 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
            >
              ✕
            </button>
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
  );
};

export default KarigerForm;