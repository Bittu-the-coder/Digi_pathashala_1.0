import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isAdmin = false }) => {
  const location = useLocation();

  const adminLinks = [
    { to: "/admin/dashboard", text: "Dashboard", icon: "📊" },
    { to: "/admin/courses", text: "Courses", icon: "📚" },
    { to: "/admin/users", text: "Users", icon: "👥" },
    { to: "/admin/attendance", text: "Attendance", icon: "📋" },
    { to: "/admin/settings", text: "Settings", icon: "⚙️" },
  ];

  const studentLinks = [
    { to: "/student/dashboard", text: "Dashboard", icon: "📊" },
    { to: "/student/courses", text: "My Courses", icon: "📚" },
    { to: "/student/attendance", text: "Attendance", icon: "📋" },
    { to: "/student/live-classes", text: "Live Classes", icon: "🎥" },
  ];

  const links = isAdmin ? adminLinks : studentLinks;

  return (
    <div className="bg-white shadow-lg w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-indigo-600">DigiPathashala</h1>
      </div>

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
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }
              `}
            >
              <span className="text-xl mr-3">{link.icon}</span>
              {link.text}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t">
        <Link
          to="/"
          className="group flex items-center px-4 py-2 text-sm font-medium rounded-md text-red-700 hover:bg-red-50"
        >
          <span className="text-xl mr-3">🚪</span>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
