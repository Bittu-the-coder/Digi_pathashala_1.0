import React, { createContext, useContext, useState, useEffect } from "react";
import classService from "../services/classService";
import { useAuth } from "./AuthContext";

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [liveClasses, setLiveClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch live classes from backend
  const fetchLiveClasses = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await classService.getLiveClasses(filters);
      setLiveClasses(response || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching live classes");
      console.error("Error fetching live classes:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new live class
  const createLiveClass = async (classData) => {
    try {
      console.log("Current user:", currentUser); // Debugging line
      if (!currentUser || !currentUser.token) {
        throw new Error("You must be logged in to create a live class");
      }

      const response = await classService.createLiveClass(
        classData,
        currentUser.token
      );

      // Ensure we're adding the correct data to the state
      if (response && response.liveClass) {
        setLiveClasses((prevClasses) => [...prevClasses, response.liveClass]);
        return { success: true, liveClass: response.liveClass };
      } else {
        console.error("Invalid response format:", response);
        return {
          success: false,
          error: "Invalid server response format",
        };
      }
    } catch (err) {
      console.error("Create live class error:", err);
      return {
        success: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Error scheduling live class",
      };
    }
  };

  // Update a live class
  const updateLiveClass = async (id, classData) => {
    try {
      if (!currentUser || !currentUser.token) {
        throw new Error("You must be logged in to update a live class");
      }

      const response = await classService.updateLiveClass(
        id,
        classData,
        currentUser.token
      );

      // Ensure we're updating with the correct data
      if (response && response.liveClass) {
        setLiveClasses((prevClasses) =>
          prevClasses.map((cls) => (cls._id === id ? response.liveClass : cls))
        );
        return { success: true, liveClass: response.liveClass };
      } else {
        console.error("Invalid response format:", response);
        return {
          success: false,
          error: "Invalid server response format",
        };
      }
    } catch (err) {
      console.error("Update live class error:", err);
      return {
        success: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Error updating live class",
      };
    }
  };

  // Delete a live class
  const deleteLiveClass = async (id) => {
    try {
      if (!currentUser || !currentUser.token) {
        throw new Error("You must be logged in to delete a live class");
      }

      await classService.deleteLiveClass(id, currentUser.token);
      setLiveClasses(liveClasses.filter((cls) => cls._id !== id));
      return { success: true };
    } catch (err) {
      console.error("Delete live class error:", err);
      return {
        success: false,
        error:
          err.response?.data?.message ||
          err.message ||
          "Error cancelling live class",
      };
    }
  };

  useEffect(() => {
    fetchLiveClasses();
  }, []);

  return (
    <ClassContext.Provider
      value={{
        liveClasses,
        loading,
        error,
        fetchLiveClasses,
        createLiveClass,
        updateLiveClass,
        deleteLiveClass,
      }}
    >
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => useContext(ClassContext);
