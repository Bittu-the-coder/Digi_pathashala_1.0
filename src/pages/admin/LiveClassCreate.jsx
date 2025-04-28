import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useClass } from "../../context/ClassContext";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import { useAuth } from "../../context/AuthContext";

const LiveClassCreate = () => {
  const { createLiveClass } = useClass();
  const { TeacherCourses, fetchInstructorCourses } = useCourses();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formClass, setFormClass] = useState({
    title: "",
    course: "",
    subject: "",
    date: "",
    time: "",
    duration: "",
    meetingLink: "",
    instructor: currentUser?.name || "",
    instructorId: currentUser?._id || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch instructor courses on component mount
  useEffect(() => {
    if (currentUser && ["admin", "teacher"].includes(currentUser.role)) {
      fetchInstructorCourses();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await createLiveClass(formClass);
      if (result.success) {
        toast.success("Live class scheduled successfully!");
        setFormClass({
          title: "",
          course: "",
          subject: "",
          date: "",
          time: "",
          duration: "",
          meetingLink: "",
          instructor: currentUser?.name || "",
          instructorId: currentUser?._id || "",
        });
        navigate("/admin/live-classes");
      } else {
        toast.error(result.error || "Failed to create live class");
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Create Live Class</h1>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Title field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Class Title
              </label>
              <input
                type="text"
                name="title"
                value={formClass.title}
                onChange={(e) =>
                  setFormClass({ ...formClass, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>

            {/* Course dropdown - Only shows courses taught by this instructor */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Course
              </label>
              <select
                name="course"
                value={formClass.course}
                onChange={(e) =>
                  setFormClass({ ...formClass, course: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              >
                <option value="">Select a course</option>
                {TeacherCourses.map((course) => (
                  <option key={course._id} value={course.title}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formClass.subject}
                onChange={(e) =>
                  setFormClass({ ...formClass, subject: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formClass.date}
                onChange={(e) =>
                  setFormClass({ ...formClass, date: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formClass.time}
                onChange={(e) =>
                  setFormClass({ ...formClass, time: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration (in minutes)
              </label>
              <input
                type="number"
                name="duration"
                value={formClass.duration}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value > 0) {
                    setFormClass({ ...formClass, duration: value });
                  }
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Meeting Link
              </label>
              <input
                type="url"
                name="meetingLink"
                value={formClass.meetingLink}
                onChange={(e) =>
                  setFormClass({ ...formClass, meetingLink: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructor
              </label>
              <input
                type="text"
                name="instructor"
                value={formClass.instructor}
                onChange={(e) =>
                  setFormClass({ ...formClass, instructor: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
                disabled
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Live Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LiveClassCreate;
