import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaHome, FaUser, FaBars, FaAddressCard, FaClone, 
  FaMoneyBill, FaMoneyBillWave, FaStore, 
  FaAddressBook,
  FaCut
} from "react-icons/fa";
import { BanknoteIcon } from "lucide-react";

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
        <SidebarItem to="/customer" icon={<FaMoneyBillWave size={20} />} label="Customer" isOpen={isOpen} />
        <SidebarItem to="/dashboard" icon={<FaUser size={20} />} label="Kariger" isOpen={isOpen} />
        <SidebarItem to="/kapra" icon={<FaClone size={20} />} label="Kapra" isOpen={isOpen} />
        <SidebarItem to="/dealer" icon={<FaStore size={20} />} label="Dealer Kapra" isOpen={isOpen} />
        <SidebarItem to="/expense" icon={<FaMoneyBill size={20} />} label="Expense" isOpen={isOpen} />
        <SidebarItem to="/staff" icon={<FaAddressCard size={20} />} label="Staff" isOpen={isOpen} />
        <SidebarItem to="/details" icon={<FaAddressBook size={20} />} label="Details" isOpen={isOpen} />
        <SidebarItem to="/bank" icon={<BanknoteIcon size={20} />} label="Bank" isOpen={isOpen} />
        <SidebarItem to="/stitching" icon={<FaCut size={20} />} label="Stitching" isOpen={isOpen} />
      </ul>
    </div>
  );
};

// SidebarItem Component for Reusability
const SidebarItem = ({ to, icon, label, isOpen }) => (
  <Link to={to}>
    <li className="flex items-center gap-x-4 p-2 text-white cursor-pointer hover:bg-purple-400 rounded-md mt-4">
      {icon}
      {isOpen && <span className="transition-opacity duration-300">{label}</span>}
    </li>
  </Link>
);

export default Sidebar;
