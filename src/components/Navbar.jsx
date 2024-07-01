import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
          <div className="container-fluid">
            <Link className="navbar-brand " to="/">QuickBite</Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav me-auto mb-2">
                <li className="nav-item">
                  <Link className="nav-link active " aria-current="page" to="/">Home</Link>
                </li>
              </ul>
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link>
                </div>
            </div>
          </div>
        </nav>

      </div>
    </>
  )
}
