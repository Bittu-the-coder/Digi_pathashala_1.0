import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import { CourseProvider } from "./context/CourseContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <DataProvider>
          <UserProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <AppRoutes />
                <Toaster position="top-right" />
              </div>
            </Router>
          </UserProvider>
        </DataProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
