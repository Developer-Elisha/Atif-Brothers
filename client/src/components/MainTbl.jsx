import { useState } from "react";

const MainTbl = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([]);

  const fabricOptions = ["Cotton", "Silk", "Linen", "Wool", "Denim", "Polyester"];

  const [formData, setFormData] = useState({
    name: "",
    fabric: "",
    design: "",
    colors: "",
    bill: "",
    items: "",
    date: "",
  });


  const capitalizeFirstLetter = (text) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
  };


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value.trim();

    if (["name", "fabric", "design", "colors"].includes(name)) {
      formattedValue = capitalizeFirstLetter(formattedValue);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.fabric || !formData.design || !formData.colors || !formData.bill || !formData.items || !formData.date) {
      alert("Please fill in required fields!");
      return;
    }

    const newRecord = { ...formData, date: formatDate(formData.date) };
    setRecords([...records, newRecord]);

    setIsModalOpen(false);
    setFormData({ name: "", fabric: "", design: "", colors: "", bill: "", items: "", date: "" });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[90%] max-w-4xl overflow-x-auto">
      <div className="flex justify-end">
        <button
          className="bg-purple-200 text-black py-2 px-4 my-4 rounded-lg cursor-pointer hover:bg-purple-300 transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          ➕ New Record
        </button>
      </div>

      <h2 className="bg-purple-300 text-black p-3 rounded-t-lg font-semibold">Record</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-center">Name</th>
            <th className="py-3 px-6 text-center">Fabric</th>
            <th className="py-3 px-6 text-center">Design</th>
            <th className="py-3 px-6 text-center">Color</th>
            <th className="py-3 px-6 text-center">Bill</th>
            <th className="py-3 px-6 text-center">Items</th>
            <th className="py-3 px-6 text-center">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {records.length > 0 ? (
            records.map((worker, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-6 text-center font-semibold">{worker.name}</td>
                <td className="py-3 px-6 text-center">{worker.fabric}</td>
                <td className="py-3 px-6 text-center">{worker.design}</td>
                <td className="py-3 px-6 text-center">{worker.colors}</td>
                <td className="py-3 px-6 text-center">{worker.bill}</td>
                <td className="py-3 px-6 text-center">{worker.items}</td>
                <td className="py-3 px-6 text-center">{worker.date}</td>
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




      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center p-4">
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

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Colors</label>
                <input
                  type="text"
                  name="colors"
                  value={formData.colors}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Colors"
                />
              </div>
            </div>

            <div className="flex gap-4 my-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Bill</label>
                <input
                  type="number"
                  name="bill"
                  value={formData.bill}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Bill Amount"
                  required
                />
              </div>

              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Items</label>
                <input
                  type="number"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  className="h-10 w-full border-2  border-gray-300 rounded-lg p-2 mt-1"
                  placeholder="Enter Items Count"
                  required
                />
              </div>
            </div>

            <div className="my-4">
              <label className="block text-gray-700 font-medium">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="h-10 w-full border-2 text-gray-400  border-gray-300 rounded-lg p-2 mt-1"
              />
            </div>

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

export default MainTbl;
