import React, { useState, useEffect } from 'react';

function App() {
  const [backEndData, setBackEndData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api') // Making a GET request to your backend
      .then(response => response.json()) // Parsing the JSON response
      .then(data => {
        if (data && data.users) {
          setBackEndData(data.users); // Setting the received data to state
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {backEndData.map((user, i) => (
        <h1 key={i}>{user}q</h1>
      ))}
    </div>
  );
}

export default App;
