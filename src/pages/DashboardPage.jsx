import React from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircleOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  UserOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import "../styles/dashboard.css"; // <-- custom styles here

const DashboardPage = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("user_name") || "User";

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar shadow-md px-6 py-4 flex justify-between items-center">
        <div className="logo text-xl font-bold text-indigo-600">
          🎉 Event Dashboard
        </div>
        <div className="user flex items-center gap-2 text-gray-700 text-sm">
          <UserOutlined />
          <span>{userName}</span>
        </div>
      </header>

      {/* Layout: Sidebar + Content */}
      <div className="dashboard-body flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="sidebar">
          <button onClick={() => navigate("/host-festival")}>
            <PlusCircleOutlined />
            <span>Create Festival</span>
          </button>
          <button onClick={() => navigate("/host-event")}>
            <CalendarOutlined />
            <span>Create Event</span>
          </button>
          <button onClick={() => navigate("/events")}>
            <AppstoreOutlined />
            <span>Events</span>
          </button>
          <button onClick={() => navigate("/my-events")}>
            <UserOutlined />
            <span>My Events</span>
          </button>
          <button onClick={() => navigate("/festivals")}>
            <FlagOutlined />
            <span>Festivals</span>
          </button>
        </aside>

        {/* Main Content */}
        <main className="content-area p-8">
          <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
          <p className="text-gray-600">Select an option from the sidebar to begin.</p>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
