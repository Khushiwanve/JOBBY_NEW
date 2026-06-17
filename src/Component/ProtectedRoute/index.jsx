import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = (props) => {
  const { Component } = props;
  const token = Cookies.get('jwtToken');

  if (token === undefined) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default ProtectedRoute;
