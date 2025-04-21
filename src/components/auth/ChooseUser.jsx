import { Link } from "react-router-dom";

const ChooseUser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-10 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Choose User Type</h2>
          <p className="mt-2 text-gray-600">Select how you want to continue</p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/admin-signin"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
          >
            Continue as Admin
          </Link>

          <Link
            to="/student-signin"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
          >
            Continue as Student
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-10 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo Credentials:</strong>
            <br />
            <span className="block mt-2">
              <strong>Admin:</strong> admin@example.com / admin123
            </span>
            <span className="block mt-1">
              <strong>Student:</strong> student1@example.com / student123
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseUser;
