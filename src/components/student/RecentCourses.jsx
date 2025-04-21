const courses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    instructor: "Dr. Smith",
    progress: 75,
    lastAccessed: "2 hours ago",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    instructor: "Prof. Johnson",
    progress: 45,
    lastAccessed: "1 day ago",
  },
  {
    id: 3,
    title: "Computer Science",
    instructor: "Dr. Lee",
    progress: 30,
    lastAccessed: "3 days ago",
  },
];

const RecentCourses = () => {
  return (
    <div className="space-y-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
        >
          <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-lg p-3 mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {course.title}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              Instructor: {course.instructor}
            </p>
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-xs font-medium text-gray-500 mr-2">
                  Progress: {course.progress}%
                </span>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-4 text-xs text-gray-500">
            Last accessed: {course.lastAccessed}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentCourses;
