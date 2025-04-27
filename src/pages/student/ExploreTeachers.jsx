import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUsers } from "../../context/UserContext";
import { Search, Filter, ChevronDown, Star, Mail, X } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import ErrorMessage from "../../components/common/ErrorMessage";

const ExploreTeachers = () => {
  const { teachers = [], loading, error, fetchTeachers } = useUsers();
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch teachers when component mounts
  useEffect(() => {
    // console.log("Fetching teachers...");
    fetchTeachers();
  }, [fetchTeachers]);

  // Debug log for teachers data
  useEffect(() => {
    // console.log("Teachers data:", teachers);
    // console.log("Loading state:", loading);
    // console.log("Error state:", error);
  }, [teachers, loading, error]);

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
    // console.log("Contacting teacher:", teacherId);
    // This would typically open a contact form or messaging interface
  };

  // Handle view teacher details
  const handleViewTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeacher(null);
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
        {/* Search and filter section remains the same */}
        {/* ... */}

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

                    {/* ... other teacher card content ... */}

                    <div className="flex items-center justify-between mt-4">
                      <motion.button
                        onClick={() => handleViewTeacher(teacher)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Profile
                      </motion.button>
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
          <div className="flex items-center justify-center h-64 text-gray-500">
            No teachers found matching your criteria.
          </div>
        )}
      </motion.div>

      {/* Teacher Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedTeacher && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedTeacher.name}'s Profile
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-gray-200 mx-auto">
                      <img
                        src={selectedTeacher.avatar}
                        alt={selectedTeacher.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            selectedTeacher.name
                          )}&background=random`;
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          About
                        </h3>
                        <p className="text-gray-600 mt-1">
                          {selectedTeacher.bio || "No bio available"}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Subjects
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {selectedTeacher.subjects?.map((subject) => (
                            <span
                              key={subject}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Experience
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {selectedTeacher.experience || 0} years
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Hourly Rate
                          </h3>
                          <p className="text-gray-600 mt-1">
                            ${selectedTeacher.rate || 0}/hr
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          Rating
                        </h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-5 w-5 ${
                                  star <= (selectedTeacher.rating || 0)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-gray-600">
                            ({selectedTeacher.reviews || 0} reviews)
                          </span>
                        </div>
                      </div>

                      {selectedTeacher.education && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Education
                          </h3>
                          <p className="text-gray-600 mt-1">
                            {selectedTeacher.education}
                          </p>
                        </div>
                      )}

                      {selectedTeacher.languages && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Languages
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedTeacher.languages.map((language) => (
                              <span
                                key={language}
                                className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                              >
                                {language}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => handleContact(selectedTeacher.id)}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Teacher
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExploreTeachers;
