import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Input from "../common/Input";
import Button from "../common/Button";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ArrowLeft, UserPlus } from "lucide-react";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        setLoading(false);
        return;
      }

      // Prepare data for API call (remove confirmPassword)
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        specialization: formData.specialization,
        password: formData.password,
        role: "admin", // For teachers/admins
      };

      const result = await registerUser(userData);

      if (result.success) {
        toast.success("Registration successful! Please sign in.");
        navigate("/admin-signin");
      } else {
        toast.error(result.error || "Registration failed. Please try again.");
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
        className="max-w-lg w-full space-y-8 p-10 bg-white rounded-xl shadow-xl" // Increased max-w
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Teacher Registration
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our platform and start sharing your knowledge
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />
          <Input
            type="tel" // Use tel type for phone numbers
            name="phone"
            placeholder="Phone Number (Optional)"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          <Input
            type="text"
            name="specialization"
            placeholder="Primary Subject/Specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <Button
            type="submit"
            className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg transition-all duration-300`}
            disabled={loading}
          >
            {loading ? (
              "Registering..."
            ) : (
              <>
                Register <UserPlus className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </form>
        <div className="flex items-center justify-between text-sm">
          <Link
            to="/admin-signin"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Already have an account? Sign In
          </Link>
          <Link
            to="/choose-user"
            className="font-medium text-gray-600 hover:text-gray-500 flex items-center"
          >
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminRegister;
