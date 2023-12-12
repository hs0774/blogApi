import React, { useState, useEffect } from 'react';
import { Link,useParams,useNavigate } from 'react-router-dom'
import { useAuth } from '../pages/Authcontext';
import { Editor } from '@tinymce/tinymce-react';
import '../App.css'

const Update = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [content,setContent] = useState('')
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);
    
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/blog/${id}`)
        .then(resp => resp.json())
        .then(data => {
             setTitle(data.blog.title);
             setContent(data.blog.content);
            console.log(data);
           setLoading(false);
        });
    },[id]);
    
    if (loading) {
        return <p>Loading...</p>; // Display a loading indicator while fetching data
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleEditorChange = (e) => {
        setContent(e);
    };
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(content);
        const formData = {
            title: title,
            content: content
        };
        const response = await fetch(`http://localhost:5000/api/v1/blog/${id}/update`,{
            method:'PUT',
            headers: {
              'Content-type': 'application/json',
              Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json()
        if(!response.ok) {
            setError(data.error); // Update state with the received errors
            console.log('failed');
            return; // Stop further execution
        } else {
            navigate(`/api/v1/blog/${id}`)
        }
    }

    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
           <div className='CreateContainer'>
            <h1>Create a new blog!</h1>
            {error ? <p>{error}</p> : ''}
             <div className="form-group">
               <label htmlFor="title"> Title:</label>
               <input type="text" id="title" name="title" value={title} onChange={handleTitleChange}/>
             </div>
            </div> 
       <Editor
        apiKey="YOUR_API_KEY" // Get an API key from TinyMCE
        value={content}
        onEditorChange={(e) => handleEditorChange(e)}
        init={{
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image',
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount'
            ],
            toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help'
        }}
        //  onChange={handleEditorChange}
        
        /> 
        <button>Submit</button>
        </form>
        </>
    );

}

export default Update;