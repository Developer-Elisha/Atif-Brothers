import React from "react";
import { LogOut } from "lucide-react";
import Logo from "../../public/Logo.jpeg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("profilePic"); // Remove profile pic if stored

    // Redirect to login page
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-purple-100 py-4 px-6 flex justify-between items-center">
      <div className="text-purple-500 text-3xl font-bold">
        Atif Brothers
      </div>

      <div className="flex items-center space-x-4">
        <img
          src={Logo}
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
