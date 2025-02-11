import React from "react";
import { LogOut } from "lucide-react";


export function Header() {
  return (
    <header className="bg-white border-b border-purple-100 py-4 px-6 flex justify-between items-center">
      <div className="text-purple-500 text-3xl font-bold" >
        Atif Brothers
      </div>



      <div className="flex items-center space-x-4">
        <img
          src=""
          alt="User"
          className="h-10 w-10 rounded-full border"
        />

        <button
          onClick={() => console.log("Logout clicked")}
          className="text-purple-600 border border-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>
    </header>
  );
}

export default Header;