import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Edit2,
  Save,
  X, // Add X icon import
} from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const { user } = useData();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@example.com",
    phone: user?.phone || "+91 9876543210",
    address: user?.address || "123 Education Lane, Teaching City, 560001",
    bio:
      user?.bio ||
      "Experienced educator with over 10 years of teaching experience in Computer Science and Mathematics.",
    specialization: user?.specialization || "Computer Science, Mathematics",
    joinedDate: user?.joinedDate || "January 2020",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would call an API to update the user profile
    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
            isEditing
              ? "bg-gray-200 text-gray-800"
              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          }`}
        >
          {isEditing ? (
            <>
              Cancel
              <X size={18} />
            </>
          ) : (
            <>
              Edit Profile
              <Edit2 size={18} />
            </>
          )}
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          {/* Profile image and basic info */}
          <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4 text-blue-600 text-4xl font-bold">
                {formData.name.charAt(0)}
              </div>
              <h2 className="text-xl font-bold">{formData.name}</h2>
              <p className="text-blue-100">Teacher</p>

              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center">
                  <Mail size={16} className="mr-2" />
                  <span className="text-sm">{formData.email}</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="mr-2" />
                  <span className="text-sm">{formData.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{formData.address}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-2" />
                  <span className="text-sm">{formData.specialization}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">Joined: {formData.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile details */}
          <div className="md:w-2/3 p-6">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Save size={16} className="mr-2" />
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    About Me
                  </h3>
                  <p className="mt-1 text-gray-600">{formData.bio}</p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {user?.role === "admin"
                      ? "Teaching Statistics"
                      : "Learning Statistics"}
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">
                        {user?.role === "admin"
                          ? "Courses Teaching"
                          : "Enrolled Courses"}
                      </p>
                      <p className="text-xl font-semibold">12</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">
                        {user?.role === "admin"
                          ? "Total Students"
                          : "Completed Courses"}
                      </p>
                      <p className="text-xl font-semibold">234</p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">
                        {user?.role === "admin"
                          ? "Avg. Rating"
                          : "Current Progress"}
                      </p>
                      <p className="text-xl font-semibold">
                        {user?.role === "admin" ? "4.8/5" : "65%"}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">
                        {user?.role === "admin"
                          ? "Live Classes"
                          : "Attendance Rate"}
                      </p>
                      <p className="text-xl font-semibold">
                        {user?.role === "admin" ? "48" : "87%"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
