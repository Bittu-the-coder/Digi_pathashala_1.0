/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";

const StudentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { loginStudent } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await loginStudent(email, password);

      if (result.success) {
        toast.success("Login successful!");
        navigate("/student/dashboard");
      } else {
        toast.error(result.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Student Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your learning dashboard and continue your education journey
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 block mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-300`}
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in <LogIn className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/student-register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Don't have an account? Register
            </Link>

            <Link
              to="/choose-user"
              className="font-medium text-gray-600 hover:text-gray-500 flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back
            </Link>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Demo Credentials:</strong>
              <br />
              Email: student1@example.com
              <br />
              Password: student123
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default StudentSignIn;
