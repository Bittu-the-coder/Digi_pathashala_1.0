/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";

// Create a context for data
const DataContext = createContext();

// Sample data for the application
const sampleData = {
  users: [
    {
      id: "1",
      name: "John Doe",
      email: "student1@example.com",
      role: "student",
      enrolledCourses: ["101", "102"],
      progress: 65,
      attendance: 78,
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  ],

  courses: [
    {
      id: "101",
      title: "Introduction to React",
      instructor: "Dr. Smith",
      category: "Web Development",
      students: 45,
      status: "Active",
      description: "Learn the basics of React framework.",
      progress: 65,
    },
    {
      id: "102",
      title: "Advanced JavaScript",
      instructor: "Prof. Johnson",
      category: "Web Development",
      students: 32,
      status: "Active",
      description: "Deep dive into advanced JavaScript concepts.",
      progress: 42,
    },
    {
      id: "103",
      title: "Database Design",
      instructor: "Dr. Williams",
      category: "Database",
      students: 28,
      status: "Upcoming",
      description: "Learn to design efficient databases.",
      progress: 0,
    },
  ],

  liveClasses: [
    {
      id: "1001",
      title: "React Hooks Deep Dive",
      date: "2023-08-15T10:00:00",
      duration: "1.5 hours",
      instructor: "Dr. Smith",
      meetingLink: "https://meet.example.com/react-hooks",
      subject: "React",
    },
    {
      id: "1002",
      title: "Building RESTful APIs",
      date: "2023-08-16T14:00:00",
      duration: "2 hours",
      instructor: "Prof. Johnson",
      meetingLink: "https://meet.example.com/rest-apis",
      subject: "Web Development",
    },
    {
      id: "1003",
      title: "SQL Query Optimization",
      date: "2023-08-17T11:00:00",
      duration: "1 hour",
      instructor: "Dr. Williams",
      meetingLink: "https://meet.example.com/sql-optimization",
      subject: "Database",
    },
  ],

  attendance: [
    {
      studentId: "1",
      date: "2023-08-01",
      present: true,
      course: "Introduction to React",
    },
    {
      studentId: "1",
      date: "2023-08-02",
      present: true,
      course: "Advanced JavaScript",
    },
    {
      studentId: "1",
      date: "2023-08-03",
      present: false,
      course: "Introduction to React",
    },
    {
      studentId: "1",
      date: "2023-08-04",
      present: true,
      course: "Advanced JavaScript",
    },
    {
      studentId: "1",
      date: "2023-08-07",
      present: true,
      course: "Introduction to React",
    },
    {
      studentId: "1",
      date: "2023-08-08",
      present: false,
      course: "Advanced JavaScript",
    },
    {
      studentId: "1",
      date: "2023-08-09",
      present: true,
      course: "Introduction to React",
    },
  ],
};

// Create a provider component
export const DataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(sampleData.courses);
  const [liveClasses, setLiveClasses] = useState(sampleData.liveClasses);
  const [attendance, setAttendance] = useState(sampleData.attendance);

  // Function to log in a user
  const login = (email, password) => {
    // Simple authentication (in a real app, use proper auth)
    const foundUser = sampleData.users.find((u) => u.email === email);
    if (foundUser) {
      // Simulate role-based validation
      if (email === "admin@example.com" && password === "admin123") {
        setUser(foundUser);
        return true;
      } else if (
        email === "student1@example.com" &&
        password === "student123"
      ) {
        setUser(foundUser);
        return true;
      }
    }
    return false;
  };

  // Function to log out
  const logout = () => {
    setUser(null);
  };

  // Function to get student attendance
  const getStudentAttendance = (studentId) => {
    return sampleData.attendance
      .filter((a) => a.studentId === studentId)
      .map((a) => ({
        date: a.date,
        present: a.present,
        course: a.course,
      }));
  };

  // Value object to be provided to consumers
  const value = {
    user,
    courses,
    liveClasses,
    attendance,
    login,
    logout,
    getStudentAttendance,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = () => {
  return useContext(DataContext);
};

export default DataContext;
