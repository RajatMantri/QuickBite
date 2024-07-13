import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })
    const json = await response.json();

    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    else {
      const options = {
        expires: new Date(
          Date.now() + 13 * 24 * 60 * 60 * 1000
        ),
        secure: true
      };
      const authToken=json.authToken;
      localStorage.setItem("userEmail",credentials.email);
      Cookies.set('authToken', authToken, options);
      navigate('/');
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email" className="form-control" id="email" name="email" onChange={onChange} value={credentials.email} required />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={credentials.password} required />
          </div>
          <button type="submit" className="btn btn-primary btn-success btn-block">Submit</button>
          <Link to="/createUser" className="btn btn-secondary btn-danger btn-block mt-3">I am a new user</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
