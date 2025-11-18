import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        position: "relative",
        overflowX: "hidden",
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Navbar putih full width dari pojok kiri ke pojok kanan */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "73px",
          backgroundColor: "#ffffff",
          zIndex: 1000,
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          borderBottom: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        <Navbar onToggleSidebar={toggleSidebar} />
      </div>

      {/* Sidebar biru mulai dari bawah navbar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Content area */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "16rem" : "0",
          marginTop: "73px",
          width: isSidebarOpen ? "calc(100% - 16rem)" : "100%",
          minHeight: "calc(100vh - 73px)",
          padding: "1.5rem",
          backgroundColor: "#f9fafb",
          transition: "margin-left 0.3s ease, width 0.3s ease",
        }}
      >
        <main>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
