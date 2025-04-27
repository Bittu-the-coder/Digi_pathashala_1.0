import React, { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";
import { useClass } from "../../context/ClassContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Calendar,
  Edit2,
  Save,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import Input from "../../components/common/Input";

const Profile = () => {
  const { user, updateUserProfile } = useData();
  const { currentUser } = useAuth();
  const { courses, fetchInstructorCourses, TeacherCourses } = useCourses();
  const { liveClasses } = useClass();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [teacherStats, setTeacherStats] = useState({
    coursesTeaching: 0,
    totalStudents: 0,
    avgRating: "N/A",
    liveClasses: 0,
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    specialization: "",
    joinedDate: "",
  });

  // console.log("User data:", liveClasses, user, currentUser);

  // Initialize form data when component mounts or when user data changes
  useEffect(() => {
    // First priority: use data from DataContext if available
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        bio: user.bio || "",
        specialization: user.specialization || "",
        joinedDate: formatDate(user.joinedDate) || "",
      });
    }
    // Second priority: use data from AuthContext if DataContext doesn't have it
    else if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        bio: currentUser.bio || "",
        specialization: currentUser.specialization || "",
        joinedDate: formatDate(currentUser.joinedDate) || "",
      });
    }
  }, [user, currentUser]);

  // Fetch instructor courses and calculate stats
  useEffect(() => {
    const loadTeacherStats = async () => {
      try {
        // Fetch instructor courses if not already loaded
        if (TeacherCourses.length === 0) {
          await fetchInstructorCourses();
        }

        // Calculate statistics
        const teachingCourses = TeacherCourses.length;

        // Calculate total students from all courses
        const students = TeacherCourses.reduce((total, course) => {
          return total + (course.enrolledStudents?.length || 0);
        }, 0);

        // Calculate average rating if available
        let rating = "4.9/5"; // Default rating
        const coursesWithRatings = TeacherCourses.filter(
          (course) => course.rating !== undefined
        );
        if (coursesWithRatings.length > 0) {
          const totalRating = coursesWithRatings.reduce(
            (sum, course) => sum + (course.rating || 0),
            0
          );
          const avgRating = totalRating / coursesWithRatings.length;
          rating = `${avgRating.toFixed(1)}/5`;
        }

        setTeacherStats({
          coursesTeaching: teachingCourses,
          totalStudents: students,
          avgRating: rating,
          liveClasses: liveClasses.length,
        });
      } catch (error) {
        console.error("Error calculating teacher statistics:", error);
      }
    };

    if (
      (user && ["admin", "teacher"].includes(user.role)) ||
      (currentUser && ["admin", "teacher"].includes(currentUser.role))
    ) {
      loadTeacherStats();
    }
  }, [user, currentUser, fetchInstructorCourses, TeacherCourses, liveClasses]);

  // Format date from ISO string or other formats to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "";

    // Check if it's already a formatted string like "January 2020"
    if (typeof dateString === "string" && !dateString.includes("T")) {
      return dateString;
    }

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    } catch (error) {
      return dateString;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user && !currentUser) {
      toast.error("No user data available to update.");
      return;
    }

    // Set loading state
    setIsSubmitting(true);

    try {
      // Prepare data to submit - make sure we don't lose any fields
      const profileData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        bio: formData.bio,
        specialization: formData.specialization,
        // Include the _id to ensure we update the correct record
        ...(user && { _id: user._id }),
        ...(currentUser && { _id: currentUser._id }),
        // Preserve the role
        role:
          (user && user.role) || (currentUser && currentUser.role) || "admin",
      };

      // Call the updateUserProfile function from context
      const success = await updateUserProfile(profileData);

      if (success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If there's no user data yet, show a loading state
  if (!user) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
          <p className="text-center text-gray-500">Loading profile data...</p>
        </div>
      </div>
    );
  }

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

                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Specialization
                  </label>
                  <Input
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className="mt-1 py-1.5"
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
                    className="mt-1 border-none block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    style={{ padding: "0.5rem" }}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                >
                  <Save size={16} className="mr-2" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
                    Teaching Statistics
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Courses Teaching</p>
                      <p className="text-xl font-semibold">
                        {teacherStats.coursesTeaching}
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Students</p>
                      <p className="text-xl font-semibold">
                        {teacherStats.totalStudents}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Avg. Rating</p>
                      <p className="text-xl font-semibold">
                        {teacherStats.avgRating}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Live Classes</p>
                      <p className="text-xl font-semibold">
                        {teacherStats.liveClasses}
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
