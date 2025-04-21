import React, { useState } from "react";
import AttendanceTable from "../../components/admin/AttendanceTable";
import { CalendarIcon, FilterIcon } from "../../components/icons/Icons";

const Attendance = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  // Dummy attendance data
  const attendanceData = [
    {
      studentName: "John Doe",
      studentEmail: "john.doe@example.com",
      courseName: "React Fundamentals",
      date: "2023-08-01",
      present: true,
    },
    {
      studentName: "Sarah Smith",
      studentEmail: "sarah.smith@example.com",
      courseName: "Advanced JavaScript",
      date: "2023-08-01",
      present: false,
    },
    {
      studentName: "Michael Brown",
      studentEmail: "michael.brown@example.com",
      courseName: "React Fundamentals",
      date: "2023-08-01",
      present: true,
    },
    {
      studentName: "Emily Johnson",
      studentEmail: "emily.j@example.com",
      courseName: "NodeJS Basics",
      date: "2023-08-01",
      present: true,
    },
  ];

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Attendance</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage student attendance records.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Select date"
            />
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon />
            </div>
            <select className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 py-2 sm:text-sm border-gray-300 rounded-md">
              <option value="">All courses</option>
              <option value="react">React Fundamentals</option>
              <option value="js">Advanced JavaScript</option>
              <option value="node">NodeJS Basics</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <AttendanceTable attendanceData={attendanceData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
