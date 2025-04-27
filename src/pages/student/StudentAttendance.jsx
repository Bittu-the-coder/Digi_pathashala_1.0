// import React, { useState, useEffect } from "react";
// import StatsCard from "../../components/common/StatsCard";
// import {
//   CheckCircleIcon,
//   XCircleIcon,
//   CalendarIcon,
//   FilterIcon,
//   ClockIcon,
//   ShieldCheckIcon,
//   UserIcon,
// } from "../../components/icons/Icons";
// import { useAuth } from "../../context/AuthContext";
// import { toast } from "react-hot-toast";
// import { useCourses } from "../../context/CourseContext";
// import { useAttendance } from "../../context/AttendanceContext";

// const StudentAttendance = () => {
//   const { currentUser } = useAuth();
//   const { getStudentCourses } = useCourses();
//   const { fetchStudentAttendance, error } = useAttendance();
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (currentUser) {
//       fetchEnrolledCourses();
//     }
//   }, [currentUser]);

//   const fetchEnrolledCourses = async () => {
//     if (!currentUser) return;

//     setLoading(true);
//     try {
//       const response = await getStudentCourses();
//       if (response.success) {
//         setEnrolledCourses(response.data);
//       } else {
//         console.error("Failed to fetch enrolled courses:", response.message);
//       }
//     } catch (error) {
//       console.error("Error fetching enrolled courses:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   console.log(enrolledCourses);

//   const courses = enrolledCourses;

//   const [filters, setFilters] = useState({
//     courseId: "all",
//     startDate: "",
//     endDate: "",
//   });
//   const [attendanceData, setAttendanceData] = useState({
//     records: [],
//     stats: {
//       total: 0,
//       present: 0,
//       absent: 0,
//       late: 0,
//       excused: 0,
//       percentage: 0,
//     },
//     markedBy: {},
//   });

//   // Fetch attendance data with filters
//   const loadAttendanceData = async () => {
//     try {
//       const result = await fetchStudentAttendance(
//         filters.courseId === "all" ? null : filters.courseId,
//         filters.startDate,
//         filters.endDate
//       );

//       if (result?.success) {
//         setAttendanceData({
//           records: result.data || [],
//           stats: result.stats || {
//             total: 0,
//             present: 0,
//             absent: 0,
//             late: 0,
//             excused: 0,
//             percentage: 0,
//           },
//           // Extract unique teachers who marked attendance
//           markedBy:
//             result.data?.reduce((acc, record) => {
//               if (record.markedBy && !acc[record.markedBy._id]) {
//                 acc[record.markedBy._id] = record.markedBy;
//               }
//               return acc;
//             }, {}) || {},
//         });
//       } else {
//         toast.error(result?.message || "Failed to load attendance data");
//       }
//     } catch (err) {
//       toast.error("Error loading attendance data");
//       console.error("Attendance load error:", err);
//     }
//   };

//   useEffect(() => {
//     if (currentUser) {
//       loadAttendanceData();
//     }
//   }, [currentUser, filters]);

//   // Filter records based on selected filters
//   const filteredRecords = attendanceData.records.filter((record) => {
//     const courseMatch =
//       filters.courseId === "all" || record.course?._id === filters.courseId;
//     const dateMatch =
//       (!filters.startDate ||
//         new Date(record.date) >= new Date(filters.startDate)) &&
//       (!filters.endDate || new Date(record.date) <= new Date(filters.endDate));
//     return courseMatch && dateMatch;
//   });

//   // Calculate course-wise statistics
//   const courseStats = filteredRecords.reduce((acc, record) => {
//     if (!record.course) return acc;

//     const courseId = record.course._id;
//     if (!acc[courseId]) {
//       acc[courseId] = {
//         course: record.course,
//         present: 0,
//         absent: 0,
//         late: 0,
//         excused: 0,
//         total: 0,
//       };
//     }
//     acc[courseId][record.status]++;
//     acc[courseId].total++;
//     return acc;
//   }, {});

//   const stats = [
//     {
//       title: "Overall Attendance",
//       value: `${attendanceData.stats.percentage}%`,
//       icon: <CalendarIcon />,
//       bgColor: "bg-indigo-500",
//       textColor: "text-white",
//     },
//     {
//       title: "Present",
//       value: attendanceData.stats.present,
//       icon: <CheckCircleIcon />,
//       bgColor: "bg-green-500",
//       textColor: "text-white",
//     },
//     {
//       title: "Absent",
//       value: attendanceData.stats.absent,
//       icon: <XCircleIcon />,
//       bgColor: "bg-red-500",
//       textColor: "text-white",
//     },
//     {
//       title: "Late",
//       value: attendanceData.stats.late,
//       icon: <ClockIcon />,
//       bgColor: "bg-yellow-500",
//       textColor: "text-white",
//     },
//     {
//       title: "Excused",
//       value: attendanceData.stats.excused,
//       icon: <ShieldCheckIcon />,
//       bgColor: "bg-blue-500",
//       textColor: "text-white",
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "present":
//         return "bg-green-100 text-green-800";
//       case "absent":
//         return "bg-red-100 text-red-800";
//       case "late":
//         return "bg-yellow-100 text-yellow-800";
//       case "excused":
//         return "bg-blue-100 text-blue-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleFilterChange = (name, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-6 text-red-500">
//         Error loading attendance data. Please try again later.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h1 className="text-2xl font-bold text-gray-900 mb-2">My Attendance</h1>
//         <p className="text-gray-600">
//           Track your attendance records across all courses
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
//         {stats.map((stat, index) => (
//           <StatsCard
//             key={index}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//             bgColor={stat.bgColor}
//             textColor={stat.textColor}
//           />
//         ))}
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-6 rounded-lg shadow space-y-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FilterIcon className="h-4 w-4 text-gray-400" />
//             </div>
//             <select
//               value={filters.courseId}
//               onChange={(e) => handleFilterChange("courseId", e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="all">All Courses</option>
//               {courses?.map((course) => (
//                 <option key={course._id} value={course._id}>
//                   {course.title}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <CalendarIcon className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="date"
//               value={filters.startDate}
//               onChange={(e) => handleFilterChange("startDate", e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Start Date"
//             />
//           </div>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <CalendarIcon className="h-4 w-4 text-gray-400" />
//             </div>
//             <input
//               type="date"
//               value={filters.endDate}
//               onChange={(e) => handleFilterChange("endDate", e.target.value)}
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
//               placeholder="End Date"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Course-wise Stats */}
//       {Object.keys(courseStats).length > 0 && (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
//             Course-wise Attendance
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {Object.values(courseStats).map((stat, index) => {
//               const percentage = Math.round((stat.present / stat.total) * 100);
//               return (
//                 <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                   <h4 className="font-medium text-gray-900">
//                     {stat.course.title}
//                   </h4>
//                   <div className="mt-2">
//                     <div className="flex justify-between text-sm mb-1">
//                       <span className="text-gray-600">Attendance Rate</span>
//                       <span className="font-medium">{percentage}%</span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-blue-600 h-2 rounded-full"
//                         style={{ width: `${percentage}%` }}
//                       ></div>
//                     </div>
//                     <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
//                       <div className="text-green-600">
//                         Present: {stat.present}
//                       </div>
//                       <div className="text-red-600">Absent: {stat.absent}</div>
//                       <div className="text-yellow-600">Late: {stat.late}</div>
//                       <div className="text-blue-600">
//                         Excused: {stat.excused}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Attendance Table */}
//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             Attendance History
//           </h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Course
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Marked By
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Remarks
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredRecords.length > 0 ? (
//                 filteredRecords.map((record, index) => (
//                   <tr key={index}>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {new Date(record.date).toLocaleDateString()}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {record.course?.title || "N/A"}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
//                           record.status
//                         )}`}
//                       >
//                         {record.status.charAt(0).toUpperCase() +
//                           record.status.slice(1)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       <div className="flex items-center">
//                         <UserIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
//                         {record.markedBy?.name || "Unknown"}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {record.remarks || "-"}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="px-6 py-4 text-center text-sm text-gray-500"
//                   >
//                     {attendanceData.records.length === 0
//                       ? "No attendance records found"
//                       : "No records match your filters"}
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentAttendance;

import React, { useState, useEffect } from "react";
import StatsCard from "../../components/common/StatsCard";
import {
  CheckCircleIcon,
  XCircleIcon,
  CalendarIcon,
  FilterIcon,
  ClockIcon,
  ShieldCheckIcon,
  UserIcon,
} from "../../components/icons/Icons";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { useCourses } from "../../context/CourseContext";
import { useAttendance } from "../../context/AttendanceContext";

const StudentAttendance = () => {
  const { currentUser } = useAuth();
  const { getStudentCourses } = useCourses();
  const { fetchStudentAttendance, error } = useAttendance();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      fetchEnrolledCourses();
    }
  }, [currentUser]);

  const fetchEnrolledCourses = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const response = await getStudentCourses();
      if (response.success) {
        setEnrolledCourses(response.data);
      } else {
        console.error("Failed to fetch enrolled courses:", response.message);
      }
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const courses = enrolledCourses;

  const [filters, setFilters] = useState({
    courseId: "all",
    startDate: "",
    endDate: "",
  });
  const [attendanceData, setAttendanceData] = useState({
    records: [],
    stats: {
      total: 0,
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      percentage: 0,
    },
    markedBy: {},
  });

  // Fetch attendance data with filters
  const loadAttendanceData = async () => {
    try {
      const result = await fetchStudentAttendance(
        filters.courseId === "all" ? null : filters.courseId,
        filters.startDate,
        filters.endDate
      );

      if (result?.success) {
        setAttendanceData({
          records: result.data || [],
          stats: result.stats || {
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            excused: 0,
            percentage: 0,
          },
          // Extract unique teachers who marked attendance
          markedBy:
            result.data?.reduce((acc, record) => {
              if (record.markedBy && !acc[record.markedBy._id]) {
                acc[record.markedBy._id] = record.markedBy;
              }
              return acc;
            }, {}) || {},
        });
      } else {
        toast.error(result?.message || "Failed to load attendance data");
      }
    } catch (err) {
      toast.error("Error loading attendance data");
      console.error("Attendance load error:", err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAttendanceData();
    }
  }, [currentUser, filters]);

  // Filter records based on selected filters and enrolled courses
  const filteredRecords = attendanceData.records.filter((record) => {
    const courseMatch =
      filters.courseId === "all" || record.course?._id === filters.courseId;
    const dateMatch =
      (!filters.startDate ||
        new Date(record.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(record.date) <= new Date(filters.endDate));
    const enrolledMatch = enrolledCourses.some(
      (course) => course._id === record.course?._id
    );
    return courseMatch && dateMatch && enrolledMatch;
  });

  // Calculate overall statistics based on filtered records
  const calculateStats = (records) => {
    const stats = {
      total: 0,
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      percentage: 0,
    };

    records.forEach((record) => {
      if (record.status === "present") stats.present++;
      if (record.status === "absent") stats.absent++;
      if (record.status === "late") stats.late++;
      if (record.status === "excused") stats.excused++;
      stats.total++;
    });

    stats.percentage =
      stats.total > 0 ? Math.round((stats.present / stats.total) * 100) : 0;
    return stats;
  };

  const overallStats = calculateStats(filteredRecords);

  // Calculate course-wise statistics
  const courseStats = filteredRecords.reduce((acc, record) => {
    if (!record.course) return acc;

    const courseId = record.course._id;
    if (!acc[courseId]) {
      acc[courseId] = {
        course: record.course,
        present: 0,
        absent: 0,
        late: 0,
        excused: 0,
        total: 0,
      };
    }
    acc[courseId][record.status]++;
    acc[courseId].total++;
    return acc;
  }, {});

  const stats = [
    {
      title: "Overall Attendance",
      value: `${overallStats.percentage}%`,
      icon: <CalendarIcon />,
      bgColor: "bg-indigo-500",
      textColor: "text-white",
    },
    {
      title: "Present",
      value: overallStats.present,
      icon: <CheckCircleIcon />,
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
    {
      title: "Absent",
      value: overallStats.absent,
      icon: <XCircleIcon />,
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
    {
      title: "Late",
      value: overallStats.late,
      icon: <ClockIcon />,
      bgColor: "bg-yellow-500",
      textColor: "text-white",
    },
    {
      title: "Excused",
      value: overallStats.excused,
      icon: <ShieldCheckIcon />,
      bgColor: "bg-blue-500",
      textColor: "text-white",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-red-500">
        Error loading attendance data. Please try again later.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Attendance</h1>
        <p className="text-gray-600">
          Track your attendance records across all courses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FilterIcon className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={filters.courseId}
              onChange={(e) => handleFilterChange("courseId", e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Courses</option>
              {courses?.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              placeholder="Start Date"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      {/* Course-wise Stats */}
      {Object.keys(courseStats).length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Course-wise Attendance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(courseStats).map((stat, index) => {
              const percentage = Math.round((stat.present / stat.total) * 100);
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg flex flex-col justify-between h-full"
                >
                  <h4 className="font-medium text-gray-900 truncate">
                    {stat.course.title}
                  </h4>
                  <div className="mt-2 flex-grow">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Attendance Rate</span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="text-green-600">
                        Present: {stat.present}
                      </div>
                      <div className="text-red-600">Absent: {stat.absent}</div>
                      <div className="text-yellow-600">Late: {stat.late}</div>
                      <div className="text-blue-600">
                        Excused: {stat.excused}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Attendance Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Attendance History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marked By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.course?.title || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          record.status
                        )}`}
                      >
                        {record.status.charAt(0).toUpperCase() +
                          record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <UserIcon className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        {record.markedBy?.name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.remarks || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    {attendanceData.records.length === 0
                      ? "No attendance records found"
                      : "No records match your filters"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
