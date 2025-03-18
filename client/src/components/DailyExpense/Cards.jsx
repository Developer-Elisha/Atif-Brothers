import React, { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  BarChart2,
  ShoppingBag,
  Users,
  Banknote,
  Package,
  CreditCard,
  Store,
} from "lucide-react";
import { FaExchangeAlt, FaHandHoldingUsd } from "react-icons/fa";

export function StatsCards() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedDasti, setSelectedDasti] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', data: null });

  const bankAccounts = [
    { name: "Meezan", balance: 5000 },
    { name: "UBL", balance: 12000 },
    { name: "Faysal", balance: 8000 },
    { name: "Easypaisa", balance: 15000 },
    { name: "Jazzcash", balance: 2000 },
  ];

  const dastiOptions = [
    { type: "Dasti Liya", value: 2000 },
    { type: "Dasti Diya", value: 1500 },
  ];

  const returnOptions = [
    { type: "Return Liya", value: 1000 },
    { type: "Return Diya", value: 800 },
  ];

  const handleSelectAccount = (accountName) => {
    const account = bankAccounts.find((acc) => acc.name === accountName);
    setSelectedAccount(account);
    setModalContent({ type: 'bank', data: account });
    setIsModalOpen(true);
  };

  const handleSelectDasti = (dastiType) => {
    const dasti = dastiOptions.find((opt) => opt.type === dastiType);
    setSelectedDasti(dasti);
    setModalContent({ type: 'dasti', data: dasti });
    setIsModalOpen(true);
  };

  const handleSelectReturn = (returnType) => {
    const returnData = returnOptions.find((opt) => opt.type === returnType);
    setSelectedReturn(returnData);
    setModalContent({ type: 'return', data: returnData });
    setIsModalOpen(true);
  };

  const stats = [
    { title: "Received Payment", value: 924, change: 1.1, icon: DollarSign, period: "Today" },
    { title: "Expenses", value: 1000, change: 12, icon: CreditCard, period: "Since last month" },
    { title: "Kariger", value: 3000, change: 1.1, icon: Users, period: "Since last month" },
    { title: "Kapra", value: 924, change: 1.1, icon: ShoppingBag, period: "Today" },
    { title: "Kapra Dealer", value: 1000, change: 12, icon: Store, period: "Since last month" },
    { title: "Staff Salary", value: 3000, change: 1.1, icon: Banknote, period: "Since last month" },
    { title: "Dasti Liya/Diya", type: "dasti", icon: FaHandHoldingUsd, period: "Since last month" },
    { title: "Return Liya/Diya", type: "return", icon: FaExchangeAlt, period: "Since last month" },
    { title: "Stock", value: 3000, change: 1.1, icon: Package, period: "Since last month" },
    { title: "Bank Balance", value: "Select Account", icon: Banknote, period: "Today" },
    { title: "Total Balance", value: 1000, change: 1.1, icon: BarChart2, period: "Since last month"},
  ];

  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-4">
      {stats.map(({ title, value, change, icon: Icon, period, type }, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start w-full sm:w-100 relative">
          <div className="absolute -top-2 left-5 bg-purple-300 p-4 rounded-xl shadow-md">
            <Icon className="text-white" />
          </div>
          <h3 className="text-gray-500 mt-10">{title}</h3>
          {title === "Bank Balance" ? (
            <select onChange={(e) => handleSelectAccount(e.target.value)} className="mt-2 p-2 border rounded cursor-pointer" aria-label="Select Bank Account">
              <option value="">Select Account</option>
              {bankAccounts.map((account) => (
                <option key={account.name} value={account.name}>
                  {account.name}
                </option>
              ))}
            </select>
          ) : type === "dasti" ? (
            <select onChange={(e) => handleSelectDasti(e.target.value)} className="mt-2 p-2 border rounded cursor-pointer" aria-label="Select Dasti Type">
              <option value="">Select Type</option>
              {dastiOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.type}
                </option>
              ))}
            </select>
          ) : type === "return" ? (
            <select onChange={(e) => handleSelectReturn(e.target.value)} className="mt-2 p-2 border rounded cursor-pointer" aria-label="Select Return Type">
              <option value="">Select Type</option>
              {returnOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.type}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-3xl font-bold">{value}</p>
          )}
          {change !== undefined && (
            <p className="text-sm text-gray-500 flex items-center mt-2">
              {change > 0 ? (
                <ArrowUp className="text-green-500 mr-1" />
              ) : (
                <ArrowDown className="text-orange-500 mr-1" />
              )}
              <span className={change > 0 ? "text-green-500" : "text-orange-500"}>{change}</span> {period}
            </p>
          )}
        </div>
      ))}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">
              {modalContent.type === 'bank' ? 'Bank Account Balance' : 
               modalContent.type === 'dasti' ? 'Dasti Details' : 'Return Details'}
            </h2>
            <p className="mt-2 text-lg">
              {modalContent.type === 'bank' 
                ? (modalContent.data ? `${modalContent.data.name}: Rs. ${modalContent.data.balance}` : "Select an account")
                : (modalContent.data ? `${modalContent.data.type}: Rs. ${modalContent.data.value}` : "Select a type")
              }
            </p>
            <button onClick={() => setIsModalOpen(false)} className="mt-4 px-4 py-2 bg-purple-300 text-white rounded-lg cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StatsCards;