import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SignUp from './SignUp'
import LogInPage from './LogInPage'
import InterestsPage from './InterestsPage'

const MainRouter = (props) => {
  return (
    <Router>
      { !props.userId && <Redirect to="/" /> }
      <Switch>
        <Route path="/interests">
          <InterestsPage userToken={props.userToken} userId={props.userId} />
        </Route>
        <Route path="/users/:userId">
          <div>User</div>
        </Route>
        <Route path="/sign-up">
          <SignUp loginHandler={props.loginHandler} />
        </Route>
        <Route path="/">
          { props.userId ? <Redirect to={`/users/${props.userId}`} /> : <LogInPage loginHandler={props.loginHandler} userToken={props.userToken} /> }
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter
