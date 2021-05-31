import React, { useEffect, useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import MainRouter from './MainRouter'

const Global = createGlobalStyle`
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #E5E5E5;
}
`

const App = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const [userToken, setUserToken] = useState(localStorage.getItem('token'))

  const loginHandler = (token) => {
    localStorage.setItem('token', token)
    setUserToken(token)
  }

  useEffect( () => {
    const token = urlParams.get('token')

    if (token) loginHandler(token)
  }, [])

  return (
    <>
      <Global />
      <MainRouter loginHandler={loginHandler} userToken={userToken} />
    </>
  )
}

export default App
