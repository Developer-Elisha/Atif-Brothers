import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import StatsCards from "./components/Cards";
import MainTbl from "./components/Dashboard";
import Login from "./components/Login";
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
      <div className="mt-5 w-full flex gap-4">
        <div className="w-1/2">
          <Charts />
        </div>
        <div className="w-1/2">
          <BarChart />
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
