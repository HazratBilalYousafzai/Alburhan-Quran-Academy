import React, { useState } from 'react';
import "../../Assets/styles/header.css";
import { Link, NavLink } from "react-router-dom";
import { ImMenu } from "react-icons/im"
import { GiCancel } from "react-icons/gi"
import logo from "../../Assets/images/logo.webp"
import { useAuth } from '../../context/auth';
import { toast } from 'react-hot-toast';


const Header = () => {
    const [toggleMobile, setToggleMobile] = useState(true);
    const [auth, setAuth] = useAuth();
    const handleLogOut = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        })
        localStorage.removeItem("auth")
        setTimeout(() => {
            toast.success("Logout Successfully")
        }, 1000);
    }
    const handleClicked = () => {
        setToggleMobile(!toggleMobile);
    }
    return (
        <>
            <nav className='navbar '>
                <div className='brand'>
                    <Link to='/'>
                        <img src={logo} alt='img' />
                    </Link>
                </div>
                <div>
                    <ul className={toggleMobile ? "nav-links " : "nav-links active"}>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/about'>About us</NavLink></li>
                        <li><NavLink to='/courses'>Courses</NavLink></li>
                        <li><NavLink to='/contact'>Contact us</NavLink></li>

                        {!auth.user ? (<>
                            <div className='login-btn'>
                                <NavLink to='/login'>LogIn</NavLink>
                            </div>
                        </>) : (<>
                            <li className="dropdown">
                                <NavLink className="nav-link dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {auth?.user?.name}
                                </NavLink>
                                <ul className="dropdown-menu ">
                                    <li>
                                        <NavLink to="/dashboard/admin">Dashboard</NavLink>
                                    </li>
                                    <li >
                                        <NavLink onClick={handleLogOut} to="/Login">LogOut</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </>)}

                    </ul>
                </div>
                <div className='mobile'>
                    <i onClick={handleClicked}>{toggleMobile ? (<ImMenu size={40} />) : (<GiCancel size={40} />)}</i>
                </div>
            </nav>
        </>
    )
}

export default Header