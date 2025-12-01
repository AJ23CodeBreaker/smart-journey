
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Advisor } from './pages/Advisor';
import { Learn } from './pages/Learn';
import { Lesson } from './pages/Lesson';
import { Arcade } from './pages/Arcade';
import { QuizSelect } from './pages/QuizSelect';
import { Quiz } from './pages/Quiz';
import { CertificateView } from './pages/Certificate';

const PrivateRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/advisor" element={<PrivateRoute><Advisor /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      
      {/* New Routes */}
      <Route path="/learn" element={<PrivateRoute><Learn /></PrivateRoute>} />
      <Route path="/lesson/:id" element={<PrivateRoute><Lesson /></PrivateRoute>} />
      <Route path="/arcade" element={<PrivateRoute><Arcade /></PrivateRoute>} />
      <Route path="/quiz" element={<PrivateRoute><QuizSelect /></PrivateRoute>} />
      <Route path="/quiz/:level" element={<PrivateRoute><Quiz /></PrivateRoute>} />
      <Route path="/certificates" element={<PrivateRoute><CertificateView /></PrivateRoute>} />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <AppRoutes />
            </Layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
