import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import MainPage from './MainPage'

const MainRouter = () => (
  <Router>
    <Switch>
      <Route path="/users/:userId">
        <div>User</div>
      </Route>
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/">
        <MainPage />
      </Route>
    </Switch>
  </Router>
)

export default MainRouter
