import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DailyExpense from "./components/DailyExpense/DailyExpense";
import KarigerDashboard from "./components/Kariger/KarigerDashboard";
import Layout from "./components/Layout";
import ShowroomLayout from "./components/ShowroomLayout";
import StaffDashboard from "./components/Staff/StaffDashboard";
import KapraDashboard from "./components/Kapra/KapraDashboard";
import CustomerDashboard from "./components/Customers/CustomerDashboard";
import ExpenseDashboard from "./components/Expense/ExpenseDashboard";
import DealerDashboard from "./components/KapraDealer/DealarDashboard";
import DetailsDashboard from "./components/Details/DetailsDashboard";
import BankDashboard from "./components/Bank/BankDashboard";
import DastiDashboard from "./components/Dasti/DastiDashboard";
import ReturnDashboard from "./components/Return/ReturnDashboard";
import TailorDashboard from "./components/Tailor/TailorDashboard";
import MiscellaneousDashboard from "./components/Miscellaneous/MiscellaneousDashboard";
import DilNawazDashboard from "./components/DilNawaz/DilNawaz";
import ShowroomDailyExpense from "./components/ShowroomDailyExpense/ShowroomDailyExpense";
import ShowroomStaffDashboard from "./components/ShowroomStaff/ShowroomStaffDashboard";
import ShowroomCustomerDashboard from "./components/ShowroomCustomers/ShowroomCustomerDashboard";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/showroom"
          element={<ShowroomLayout><ShowroomDailyExpense /></ShowroomLayout>}
        /> 
        
        <Route
          path="/showroomcustomer"
          element={<ShowroomLayout><ShowroomCustomerDashboard /></ShowroomLayout>}
        /> 
        
        <Route
          path="/showroomstaff"
          element={<ShowroomLayout><ShowroomStaffDashboard /></ShowroomLayout>}
        />
        <Route
          path="/"
          element={<Layout><DailyExpense /></Layout>}
        /> 
        <Route
          path="/staff"
          element={<Layout><StaffDashboard /></Layout>}
        />
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
          path="/expense"
          element={<Layout><ExpenseDashboard /></Layout>}
        /> 
        <Route
          path="/dealer"
          element={<Layout><DealerDashboard /></Layout>}
        /> 
        <Route
          path="/details"
          element={<Layout><DetailsDashboard /></Layout>}
        /> 
        <Route
          path="/bank"
          element={<Layout><BankDashboard /></Layout>}
        /> 
        <Route
          path="/dasti"
          element={<Layout><DastiDashboard /></Layout>}
        /> 
        <Route
          path="/return"
          element={<Layout><ReturnDashboard /></Layout>}
        /> 
        <Route
          path="/tailor"
          element={<Layout><TailorDashboard /></Layout>}
        /> 
        <Route
          path="/miscellaneous"
          element={<Layout><MiscellaneousDashboard /></Layout>}
        /> 
        <Route
          path="/brother"
          element={<Layout><DilNawazDashboard /></Layout>}
        />

        
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;