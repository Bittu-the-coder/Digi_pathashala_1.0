/* eslint-disable no-unused-vars */
import React from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "../icons/Icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCourses } from "../../context/CourseContext";

const CourseTable = ({ courses, onRefresh }) => {
  const navigate = useNavigate();
  const { deleteCourse, updateCourse } = useCourses();

  const handleView = (courseId) => {
    navigate(`/admin/courses/${courseId}`);
  };

  const handleEdit = async (courseId) => {
    try {
      // Navigate to the edit page with the course ID
      navigate(`/admin/courses/${courseId}/edit`);
    } catch (error) {
      console.error("Edit course error:", error);
      toast.error(error.response?.data?.message || "Error editing course");
    }
  };

  const handleDelete = async (courseId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      try {
        const result = await deleteCourse(courseId);
        if (result.success) {
          toast.success("Course deleted successfully");
          onRefresh(); // Refresh the courses list
        } else {
          toast.error(result.message || "Failed to delete course");
        }
      } catch (error) {
        console.error("Delete course error:", error);
        toast.error(error.response?.data?.message || "Error deleting course");
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Students
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {courses.map((course) => (
            <tr key={course._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {course.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{course.category}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {course.enrolledStudents?.length || 0} enrolled
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.status === "active"
                      ? "bg-green-100 text-green-800"
                      : course.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {course.status.charAt(0).toUpperCase() +
                    course.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleView(course._id)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(course._id)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
