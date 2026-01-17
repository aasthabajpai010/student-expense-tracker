import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Expenses } from "./pages/Expenses.jsx";
import { Budgets } from "./pages/Budgets.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Layout } from "./components/Layout.jsx";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/budgets" element={<Budgets />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
