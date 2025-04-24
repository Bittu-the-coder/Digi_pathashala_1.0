import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const HomeCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [showFilters, setShowFilters] = useState(false);

  // Sample course data
  const courses = [
    {
      id: 1,
      title: "Introduction to React",
      instructor: "Dr. Smith",
      category: "Programming",
      level: "Beginner",
      rating: 4.8,
      students: 1245,
      price: 49.99,
      image: "/course-react.jpg",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      instructor: "Prof. Johnson",
      category: "Mathematics",
      level: "Advanced",
      rating: 4.9,
      students: 872,
      price: 59.99,
      image: "/course-math.jpg",
    },
    {
      id: 3,
      title: "English Literature Classics",
      instructor: "Dr. Williams",
      category: "Languages",
      level: "Intermediate",
      rating: 4.7,
      students: 1034,
      price: 39.99,
      image: "/course-english.jpg",
    },
    {
      id: 4,
      title: "Physics Fundamentals",
      instructor: "Prof. Miller",
      category: "Science",
      level: "Beginner",
      rating: 4.6,
      students: 956,
      price: 44.99,
      image: "/course-physics.jpg",
    },
    {
      id: 5,
      title: "Digital Marketing Strategies",
      instructor: "Sarah Johnson",
      category: "Business",
      level: "Intermediate",
      rating: 4.9,
      students: 1578,
      price: 69.99,
      image: "/course-marketing.jpg",
    },
    {
      id: 6,
      title: "Web Development Bootcamp",
      instructor: "Michael Brown",
      category: "Programming",
      level: "Beginner",
      rating: 4.8,
      students: 2145,
      price: 79.99,
      image: "/course-webdev.jpg",
    },
  ];

  // Filter courses based on selected category and level
  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "All" || course.category === selectedCategory) &&
      (selectedLevel === "All Levels" || course.level === selectedLevel)
  );

  // Categories for filter
  const categories = [
    "All",
    "Programming",
    "Mathematics",
    "Science",
    "Languages",
    "Business",
  ];
  const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

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
              Explore Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Courses
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Discover a wide range of courses taught by expert instructors
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for courses..."
                className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                <Search className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Listing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Mobile Toggle */}
            <div className="md:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow"
              >
                <div className="flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-blue-600" />
                  <span>Filter Courses</span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showFilters ? "transform rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* Filters Sidebar */}
            <div
              className={`md:w-1/4 ${
                showFilters ? "block" : "hidden md:block"
              }`}
            >
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Filter Courses
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Category
                  </h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={category}
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label
                          htmlFor={category}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Level
                  </h4>
                  <div className="space-y-2">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center">
                        <input
                          type="radio"
                          id={level}
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => setSelectedLevel(level)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <label
                          htmlFor={level}
                          className="ml-2 text-sm text-gray-700"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedLevel("All Levels");
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Course Grid */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1 ? "Course" : "Courses"}
                </h2>
                <select className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by: Most Popular</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Highest Rated</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://source.unsplash.com/300x200/?${course.category.toLowerCase()}`;
                        }}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {course.category}
                        </span>
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          {course.level}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        by {course.instructor}
                      </p>
                      <div className="flex items-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(course.rating)
                                  ? "fill-current"
                                  : "stroke-current fill-none"
                              }`}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                              />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {course.rating} ({course.students.toLocaleString()}{" "}
                          students)
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-900">
                          ${course.price}
                        </span>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                          Enroll
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredCourses.length === 0 && (
                <div className="bg-white rounded-xl p-8 text-center shadow-md">
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search term to find what
                    you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeCourses;
