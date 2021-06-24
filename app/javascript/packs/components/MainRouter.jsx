import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import SignUp from './SignUp'
import LogInPage from './LogInPage'
import InterestsPage from './InterestsPage'
import ProfilePage from './ProfilePage'
import ProfileEditPage from './ProfileEditPage'
import FriendPage from './FriendsPage'

const MainRouter = (props) => {
  return (
    <Router>
      { !props.userToken && <Redirect to="/" /> }
      <Switch>
        <Route path="/friends">
          <FriendPage logoutHandler={props.logoutHandler} userToken={props.userToken} />
        </Route>
        <Route path="/interests">
          <InterestsPage logoutHandler={props.logoutHandler} userToken={props.userToken} />
        </Route>
        <Route path="/profile_edit">
          <ProfileEditPage logoutHandler={props.logoutHandler} userToken={props.userToken} />
        </Route>
        <Route path="/users">
          <ProfilePage userToken={props.userToken} logoutHandler={props.logoutHandler} />
        </Route>
        <Route path="/sign-up">
          <SignUp loginHandler={props.loginHandler} />
        </Route>
        <Route path="/">
          { props.userToken ? <Redirect to="/users" /> : <LogInPage loginHandler={props.loginHandler} /> }
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter
