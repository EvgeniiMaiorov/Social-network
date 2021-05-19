import React, { useState, useEffect } from 'react'
import { Preloader } from 'react-materialize'
import axios from 'axios'
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
  const [userToken, setUserToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const loginHandler = (token) => {
    localStorage.setItem('token', token)
    setUserToken(token)
  }

  useEffect(() => {
    if (!userToken) return setLoading(false)

    axios.post('/users/authenticate', {}, { headers: { Authorization: userToken } } )
    .then((response) => {
      setUserId(response.data.user.id)
      setLoading(false)
    }).catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        setUserId(null)
        setUserToken(null)
        setLoading(false)
      }
      console.log(error.response.status)
    })
  }, [userToken, userId])

  return (
    <>
      <Global />
      { loading ?  <Preloader /> : <MainRouter loginHandler={loginHandler} userToken={userToken} userId={userId} /> }
    </>
  )
}

export default App
