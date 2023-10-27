import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import Sales from "./pages/Sales";
import Students from "./pages/Students";
import Invoices from "./pages/Invoices";
import Template from "./pages/Template";
import Payments from "./pages/Payments";
import Plans from "./pages/Plans";
import Discounts from "./pages/Discounts";
import Courses from "./pages/Courses";
import Guardians from "./pages/Guardians";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      {token !== "" ? (
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route element={<Sales />} path="sales" />
          <Route element={<Students />} path="students" />
          <Route element={<Invoices />} path="invoices" />
          <Route element={<Template />} path="templates" />
          <Route element={<Payments />} path="payments" />
          <Route element={<Plans />} path="plans" />
          <Route element={<Discounts />} path="discounts" />
          <Route element={<Courses />} path="courses" />
          <Route element={<Guardians />} path="guardians" />
        </Route>
      ) : null}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
