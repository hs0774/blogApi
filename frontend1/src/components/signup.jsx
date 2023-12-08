import React, { useState, useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../pages/Authcontext'; 

function Signup() {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    username:'',
    email:'',
    password:'',
    Cpassword:''

  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData({
      ...formData,
      [name]:value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.value !== Cpassword.value){
      setFormData({
        ...formData,
        password:'',
        Cpassword:''
      });
      return;
    }
    const response = await fetch('http://localhost:5000/api/v1/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (!response.ok) {
      const data = await response.json();
      setErrors(data.errors); // Update state with the received errors
      return; // Stop further execution
    }

     setFormData({
        firstname:'',
        lastname:'',
        username:'',
        email:'',
        password:'',
        Cpassword:'',
      });
      const {token,username} = await response.json();
      localStorage.setItem('token', token);
      localStorage.setItem('username',username);
      login({token,username})
      navigate('/api/v1')
  }
  return (
    <div className='signupContainer'>
      <h1>Sign up now to get started!</h1>
      <form className="form" onSubmit = {handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange = {handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange = {handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="username">User Name:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange = {handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange = {handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange = {handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="Cpassword">Confirm Password:</label>
          <input type="password" id="Cpassword" name="Cpassword" value={formData.Cpassword} onChange = {handleChange} />
        </div>
    
        <div className="form-group submit-group">
          <button type="submit">Sign up!</button>
        </div>
        <p>Already a member? <Link to="/api/v1/login">Click here to login</Link></p>
      </form>
    </div>
  );
}

export default Signup;
