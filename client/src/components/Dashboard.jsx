import { useState } from "react";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([]);

  const fabricOptions = ["Cotton", "Silk", "Linen", "Wool", "Denim", "Polyester"];

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    role: "",
    quantity: "",
    bill: "",
    tag: "",
    items: "",
    color: "",
    fabric: "",
    description: "",
    design: "",
    rate: "",
    payment: "",
    duePayment: "", // Added due payment field
  });

  const capitalizeFirstLetter = (text) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return day && month && year ? `${day}-${month}-${year}` : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.trim();

    if (["name", "fabric", "design", "color"].includes(name)) {
      formattedValue = capitalizeFirstLetter(formattedValue);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = () => {
    if (Object.values(formData).some(value => value === "")) {
      alert("Please fill in required fields!");
      return;
    }

    const newRecord = { ...formData, date: formatDate(formData.date) };
    setRecords([...records, newRecord]);

    setIsModalOpen(false);
    setFormData({ name: "", role: "", date: "", quantity: "", bill: "", tag: "", items: "", color: "", fabric: "", description: "", design: "", rate: "", payment: "", duePayment: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-full overflow-x-auto">
      <div className="flex justify-end">
        <button
          className="bg-purple-200 text-black py-2 px-4 my-4 rounded-lg cursor-pointer hover:bg-purple-300 transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          ➕ New Record
        </button>
      </div>

      <h2 className="bg-purple-300 text-black p-3 rounded-t-lg font-semibold">Record</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-center">Name</th>
              <th className="py-3 px-6 text-center">Role</th>
              <th className="py-3 px-6 text-center">Date</th>
              <th className="py-3 px-6 text-center">Quantity</th>
              <th className="py-3 px-6 text-center">Bill No</th>
              <th className="py-3 px-6 text-center">Tag No</th>
              <th className="py-3 px-6 text-center">Item</th>
              <th className="py-3 px-6 text-center">Color</th>
              <th className="py-3 px-6 text-center">Fabric</th>
              <th className="py-3 px-6 text-center">Description</th>
              <th className="py-3 px-6 text-center">Design</th>
              <th className="py-3 px-6 text-center">Rate</th>
              <th className="py-3 px-6 text-center">Payment</th>
              <th className="py-3 px-6 text-center">Dues</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {records.length > 0 ? (
              records.map((worker, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-3 px-6 text-center font-semibold whitespace-nowrap">{worker.name}</td>
                  <td className="py-3 px-6 text-center font-semibold whitespace-nowrap">{worker.role}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.date}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.quantity}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.bill}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.tag}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.items}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.color}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.fabric}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.description}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.design}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.rate}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.payment}</td>
                  <td className="py-3 px-6 text-center whitespace-nowrap">{worker.duePayment}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 px-6 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-[600px] max-h-[80vh] overflow-y-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-900 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold textbla mb-6 text-center">New Record</h2>

            <div className="my-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Name"
                required
              />
            </div>

            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date || ""}
                  onChange={handleChange}
                  className="h-10 w-full border-2 text-gray-400 border-gray-300 rounded-lg p-2 mt-1"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  required
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Customer">Customer</option>
                  <option value="Kariger">Kariger</option>
                </select>


              </div>
            </div>

            <div className="my-4">
              <label className="block text-gray-700 font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
              />

            </div><div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Bill No</label>
                <input
                  type="number"
                  name="bill"
                  value={formData.bill}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Bill No"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Tag No</label>
                <input
                  type="number"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Tag No"
                  required
                />

              </div>
            </div>

            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Item</label>
                <input
                  type="text"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Item"
                />

              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Color</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Color"
                />
              </div>
            </div>

            <div className="my-4">
              <label className="block text-gray-700 font-medium">Fabric</label>
              <select
                name="fabric"
                value={formData.fabric}
                onChange={handleChange}
                className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select Fabric</option>
                {fabricOptions.map((fabric) => (
                  <option key={fabric} value={fabric}>
                    {fabric}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Description"
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Design</label>
                <input
                  type="text"
                  name="design"
                  value={formData.design}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Design"
                />
              </div>
            </div>

            <div className="my-4">
              <label className="block text-gray-700 font-medium">Rate</label>
              <input
                type="text"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                placeholder="Enter Rate"
                required
              />
            </div>

            <div className="my-4">
              <label className="block text-gray-700 font-medium">Payment</label>
              <select
                name="payment"
                value={formData.payment}
                onChange={handleChange}
                className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                required
              >
                <option value="" disabled>Select Payment</option>
                <option value="Paid">Paid</option>
                <option value="To be Paid">To be Paid</option>
              </select>
            </div>

            {formData.payment === "To be Paid" && (
              <div className="my-4">
                <label className="block text-gray-700 font-medium">Due Payment</label>
                <input
                  type="text"
                  name="duePayment"
                  value={formData.duePayment}
                  onChange={handleChange}
                  className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Due Payment"
                />
              </div>
            )}


            <button
              className="mt-6 w-full bg-purple-200 text-black py-2 cursor-pointer px-4 rounded-lg hover:bg-purple-300 transition-all duration-200"
              onClick={handleSubmit}
            >
              Save Record
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
