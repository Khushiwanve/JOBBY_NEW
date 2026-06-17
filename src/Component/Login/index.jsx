import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Login = () => {
  const [isSignup, setIsSignup] = useState(false)
  const [allValues, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    errorMsg: '',
  })

  const navigate = useNavigate()
  const token = Cookies.get('jwtToken')

  useEffect(() => {
    if (token !== undefined) {
      navigate('/')
    }
  }, [])

  const onSubmitLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('jobby_users') || '{}')
    const user = users[allValues.username]

    if (!user) {
      setValues({ ...allValues, errorMsg: 'Username not found. Please sign up first.' })
      return
    }

    if (user.password !== allValues.password) {
      setValues({ ...allValues, errorMsg: 'Incorrect password. Please try again.' })
      return
    }

    Cookies.set('jwtToken', btoa(allValues.username), { expires: 30 })
    navigate('/')
  }

  const onSubmitSignup = (e) => {
    e.preventDefault()

    if (allValues.username.trim() === '') {
      setValues({ ...allValues, errorMsg: 'Username cannot be empty.' })
      return
    }

    if (allValues.password.length < 6) {
      setValues({ ...allValues, errorMsg: 'Password must be at least 6 characters.' })
      return
    }

    if (allValues.password !== allValues.confirmPassword) {
      setValues({ ...allValues, errorMsg: 'Passwords do not match.' })
      return
    }

    const users = JSON.parse(localStorage.getItem('jobby_users') || '{}')

    if (users[allValues.username]) {
      setValues({ ...allValues, errorMsg: 'Username already exists. Please login.' })
      return
    }

    users[allValues.username] = { password: allValues.password }
    localStorage.setItem('jobby_users', JSON.stringify(users))

    Cookies.set('jwtToken', btoa(allValues.username), { expires: 30 })
    navigate('/')
  }

  return (
    <div className="login-cont">
      <form
        className="login-form w-40 p-5 ml-5 border-primary rounded"
        onSubmit={isSignup ? onSubmitSignup : onSubmitLogin}
      >
        <h3 className="text-center mb-4 text-white">
          {isSignup ? 'Create Account' : 'Login'}
        </h3>

        <div className="form-group">
          <label className="text-white">Username</label>
          <input
            onChange={(e) => setValues({ ...allValues, username: e.target.value, errorMsg: '' })}
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={allValues.username}
          />
        </div>

        <div className="form-group">
          <label className="text-white">Password</label>
          <input
            onChange={(e) => setValues({ ...allValues, password: e.target.value, errorMsg: '' })}
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={allValues.password}
          />
        </div>

        {isSignup && (
          <div className="form-group">
            <label className="text-white">Confirm Password</label>
            <input
              onChange={(e) =>
                setValues({ ...allValues, confirmPassword: e.target.value, errorMsg: '' })
              }
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={allValues.confirmPassword}
            />
          </div>
        )}

        {allValues.errorMsg && (
          <p className="text-danger text-center">{allValues.errorMsg}</p>
        )}

        <button type="submit" className="btn btn-primary btn-block ml-1 p-2 mt-2">
          {isSignup ? 'Sign Up' : 'Login'}
        </button>

        <p className="text-center mt-3 text-white">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            className="btn btn-link text-warning p-0 ml-2"
            onClick={() => {
              setIsSignup(!isSignup)
              setValues({ username: '', password: '', confirmPassword: '', errorMsg: '' })
            }}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login