import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorBoundary from './components/common/ErrorBoundary';
import AdminLayout from './components/layout/admin/AdminLayout';
import Login from './pages/auth/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import AdminProducts from './pages/admin/AdminProducts';
import AdminSuppliers from './pages/admin/AdminSuppliers';
import AdminSettings from './pages/admin/AdminSettings';
import AdminInventory from './pages/admin/AdminInventory';
import AdminBrands from './pages/admin/AdminBrands';

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
              <Route path="products" element={<AdminProducts />} />
              <Route path="inventory" element={<AdminInventory />} />
              <Route path="suppliers" element={<AdminSuppliers />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="brands" element={<AdminBrands />} />
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
