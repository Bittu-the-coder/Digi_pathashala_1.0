import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminSignIn from "./components/auth/AdminSignIn";
import AdminRegister from "./components/auth/AdminRegister";
import ChooseUser from "./components/auth/ChooseUser";
import StudentSignIn from "./components/auth/StudentSignIn";
import StudentRegister from "./components/auth/StudentRegister";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import CourseDetail from "./pages/student/CourseDetail";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProgress from "./pages/student/StudentProgress";
import LiveClasses from "./pages/student/LiveClasses";
import Courses from "./pages/admin/Courses";
import Users from "./pages/admin/Users";
import Attendance from "./pages/admin/Attendance";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useData } from "./context/DataContext";

const AppRoutes = () => {
  const { user } = useData();

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Home />}
      />
      <Route path="/choose-user" element={<ChooseUser />} />
      <Route path="/admin-signin" element={<AdminSignIn />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/student-signin" element={<StudentSignIn />} />
      <Route path="/student-register" element={<StudentRegister />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute allowedRole="admin">
            <Courses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/attendance"
        element={
          <ProtectedRoute allowedRole="admin">
            <Attendance />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/courses"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentCourses />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/courses/:id"
        element={
          <ProtectedRoute allowedRole="student">
            <CourseDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/attendance"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentAttendance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/progress"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentProgress />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/live-classes"
        element={
          <ProtectedRoute allowedRole="student">
            <LiveClasses />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
