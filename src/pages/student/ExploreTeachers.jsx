import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../../context/DataContext";
import { Search, Filter, ChevronDown, Star, Mail } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const ExploreTeachers = () => {
  const { teachers = [], loading, error } = useData();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Filter teachers based on selected subject and search query
  const filteredTeachers = teachers.filter(
    (teacher) =>
      (selectedSubject === "All" ||
        teacher.subjects?.includes(selectedSubject)) &&
      (teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subjects?.some((subject) =>
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        ))
  );

  // Get all unique subjects from teachers
  const allSubjects = [
    "All",
    ...new Set(teachers.flatMap((teacher) => teacher.subjects || [])),
  ].sort();

  // Handle contact teacher
  const handleContact = (teacherId) => {
    console.log("Contacting teacher:", teacherId);
    // This would typically open a contact form or messaging interface
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load teachers. Please try again later."
        onRetry={() => window.location.reload()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {teachers.length} Registered Teachers
        </motion.h1>
      </div>

      <motion.div
        className="bg-white shadow-md rounded-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, bio, or subjects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <Filter className="w-5 h-5 mr-2 text-blue-600" />
              <span className="font-medium">Filter Teachers</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                showFilters ? "transform rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    {allSubjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-200">
                        <img
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              teacher.name
                            )}&background=random`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {teacher.experience || 0} years experience
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= (teacher.rating || 0)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          ({teacher.reviews || 0} reviews)
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-3">
                        {teacher.bio || "No bio available"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {teacher.subjects?.slice(0, 3).map((subject) => (
                        <motion.span
                          key={subject}
                          whileHover={{ scale: 1.05 }}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                        >
                          {subject}
                        </motion.span>
                      ))}
                      {teacher.subjects?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{teacher.subjects.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${teacher.rate || 0}/hr
                      </span>
                      <motion.button
                        onClick={() => handleContact(teacher.id)}
                        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contact
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="bg-white rounded-xl p-8 text-center shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No teachers match your search
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSubject("All");
              }}
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ExploreTeachers;
