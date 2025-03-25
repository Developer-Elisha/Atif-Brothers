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
  FaIdBadge,
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
        <SidebarItem to="/" icon={<FaHome size={20} />} label="Daily Expense" isOpen={isOpen} />
        <SidebarItem to="/customer" icon={<FaUsers size={20} />} label="Customers" isOpen={isOpen} />
        <SidebarItem to="/dashboard" icon={<FaUserTie size={20} />} label="Kariger" isOpen={isOpen} />
        <SidebarItem to="/brother" icon={<FaIdBadge size={20} />} label="Dil Nawaz" isOpen={isOpen} />
        <SidebarItem to="/kapra" icon={<FaBox size={20} />} label="Kapra" isOpen={isOpen} />
        <SidebarItem to="/dealer" icon={<FaWarehouse size={20} />} label="Dealer Kapra" isOpen={isOpen} />
        <SidebarItem to="/expense" icon={<FaMoneyCheckAlt size={20} />} label="Expense" isOpen={isOpen} />
        <SidebarItem to="/staff" icon={<FaUserFriends size={20} />} label="Staff" isOpen={isOpen} />
        <SidebarItem to="/details" icon={<FaClipboardList size={20} />} label="Bill Review" isOpen={isOpen} />
        <SidebarItem to="/bank" icon={<FaMoneyBillWave size={20} />} label="Bank" isOpen={isOpen} />
        {/* <SidebarItem to="/stitching" icon={<FaCut size={20} />} label="Stitching" isOpen={isOpen} /> */}
        <SidebarItem to="/dasti" icon={<FaHandHoldingUsd size={20} />} label="Dasti" isOpen={isOpen} />
        <SidebarItem to="/return" icon={<FaExchangeAlt size={20} />} label="Return" isOpen={isOpen} />
        <SidebarItem to="/tailor" icon={<FaTshirt size={20} />} label="Tailor" isOpen={isOpen} />
        <SidebarItem to="/miscellaneous" icon={<FaTasks size={20} />} label="Miscellaneous" isOpen={isOpen} />
        <SidebarItem to="/showroom" icon={<FaStore size={20} />} label="Showroom" isOpen={isOpen} />

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
