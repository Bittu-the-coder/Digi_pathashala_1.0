import Sidebar from "../../components/common/Sidebar";
import CourseCard from "../../components/student/CourseCard";

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Smith",
      description:
        "Master advanced mathematical concepts and problem-solving techniques",
      progress: 75,
      category: "Mathematics",
      image: "https://source.unsplash.com/random/300x200/?math",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      instructor: "Prof. Johnson",
      description:
        "Learn the fundamental principles of physics and their applications",
      progress: 45,
      category: "Science",
      image: "https://source.unsplash.com/random/300x200/?physics",
    },
    {
      id: 3,
      title: "Computer Science",
      instructor: "Dr. Lee",
      description: "Introduction to programming and computer science concepts",
      progress: 30,
      category: "Technology",
      image: "https://source.unsplash.com/random/300x200/?coding",
    },
    {
      id: 4,
      title: "English Literature",
      instructor: "Prof. Williams",
      description: "Explore classic and contemporary English literature",
      progress: 15,
      category: "Languages",
      image: "https://source.unsplash.com/random/300x200/?books",
    },
  ];

  return (
    <div className="flex">
      <Sidebar isAdmin={false} />
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Courses</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              🔍
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentCourses;
