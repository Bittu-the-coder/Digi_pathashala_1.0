/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { updateUserProfile as updateUserProfileAPI } from "../services/authService";
import toast from "react-hot-toast";

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
      phone: "+91 9876543210",
      address: "456 Learning Avenue, Student City, 560002",
      bio: "Passionate learner interested in Computer Science, Mathematics, and Physics. Looking to expand my knowledge and skills through quality education.",
      interests: "Programming, Mathematics, Science",
      joinedDate: "March 2022",
    },
    {
      id: "2",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      phone: "+91 9876543210",
      address: "123 Education Lane, Teaching City, 560001",
      bio: "Experienced educator passionate about sharing knowledge.",
      specialization: "Computer Science, Mathematics",
      joinedDate: "January 2020",
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
  const { currentUser, loading } = useAuth();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState(sampleData.courses);
  const [liveClasses, setLiveClasses] = useState(sampleData.liveClasses);
  const [attendance, setAttendance] = useState(sampleData.attendance);

  // Update user when authentication state changes
  useEffect(() => {
    if (currentUser) {
      // Find the user in our sample data that matches the authenticated user
      const foundUser = sampleData.users.find(
        (u) => u.email === currentUser.email
      );

      if (foundUser) {
        setUser(foundUser);
      } else {
        // If user not found in sample data, use currentUser data directly
        setUser(currentUser);
      }
    } else {
      setUser(null);
    }
  }, [currentUser]);

  // Function to log in a user - kept for backward compatibility
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

  // Function to update user profile
  const updateUserProfile = async (updatedUserData) => {
    try {
      // Update the user profile in the backend
      const response = await updateUserProfileAPI(updatedUserData);

      // If successful, update the local state with the data returned from the server
      if (response.success) {
        // Update the local user state with the data returned from the server
        // This ensures we have the exact data saved in the database
        setUser(response.data);

        // Important: Also update the auth context to keep data in sync
        if (window.updateAuthUserData) {
          window.updateAuthUserData(response.data);
        }

        toast.success("Profile updated successfully!");
        return true;
      } else {
        toast.error(response.message || "Failed to update profile");
        return false;
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error.message || "An error occurred while updating your profile"
      );
      return false;
    }
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
    updateUserProfile,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Custom hook to use the data context
export const useData = () => {
  return useContext(DataContext);
};

export default DataContext;
