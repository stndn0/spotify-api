import React, { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';

function App() {
  // Store the spotify auth token as a state variable. 
  // No token (i.e. unauthorized) will default to 0.
  const [token, setToken] = useState(0);

  return (
    <div id="App">
      {/* *Navbar here */}
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />}></Route>
      </Routes>
      {/* <Home token={token} setToken={setToken}/> */}
      {/* *Footer here */}
    </div>

  )
}

export default App