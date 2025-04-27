import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../common/Sidebar";
import { useState } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";

const Layout = ({ children, role }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/choose-user");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            DigiPathshala
          </h1>
        </div>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {currentUser?.role === "admin"
                ? "Teacher Portal"
                : "Student Portal"}
            </h2>
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <div className="mr-4 text-sm text-gray-600">
                      Welcome, {currentUser.name}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
                    <Link
                      to={`/${currentUser.role}/profile`}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
