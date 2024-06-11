import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Solve from './pages/Solve';
import Landing from './pages/Landing';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';

const AppContent = () => {
  const { user } = useAuthContext();
  const location = useLocation();

  // Check if the current path is the landing page
  const isLandingPage = location.pathname === '/';

  return (
    <div className="App">
      {!isLandingPage && <Navbar />}
      <div className="pages">
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/home" /> : <Landing />}
          />
          <Route
            path="/home"
            element={user ? (user.role === 'admin' ? <AdminHome /> : <UserHome />) : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/home" />}
          />
          <Route
            path="/:id"
            element={user ? <Solve /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

