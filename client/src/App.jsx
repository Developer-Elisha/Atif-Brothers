import React from "react";
import Header from "./components/Header";
import StatsCards from "./components/Cards";
import MainTbl from "./components/MainTbl";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <Header />
      </div>
      <div className="flex flex-col items-center justify-center p-8 mt-20">
        <StatsCards />
        <div className="flex flex-col gap-8 items-center w-full">
          {/* <StaffTable /> */}
          <MainTbl />
        </div>
      </div>
    </div>
  );
}

export default App;