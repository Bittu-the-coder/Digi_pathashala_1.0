import React from "react";
import { useParams, Link } from "react-router-dom";
import { Star, MessageSquare, ArrowLeft } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const TeacherProfile = () => {
  const { teacherId } = useParams();

  // This should be replaced with actual data fetching logic
  const teacher = {
    id: parseInt(teacherId),
    name: "Loading...",
    subjects: [],
    rating: 0,
    students: 0,
    reviews: 0,
    experience: "",
    bio: "",
    image: "",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/teachers"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Teachers
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={
                  teacher.image ||
                  `https://ui-avatars.com/api/?name=${teacher.name.replace(
                    " ",
                    "+"
                  )}&size=400&background=random`
                }
                alt={teacher.name}
                className="w-full h-full object-cover min-h-[400px]"
              />
            </div>
            <div className="md:w-2/3 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {teacher.name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {teacher.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="ml-1 text-gray-700">
                    {teacher.rating} ({teacher.reviews} reviews)
                  </span>
                </div>
                <span className="text-gray-600">{teacher.experience}</span>
                <span className="text-gray-600">
                  {teacher.students.toLocaleString()} students
                </span>
              </div>

              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600">{teacher.bio}</p>
              </div>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Contact Teacher
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherProfile;
