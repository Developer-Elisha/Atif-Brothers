<!-- with login -->

<!-- import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DailyExpense from "./components/DailyExpense/DailyExpense";
import KarigerDashboard from "./components/Kariger/KarigerDashboard";
import Layout from "./components/Layout";
import StaffDashboard from "./components/Staff/StaffDashboard";
import KapraDashboard from "./components/Kapra/KapraDashboard";
import CustomerDashboard from "./components/Customers/CustomerDashboard";
import ExpenseDashboard from "./components/Expense/ExpenseDashboard";
import DealerDashboard from "./components/KapraDealer/DealarDashboard";


const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute element={<Layout><DailyExpense /></Layout>} />}
        />
        <Route
          path="/staff"
          element={<PrivateRoute element={<Layout><StaffDashboard /></Layout>} />}
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Layout><KarigerDashboard /></Layout>} />}
        />
        <Route
          path="/kapra"
          element={<PrivateRoute element={<Layout><KapraDashboard /></Layout>} />}
        />
        <Route
          path="/customer"
          element={<PrivateRoute element={<Layout><CustomerDashboard /></Layout>} />}
        />
        <Route
          path="/dealer"
          element={<PrivateRoute element={<Layout><DealerDashboard /></Layout>} />}
        />
        <Route
          path="/expense"
          element={<Layout><ExpenseDashboard /></Layout>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; -->









<!-- without login -->

<!-- import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DailyExpense from "./components/DailyExpense/DailyExpense";
import KarigerDashboard from "./components/Kariger/KarigerDashboard";
import Layout from "./components/Layout";
import StaffDashboard from "./components/Staff/StaffDashboard";
import KapraDashboard from "./components/Kapra/KapraDashboard";
import CustomerDashboard from "./components/Customers/CustomerDashboard";
import ExpenseDashboard from "./components/Expense/ExpenseDashboard";

// const PrivateRoute = ({ element }) => {
//   const token = localStorage.getItem("token");
//   return token ? element : <Navigate to="/login" replace />;
// };

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={<PrivateRoute element={<Layout><DailyExpense /></Layout>} />}
        /> */}
        <Route
          path="/"
          element={<Layout><DailyExpense /></Layout>}
        />
        {/* <Route
          path="/staff"
          element={<PrivateRoute element={<Layout><StaffDashboard /></Layout>} />}
        /> */}
        <Route
          path="/staff"
          element={<Layout><StaffDashboard /></Layout>}
        />
        {/* <Route
          path="/dashboard"
          element={<PrivateRoute element={<Layout><KarigerDashboard /></Layout>} />}
        /> */}
        <Route
          path="/dashboard"
          element={<Layout><KarigerDashboard /></Layout>}
        />
        <Route
          path="/kapra"
          element={<Layout><KapraDashboard /></Layout>}
        />
        <Route
          path="/customer"
          element={<Layout><CustomerDashboard /></Layout>}
        />
        
        <Route
          path="/dealer"
          element={<Layout><DealerDashboard /></Layout>}
        />
        <Route
          path="/expense"
          element={<Layout><ExpenseDashboard /></Layout>}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; -->


<!-- <div className="mt-4">
            <label className="block text-gray-700 font-medium">Payment Type</label>
            <select name="paymentType" value={formData.paymentType} onChange={(e) => handleChange(index, e)} className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1">
              <option value="">Select Payment Type</option>
              <option value="Advance">Advance</option>
              <option value="Final Pay">Final Pay</option>
            </select>
          </div>

          {formData.paymentType === "Advance" && (
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 font-medium">Advance Payment</label>
                <input type="text" name="advancePayment" value={formData.advancePayment} onChange={(e) => handleChange(index, e)} className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1" placeholder="Enter Advance Payment" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Due Amount</label>
                <input type="text" name="dueAmount" value={formData.dueAmount} onChange={(e) => handleChange(index, e)} className="h-10 w-full border-2 border-gray-300 rounded-lg p-2 mt-1" placeholder="Enter Due Amount" required />
              </div>
            </div>
          )} -->