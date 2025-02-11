import { FaEdit, FaTrash } from "react-icons/fa";

const staffMembers = [
  { name: "Some One", role: "Sales Men", address: "Karachi" },
  { name: "Some One", role: "Sales Men", address: "Karachi" },
  { name: "Some One", role: "Sales Men", address: "Karachi" },
  { name: "Some One", role: "Sales Men", address: "Karachi" },
];

const StaffTable = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 w-[90%] max-w-4xl overflow-x-auto">
      <h2 className="bg-purple-600 text-white p-3 rounded-t-lg font-semibold">Staff</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">Role</th>
            <th className="py-3 px-6">address</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {staffMembers.map((staff, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-3 px-6 font-semibold">{staff.name}</td>
              <td className="py-3 px-6 text-purple-600">{staff.role}</td>
              <td className="py-3 px-6">{staff.address}</td>
              <td className="py-3 px-6 flex gap-2">
                <button className="text-blue-500"><FaEdit /></button>
                <button className="text-red-500"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-purple-600 text-white py-2 px-4 mt-4 rounded-lg flex items-center gap-2">
        ➕ Add Staff
      </button>
    </div>
  );
};

export default StaffTable;
