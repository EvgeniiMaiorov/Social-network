import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainPage from './components/MainPage'
import SignUp from './components/SignUp'

const Global = createGlobalStyle`
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #E5E5E5;
}
`

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Global />
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
