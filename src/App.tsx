import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/loginPage';
import HierarchyPage from './pages/HierarchyPage';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Redirect root to /login so the dev server opening "/" matches a route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/hierarchy" 
            element={
              <PrivateRoute>
                <HierarchyPage />
              </PrivateRoute>
            } 
          />
          {/* Catch-all: redirect unknown paths to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
