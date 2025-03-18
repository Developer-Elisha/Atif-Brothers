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
// import StitchingDashboard from "./components/Stitching/StitchingDashboard";
import DastiDashboard from "./components/Dasti/DastiDashboard";
import ReturnDashboard from "./components/Return/ReturnDashboard";
import TailorDashboard from "./components/Tailor/TailorDashboard";
import MiscellaneousDashboard from "./components/Miscellaneous/MiscellaneousDashboard";
import DilNawazDashboard from "./components/DilNawaz/DilNawaz";
import ShowroomDailyExpense from "./components/ShowroomDailyExpense/ShowroomDailyExpense";
import ShowroomStaffDashboard from "./components/ShowroomStaff/ShowroomStaffDashboard";
import ShowroomCustomerDashboard from "./components/ShowroomCustomers/ShowroomCustomerDashboard";

const PrivateRoute = ({ element, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to={userRole === 'admin' ? '/' : '/showroom'} replace />;
  }

  return element;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Showroom Routes - User Only */}
        <Route
          path="/showroom"
          element={<PrivateRoute 
            element={<ShowroomLayout><ShowroomDailyExpense /></ShowroomLayout>}
            allowedRoles={['user']}
          />}
        />

        <Route
          path="/showroomcustomer"
          element={<PrivateRoute 
            element={<ShowroomLayout><ShowroomCustomerDashboard /></ShowroomLayout>}
            allowedRoles={['user']}
          />}
        />

        <Route
          path="/showroomstaff"
          element={<PrivateRoute 
            element={<ShowroomLayout><ShowroomStaffDashboard /></ShowroomLayout>}
            allowedRoles={['user']}
          />}
        />

        {/* Admin Routes */}
        <Route
          path="/"
          element={<PrivateRoute 
            element={<Layout><DailyExpense /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/staff"
          element={<PrivateRoute 
            element={<Layout><StaffDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/dashboard"
          element={<PrivateRoute 
            element={<Layout><KarigerDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/kapra"
          element={<PrivateRoute 
            element={<Layout><KapraDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/customer"
          element={<PrivateRoute 
            element={<Layout><CustomerDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/expense"
          element={<PrivateRoute 
            element={<Layout><ExpenseDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/dealer"
          element={<PrivateRoute 
            element={<Layout><DealerDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/details"
          element={<PrivateRoute 
            element={<Layout><DetailsDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/bank"
          element={<PrivateRoute 
            element={<Layout><BankDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        {/* <Route
          path="/stitching"
          element={<PrivateRoute 
            element={<Layout><StitchingDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        /> */}

        <Route
          path="/dasti"
          element={<PrivateRoute 
            element={<Layout><DastiDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/return"
          element={<PrivateRoute 
            element={<Layout><ReturnDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/tailor"
          element={<PrivateRoute 
            element={<Layout><TailorDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/miscellaneous"
          element={<PrivateRoute 
            element={<Layout><MiscellaneousDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route
          path="/brother"
          element={<PrivateRoute 
            element={<Layout><DilNawazDashboard /></Layout>}
            allowedRoles={['admin']}
          />}
        />

        <Route path="/login" element={<Login />} />
        <Route 
          path="*" 
          element={
            <Navigate 
              to={localStorage.getItem("userRole") === 'admin' ? '/' : '/showroom'} 
              replace 
            />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;