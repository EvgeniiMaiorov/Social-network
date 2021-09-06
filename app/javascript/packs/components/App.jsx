import axios from 'axios'
import React, { useEffect, useState, } from 'react'
import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider'
import { isExpired } from 'react-jwt'
import { createGlobalStyle } from 'styled-components'
import MainRouter from './MainRouter'
import { API_WS_ROOT } from '../constants'
import '../translations/i18n'

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

    const onlineSince = () => {
      axios.patch('/api/v1/users/online_since', {}, { headers: { Authorization: userToken } })
    }

    onlineSince()

    const interval = setInterval(onlineSince, 60000)

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords

      axios.patch(
        '/api/v1/users/location',
        { location: { latitude, longitude } },
        { headers: { Authorization: userToken } },
      )
    })

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [userToken])

  useEffect(() => {
    const token = urlParams.get('token')

    if (token) loginHandler(token)
  }, [])

  return (
    <>
      <ActionCableProvider url={`${API_WS_ROOT}?authorization=${userToken}`}>
        <Global />
        <MainRouter loginHandler={loginHandler} userToken={userToken} logoutHandler={logoutHandler} />
      </ActionCableProvider>
    </>
  )
}

export default App
