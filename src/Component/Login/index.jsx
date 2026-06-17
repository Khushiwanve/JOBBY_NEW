import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css';

const Login = () => {
  const [allValues, setValues] = useState({
    username: '',
    password: '',
    errorMsg: '',
  });

  const navigate = useNavigate();
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    if (token !== undefined) {
      navigate('/');
    }
  }, []);

  const onSubmitUserDetails = async (e) => {
    e.preventDefault();
    const api = 'https://apis.ccbp.in/login';

    const userDetails = {
      username: allValues.username,
      password: allValues.password,
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();

      if (response.ok === true) {
        setValues({ ...allValues, errorMsg: '' });
        Cookies.set('jwtToken', data.jwt_token, { expires: 30 });
        navigate('/');
      } else {
        setValues({ ...allValues, errorMsg: data.error_msg });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-cont">
      <form
        className="login-form w-40 p-5 ml-5 border-primary rounded"
        onSubmit={onSubmitUserDetails}
      >
        <div className="form-group">
          <label htmlFor="username">UserName</label>
          <input
            onChange={(e) => setValues({ ...allValues, username: e.target.value })}
            type="text"
            className="form-control"
            id="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setValues({ ...allValues, password: e.target.value })}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block ml-1 p-2">
          Login
        </button>
      </form>

      <p className="text-danger text-center mt-3">{allValues.errorMsg}</p>
    </div>
  );
};

export default Login;
