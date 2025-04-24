import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Star, MessageSquare } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Teachers = () => {
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Sample teacher data
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      subjects: ["Mathematics", "Statistics"],
      rating: 4.9,
      students: 1245,
      reviews: 328,
      experience: "10+ years",
      bio: "Ph.D. in Applied Mathematics with specialization in statistical modeling. Passionate about making complex math concepts easy to understand.",
      image: "https://source.unsplash.com/random/300x300/?professor,woman",
    },
    {
      id: 2,
      name: "Prof. Michael Brown",
      subjects: ["Computer Science", "Programming"],
      rating: 4.8,
      students: 975,
      reviews: 215,
      experience: "8+ years",
      bio: "Former tech lead at Google with extensive experience in web development and algorithm design. Loves to inspire the next generation of programmers.",
      image: "https://source.unsplash.com/random/300x300/?professor,man",
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      subjects: ["Physics", "Engineering"],
      rating: 4.9,
      students: 830,
      reviews: 176,
      experience: "12+ years",
      bio: "Doctorate in Theoretical Physics with research publications in quantum mechanics. Makes physics approachable through real-world applications.",
      image: "https://source.unsplash.com/random/300x300/?scientist,woman",
    },
    {
      id: 4,
      name: "Robert Wilson",
      subjects: ["Languages", "Literature"],
      rating: 4.7,
      students: 1120,
      reviews: 298,
      experience: "15+ years",
      bio: "Linguist and published author with expertise in comparative literature and creative writing. Passionate about helping students find their voice.",
      image: "https://source.unsplash.com/random/300x300/?writer,man",
    },
    {
      id: 5,
      name: "Dr. Priya Sharma",
      subjects: ["Biology", "Chemistry"],
      rating: 4.8,
      students: 905,
      reviews: 232,
      experience: "9+ years",
      bio: "Research scientist with focus on molecular biology. Brings laboratory experience into the classroom with engaging experiments and case studies.",
      image:
        "https://source.unsplash.com/random/300x300/?scientist,indian,woman",
    },
    {
      id: 6,
      name: "Prof. James Miller",
      subjects: ["Business", "Economics"],
      rating: 4.9,
      students: 1340,
      reviews: 356,
      experience: "14+ years",
      bio: "MBA from Harvard with experience as a financial analyst. Combines theoretical concepts with practical business applications and case studies.",
      image: "https://source.unsplash.com/random/300x300/?business,man",
    },
  ];

  // Get unique subjects for filter
  const subjects = [
    "All",
    ...new Set(teachers.flatMap((teacher) => teacher.subjects)),
  ].sort();

  // Filter teachers based on selected subject
  const filteredTeachers = teachers.filter(
    (teacher) =>
      selectedSubject === "All" || teacher.subjects.includes(selectedSubject)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Expert Teachers
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Learn from industry professionals, researchers, and academic
              experts
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for teachers by name or subject..."
                className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                <Search className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Subject Filters */}
      <section className="py-8 bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`py-2 px-4 rounded-full transition-colors ${
                  selectedSubject === subject
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTeachers.map((teacher) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${teacher.name.replace(
                        " ",
                        "+"
                      )}&size=300&background=random`;
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {teacher.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {teacher.bio}
                  </p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="ml-1 text-sm text-gray-700">
                        {teacher.rating} ({teacher.reviews} reviews)
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {teacher.experience}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">
                      {teacher.students.toLocaleString()} students
                    </span>
                    <div className="flex gap-2">
                      <button className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredTeachers.length === 0 && (
            <div className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No teachers found
              </h3>
              <p className="text-gray-600">
                Try selecting a different subject or adjusting your search
                criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Become a Teacher CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Share Your Knowledge with the World
            </h2>
            <p className="text-white text-opacity-90 mb-8 text-lg">
              Join our community of expert teachers and help students achieve
              their learning goals.
            </p>
            <a
              href="/admin-signin"
              className="inline-block px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Become a Teacher
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Teachers;
