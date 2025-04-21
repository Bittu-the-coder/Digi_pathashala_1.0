import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Digi-Pathshala
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Admin
            </Link>
            <Link
              to="/student/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              Student
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
