import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import Cookies from 'js-cookie';
import auth from './Auth';

export default function NavBar() {
  const [type, setType] = useState(undefined);
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }
    fetchData();
  }, []);

    const handleLogOut = () => {
      Cookies.remove('authToken');
      localStorage.removeItem('userEmail');
      navigate('/');
    };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-success" role="navigation">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="Logo" className="navbar-favicon" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            {type === 1 && (
              <li className="nav-item">
                <Link className="nav-link active" to="/myOrder">My Orders</Link>
              </li>
            )}
          </ul>
          {type === undefined ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>
              <Link className="btn bg-white text-success mx-1" to="/createUser">SignUp</Link>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <div className="btn bg-white text-success mx-2" onClick={() => setCartView(true)}>
                My Cart <Badge pill bg="danger">{data.length}</Badge>
              </div>
              {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
              <Link to="/myProfile"><button className="btn bg-white text-success mx-2">My Profile</button></Link>
              <div className="btn bg-white text-danger mx-2" onClick={handleLogOut}>LogOut</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
