import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { CourseProvider } from "./context/CourseContext";
import { UserProvider } from "./context/UserContext";
import { AttendanceProvider } from "./context/AttendanceContext";
import { ClassProvider } from "./context/ClassContext";
import { ContactProvider } from "./context/ContactContext";

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <ClassProvider>
          <DataProvider>
            <UserProvider>
              <AttendanceProvider>
                <ContactProvider>
                  <Router>
                    <div className="min-h-screen bg-gray-50">
                      <AppRoutes />
                      <Toaster position="top-right" />
                    </div>
                  </Router>
                </ContactProvider>
              </AttendanceProvider>
            </UserProvider>
          </DataProvider>
        </ClassProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
