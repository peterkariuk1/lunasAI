import "./styles/App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Tests from "./pages/Tests";
import SpeechRecg from "./components/SpeechRecg";

function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tests" element={<Tests />} />
      <Route path="/mic" element={<SpeechRecg/>} />
      <Route
        path="/lunas"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
