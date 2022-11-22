import React, {useEffect, useState} from 'react'

function App() {
  // Server data that is stored on the client side.
  const [backendData, setBackendData] = useState([{}])

  useEffect( () => {
    // Fetch data from the route on the back-end server.
    fetch("/api").then(
      // Convert the response to json
      response => response.json()
    ).then (
      data => {
        // Update the local data on the client side
        setBackendData(data)
      }
    )

  }, [])  // Empty array so that this only runs on the first render of the component

  return (
    <div>
      <h1>Hello</h1>

      {(typeof backendData.users === 'undefined') ? (
        <h2>Loading data from server...</h2>
      )
      :(
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}

    </div>
  )
}

export default App