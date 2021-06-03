import React, { useEffect, useState } from 'react'
import { isExpired } from 'react-jwt'
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

  const logoutHandler = () => {
    localStorage.removeItem('token')
    setUserToken(null)
  }

  useEffect( () => {
    const token = urlParams.get('token')

    if (token) loginHandler(token)
  }, [])

  useEffect(() =>{
    if (!userToken) return

    const isTokenExpired = isExpired(userToken)
    if (isTokenExpired) logoutHandler()
  }, [userToken])

  return (
    <>
      <Global />
      <MainRouter loginHandler={loginHandler} userToken={userToken} />
    </>
  )
}

export default App
