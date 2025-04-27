import React, { useState, useEffect } from "react";
import UserTable from "../../components/admin/UserTable";
import { SearchIcon } from "../../components/icons/Icons";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";
import { toast } from "react-hot-toast";
import API from "../../services/api";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const { currentUser } = useAuth();
  const { TeacherCourses, fetchInstructorCourses } = useCourses();
  const [studentsWithEnrollments, setStudentsWithEnrollments] = useState([]);

  // Fetch instructor courses and process student data
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser || !["admin", "teacher"].includes(currentUser.role))
        return;

      setLoading(true);
      setError(null);

      try {
        await fetchInstructorCourses();
      } catch (err) {
        setError(err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  // Process enrolled students with their course counts
  useEffect(() => {
    if (TeacherCourses.length === 0) return;

    const enrollmentMap = new Map();

    TeacherCourses.forEach((course) => {
      course.enrolledStudents?.forEach((student) => {
        if (!enrollmentMap.has(student._id)) {
          enrollmentMap.set(student._id, {
            ...student,
            enrolledCoursesCount: 1,
          });
        } else {
          const existing = enrollmentMap.get(student._id);
          enrollmentMap.set(student._id, {
            ...existing,
            enrolledCoursesCount: existing.enrolledCoursesCount + 1,
          });
        }
      });
    });

    setStudentsWithEnrollments(Array.from(enrollmentMap.values()));
  }, [TeacherCourses]);

  // Handle student deletion
  const handleDeleteStudent = async (studentId) => {
    setStudentToDelete(studentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/users/${studentToDelete}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });

      setStudentsWithEnrollments((prev) =>
        prev.filter((student) => student._id !== studentToDelete)
      );

      toast.success("Student removed successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error(error.response?.data?.message || "Failed to remove student");
    } finally {
      setShowDeleteModal(false);
      setStudentToDelete(null);
    }
  };

  // Filter students based on search term
  const filteredStudents = studentsWithEnrollments.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="bg-white rounded-xl shadow-md p-6 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Your Students</h1>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search your students..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <UserTable
            users={filteredStudents}
            showEnrollments={true}
            onDelete={handleDeleteStudent}
          />
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 backdrop-blur-[5px] flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove this student? This action cannot
                be undone.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setStudentToDelete(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Users;
