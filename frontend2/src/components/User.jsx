import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom'
import '../App.css'

const User = () => {
    const { id } = useParams();
    const [userBlogs,setUserBlogs] = useState({})
    const [loading, setLoading] = useState(true);
    useEffect(() =>{
        fetch(`http://localhost:5000/api/v1/user/${id}`)
        .then(resp => resp.json())
        .then(data => {
            setUserBlogs(data);
            setLoading(false);
            console.log(userBlogs);
        });
    },[id]);
    
    if (loading) {
        return <p>Loading...</p>; // Display a loading indicator while fetching data
    }

return (
    <>
        <h3>{userBlogs.user.fullname}'s Blogs!</h3>
        {userBlogs.blogs.map((blog) => (
            <Link to={`/api/v1/blog/${blog._id}`} style={{ textDecoration: 'none', color: 'inherit' }} key={blog._id}>
            <div className='blogItems' >
              <p>Title: {blog.title}</p>
              <p>Likes: {blog.likes} Dislikes: {blog.dislikes}</p>
              <p>Date: {blog.date}</p>
            </div>
          </Link>
          
        ))}
    </>
);

}

export default User;