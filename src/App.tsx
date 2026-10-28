import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import ErrorBoundary from './components/common/ErrorBoundary';
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">

      <div className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </div>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
