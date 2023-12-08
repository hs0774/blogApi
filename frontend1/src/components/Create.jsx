import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
//look into tiny mce
function Create(){
    return (
        <div className='CreateContainer'>
          <h1>Create a new blog!</h1>
          <form className="form">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input type="text" id="title" name="title" defaultValue="" />
            </div>
            <div className="form-group">
              <label htmlFor="content">Type away!:</label>
              <input type="textarea" id="content" name="content" defaultValue="" />
            </div>        
            <div className="form-group submit-group">
              <Link to="/api/v1"><button type="submit">Post!</button></Link>
            </div>
          </form>
        </div>
      );
}

export default Create;