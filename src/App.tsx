import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import User from "./pages/User";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route element={<User />} path="" />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
