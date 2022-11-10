import React from 'react'
import { Outlet, Link } from "react-router-dom";
import "./Navbar.css"
import logo from "../Assets/logo.png"


const NavBar = () => {
    return (
        <>
            <nav>
                <div class="logo" >Logo</div>
                <ul className='links'>
                    <li>
                        <Link to="/"><a>Home</a></Link>
                    </li>
                    <li>
                        <Link to="/menu"><a>Menu</a></Link>
                    </li>
                </ul>
                <label for="nav-toggle" class="icon-burger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                </label>
            </nav>

            <Outlet />
        </>
    )
};

export default NavBar;