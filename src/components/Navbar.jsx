import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { Badge } from 'react-bootstrap';

export default function NavBar() {
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  }

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
              {(!localStorage.getItem("authToken")) ?
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link>
                </div>
                : <div className='d-flex'>
                  <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>My Cart
                    <Badge pill bg="danger">{data.length}</Badge></div>
                  {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                  <div className='btn bg-white text-danger mx-2' onClick={handleLogOut}>LogOut</div>
                </div>
              }
            </div>
          </div>
        </nav>

      </div>
    </>
  )
}
