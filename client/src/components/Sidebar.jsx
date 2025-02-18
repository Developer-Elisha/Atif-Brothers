import React, { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars, FaNetworkWired, FaTencentWeibo, FaAddressBook, FaAddressCard, FaClone, FaAnkh, FaFastBackward, FaMoneyBill, FaMoneyBillAlt, FaMoneyCheck, FaMoneyCheckAlt, FaMoneyBillWave, FaBlackTie, FaMoneyBillWaveAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`bg-purple-300 min-h-screen p-5 pt-8 duration-300 ${isOpen ? "w-60" : "w-20"} relative`}>
      {/* Adjusted FaBars position to align with the content */}
      <FaBars
        className="absolute top-8 left-8 text-white cursor-pointer"
        size={24}
        onClick={() => setIsOpen(!isOpen)}
      />
      <ul className="pt-10">
        <Link to="/">
          <li className="flex items-center gap-x-4 p-2 text-white cursor-pointer hover:bg-purple-400 rounded-md">
            <FaHome size={20} />
            {isOpen && <span>Daily Expense</span>}
          </li>
        </Link>
        <Link to="/staff">
          <li className="flex items-center gap-x-4 p-2 text-white cursor-pointer hover:bg-purple-400 rounded-md mt-4">
            <FaAddressCard size={20} />
            {isOpen && <span>Staff</span>}
          </li>
        </Link>
        <Link to="/dashboard">
          <li className="flex items-center gap-x-4 p-2 text-white cursor-pointer hover:bg-purple-400 rounded-md mt-4">
            <FaUser size={20} />
            {isOpen && <span>Kariger</span>}
          </li>
        </Link>
        <Link to="/kapra">
          <li className="flex items-center gap-x-4 p-2 text-white cursor-pointer hover:bg-purple-400 rounded-md mt-4">
            <FaClone size={20} />
            {isOpen && <span>Kapra</span>}
          </li>
        </Link>
        <Link to="/customer">
          <li className="flex items-center gap-x-4 p-2 text-white cursor-pointer hover:bg-purple-400 rounded-md mt-4">
            <FaMoneyBillWave size={20} />
            {isOpen && <span>Customer</span>}
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
