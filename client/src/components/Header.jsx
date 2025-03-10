import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("profilePic");

    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-purple-100 py-4 px-6 flex justify-between items-center">
      {/* Centered Text */}
      <div className="flex-1 flex justify-between">
        <div className="text-purple-400 text-3xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Atif Brothers
        </div>

        <div className="text-purple-400 text-2xl font-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Passion for Fashion
        </div>
        <div className="text-purple-400 text-3xl font-bold mr-5" style={{ fontFamily: "'Dancing Script', cursive" }}>
          عاطف برادرز
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <img
          src="/Logo.jpeg"
          alt="User"
          className="h-10 w-10 rounded-full border"
        />

        <button
          onClick={handleLogout}
          className="text-purple-600 border border-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
