import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";

const Layout = ({ children, role }) => {
  const { user, logout } = useData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminLinks = [
    { to: "/admin/dashboard", text: "Dashboard", icon: "📊" },
    { to: "/admin/courses", text: "Courses", icon: "📚" },
    { to: "/admin/users", text: "Users", icon: "👥" },
    { to: "/admin/attendance", text: "Attendance", icon: "📋" },
  ];

  const studentLinks = [
    { to: "/student/dashboard", text: "Dashboard", icon: "📊" },
    { to: "/student/courses", text: "Courses", icon: "📚" },
    { to: "/student/attendance", text: "Attendance", icon: "📋" },
    { to: "/student/progress", text: "Progress", icon: "📈" },
    { to: "/student/live-classes", text: "Live Classes", icon: "🎥" },
  ];

  const links = role === "admin" ? adminLinks : studentLinks;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-600">DigiPathashala</h1>
        </div>
        <nav className="mt-6">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              <span className="mr-3">{link.icon}</span>
              <span>{link.text}</span>
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <span className="mr-3">🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {role === "admin" ? "Admin Portal" : "Student Portal"}
            </h2>
            {user && (
              <div className="flex items-center">
                <div className="mr-4 text-sm text-gray-600">
                  Welcome, {user.name}
                </div>
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
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
