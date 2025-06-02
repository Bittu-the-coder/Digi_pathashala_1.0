/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../../context/CourseContext";
import courseService from "../../services/courseService";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import SEO from "../../components/common/SEO";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await courseService.getCourse(id);
        if (response.success) {
          setCourse(response.data);
        } else {
          setError(response.message || "Failed to fetch course details");
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("An error occurred while fetching course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <p className="text-center text-gray-500">
          {error ||
            "The requested course could not be found. Please go back to your courses."}
        </p>
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/student/courses")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Back to My Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={course.title}
        description={course.description}
        type="course"
        image={course.thumbnail}
        url={`https://digipathshala.com/courses/${course._id}`}
      />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {course.title}
          </h1>
          <p className="text-gray-600">
            Instructor:{" "}
            {typeof course.instructor === "object"
              ? course.instructor.name
              : course.instructor}
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Course Details
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course.description}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {course.category}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Level</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {course.level
                    ? course.level.charAt(0).toUpperCase() +
                      course.level.slice(1)
                    : "All Levels"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Progress</dt>
                <dd className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${0}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    0% Complete
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Course Content
            </h3>
            <p className="text-sm text-gray-500">
              Content for this course is still being loaded. Please check back
              later.
            </p>
          </div>

          <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-right">
            <button
              onClick={() => navigate("/student/courses")}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 mr-2"
            >
              Back to My Courses
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
