import axios from 'axios'
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

  useEffect(() => {
    if (!userToken) return

    const isTokenExpired = isExpired(userToken)

    if (isTokenExpired) logoutHandler()

    const interval = setInterval(() => {
      axios.patch('/api/v1/users/online_since', {}, { headers: { Authorization: userToken } })
    }, 60000)

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [userToken])

  useEffect( () => {
    const token = urlParams.get('token')

    if (token) loginHandler(token)
  }, [])

  return (
    <>
      <Global />
      <MainRouter loginHandler={loginHandler} userToken={userToken} logoutHandler={logoutHandler} />
    </>
  )
}

export default App
