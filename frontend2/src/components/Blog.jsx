import React, { useState, useEffect } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useAuth } from '../pages/Authcontext';

function Blog() {
    const { id } = useParams(); //outputs id of blog 
    const {user} = useAuth(); //token, username,id
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [success,setSuccess] = useState(false)
    const [error,setError] = useState(null);
    const [blogItem,setBlogItem] = useState({})
    const [commentItems,setCommentItems] = useState({});
    const [loading, setLoading] = useState(true);
    const [pageOwnerid, setPageOwnerid] = useState({})
    const [formData,setFormData] = useState({
        title:'',
        message:'',
    })

    useEffect(()=>{
        fetch(`http://localhost:5000/api/v1/blog/${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
          setBlogItem(data); 
          setCommentItems(data.comment)     
          setLoading(false);
        });
    },[id,success])
    if (loading) {
        return <p>Loading...</p>; // Display a loading indicator while fetching data
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user) {
            navigate('/api/v1/login')
        }
        setFormData({
            title:'',
            message:'',
        });
        const combinedData = {
            title: formData.title,
            message: formData.message,
            blog: id,
          };
        const response = await fetch('http://localhost:5000/api/v1/comment/create', {
            method:'POST',
            headers: {
                'Content-type':'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(combinedData), 
        })
        const data = await response.json();
        if(!response.ok){
            //const data = await response.json();
           // console.log(data.newComment)
            setError(data.error); // Update state with the received errors
            console.log('failed');
            return; // Stop further execution
        } else {
        console.log(data.newComment)
         setCommentItems([...commentItems, data.newComment]);
        }
        // setCommentItems(commentItems.filter(comment => comment._id === comment_id));
         
    }
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
          })
    }

    const handleClick = async (comment_id) => {
        const response = await fetch(`http://localhost:5000/api/v1/comment/${comment_id}/delete`, {
            method:'DELETE',
            headers:{          
                'Content-type': 'application/json',
                Authorization : `Bearer ${token}`
            },
            body: JSON.stringify({blogid:id})
        }); 
        const data = await response.json();

        if(!response.ok){
            console.log(failed)
            setError(data.error)
        } else {
            setCommentItems(commentItems.filter(comment => comment._id !== comment_id));
        }
    }

    return (
        <>
        <h2>Title:{blogItem.blog.title}</h2>
        {/* {blogItem.blog.content.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
        ))} */}
        <div dangerouslySetInnerHTML={{ __html: blogItem.blog.content }}></div>

        <p>likes:{blogItem.blog.likes}</p>
        <p>dislikes:{blogItem.blog.dislikes}</p>
        <p>timestamp:{blogItem.blog.date}</p>
        <p>Creator: <Link to={`/api/v1/user/${blogItem.blog.author._id}`}>{blogItem.blog.author.username}</Link></p> 
        
        <div className='CommentContainer'>
            <h3>Comments:</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <input type="textarea" id="message" name="message" value={formData.message} onChange={handleChange}/>
            </div>
            <div className="form-group submit-group">
                <button type="submit">Post!</button>
            </div>
          </form>
        </div>
        <div className='commentsectionContainer'>
        {commentItems.map((comm,index) => {
            return (
                <div key={comm._id} className='commentSection'>
                    <p>Title: {comm.title}</p>
                    <p>Message: {comm.content}</p> 
                    <Link to={comm.author.url}><p>-{comm.author.username}</p> </Link>
                    <p>Likes:{comm.likes} Dislikes:{comm.dislikes}</p>
                    {(user && ((user.id === comm.author._id) || user.id === blogItem.blog.author._id)) && (
                       <div onClick={() => handleClick(comm._id)}> <button>&times;</button> </div>
                    )}
                </div> 
            )
        })}
        </div>
        </>
    )
}

export default Blog