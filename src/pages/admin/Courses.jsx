import { useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import CourseTable from "../../components/admin/CourseTable";
import Button from "../../components/common/Button";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      category: "Mathematics",
      students: 45,
      status: "Active",
    },
    {
      id: 2,
      title: "Physics Fundamentals",
      category: "Science",
      students: 32,
      status: "Active",
    },
    {
      id: 3,
      title: "English Literature",
      category: "Languages",
      students: 28,
      status: "Active",
    },
    {
      id: 4,
      title: "Computer Science",
      category: "Technology",
      students: 56,
      status: "Active",
    },
    {
      id: 5,
      title: "Business Management",
      category: "Business",
      students: 23,
      status: "Draft",
    },
  ];

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar isAdmin={true} />
      <main className="flex-1 p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Course Management
          </h1>
          <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
            + Add New Course
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                🔍
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Categories</option>
                <option>Mathematics</option>
                <option>Science</option>
                <option>Technology</option>
                <option>Business</option>
                <option>Languages</option>
              </select>
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <CourseTable courses={filteredCourses} />
        </div>
      </main>
    </div>
  );
};

export default Courses;
