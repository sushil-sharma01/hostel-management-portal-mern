import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";

// ================= ADMIN PAGES =================
import AdminDashboard from "./pages/AdminDashboard";
import Students from "./pages/Students";
import Rooms from "./pages/Rooms";
import AdminComplaints from "./pages/AdminComplaints";
import AdminLeaves from "./pages/AdminLeaves";
import AddStudentPage from "./pages/AddStudentPage";
import AddRoomPage from "./pages/AddRoomPage";
import AdminNotices from "./pages/AdminNotices";
import AdminFees from "./pages/AdminFees";
import ChangePassword from "./pages/ChangePassword";
import PaymentSuccess from "./pages/PaymentSuccess";
// ================= STUDENT PAGES =================
import StudentDashboard from "./pages/StudentDashboard";
import Leave from "./pages/Leave";
import Fees from "./pages/Fees";
import Payment from "./pages/Payment";
import Notice from "./pages/Notice";
import StudentComplaints from "./pages/StudentComplaints";

function AppContent() {
  const location = useLocation();

  return (
    <>
      {/* Hide Navbar on Login page */}
      {location.pathname !== "/" && <Navbar />}

      <Routes>
        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/complaints" element={<AdminComplaints />} />
        <Route path="/admin-leaves" element={<AdminLeaves />} />
        <Route path="/add-student" element={<AddStudentPage />} />
        <Route path="/add-room" element={<AddRoomPage />} />
        <Route path="/admin-notices" element={<AdminNotices />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        {/* ✅ FIXED ROUTE */}
        <Route path="/admin-fees" element={<AdminFees />} />

        {/* ================= STUDENT ROUTES ================= */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/student-complaints" element={<StudentComplaints />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}