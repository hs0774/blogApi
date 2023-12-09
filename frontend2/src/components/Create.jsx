import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react';
import { useAuth } from '../pages/Authcontext';
//look into tiny mce
function Create(){
    const {user} = useAuth();
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [content,setContent] = useState('')
    const [error,setError] = useState(null);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleEditorChange = (e) => {
        setContent(e.target.getContent());
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(user);
        const formData = {
            title: title,
            content: content
        };
        const response = await fetch('http://localhost:5000/api/v1/blog/create',{
            method:'POST',
            headers: {
              'Content-type': 'application/json',
              Authorization : `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json()
        if(!response.ok) {
            const data = await response.json();
            setError(data.error); // Update state with the received errors
            console.log('failed');
            return; // Stop further execution
        } else {
            //const data = await response.json()
            console.log(data.id);
            navigate(`/api/v1/user/${data.id}`)
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
               <input type="text" id="title" name="title" defaultValue="" value={title} onChange={handleTitleChange}/>
             </div>
            </div> 
        <Editor
        apiKey="YOUR_API_KEY" // Get an API key from TinyMCE
        initialValue="<p>Start typing...</p>"
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
        onChange={handleEditorChange}
        
        /> 
        <button>Submit</button>
        </form>
        </>
    );
    //     <div className='CreateContainer'>
    //       <h1>Create a new blog!</h1>
    //       <form className="form">
    //         <div className="form-group">
    //           <label htmlFor="title">Title:</label>
    //           <input type="text" id="title" name="title" defaultValue="" />
    //         </div>
    //         <div className="form-group">
    //           <label htmlFor="content">Type away!:</label>
    //           <input type="textarea" id="content" name="content" defaultValue="" />
    //         </div>        
    //         <div className="form-group submit-group">
    //           <Link to="/api/v1"><button type="submit">Post!</button></Link>
    //         </div>
    //       </form>
    //     </div>
    //   );
}

export default Create;