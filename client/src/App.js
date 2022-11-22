import React, { useEffect, useState } from 'react'
import Home from './pages/Home';

function App() {
  // Store the spotify auth token as a state variable. 
  // No token (i.e. unauthorized) will default to 0.
  const [token, setToken] = useState(0);

  return (
    <div id="main">
      {/* *Navbar here */}
      <Home token={token} setToken={setToken}/>
      {/* *Footer here */}
    </div>

  )
}

export default App