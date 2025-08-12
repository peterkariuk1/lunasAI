import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Presenting from "./pages/Presenting";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/present-patient"
        element={
          <PrivateRoute>
            <Presenting />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
