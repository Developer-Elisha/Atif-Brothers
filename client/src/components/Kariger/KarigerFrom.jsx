import { useState } from "react";
import Modal from "./Modal"; // Assuming this is the import for the external Modal component

const KarigerForm = ({ records, setRecords, lastTagNumber, setLastTagNumber }) => {
  // Define state for modals
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenLess, setIsOpenLess] = useState(false);
  
  // Define form data for modals
  const [formDataAdd, setFormDataAdd] = useState({ billNo: "", description: "", amount: "" });
  const [formDataLess, setFormDataLess] = useState({ billNo: "", description: "", amount: "" });

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

  const today = new Date().toISOString().split("T")[0];
  const bankAccounts = ["Meezan", "UBL", "Faisal", "Easypaisa", "Jazzcash"];
  const [name, setName] = useState("Kariger1");
  const [forms, setForms] = useState([
    {
      date: today,
      role: "",
      quantity: "5",
      bill: "",
      tag: `AB-101`,
      items: "5",
      color: "Red",
      fabric: "Cotton",
      description: "Red Cotton Shirt",
      design: "New arrival",
      rate: "",
      duePayment: "5000",
      payment: "",
      bank: "",
      dropdown: "Data Entry", // Default value
    },
  ]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedForms = [...forms];
    updatedForms[index] = {
      ...updatedForms[index],
      [name]: value,
      ...(name === "role" && value === "Shop" ? { bill: "Shop" } : {}),
      ...(name === "role" && value !== "Shop" ? { bill: "" } : {}),
    };

    // If "Payment" is selected, hide other inputs
    if (name === "dropdown" && value === "Payment") {
      updatedForms[index] = {
        ...updatedForms[index],
        dueAmount: updatedForms[index].dueAmount || "",
        amount: updatedForms[index].amount || "",
        totalBalance: updatedForms[index].totalBalance || "",
        quantity: "5",
        items: "5",
        color: "Red",
        fabric: "Cotton",
        description: "Red Cotton Shirt",
        design: "New arrival",
        rate: "",
        payment: "",
        bank: "",
      };
    }

    // Calculate amount if rate or quantity changes
    if (name === "rate" || name === "quantity") {
      const rate = parseFloat(updatedForms[index].rate) || 0;
      const quantity = parseFloat(updatedForms[index].quantity) || 0;
      updatedForms[index].amount = (rate * quantity).toFixed(2);
    }

    if (name === "payment" && value !== "Bank") {
      updatedForms[index].bank = "";
    }

    setForms(updatedForms);
  };

  const handleAddForm = () => {
    setForms([
      ...forms,
      {
        date: today,
        role: "",
        quantity: "5",
        bill: "",
        tag: `AB-${lastTagNumber + forms.length}`,
        items: "5",
        color: "Red",
        fabric: "Cotton",
        description: "Red Cotton Shirt",
        design: "New arrival",
        rate: "",
        duePayment: "5000",
        payment: "",
        bank: "",
        dropdown: "Data Entry",
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
      tag: `AB-${lastTagNumber + index + 1}`,
      date: today.split("-").reverse().join("-"),
      duePayment: form.duePayment.trim() === "" ? "-" : form.duePayment,
    }));

    setRecords([...records, ...newRecords]);
    setLastTagNumber(lastTagNumber + forms.length);

    // Reset the form after submission
    setForms([
      {
        date: today,
        role: "",
        quantity: "5",
        bill: "",
        tag: `AB-${lastTagNumber + forms.length + 1}`,
        items: "5",
        color: "Red",
        fabric: "Cotton",
        description: "Red Cotton Shirt",
        design: "New arrival",
        rate: "",
        duePayment: "5000",
        payment: "",
        bank: "",
        dropdown: "Data Entry",
      },
    ]);
  };

  return (
    <div className="p-6 w-full max-h-[80vh] relative mb-10">
      <h2 className="text-xl font-semibold text-center mb-6">Kariger</h2>
      <div className="flex items-center justify-between w-full mb-5">
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
              <label className="block text-gray-700 font-medium">Dropdown</label>
              <select
                name="dropdown"
                value={formData.dropdown}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="Data Entry">Data Entry</option>
                <option value="Payment">Payment</option>
              </select>
            </div>

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
          </div>

          {formData.dropdown === "Payment" ? (
            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Total Balance</label>
                <input
                  type="number"
                  name="totalBalance"
                  value={formData.totalBalance || ""}
                  onChange={(e) => handleChange(index, e)}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-4 my-4">
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
                    type="text"
                    name="bill"
                    value={formData.bill}
                    onChange={(e) => handleChange(index, e)}
                    className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                    placeholder="Enter Bill No"
                    required
                    disabled={formData.role === "Shop"} />
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
                  <label className="block text-gray-700 font-medium">Amount</label>
                  <input
                    type="text"
                    disabled
                    name="amount"
                    value={formData.amount}
                    className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1 text-gray-600"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 my-4 mt-20">
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium">Payment</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={(e) => handleChange(index, e)}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select</option>
                <option value="Bank">Bank</option>
                <option value="Cash">Cash</option>
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
                  {bankAccounts.map((bank, i) => (
                    <option key={i} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

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

// Rename the Modal component to avoid naming conflict
const ModalComponent = ({ title, isOpen, onClose, formData, handleChange, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <label className="block mb-2">Bill No:</label>
        <input
          type="text"
          name="billNo"
          value={formData.billNo}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <label className="block mb-2">Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        />

        <div className="flex justify-end space-x-3">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-purple-300 text-white px-4 py-2 rounded" onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};