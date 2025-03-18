import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, FaUsers, FaBars, FaBox, FaWarehouse, 
  FaMoneyCheckAlt, FaUserTie, FaClipboardList, 
  FaCut, FaMoneyBillWave,
  FaUserFriends,
  FaHandHoldingUsd, 
  FaExchangeAlt,
  FaTshirt,
  FaTasks,
  FaStore
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-purple-300 min-h-screen p-5 pt-8 duration-300 ${isOpen ? "w-60" : "w-20"} relative`}>
      {/* Toggle Button */}
      <div className="flex items-center">
        <FaBars 
          className="text-white cursor-pointer transition-all duration-300"
          size={24} 
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Sidebar Items */}
      <ul className="pt-10">
        <SidebarItem to="/showroom" icon={<FaHome size={20} />} label="Daily Expense" isOpen={isOpen} />
        <SidebarItem to="/showroomcustomer" icon={<FaUsers size={20} />} label="Customers" isOpen={isOpen} />
        <SidebarItem to="/showroomstaff" icon={<FaUserFriends size={20} />} label="Staff" isOpen={isOpen} />
        {/* <SidebarItem to="/" icon={<FaStore size={20} />} label="Main" isOpen={isOpen} /> */}


      </ul>
    </div>
  );
};

// SidebarItem Component for Reusability
const SidebarItem = ({ to, icon, label, isOpen }) => (
  <NavLink 
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-x-4 p-2 text-white cursor-pointer rounded-md mt-4 transition-all duration-300 mr-1 ${
        isActive ? "bg-purple-400" : "hover:bg-purple-500"
      }`
    }
  >
    {icon}
    {isOpen && <span className="transition-opacity duration-300">{label}</span>}
  </NavLink>
);

export default Sidebar;
