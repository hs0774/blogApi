import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../pages/Authcontext'; 

function Login() {

  const { login } = useAuth();
  const [error,setError] = useState(null);  
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('loggin in');

    const response = await fetch('http://localhost:5000/api/v1/creator/login',{
      method:'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
   console.log('logged?')
   
    if (!response.ok) {
      const data = await response.json();
      setError(data.error); // Update state with the received errors
      console.log('failed');
      return; // Stop further execution

    } else {
        setFormData({
            email:'',
            password:'',
        });

        const {token,username,id} = await response.json();

        localStorage.setItem('token', token);
        localStorage.setItem('username',username);
        localStorage.setItem('id',id)

        login({token,username,id}); 
        navigate('/api/v1')
    }
  }

  return (
    <div className='loginContainer'>
      <h1>Log in now!</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        {error? <p style={{ color: 'red' }}>{error}</p>: ''}
        <div className="form-group submit-group">
          <button type="submit">Log in!</button>
        </div>
      </form>
    </div>
  );
}

export default Login;