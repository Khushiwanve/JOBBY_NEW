import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Header = () => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwtToken');
    navigate('/login');
  };

  return (
    <nav className="nav-cont">
      <Link to="/" />
      <ul className="nav-ul">
        <li>
          <Link to="/" className="nav-item">Home</Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-item">Jobs</Link>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={onClickLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
