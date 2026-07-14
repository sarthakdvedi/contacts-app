import './index.css'
import { Routes, Route } from "react-router";

import AddContactPage from './pages/AddContactPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import EditContactPage from './pages/EditContactPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from "./components/ProtectedRoutes.jsx";

function App() {
  return (
    <div className="relative h-full w-full">
      <Routes>
        <Route
          path="/contacts/add"
          element={
            <ProtectedRoute>
              <AddContactPage />
            </ProtectedRoute>
          } />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contacts/edit/:id"
          element={
            <ProtectedRoute>
              <EditContactPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
