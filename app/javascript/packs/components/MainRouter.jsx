import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import axios from 'axios'
import SignUp from './SignUp'
import MainPage from './MainPage'

const MainRouter = () => {
  const [userToken] = useState(localStorage.getItem('token'))
  const [userId, setUserId] = useState()

  useEffect(() => {
    if (!userToken) return

    axios.get('/api/v1/current_user').then((response) => {
      setUserId(response.data.data.id)
    }).catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token')
        setUserId(null)
      }
      console.log(error.response.status)
    })
  }, [userToken])

  return (
    <Router>
      {!userId ? <Redirect to="/" /> : null}
      <Switch>
        <Route path="/users/:userId">
          <div>User</div>
        </Route>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          {userId ? <Redirect to={`/users/${userId}`} /> : <MainPage /> }
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter
