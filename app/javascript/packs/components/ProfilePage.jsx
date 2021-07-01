import React, { useEffect, useState } from 'react'
import { decodeToken } from 'react-jwt'
import styled from 'styled-components'
import { Col, Row, MediaBox } from 'react-materialize'
import axios from 'axios'
<<<<<<< HEAD
import UserPosts from './UserPosts'

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
=======
import OnlineTracker from './OnlineTracker'
<<<<<<< HEAD
import MainLayout from './MainLayout'
>>>>>>> Add friend page
=======
>>>>>>> Rewokr logic after review

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

<<<<<<< HEAD
const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  width: 67px;
  height: 60px;
  padding-left: 63px;
  padding-top: 55px;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  text-align: center;
  font-size: 20px;
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

=======
>>>>>>> Add friend page
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
    <Row>
      <Col xl={12}>
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
    </Row>
  )
}

export default ProfilePage
