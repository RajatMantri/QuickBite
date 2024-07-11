import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  let navigate = useNavigate()
  const [credentials, setcredentials] = useState({ email: "", password: "" });

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
    //console.log(json);

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
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>


          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' onChange={onChange} value={credentials.email} />

          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password} />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to='/createUser' className="m-3 btn btn-danger">I am a new user</Link>
        </form>
      </div>
    </>
  )
}

export default Login; 
