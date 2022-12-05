import React, { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Navbar from './components/Navbar';

function App() {
  // Store the spotify auth token as a state variable. 
  // No token (i.e. unauthorized) will default to 0.
  const [token, setToken] = useState(0);
  const [refreshToken, setRefreshToken] = useState(0);
  const [profileInfo, setProfileInfo] = useState({});
  const [topAlbums, setTopAlbums] = useState(0);

  return (
    <div id="App">
      <Navbar token={token} setToken={setToken} setRefreshToken={setRefreshToken} profileInfo={profileInfo} setProfileInfo={setProfileInfo}></Navbar>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} refreshToken={refreshToken} setRefreshToken = {setRefreshToken} profileInfo={profileInfo} setProfileInfo = {setProfileInfo} topAlbums={topAlbums} setTopAlbums={setTopAlbums} />}></Route>
      </Routes>
      {/* <Home token={token} setToken={setToken}/> */}
      {/* *Footer here */}
    </div>

  )
}

export default App