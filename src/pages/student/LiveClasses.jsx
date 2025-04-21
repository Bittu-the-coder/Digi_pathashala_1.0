import React, { useState } from "react";
import { useData } from "../../context/DataContext";
import LiveClassCard from "../../components/student/LiveClassCard";
import { CalendarIcon, FilterIcon } from "../../components/icons/Icons";

const LiveClasses = () => {
  const { liveClasses } = useData();
  const [filterType, setFilterType] = useState("all");

  // Process the date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) +
      ", " +
      date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    );
  };

  // Add display data to live classes
  const processedClasses = liveClasses.map((classItem) => ({
    ...classItem,
    time: formatDate(classItem.date),
    participants: Math.floor(Math.random() * 30) + 10, // Random number for demo
  }));

  // Filter classes based on selected type
  const filteredClasses =
    filterType === "all"
      ? processedClasses
      : filterType === "upcoming"
      ? processedClasses.filter((c) => new Date(c.date) > new Date())
      : processedClasses.filter((c) => new Date(c.date) <= new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Live Classes
          </h1>
          <p className="text-gray-600">
            Attend interactive online sessions with instructors
          </p>
        </div>

        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setFilterType("all")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              filterType === "all"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border border-gray-300`}
          >
            All Classes
          </button>
          <button
            type="button"
            onClick={() => setFilterType("upcoming")}
            className={`px-4 py-2 text-sm font-medium ${
              filterType === "upcoming"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border-t border-b border-r border-gray-300`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setFilterType("completed")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              filterType === "completed"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            } border-t border-b border-r border-gray-300`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-lg shadow flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CalendarIcon className="text-gray-400" />
          </div>
          <input
            type="date"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FilterIcon className="text-gray-400" />
          </div>
          <select className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Computer Science</option>
          </select>
        </div>
      </div>

      {/* Live Classes Grid */}
      {filteredClasses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((classItem) => (
            <LiveClassCard key={classItem.id} classItem={classItem} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="text-gray-400 text-6xl mb-4">📺</div>
          <h3 className="text-xl font-medium text-gray-900">
            No classes found
          </h3>
          <p className="mt-2 text-gray-500">
            There are no {filterType !== "all" ? filterType : ""} classes
            available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
