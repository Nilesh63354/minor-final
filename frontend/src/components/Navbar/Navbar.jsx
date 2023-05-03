import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/logo.png";
import {HiOutlineMenuAlt3} from "react-icons/hi";
import { idd } from '../authentication/Login';


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  return (
    <nav className='navbar' id = "navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to = "/" className='navbar-brand flex'>
            <img src = {logoImg} alt = "site logo" />
            <span className='text-uppercase fw-7 fs-24 ls-1'>bookish</span>
          </Link>
          <button type = "button" className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size = {35} style = {{
              color: `${toggleMenu ? "#fff" : "#010101"}`
            }} />
          </button>
        </div>

        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className = "navbar-nav">
            <li className='nav-item'>
                <h3><strong>{`User Id: ${idd}`}</strong></h3>
            </li>
            <li className='nav-item'>
              <Link to = "/logged/book" className='nav-link text-uppercase text-black fs-22 fw-6 ls-1'><h4>Home</h4></Link>
            </li>
            <li className='nav-item'>
              <Link to = "/logged/recommendation" className='nav-link text-uppercase text-black fs-22 fw-6 ls-1'><h4>Recommend</h4></Link>
            </li>
            <li className='nav-item'>
                <Link to = "/" className='nav-link text-uppercase text-black fs-22 fw-6 ls-1'><h4>Logout</h4></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar