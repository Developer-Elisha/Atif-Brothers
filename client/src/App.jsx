import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DailyExpense from "./components/DailyExpense/DailyExpense";
import KarigerDashboard from "./components/Kariger/KarigerDashboard";
import Layout from "./components/Layout";
import StaffDashboard from "./components/Staff/StaffDashboard";

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
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;