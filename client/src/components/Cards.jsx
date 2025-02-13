import React from "react";
import { ArrowDown, ArrowUp, DollarSign, BarChart2 } from "lucide-react";

export function StatsCards() {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 p-6">
      {/* Sales Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start w-full sm:w-64 relative">
        <div className="absolute -top-5 left-5 bg-purple-300 p-4 rounded-xl shadow-md">
          <DollarSign className="text-white" />
        </div>
        <h3 className="text-gray-500 mt-10">Sales</h3>
        <p className="text-3xl font-bold">924</p>
        <p className="text-sm text-gray-500 flex items-center mt-2">
          <ArrowDown className="text-orange-500 mr-1" />
          <span className="text-orange-500">1.10</span> Since yesterday
        </p>
      </div>

      {/* Performance Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start w-full sm:w-64 relative">
        <div className="absolute -top-5 left-5 bg-purple-300 p-4 rounded-xl shadow-md">
          <BarChart2 className="text-white" />
        </div>
        <h3 className="text-gray-500 mt-10">Performance</h3>
        <p className="text-3xl font-bold">49,65%</p>
        <p className="text-sm text-gray-500 flex items-center mt-2">
          <ArrowUp className="text-green-500 mr-1" />
          <span className="text-green-500">12</span> Since last month
        </p>
      </div>

      {/* Sales Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start w-full sm:w-64 relative">
        <div className="absolute -top-5 left-5 bg-purple-300 p-4 rounded-xl shadow-md">
          <DollarSign className="text-white" />
        </div>
        <h3 className="text-gray-500 mt-10">Due Payment</h3>
        <p className="text-3xl font-bold">3000</p>
        <p className="text-sm text-gray-500 flex items-center mt-2">
          <ArrowDown className="text-orange-500 mr-1" />
          <span className="text-orange-500">1.10</span> Since yesterday
        </p>
      </div>

      {/* Performance Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start w-full sm:w-64 relative">
        <div className="absolute -top-5 left-5 bg-purple-300 p-4 rounded-xl shadow-md">
          <BarChart2 className="text-white" />
        </div>
        <h3 className="text-gray-500 mt-10">Profit</h3>
        <p className="text-3xl font-bold">60,45%</p>
        <p className="text-sm text-gray-500 flex items-center mt-2">
          <ArrowUp className="text-green-500 mr-1" />
          <span className="text-green-500">12</span> Since last month
        </p>
      </div>
    </div>
  );
}

export default StatsCards;
