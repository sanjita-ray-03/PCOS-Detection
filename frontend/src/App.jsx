import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Results from "./pages/Results";
import History from "./pages/History";
import Profile from "./pages/Profile";
import EditProfile from "./pages/editProfile";
import Assessment from "./pages/Assessment";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (
    <Routes>
      <Route
        path="/results"
        element={
          <ProtectedRoute>
          <Results />
          </ProtectedRoute>
        }
        />

      <Route
        path="/assessment"
        element={
          <ProtectedRoute>
          <Assessment />
          </ProtectedRoute>
        }
        />        

        <Route
        path="/history"
        element={
          <ProtectedRoute>
          <History />
          </ProtectedRoute>
        }
        />

        <Route
        path="/profile"
        element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
        }
        />

        <Route
          path="/edit-profile"
          element={<EditProfile />}
/>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;