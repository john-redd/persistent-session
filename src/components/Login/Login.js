import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { updateUser, logoutUser } from '../../redux/reducers/user'
import './login.css'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const validateForm = () => {
    let validForm = false
    if (!email) {
      alert('Please input a valid email.')
      return validForm
    }

    if (!password) {
      alert('Please input a password.')
      return validForm
    }

    validForm = true
    return validForm
  }

  const registerUser = (body) => {
    axios.post('/auth/register', body )
    .then(res => {
      dispatch(updateUser(res.data))
    })
    .catch(err => console.log(err))
  }

  const register = (e) => {
    e.preventDefault()

    if (validateForm()) {
      registerUser({ email, password })
    }
  }

  const loginUser = (body) => {
    axios.post('/auth/login', body)
    .then(res => {
      dispatch(updateUser(res.data))
    })
    .catch(err => console.log(err))
  }

  const login = (e) => {
    e.preventDefault()

    if (validateForm()) {
      loginUser({ email, password })
    }
  }

  return (
    <div className="login-main-container">
      <form noValidate className="login-form-container">
        <div className="login-form-item">
          <label className="login-form-label">Email:</label>
          <input
            className="login-form-input"
            // name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-item">
          <label className="login-form-label">Password:</label>
          <input
            className="login-form-input"
            // name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button className="button" onClick={login}>
            Login
          </button>
          <button className="button" onClick={register}>
            Register
          </button>
          {/* {isAuthenticated && (
            <button className="button" onClick={logout}>
              Logout
            </button>
          )} */}
        </div>
        {/* {(loginError || registerError || formState.error) && (
          <p className="login-error-message">
            {loginError
              ? loginError
              : registerError
              ? registerError
              : formState.error}
          </p>
        )} */}
        {/* {(isLoggingIn || isRegistering || isLoggingOut) && (
          <div className="loading-container">
            <Loading />
          </div>
        )} */}
      </form>
    </div>
  )
}

// const mapDispatchToProps = {
//   updateUser,
//   logoutUser
// }

// export default connect(null, mapDispatchToProps)(Login)
export default Login
