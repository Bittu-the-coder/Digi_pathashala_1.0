/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PencilIcon, TrashIcon, EyeIcon } from "../icons/Icons";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCourses } from "../../context/CourseContext";

const CourseTable = ({ courses, onRefresh }) => {
  const navigate = useNavigate();
  const { deleteCourse, updateCourse } = useCourses();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

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

  const handleDelete = (courseId) => {
    setCourseToDelete(courseId);
    setShowDeleteModal(true);
  };

  return (
    <>
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
      {showDeleteModal && (
        <DeleteCourseModal
          onConfirm={async () => {
            try {
              const result = await deleteCourse(courseToDelete);
              if (result.success) {
                toast.success("Course deleted successfully");
                onRefresh();
              } else {
                toast.error(result.message || "Failed to delete course");
              }
            } catch (error) {
              console.error("Delete course error:", error);
              toast.error(
                error.response?.data?.message || "Error deleting course"
              );
            }
            setShowDeleteModal(false);
          }}
          onCancel={() => {
            setShowDeleteModal(false);
            setCourseToDelete(null);
          }}
        />
      )}
    </>
  );
};

export default CourseTable;

export const DeleteCourseModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 backdrop-blur-[5px]"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-900">
            Delete Course
          </h2>
          <p className="mb-6 text-gray-600">
            Are you sure you want to delete this course? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
