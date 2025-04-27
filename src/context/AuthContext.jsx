// /* eslint-disable no-unused-vars */
// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   getCurrentUser,
//   adminSignIn,
//   studentSignIn,
//   register,
//   logout as logoutService,
// } from "../services/authService";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to update auth user data when profile is updated
//   const updateCurrentUserData = (userData) => {
//     setCurrentUser(userData);
//   };

//   // Make the update function globally available for cross-context communication
//   useEffect(() => {
//     window.updateAuthUserData = updateCurrentUserData;
//     return () => {
//       delete window.updateAuthUserData;
//     };
//   }, []);

//   // Check for existing token and fetch user data on app load
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchUser = async () => {
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const data = await getCurrentUser();
//         if (data && data.success && data.data) {
//           setCurrentUser(data.data);
//         } else {
//           // Handle case where token exists but is invalid
//           localStorage.removeItem("token");
//           console.error("Invalid user data returned from API");
//         }
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         localStorage.removeItem("token"); // Clear invalid token
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Admin login method
//   const loginAdmin = async (email, password) => {
//     try {
//       const data = await adminSignIn(email, password);
//       localStorage.setItem("token", data.token);
//       setCurrentUser(data.user);
//       return { success: true, user: data.user };
//     } catch (error) {
//       console.error("Admin login error:", error);
//       return { success: false, error: error.message || "Login failed" };
//     }
//   };

//   // Student login method
//   const loginStudent = async (email, password) => {
//     try {
//       const data = await studentSignIn(email, password);
//       localStorage.setItem("token", data.token);
//       setCurrentUser(data.user);
//       return { success: true, user: data.user };
//     } catch (error) {
//       console.error("Student login error:", error);
//       return { success: false, error: error.message || "Login failed" };
//     }
//   };

//   // Register method for both user types
//   const registerUser = async (userData) => {
//     try {
//       const data = await register(userData);
//       // Store token and set current user immediately after successful registration
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         setCurrentUser(data.user);
//       }
//       return { success: true, message: data.message, user: data.user };
//     } catch (error) {
//       console.error("Registration error:", error);
//       return { success: false, error: error.message || "Registration failed" };
//     }
//   };

//   // Logout method
//   const logout = async () => {
//     try {
//       await logoutService();
//       setCurrentUser(null);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         currentUser,
//         loading,
//         loginAdmin,
//         loginStudent,
//         registerUser,
//         logout,
//         isAuthenticated: !!currentUser,
//         isAdmin: currentUser?.role === "admin",
//         isStudent: currentUser?.role === "student",
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import {
  getCurrentUser,
  adminSignIn,
  studentSignIn,
  register,
  logout as logoutService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to update auth user data when profile is updated
  const updateCurrentUserData = (userData) => {
    setCurrentUser(userData);
  };

  // Make the update function globally available for cross-context communication
  useEffect(() => {
    window.updateAuthUserData = updateCurrentUserData;
    return () => {
      delete window.updateAuthUserData;
    };
  }, []);

  // Check for existing token and fetch user data on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging line

    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCurrentUser();
        if (data && data.success && data.data) {
          setCurrentUser({ ...data.data, token }); // Ensure token is included
          console.log("Current user set:", { ...data.data, token }); // Debugging line
        } else {
          // Handle case where token exists but is invalid
          localStorage.removeItem("token");
          console.error("Invalid user data returned from API");
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        localStorage.removeItem("token"); // Clear invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Admin login method
  const loginAdmin = async (email, password) => {
    try {
      const data = await adminSignIn(email, password);
      localStorage.setItem("token", data.token);
      setCurrentUser({ ...data.user, token: data.token }); // Ensure token is included
      console.log("Admin login successful:", {
        ...data.user,
        token: data.token,
      }); // Debugging line
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Admin login error:", error);
      return { success: false, error: error.message || "Login failed" };
    }
  };

  // Student login method
  const loginStudent = async (email, password) => {
    try {
      const data = await studentSignIn(email, password);
      localStorage.setItem("token", data.token);
      setCurrentUser({ ...data.user, token: data.token }); // Ensure token is included
      console.log("Student login successful:", {
        ...data.user,
        token: data.token,
      }); // Debugging line
      return { success: true, user: data.user };
    } catch (error) {
      console.error("Student login error:", error);
      return { success: false, error: error.message || "Login failed" };
    }
  };

  // Register method for both user types
  const registerUser = async (userData) => {
    try {
      const data = await register(userData);
      // Store token and set current user immediately after successful registration
      if (data.token) {
        localStorage.setItem("token", data.token);
        setCurrentUser({ ...data.user, token: data.token }); // Ensure token is included
        console.log("Registration successful:", {
          ...data.user,
          token: data.token,
        }); // Debugging line
      }
      return { success: true, message: data.message, user: data.user };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message || "Registration failed" };
    }
  };

  // Logout method
  const logout = async () => {
    try {
      await logoutService();
      setCurrentUser(null);
      localStorage.removeItem("token");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        loginAdmin,
        loginStudent,
        registerUser,
        logout,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === "admin",
        isStudent: currentUser?.role === "student",
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
