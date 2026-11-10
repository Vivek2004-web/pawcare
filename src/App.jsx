import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PetProvider } from './context/PetContext';

import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import BrowsePets from './pages/BrowsePets';
import PetDetails from './pages/PetDetails';
import AdoptionApplication from './pages/AdoptionApplication';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import LoadingSpinner from './components/common/LoadingSpinner';

// Protected Route Component for Adopters
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner fullScreen message="Checking authentication..." />;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Protected Route Component for Shelter Admins
function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <LoadingSpinner fullScreen message="Checking admin permissions..." />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PetProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="pets" element={<BrowsePets />} />
              <Route path="pets/:id" element={<PetDetails />} />
              <Route path="pets/:id/apply" element={<AdoptionApplication />} />
              
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </PetProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

