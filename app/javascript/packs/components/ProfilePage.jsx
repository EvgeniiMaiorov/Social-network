import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt'
import styled from 'styled-components'
import { Col, Row, Container, MediaBox } from 'react-materialize'
import { Link } from 'react-router-dom'
import axios from 'axios'
import OnlineTracker from './OnlineTracker'

const PageContainer = styled(Container)`
  width: 100%;
  max-width: 1920px;
  padding: 100px;
`

const LoginFormWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 105px;
  background: #FFFFFF;
`

const ProfileInfo = styled.div`
  position: absolute;
  width: 750px;
  height: 785px;
  left: 317px;
  top: 133px;
  background: #FFFFFF;
  border-radius: 24px;
`

const RecentActivites = styled.div`
  position: absolute;
  width: 650px;
  height: 420px;
  left: 1100px;
  top: 133px;
  background: #FFFFFF;
  border-radius: 24px;
`
const MapWrapper = styled.div`
  position: absolute;
  width: 650px;
  height: 345px;
  left: 1100px;
  top: 570px;
  background: #FFFFFF;
  border-radius: 24px;
`

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  width: 67px;
  height: 60px;
  padding-left: 63px;
  padding-top: 55px;
`

const Text = styled.div`
  position: absolute;
  width: 102px;
  height: 33px;
  left: 166px;
  top: 36px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 119.5%;
  color: #515B60;
`

const LinksWrapper = styled.div`
  position: absolute;
  width: 90px;
  height: 22px;
  left: 110px;
  top: 170px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 120%;
  color: #333333;
`

const AvatarWrapper = styled.div`
  padding-left: 65px;
  padding-top: 65px;
`

const NameWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 33px;
  left: 300px;
  top: 75px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 119.5%;
  color: #333333;
`

const OnlineWrapper = styled.div`
  width: 102px;
  height: 33px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 119.5%;
  padding-left: 90px;
`

const ProfilePage = (props) => {
  const [user, setUser] = useState({})

  const logout = (e) => {
    e.preventDefault()

    axios.delete(`/users/sign_out`, { headers: { Authorization: props.userToken } })
    .then(() => {
      props.logoutHandler()
    })
  }

  useEffect(() => {
    const decodedUserToken = decodeToken(props.userToken)

    axios.get(`/api/v1/users/${decodedUserToken.sub}`, { headers: { Authorization: props.userToken } })
    .then((response) => {
      setUser(response.data.user)
    })
  }, [])
  return (
    <>
    <LoginFormWrapper>
      <LogoTitle>
        <img src="/logo.png" alt="" />
        <Text>LetsTalk</Text>
      </LogoTitle>
    </LoginFormWrapper>
    <PageContainer>
      <Col>
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
           <Link to="/messages">Messages</Link>
          </Row>
          <Row>
            <a href="#" onClick={logout}>Logout</a>
          </Row>
        </LinksWrapper>
      </Col>
      <Col>
        <ProfileInfo>
          <Col xl={4}>
            <AvatarWrapper>
                <MediaBox className="circle" >
                  <img
                    alt=""
                    src={ user.photo?.url || '/placeholder.png' }
                    width="160"
                    height="160"
                  />
                </MediaBox>
            </AvatarWrapper>
            <OnlineWrapper>
              <OnlineTracker userToken={props.userToken} userId={user.id} />
            </OnlineWrapper>
          </Col>
            <NameWrapper>
              {user.first_name} {user.last_name}
            </NameWrapper>
        </ProfileInfo>
      </Col>
      <Col>
        <Row>
          <RecentActivites />
        </Row>
        <Row>
          <MapWrapper />
        </Row>
      </Col>
    </PageContainer>
    </>
  )
}

export default ProfilePage
