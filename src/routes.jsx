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
import Contact from "./pages/Contact";
import About from "./pages/About";
import HomeCourses from "./pages/HomeCourses";
import Teachers from "./pages/Teachers";
import Resources from "./pages/Resources";
import CourseAttendance from "./pages/admin/CourseAttendance";
import StudentCourseAttendance from "./pages/student/StudentCourseAttendance";
import LiveClassCreate from "./pages/admin/LiveClassCreate";
import Analytics from "./pages/admin/Analytics";
import Performance from "./pages/admin/Performance";
import Settings from "./pages/admin/Settings";
import NewCourse from "./pages/admin/NewCourse";
import { default as AdminProfile } from "./pages/admin/Profile";
import { default as StudentProfile } from "./pages/student/Profile";

const AppRoutes = () => {
  const { user } = useData();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Home />}
      />
      <Route path="/choose-user" element={<ChooseUser />} />
      <Route path="/admin-signin" element={<AdminSignIn />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/student-signin" element={<StudentSignIn />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<HomeCourses />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/teachers" element={<Teachers />} />

      {/* Profile Routes */}
      <Route
        path="/profile"
        element={
          user ? (
            <Navigate to={`/${user.role}/profile`} replace />
          ) : (
            <Navigate to="/choose-user" replace />
          )
        }
      />

      {/* Admin/Teacher Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/new" element={<NewCourse />} />
              <Route path="courses/:courseId" element={<CourseDetail />} />
              <Route path="courses/:courseId/edit" element={<NewCourse />} />
              <Route
                path="courses/:courseId/attendance"
                element={<CourseAttendance />}
              />
              <Route path="students" element={<Users />} />
              <Route path="users" element={<Users />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="attendance/mark" element={<Attendance />} />
              <Route path="live-classes" element={<LiveClasses />} />
              <Route path="live-class/create" element={<LiveClassCreate />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="analytics/performance" element={<Performance />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="enrollments" element={<Users />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRole="student">
            <Routes>
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="courses/:id" element={<CourseDetail />} />
              <Route
                path="courses/:courseId/attendance"
                element={<StudentCourseAttendance />}
              />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="progress" element={<StudentProgress />} />
              <Route path="live-classes" element={<LiveClasses />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
