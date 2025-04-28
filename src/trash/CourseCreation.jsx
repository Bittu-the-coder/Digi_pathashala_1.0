import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  FileText,
  Video,
  Upload,
  Plus,
  Trash2,
  Save,
  ArrowLeft,
} from "lucide-react";
import { COURSE_CATEGORIES } from "../utils/constants";
import toast from "react-hot-toast";

const CourseCreation = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: "",
    thumbnailPreview: null,
    modules: [
      {
        title: "Introduction",
        lessons: [{ title: "", type: "video", content: "" }],
      },
    ],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  // Handle thumbnail file upload
  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCourseData({
        ...courseData,
        thumbnail: file.name, // Store filename or you could upload to server and get URL
        thumbnailPreview: fileUrl,
      });
    }
  };

  // Add a module to the course
  const addModule = () => {
    setCourseData({
      ...courseData,
      modules: [
        ...courseData.modules,
        { title: `Module ${courseData.modules.length + 1}`, lessons: [] },
      ],
    });
  };

  // Update module title
  const updateModuleTitle = (index, title) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index].title = title;
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // Remove a module
  const removeModule = (index) => {
    const updatedModules = [...courseData.modules];
    updatedModules.splice(index, 1);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // Add a lesson to a module
  const addLesson = (moduleIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons.push({
      title: "",
      type: "video",
      content: "",
    });
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // Update lesson data
  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons[lessonIndex][field] = value;
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // Remove a lesson
  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons.splice(lessonIndex, 1);
    setCourseData({ ...courseData, modules: updatedModules });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validation
      if (
        !courseData.title ||
        !courseData.description ||
        !courseData.category
      ) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // This would be an API call in a real application
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Course created successfully!");
      navigate("/admin/courses");
    } catch (error) {
      toast.error("Failed to create course. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Course
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Share your knowledge by creating a structured course
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={16} className="mr-1" /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Course Basic Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
            <Book size={20} className="mr-2 text-blue-600" />
            Course Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={courseData.title}
                  onChange={handleChange}
                  placeholder="e.g. Advanced Mathematics for Beginners"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleChange}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  value={courseData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {COURSE_CATEGORIES.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Thumbnail
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0 file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
                <input
                  type="text"
                  name="thumbnail"
                  value={courseData.thumbnail}
                  onChange={handleChange}
                  placeholder="e.g. https://example.com/thumbnail.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {courseData.thumbnailPreview && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Preview:</p>
                    <img
                      src={courseData.thumbnailPreview}
                      alt="Course thumbnail preview"
                      className="w-full max-w-[200px] h-auto border rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Modules */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <FileText size={20} className="mr-2 text-blue-600" />
              Course Content
            </h2>
            <button
              type="button"
              onClick={addModule}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-1" /> Add Module
            </button>
          </div>

          <div className="space-y-4">
            {courseData.modules.map((module, moduleIndex) => (
              <div
                key={moduleIndex}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    value={module.title}
                    onChange={(e) =>
                      updateModuleTitle(moduleIndex, e.target.value)
                    }
                    className="text-md font-medium text-gray-900 border-0 focus:outline-none focus:ring-0 w-full max-w-md"
                    placeholder="Module title"
                  />
                  <button
                    type="button"
                    onClick={() => removeModule(moduleIndex)}
                    className="text-red-500 hover:text-red-700"
                    disabled={courseData.modules.length <= 1}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Lessons */}
                <div className="pl-5 border-l-2 border-gray-100 space-y-3">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lessonIndex}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) =>
                            updateLesson(
                              moduleIndex,
                              lessonIndex,
                              "title",
                              e.target.value
                            )
                          }
                          placeholder="Lesson title"
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <select
                          value={lesson.type}
                          onChange={(e) =>
                            updateLesson(
                              moduleIndex,
                              lessonIndex,
                              "type",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="video">Video</option>
                          <option value="reading">Reading</option>
                          <option value="quiz">Quiz</option>
                        </select>

                        <input
                          type="text"
                          value={lesson.content}
                          onChange={(e) =>
                            updateLesson(
                              moduleIndex,
                              lessonIndex,
                              "content",
                              e.target.value
                            )
                          }
                          placeholder={
                            lesson.type === "video"
                              ? "Video URL"
                              : "Content description"
                          }
                          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLesson(moduleIndex, lessonIndex)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addLesson(moduleIndex)}
                    className="inline-flex items-center mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    <Plus size={14} className="mr-1" /> Add Lesson
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white 
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-blue-600"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
          >
            <Save size={18} className="mr-2" />
            {isSubmitting ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreation;
