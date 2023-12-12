import React, { useState, useEffect } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useAuth } from '../pages/Authcontext';
import '../App.css'

const User = () => {
    const { id } = useParams(); //user id 
    const { user } = useAuth();
    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const [userBlogs, setUserBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,setError] = useState(null);
    const [success,setSucess] = useState(false);
    const [pageOwner, setPageOwner] = useState({})
    const [isVisible, setIsVisible] = useState(false);
    const [blogVisibility, setBlogVisibility] = useState({});

    useEffect(() =>{
        fetch(`http://localhost:5000/api/v1/user/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setUserBlogs(data.blogs);
            setPageOwner(data.user);
            console.log(data.blogs);
          // setUserBlogs(
           const visibilityObj = {};
           data.blogs.forEach(blog => {
               visibilityObj[blog._id] = blog.isVisible;
           });
           setBlogVisibility(visibilityObj);
           setLoading(false);
        });
    },[id,success]);
    
    if (loading) {
        return <p>Loading...</p>; // Display a loading indicator while fetching data
    }

    const deleteClick = async (blog_id) => {
       // console.log(blog_id);
        const response = await fetch(`http://localhost:5000/api/v1/blog/${blog_id}/delete`, {
           method:'DELETE',
           headers: {
              'Content-type': 'application/json',
              Authorization : `Bearer ${token}`
            },
        });
        if(response.ok){
            setUserBlogs(userBlogs.filter(blog => blog._id !== blog_id));
        } else {
            const data = await response.json();
            setError(data.error); // Update state with the received errors
            console.log('failed');
        }
    }

    const editClick = async (blog_id) => {
       navigate(`/api/v1/blog/${blog_id}/update`)
    }

    const hideClick = async (blog_id) => {
        const response = await fetch(`http://localhost:5000/api/v1/blog/${blog_id}/isVisible`, {
            method:'GET',
            headers:{
                'Content-type': 'application/json',
                Authorization : `Bearer ${token}`
              },
        });
       // const data = await response.json();
        if(response.ok) {
            const updatedBlog = await response.json();
            // console.log(updatedBlog)
            // setIsVisible(!isVisible);
          //  setUserBlogs(data);
          setUserBlogs((prevBlogs) =>
          prevBlogs.map((blog) =>
            blog._id === updatedBlog._id ? { ...blog, isVisible: updatedBlog.isVisible } : blog
          )
        );
        setBlogVisibility(prevVisibility => ({
            ...prevVisibility,
            [blog_id]: !prevVisibility[blog_id]
        }));
        } else {
            // const data = await response.json();
            setError(data.error); // Update state with the received errors
            console.log('failed');
        }
    }
    // console.log(user.id)
    return (
    <>
        <h3>{pageOwner.fullname}'s Blogs!</h3>
        <div className='blogItemsContainer'>
            {userBlogs.map((blog) => {
                // Check if the blog is visible or if the user is the owner
                if ((blogVisibility[blog._id] || (user && user.id === pageOwner.id))) {
                    return (
                        <div className='blogItems' key={blog._id}>
                            <Link to={`/api/v1/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={blog._id}>
                                <p>Title: {blog.title}</p>
                                <p>Likes: {blog.likes} Dislikes: {blog.dislikes}</p>
                                <p>Date: {blog.date}</p>
                            </Link>
                            {(user && (user.id === pageOwner.id)) && (
                                <div>
                                    <button onClick={() => deleteClick(blog._id)}>Delete</button>
                                    <button onClick={() => editClick(blog._id)}>Edit</button>
                                    <button onClick={() => hideClick(blog._id)}>{blogVisibility[blog._id] ? 'Hide' : 'Unhide'}</button>
                                </div>
                            )}
                            {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
                        </div>
                    );
                } else {
                    return null; // Hide the blog if it's not visible and not owned by the user
                }
            })}
        </div>
    </>
);


}

export default User;