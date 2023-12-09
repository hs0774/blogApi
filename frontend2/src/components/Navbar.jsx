import { useEffect,useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../App.css';
// import jwt from "jsonwebtoken";
import {jwtDecode} from "jwt-decode";
import { useAuth } from '../pages/Authcontext';

const Navbar = () => {
    const { user,logout } = useAuth();
    const navigate = useNavigate();
    const handleClick = () => {
        logout();
    }
    const blogCreate = () => {
        navigate('/api/v1/create')
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
                            <button onClick={blogCreate}>Create</button>
                            <button onClick={handleClick}>Logout</button>
                        </> 
                        :
                        <>
                            <Link to="/api/v1/creator/login">
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
