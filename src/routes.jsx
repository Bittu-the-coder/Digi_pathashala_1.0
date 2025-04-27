import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminSignIn from "./components/auth/AdminSignIn";
import AdminRegister from "./components/auth/AdminRegister";
import ChooseUser from "./components/auth/ChooseUser";
import StudentSignIn from "./components/auth/StudentSignIn";
import StudentRegister from "./components/auth/StudentRegister";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import { default as StudentCourseDetail } from "./pages/student/CourseDetail";
import { default as AdminCourseDetail } from "./pages/admin/CourseDetail";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProgress from "./pages/student/StudentProgress";
import { default as AdminLiveClasses } from "./pages/admin/LiveClasses";
import { default as StudentLiveClasses } from "./pages/student/LiveClasses";
import Courses from "./pages/admin/Courses";
import Users from "./pages/admin/Users";
import Attendance from "./pages/admin/Attendance";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Contact from "./pages/Contact";
import About from "./pages/About";
import HomeCourses from "./pages/HomeCourses";
import Teachers from "./pages/Teachers";
import Resources from "./pages/Resources";
import CourseAttendance from "./pages/admin/CourseAttendance";
import StudentCourseAttendance from "./pages/student/StudentCourseAttendance";
import LiveClassCreate from "./pages/admin/LiveClassCreate";
import LiveClassEdit from "./components/admin/LiveClassEdit";
import Analytics from "./pages/admin/Analytics";
import Performance from "./pages/admin/Performance";
import Settings from "./pages/admin/Settings";
import NewCourse from "./pages/admin/NewCourse";
import { default as AdminProfile } from "./pages/admin/Profile";
import { default as StudentProfile } from "./pages/student/Profile";
import ExploreCourses from "./pages/student/ExploreCourses";
import ExploreTeachers from "./pages/student/ExploreTeachers";
import CourseEdit from "./pages/admin/CourseEdit";

const AppRoutes = () => {
  const { currentUser, isAdmin, isStudent } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          currentUser ? (
            <Navigate to={`/${isAdmin ? "admin" : "student"}/dashboard`} />
          ) : (
            <Home />
          )
        }
      />
      <Route path="/choose-user" element={<ChooseUser />} />
      <Route path="/admin-signin" element={<AdminSignIn />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/student-signin" element={<StudentSignIn />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<HomeCourses />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/teachers" element={<Teachers />} />

      {/* Profile Routes */}
      <Route
        path="/profile"
        element={
          currentUser ? (
            <Navigate
              to={`/${isAdmin ? "admin" : "student"}/profile`}
              replace
            />
          ) : (
            <Navigate to="/choose-user" replace />
          )
        }
      />

      {/* Admin/Teacher Routes */}
      <Route path="/admin" element={<ProtectedRoute requiredRole="admin" />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/new" element={<NewCourse />} />
        <Route path="courses/:courseId" element={<AdminCourseDetail />} />
        <Route path="courses/:courseId/edit" element={<CourseEdit />} />
        <Route
          path="courses/:courseId/attendance"
          element={<CourseAttendance />}
        />
        <Route path="students" element={<Users />} />
        <Route path="users" element={<Users />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="attendance/mark" element={<Attendance />} />
        <Route path="live-classes" element={<AdminLiveClasses />} />
        <Route path="live-class/create" element={<LiveClassCreate />} />
        <Route path="live-class/edit/:id" element={<LiveClassEdit />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="analytics/performance" element={<Performance />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="enrollments" element={<Users />} />
      </Route>

      {/* Student Routes */}
      <Route
        path="/student"
        element={<ProtectedRoute requiredRole="student" />}
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="explore-courses" element={<ExploreCourses />} />
        <Route path="explore-teachers" element={<ExploreTeachers />} />
        <Route path="courses/:id" element={<StudentCourseDetail />} />
        <Route
          path="courses/:courseId/attendance"
          element={<StudentCourseAttendance />}
        />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="live-classes" element={<StudentLiveClasses />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
