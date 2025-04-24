import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ChooseUser = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-md w-full p-10 bg-white rounded-xl shadow-xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Choose User Type
          </h2>
          <p className="mt-2 text-gray-600 mb-8">
            Select how you want to continue
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Link to="/admin-signin">
            <button className="w-full flex items-center justify-between px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300">
              <span>Continue as Teacher</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>

          <Link to="/student-signin">
            <button className="w-full flex items-center justify-between px-8 py-4 border border-gray-200 text-lg font-medium rounded-xl text-gray-800 bg-white hover:bg-gray-50 shadow-md hover:shadow-lg transition-all duration-300">
              <span>Continue as Student</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 p-6 bg-gray-50 rounded-lg"
        >
          <p className="text-sm text-gray-600 text-center">
            <strong>Demo Credentials:</strong>
            <br />
            <span className="block mt-2">
              <strong>Teacher:</strong> admin@example.com / admin123
            </span>
            <span className="block mt-1">
              <strong>Student:</strong> student1@example.com / student123
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-center"
        >
          <Link
            to="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ChooseUser;
