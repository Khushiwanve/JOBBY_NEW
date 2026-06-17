import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import Jobs from './Component/Jobs';
import Header from './Component/Header';
import NotFound from './Component/notFound';
import ProtectedRoute from './Component/ProtectedRoute';
import JobDetailedview from './Component/DetailedView';

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <Header />}

      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<ProtectedRoute Component={Jobs} />} />
        <Route path="/jobs/:id" element={<ProtectedRoute Component={JobDetailedview} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
