import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-40 bg-gray-200 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold text-gray-800">{course.title}</h2>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {course.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <p className="text-sm text-gray-500 mb-3">
          Instructor: {course.instructor}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress: {course.progress}%</span>
            <span>{course.progress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <Link
          to={`/student/courses/${course.id}`}
          className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          Continue Learning
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
