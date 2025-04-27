/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Upload, Calendar, Clock, Users } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";

const NewCourse = () => {
  const navigate = useNavigate();
  const { createCourse } = useCourses();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    duration: "",
    level: "beginner",
    thumbnail: "",
    status: "active",
    schedule: {
      days: [],
      startTime: "",
      endTime: "",
    },
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    maxStudents: 50,
  });

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      schedule: {
        ...course.schedule,
        [name]: value,
      },
    });
  };

  const handleDayToggle = (day) => {
    setCourse({
      ...course,
      schedule: {
        ...course.schedule,
        days: course.schedule.days.includes(day)
          ? course.schedule.days.filter((d) => d !== day)
          : [...course.schedule.days, day],
      },
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare data for API submission
      const courseData = {
        ...course,
        // Ensure price is a number
        price: Number(course.price),
        maxStudents: Number(course.maxStudents),
        // Convert duration to string as per model requirement
        duration: String(course.duration) + " hours",
      };

      // Call the createCourse function with the course data
      const result = await createCourse(courseData);

      if (result.success) {
        toast.success("Course created successfully!");
        navigate("/admin/courses");
      } else {
        toast.error(result.error || "Failed to create course");
      }
    } catch (error) {
      console.error("Create course error:", error);
      toast.error(error.response?.data?.message || "Error creating course");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/courses");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
        <div className="flex gap-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <X size={18} />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 flex items-center gap-2"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Course"}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Course Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter course title"
                />
              </div>

              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Programming">Programming</option>
                  <option value="Languages">Languages</option>
                  <option value="Business">Business</option>
                  <option value="Science">Science</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Duration (hours) *
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={course.duration}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 10"
                  min="1"
                />
              </div>

              {/* Level */}
              <div>
                <label
                  htmlFor="level"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Level *
                </label>
                <select
                  id="level"
                  name="level"
                  value={course.level}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Price (₹) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={course.price}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 999"
                  min="0"
                />
              </div>

              {/* Max Students */}
              <div>
                <label
                  htmlFor="maxStudents"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Maximum Students
                </label>
                <input
                  type="number"
                  id="maxStudents"
                  name="maxStudents"
                  value={course.maxStudents}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                />
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={course.status}
                  onChange={handleChange}
                  required
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              {/* Course Thumbnail */}
              <div>
                <label
                  htmlFor="thumbnail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Course Thumbnail URL
                </label>
                <input
                  type="url"
                  id="thumbnail"
                  name="thumbnail"
                  value={course.thumbnail}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter image URL (https://example.com/image.jpg)"
                />
                {course.thumbnail && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={course.thumbnail}
                      alt="Thumbnail preview"
                      className="h-24 w-auto object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/150?text=Invalid+URL";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Schedule - Days */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Days *
                </label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        course.schedule.days.includes(day)
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {day.substring(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Schedule - Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="startTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Start Time *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={course.schedule.startTime}
                      onChange={handleScheduleChange}
                      required
                      className="block w-full pl-10 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="endTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    End Time *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={course.schedule.endTime}
                      onChange={handleScheduleChange}
                      required
                      className="block w-full pl-10 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Start Date *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={course.startDate}
                    onChange={handleDateChange}
                    required
                    className="block w-full pl-10 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  End Date (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={course.endDate || ""}
                    onChange={handleDateChange}
                    className="block w-full pl-10 px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={course.description}
                onChange={handleChange}
                required
                rows={5}
                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter course description"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
