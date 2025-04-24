import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, FileText, Video, Book, Search } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Introduction to Python Programming",
      description:
        "A comprehensive guide to getting started with Python programming language.",
      type: "PDF",
      category: "Programming",
      fileSize: "2.4 MB",
      downloadCount: 1243,
      image: "https://source.unsplash.com/random/300x200/?python,code",
    },
    {
      id: 2,
      title: "Advanced Mathematics Formulas",
      description:
        "Collection of important formulas for calculus, algebra, and statistics.",
      type: "PDF",
      category: "Mathematics",
      fileSize: "1.8 MB",
      downloadCount: 976,
      image: "https://source.unsplash.com/random/300x200/?mathematics,formula",
    },
    {
      id: 3,
      title: "Physics Lab Experiments",
      description:
        "Step-by-step guide for common physics experiments for high school and college students.",
      type: "Video",
      category: "Science",
      duration: "45 min",
      viewCount: 3254,
      image: "https://source.unsplash.com/random/300x200/?physics,lab",
    },
    {
      id: 4,
      title: "Literature Analysis Techniques",
      description:
        "Methods for analyzing literary works, themes, and characters.",
      type: "eBook",
      category: "Literature",
      pages: 120,
      downloadCount: 845,
      image: "https://source.unsplash.com/random/300x200/?books,literature",
    },
    {
      id: 5,
      title: "Business Plan Template",
      description:
        "Ready-to-use business plan template with examples and guidance.",
      type: "DOCX",
      category: "Business",
      fileSize: "1.2 MB",
      downloadCount: 2150,
      image: "https://source.unsplash.com/random/300x200/?business,plan",
    },
    {
      id: 6,
      title: "Web Development Tutorial Series",
      description: "Learn HTML, CSS, and JavaScript with hands-on examples.",
      type: "Video",
      category: "Programming",
      duration: "3 hours",
      viewCount: 5621,
      image: "https://source.unsplash.com/random/300x200/?web,code",
    },
  ];

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(resources.map((resource) => resource.category)),
  ].sort();

  // Filter resources based on selected category and search query
  const filteredResources = resources.filter(
    (resource) =>
      (selectedCategory === "All" || resource.category === selectedCategory) &&
      (searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper function for resource type icon
  const getResourceIcon = (type) => {
    switch (type) {
      case "PDF":
      case "DOCX":
        return <FileText className="w-5 h-5" />;
      case "Video":
        return <Video className="w-5 h-5" />;
      case "eBook":
        return <Book className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

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
              Student{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Resources
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8"
            >
              Access free learning materials, guides, templates, and tutorials
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative max-w-xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for resources..."
                className="w-full py-4 px-6 pr-12 rounded-full border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2">
                <Search className="w-5 h-5 text-white" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-4 rounded-full transition-colors ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://source.unsplash.com/300x200/?education,${resource.category.toLowerCase()}`;
                      }}
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          resource.type === "PDF"
                            ? "bg-red-100 text-red-600"
                            : resource.type === "Video"
                            ? "bg-blue-100 text-blue-600"
                            : resource.type === "eBook"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {resource.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {resource.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {resource.description}
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>
                        {resource.type === "Video"
                          ? resource.duration
                          : resource.fileSize}
                      </span>
                      <span>
                        {resource.type === "Video"
                          ? `${resource.viewCount.toLocaleString()} views`
                          : `${resource.downloadCount.toLocaleString()} downloads`}
                      </span>
                    </div>

                    <button className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      {resource.type === "Video" ? "Watch Now" : "Download"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-md max-w-md mx-auto">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search term to find what you're
                looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Request Resources Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Something Specific?
            </h2>
            <p className="text-gray-600 mb-8">
              Can't find what you're looking for? Let us know and we'll try to
              provide the resources you need.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600 text-white text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Request Resources
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
