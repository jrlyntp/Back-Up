import React from "react";
import Navbar from "../components/Navbar"; // Assuming you have a Navbar component
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  UserOutlined,
  FlagOutlined,
} from "@ant-design/icons";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <Navbar />

      {/* Main layout: sidebar + content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-md h-screen p-4 space-y-4">
          <Button
            block
            icon={<PlusOutlined />}
            onClick={() => navigate("/create-festival")}
          >
            Create Festival
          </Button>

          <Button
            block
            icon={<CalendarOutlined />}
            onClick={() => navigate("/create-event")}
          >
            Create Event
          </Button>

          <Button
            block
            icon={<AppstoreOutlined />}
            onClick={() => navigate("/events")}
          >
            Events
          </Button>

          <Button
            block
            icon={<UserOutlined />}
            onClick={() => navigate("/my-events")}
          >
            My Events
          </Button>

          <Button
            block
            icon={<FlagOutlined />}
            onClick={() => navigate("/festivals")}
          >
            Festivals
          </Button>
        </div>

        {/* Content area */}
        <div className="flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
          {/* Inject routed content or dashboard widgets here */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
