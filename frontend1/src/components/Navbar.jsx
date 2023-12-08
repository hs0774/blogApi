import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
// import jwt from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";
import { useAuth } from '../pages/Authcontext';

const Navbar = () => {
    const { user,logout } = useAuth();
    const handleClick = () => {
        logout();
    }
    return (
        <header>
            <div className="NavContainer">
                <div className='left'>
                    <Link to="/">
                        <h1>Blogopedia</h1>
                    </Link>
                </div>
                <div className='right'>
                    {user ?
                        <>
                            <p>Hello, {user.username}</p>
                            <button onClick={handleClick}>Logout</button>
                        </> 
                        :
                        <>
                            <Link to="/api/v1/signup">
                                <button>Sign up</button>
                            </Link>
                            <Link to="/api/v1/login">
                                <button>Log in</button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </header>
    );
};

export default Navbar;
