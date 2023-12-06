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
import AddGuardians from "./pages/AddGuardians";
import { useAuth } from "./context/AuthContext";
import AddSales from "./components/Sales/AddSales";
import AddStudents from "./components/Sales/AddStudents";
import SalesProfile from "./pages/SalesProfile";
import StudentProfile from "./pages/StudentProfile";
import Me from "./pages/Me";
import EditSales from "./components/Sales/EditSale";
import EditStudent from "./components/Sales/EditStudent";
import AddCourses from "./pages/AddCourse";
import EditGuardian from "./pages/EditGuardians";
import GuardiansPage from "./pages/GuardiansPage";
import AddDiscounts from "./pages/AddDiscounts";
import EditDiscount from "./pages/EditDiscount";
import AddPlans from "./pages/AddPlan";
import EditPlans from "./pages/EditPlan";
import AddInvoice from "./pages/AddInvoice";
import EditInvoice from "./pages/EditInvoice";
import AddPayment from "./pages/AddPayment";

function App() {
  const { token, currentUser } = useAuth();
  const role = currentUser?.role;
  return (
    <Routes>
      <Route index path="/" element={<Login />} />
      {token ? (
        <Route path="dashboard" element={<DashboardLayout />}>
          {/* Sales only routes */}
          {role === "sales" ? (
            <>
              <Route element={<Me />} path="me" />
              <Route element={<EditSales />} path="me/edit" />
              <Route element={<EditStudent />} path="students/edit/:id" />
              <Route element={<AddStudents />} path="students/add" />
              <Route element={<AddInvoice />} path="invoices/add" />
              <Route element={<EditInvoice />} path="invoices/edit/:id" />
              <Route element={<AddGuardians />} path="guardians/add" />
              <Route element={<EditGuardian />} path="guardians/edit/:id" />
            </>
          ) : (
            <Route element={<Me />} path="me" />
          )}
          {/* Admin only Routes */}
          {role === "admin" ? (
            <>
              <Route element={<Sales />} path="sales" />
              <Route element={<AddSales />} path="sales/add" />
              <Route element={<SalesProfile />} path="sales/:id" />
              <Route element={<Students />} path="students" />
              <Route element={<Courses />} path="courses" />
              <Route element={<AddCourses />} path="courses/add" />
              <Route element={<Invoices />} path="invoices" />
              <Route element={<Plans />} path="plans" />
              <Route element={<AddPlans />} path="plans/add" />
              <Route element={<EditPlans />} path="plans/edit/:id" />
              <Route element={<Discounts />} path="discounts" />
              <Route element={<AddDiscounts />} path="discounts/add" />
              <Route element={<EditDiscount />} path="discounts/edit/:id" />
              <Route element={<Courses />} path="courses" />
              <Route element={<AddCourses />} path="courses/add" />
              <Route element={<GuardiansPage />} path="guardians" />
            </>
          ) : (
            <Route element={<Sales />} path="sales" />
          )}
          {/* Shared Routes */}
          <Route element={<StudentProfile />} path="students/:id" />
          <Route element={<Template />} path="templates" />
          <Route element={<Payments />} path="payments" />
          <Route element={<AddPayment />} path="payments/add" />
        </Route>
      ) : null}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
