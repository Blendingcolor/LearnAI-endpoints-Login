import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/context/auth/AuthProvider";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { ForgotYourPassword } from "./pages/auth/ForgotYourPassword";
import { RecoverYourAccount } from "./pages/auth/RecoverYourAccount";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-your-password" element={<ForgotYourPassword />}/>
          <Route path="/recover-your-account" element={<RecoverYourAccount />}/>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;