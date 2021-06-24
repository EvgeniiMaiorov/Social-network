import React from 'react'
import styled from 'styled-components'
import { Col, Row, Navbar } from 'react-materialize'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
  const logout = (e) => {
    e.preventDefault()

    axios.delete(`/users/sign_out`, { headers: { Authorization: props.userToken } })
    .then(() => {
      props.logoutHandler()
    })
  }

  return (
    <>
  <Row>
    <Col xl={12} >
    <Navbar style={{background: 'white'}}>
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
           <Link to="/news">News</Link>
          </Row>
          <Row>
           <Link to="/friends">Friends</Link>
          </Row>
          <Row>
           <Link to="/messages">Messages</Link>
          </Row>
          <Row>
            <a href="#" onClick={logout}>Logout</a>
          </Row>
        </LinksWrapper>
      </Col>
      <Col xl={6}>
        <ContentWrapper>
          { props.children }
        </ContentWrapper>
      </Col>
    </Row>
    </>
  )
}

export default MainLayout
