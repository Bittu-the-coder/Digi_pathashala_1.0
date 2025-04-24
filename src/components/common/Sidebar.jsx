import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Book,
  Users,
  CheckSquare,
  Settings,
  LogOut,
  Video,
  BarChart2,
  BookOpen,
  Calendar,
  Award,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser);

  const handleLogout = () => {
    logout();
    navigate("/choose-user");
  };

  // Determine if user is admin based on role
  const isAdmin = user?.role === "admin";

  const adminLinks = [
    {
      to: "/admin/dashboard",
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    { to: "/admin/courses", text: "My Courses", icon: <Book size={20} /> },
    { to: "/admin/students", text: "Students", icon: <Users size={20} /> },
    {
      to: "/admin/attendance",
      text: "Attendance",
      icon: <CheckSquare size={20} />,
    },
    {
      to: "/admin/live-classes",
      text: "Live Classes",
      icon: <Video size={20} />,
    },
    {
      to: "/admin/analytics",
      text: "Analytics",
      icon: <BarChart2 size={20} />,
    },
    { to: "/admin/settings", text: "Settings", icon: <Settings size={20} /> },
  ];

  const studentLinks = [
    {
      to: "/student/dashboard",
      text: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      to: "/student/courses",
      text: "My Courses",
      icon: <BookOpen size={20} />,
    },
    {
      to: "/student/attendance",
      text: "Attendance",
      icon: <Calendar size={20} />,
    },
    { to: "/student/progress", text: "Progress", icon: <Award size={20} /> },
    {
      to: "/student/live-classes",
      text: "Live Classes",
      icon: <Video size={20} />,
    },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen flex flex-col">
      <nav className="flex-1 overflow-y-auto pt-5 pb-4">
        <div className="px-2 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`
                group flex items-center px-4 py-3 text-sm font-medium rounded-md 
                ${
                  location.pathname === link.to
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <span className="mr-3 text-gray-500">{link.icon}</span>
              {link.text}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 w-full"
        >
          <LogOut size={20} className="mr-3" />
          Logout
        </button>
      </div>

      <div className="p-4 bg-blue-50 mx-2 rounded-lg mb-4">
        <div className="text-xs text-blue-700">
          <p className="font-semibold">Need Help?</p>
          <p className="mt-1">Contact support at:</p>
          <p>support@digipathshala.com</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
