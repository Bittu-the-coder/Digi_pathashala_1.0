import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/DataContext";

const CourseDetail = () => {
  const { id } = useParams();
  const { courses } = useData();

  // Find the selected course from courses array
  const course = courses.find((course) => course.id === id) || {};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {course.title || "Course Not Found"}
        </h1>
        {course.instructor && (
          <p className="text-gray-600">Instructor: {course.instructor}</p>
        )}
      </div>

      {course.id ? (
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
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900">{course.status}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Progress</dt>
                <dd className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 inline-block">
                    {course.progress || 0}% Complete
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
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <p className="text-center text-gray-500">
            The requested course could not be found. Please go back to your
            courses.
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
