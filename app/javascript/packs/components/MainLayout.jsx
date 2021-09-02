import React from 'react'
import styled from 'styled-components'
import { Col, Row, Navbar } from 'react-materialize'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import axios from 'axios'
import { useJwt } from 'react-jwt'
import InterestsPage from './InterestsPage'
import ProfilePage from './ProfilePage'
import ProfileEditPage from './ProfileEditPage'
import FriendPage from './FriendsPage'
import ConversationList from './ConversationList'
import ConversationPage from './ConversationPage'

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 119.5%;
  color: #515B60;
`
const ContentWrapper = styled.div`
  padding: 50px;
`

const LinksWrapper = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 120%;
  color: #333333;
`

const MainLayout = (props) => {
  const { decodedToken } = useJwt(props.userToken)

  const logout = (e) => {
    e.preventDefault()

    axios.delete('/users/sign_out', { headers: { Authorization: props.userToken } })
      .then(() => {
        props.logoutHandler()
      })
  }

  return (
    <>
      <Row>
        <Col xl={12}>
          <Navbar style={{ background: 'white' }}>
            <LogoTitle>
              <img src="/logo.png" alt="" />
              <Text>LetsTalk</Text>
            </LogoTitle>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col offset="xl1" xl={2}>
          <LinksWrapper>
            <Row>
              <Link to="/users">My page</Link>
            </Row>
            <Row>
              <Link to="/profile_edit">Edit profile</Link>
            </Row>
            <Row>
              <Link to="/interests">Interests</Link>
            </Row>
            <Row>
              <Link to="/friends">Friends</Link>
            </Row>
            <Row>
              <Link to="/conversations">Conversations</Link>
            </Row>
            <Row>
              <a href="#" onClick={logout}>Logout</a>
            </Row>
          </LinksWrapper>
        </Col>
        <Col xl={6}>
          <ContentWrapper>
            { decodedToken && (
              <Switch>
                <Route path="/friends">
                  <FriendPage userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route path="/interests">
                  <InterestsPage userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route path="/profile_edit">
                  <ProfileEditPage userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route exact path="/users">
                  <ProfilePage userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route path="/users/:userId">
                  <ProfilePage userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route exact path="/conversations/:conversationId">
                  <ConversationPage userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route path="/conversations">
                  <ConversationList userId={decodedToken.sub} userToken={props.userToken} />
                </Route>
                <Route render={() => <Redirect to="/users" />} path="*" />
              </Switch>
            ) }
          </ContentWrapper>
        </Col>
      </Row>
    </>
  )
}

export default MainLayout
