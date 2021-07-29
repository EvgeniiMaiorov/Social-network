import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SignUp from './SignUp'
import LogInPage from './LogInPage'
import MainLayout from './MainLayout'

const MainRouter = (props) => (
  <Router>
    { props.userToken ? (
      <MainLayout logoutHandler={props.logoutHandler} userToken={props.userToken} />
    ) : (
      <Switch>
        <Route path="/sign-up">
          <SignUp loginHandler={props.loginHandler} />
        </Route>
        <Route exact path="/">
          <LogInPage loginHandler={props.loginHandler} />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    )}
  </Router>
)

export default MainRouter
