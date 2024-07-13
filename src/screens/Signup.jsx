import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Signup() {
    let navigate = useNavigate()
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        else{
            navigate('/');
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
            <div className="signup-container">
            <div className="signup-form">
            <form onSubmit={handleSubmit}>
                    <h2 className="signup-title">Signup</h2>
                    <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" onChange={onChange} value={credentials.name} required/>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" onChange={onChange} value={credentials.email} required/>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="geolocation" onChange={onChange} value={credentials.geolocation} required/>
                    </div>
                    <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} value={credentials.password} required/>
                    </div>
                    <button type="submit" className="btn btn-success btn-block">Submit</button>
                    <Link to="/login" className="btn btn-danger btn-block mt-3">Already a user</Link>
                </form>
            </div>
        </div>
    )
}
