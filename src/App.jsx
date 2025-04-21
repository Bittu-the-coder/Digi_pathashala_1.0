import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { DataProvider } from "./context/DataContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
