import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  forgotPassword,
  resetPassword,
  verifyResetCode,
} from "../../services/authService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Lock,
  RefreshCcw,
} from "lucide-react";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    verificationCode: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [codeVerified, setCodeVerified] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from navigation state if available
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    // Validate code is 6 digits
    if (!/^\d{6}$/.test(formData.verificationCode)) {
      toast.error("Please enter a valid 6-digit verification code");
      return;
    }

    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    setVerifying(true);

    try {
      // Call backend to verify the code
      const result = await verifyResetCode(
        formData.email,
        formData.verificationCode
      );

      if (result.success) {
        setCodeVerified(true);
        toast.success(
          "Verification code validated! You can now reset your password."
        );
      } else {
        toast.error(result.message || "Invalid verification code");
      }
    } catch (error) {
      toast.error(error.message || "Invalid verification code");
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!formData.email) {
      toast.error("Please enter your email address");
      return;
    }

    setVerifying(true);

    try {
      const result = await forgotPassword(formData.email);

      if (result.success) {
        toast.success("New verification code sent to your email");
        setFormData((prev) => ({ ...prev, verificationCode: "" }));
        setCodeVerified(false);
      } else {
        toast.error(result.message || "Failed to send verification code");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!codeVerified) {
      toast.error("Please verify your code before resetting password");
      return;
    }

    setLoading(true);

    try {
      const result = await resetPassword(
        formData.email,
        formData.verificationCode,
        formData.password
      );

      if (result.success) {
        toast.success("Password reset successful!");
        // Redirect to sign in page
        navigate("/student-signin");
      } else {
        toast.error(result.message || "Password reset failed");
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
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter the verification code sent to your email
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
              value={formData.email}
              onChange={handleChange}
              readOnly={!!location.state?.email}
              disabled={codeVerified}
            />
          </div>

          <div>
            <label
              htmlFor="verificationCode"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Verification Code
            </label>
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  className={`w-full px-4 py-3 border ${
                    codeVerified
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10`}
                  placeholder="6-digit code"
                  value={formData.verificationCode}
                  onChange={handleChange}
                  maxLength={6}
                  pattern="\d{6}"
                  title="Please enter a 6-digit code"
                  disabled={codeVerified}
                />
                <Key
                  className={`h-5 w-5 ${
                    codeVerified ? "text-green-500" : "text-gray-400"
                  } absolute left-3 top-1/2 transform -translate-y-1/2`}
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={verifying || codeVerified}
                className={`p-3.5 rounded-lg text-white ${
                  codeVerified
                    ? "bg-green-500 cursor-not-allowed"
                    : verifying
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center`}
                title="Verify code"
              >
                {verifying ? (
                  <RefreshCcw className="h-5 w-5 animate-spin" />
                ) : codeVerified ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <CheckCircle className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Enter the 6-digit code sent to your email
              </p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={verifying}
                className="text-xs text-blue-600 hover:underline"
              >
                Resend code
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: codeVerified ? 1 : 0,
              height: codeVerified ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-2">
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  New Password
                </label>
                <div className="relative px-0.5">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10"
                    placeholder="New password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                  />
                  <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-700 block mb-2"
                >
                  Confirm New Password
                </label>
                <div className="relative p-0.5">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10 pr-10"
                    placeholder="Confirm new password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={6}
                  />
                  <Lock className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
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
          </motion.div>

          <div>
            <button
              type="submit"
              disabled={loading || !codeVerified}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white ${
                loading || !codeVerified
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-300`}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Need a new verification code?
            </Link>

            <Link
              to="/student-signin"
              className="font-medium text-gray-600 hover:text-gray-500 flex items-center"
            >
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Sign In
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
