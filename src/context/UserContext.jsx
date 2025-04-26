import { createContext, useContext, useState, useEffect } from "react";
import userService from "../services/userService";
import { useAuth } from "./AuthContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [currentUserProfile, setCurrentUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  // Fetch all users (admin only)
  const fetchUsers = async () => {
    if (!currentUser || currentUser.role !== "admin") return;

    setLoading(true);
    try {
      const data = await userService.getUsers(currentUser.token);
      setUsers(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all students (admin/teacher)
  const fetchStudents = async () => {
    if (!currentUser || !["admin", "teacher"].includes(currentUser.role))
      return;

    setLoading(true);
    try {
      const data = await userService.getStudents(currentUser.token);
      setStudents(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch students");
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all teachers (admin only)
  const fetchTeachers = async () => {
    if (!currentUser || currentUser.role !== "admin") return;

    setLoading(true);
    try {
      const data = await userService.getTeachers(currentUser.token);
      setTeachers(data.data || []);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch teachers");
      console.error("Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user profile
  const fetchUserProfile = async () => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const data = await userService.getUserProfile(currentUser.token);
      setCurrentUserProfile(data.data || null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch user profile");
      console.error("Error fetching user profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    if (!currentUser) return;

    setLoading(true);
    try {
      const data = await userService.updateProfile(
        profileData,
        currentUser.token
      );
      setCurrentUserProfile(data.data || null);
      setError(null);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message || "Failed to update profile");
      console.error("Error updating profile:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update user by ID (admin only)
  const updateUserById = async (userId, userData) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    setLoading(true);
    try {
      const data = await userService.updateUser(
        userId,
        userData,
        currentUser.token
      );

      // Update the user in the appropriate state
      setUsers((prev) =>
        prev.map((user) => (user._id === userId ? data.data : user))
      );
      setStudents((prev) =>
        prev.map((student) => (student._id === userId ? data.data : student))
      );
      setTeachers((prev) =>
        prev.map((teacher) => (teacher._id === userId ? data.data : teacher))
      );

      setError(null);
      return { success: true, data: data.data };
    } catch (err) {
      setError(err.message || "Failed to update user");
      console.error("Error updating user:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Delete user by ID (admin only)
  const deleteUserById = async (userId) => {
    if (!currentUser || currentUser.role !== "admin") {
      return { success: false, error: "Unauthorized" };
    }

    setLoading(true);
    try {
      await userService.deleteUser(userId, currentUser.token);

      // Remove the user from all state arrays
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setStudents((prev) => prev.filter((student) => student._id !== userId));
      setTeachers((prev) => prev.filter((teacher) => teacher._id !== userId));

      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.message || "Failed to delete user");
      console.error("Error deleting user:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch current user profile on mount
  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  return (
    <UserContext.Provider
      value={{
        users,
        students,
        teachers,
        currentUserProfile,
        loading,
        error,
        fetchUsers,
        fetchStudents,
        fetchTeachers,
        fetchUserProfile,
        updateUserProfile,
        updateUserById,
        deleteUserById,
        refetchStudents: fetchStudents,
        refetchTeachers: fetchTeachers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = () => useContext(UserContext);
