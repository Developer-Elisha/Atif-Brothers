import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import StatsCards from "./components/Cards";
import MainTbl from "./components/Dashboard";
// import Login from "./components/Login";
import Charts from "./components/Charts";
import BarChart from "./components/BarChart";

const Dashboard = () => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <Header />
    </div>
    <div className="flex flex-col items-center justify-center p-8 mt-20 w-full">
        <StatsCards />

      <MainTbl />

      {/* Charts Container */}
      <div className="mt-5 flex w-[90%] justify-center space-x-4 relative z-10">
        <Charts className="w-full md:w-1/2" />
        <BarChart className="w-full md:w-1/2" />
      </div>
    </div>
  </div>
);


// const PrivateRoute = ({ element }) => {
//   const token = localStorage.getItem("token");
//   return token ? element : <Navigate to="/login" />;
// };

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
