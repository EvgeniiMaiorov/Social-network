import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Col, Row, MediaBox } from 'react-materialize'
import axios from 'axios'
import UserPosts from './UserPosts'
import GoogleMap from './GoogleMap'
import InvitationButtons from './InvitationButtons'
import SendMessageButton from './SendMessageButton'

const ProfileInfo = styled.div`
  position: absolute;
  width: 750px;
  height: 785px;
  left: 317px;
  top: 133px;
  background: #FFFFFF;
  border-radius: 24px;
`

const MapWrapper = styled.div`
  position: absolute;
  width: 650px;
  height: 500px;
  left: 1100px;
  top: 133px;
  background: #FFFFFF;
  border-radius: 24px;
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

const ProfilePage = (props) => {
  const { userId } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    axios.get(`/api/v1/users/${userId || props.userId}`, { headers: { Authorization: props.userToken } })
      .then((response) => {
        setUser(response.data.user)
      })
  }, [userId, props.userId, props.userToken])

  return (
    <Row>
      <Col xl={12}>
        <ProfileInfo>
          <Col xl={4}>
            <AvatarWrapper>
              <MediaBox className="circle">
                <img
                  alt=""
                  src={user.photo?.url || '/placeholder.png'}
                  width="160"
                  height="160"
                />
              </MediaBox>
            </AvatarWrapper>
          </Col>
          <Col xl={8}>
            <NameWrapper>
              {user.first_name} {user.last_name}
            </NameWrapper>
          </Col>
          { userId && userId !== props.userId && (
            <>
              <SendMessageButton userId={user.id} userToken={props.userToken} />
              <InvitationButtons user={user} userId={props.userId} setUser={setUser} userToken={props.userToken} />
            </>
          )}
          <Row>
            <Col xl={12}>
              <hr />
              <UserPosts userToken={props.userToken} userId={user.id} showForm={!userId} />
            </Col>
          </Row>
        </ProfileInfo>
      </Col>
      <Col>
        { !userId && (
          <Row>
            <MapWrapper>
              <GoogleMap userToken={props.userToken} user={user} />
            </MapWrapper>
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default ProfilePage
