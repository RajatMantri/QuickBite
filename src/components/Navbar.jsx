import React from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { Badge } from 'react-bootstrap';
import Cookies from 'js-cookie';
import auth from './Auth';

export default function NavBar() {
  const [type, setType] = useState(undefined);
  const [cartView, setCartView] = useState(false);
  let data = useCart();
  const navigate = useNavigate();
  const handleLogOut = () => {
    Cookies.remove('authToken');
    localStorage.removeItem("userEmail");
    navigate("/");
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        //console.log(userType);
        setType(userType);
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }
    fetchData();
  }, [handleLogOut]);

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

                {(type===1) ?
                  <div className='d-flex'>
                    <li className="nav-item">
                      <Link className="nav-link active " aria-current="page" to="/myOrder">My Orders</Link>
                    </li>
                  </div>
                  : ""
                }
              </ul>
              {(type===undefined) ?
                <div className='d-flex'>
                  <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>
                  <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link>
                </div>
                : <div className='d-flex'>
                  <div className='btn bg-white text-success mx-2' onClick={() => { setCartView(true) }}>My Cart
                    <Badge pill bg="danger">{data.length}</Badge></div>
                  {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                  <Link to={"/myProfile"}><button className='btn bg-white text-success mx-2'>My Profile</button></Link>
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
