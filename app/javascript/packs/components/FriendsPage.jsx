import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Col, Row, Collection, Tab, Tabs } from 'react-materialize'
import axios from 'axios'
import { decodeToken } from 'react-jwt'
import FriendList from './FriendList'
import PendingFriendship from './PendingFriendship'
import MainLayout from './MainLayout'
import SubscriberList from './SubscriberList'

const ImageWrapper = styled.div`
  position: absolute;
  width: 642.82px;
  height: 597px;
  left: 1000px;
  top: 350px;
  opacity: 0.84;
`

const Image = styled.img`
  width: 100%;
  position: relative;
`

const FriendsPage = (props) => {
  const [user, setUser] = useState({})

  useEffect(() => {
    const decodedUserToken = decodeToken(props.userToken)

    axios.get(`/api/v1/users/${decodedUserToken.sub}`, { headers: { Authorization: props.userToken } })
    .then((response) => {
      setUser(response.data.user)
    })
  }, [])

  return (
    <MainLayout logoutHandler={props.logoutHandler} userToken={props.userToken}>
      <ImageWrapper>
        <Image src="/rafiki.png" />
      </ImageWrapper>
      <Row>
        <Col xl={12}>
          <Tabs>
            <Tab title="Friends" >
              <Collection>
                <PendingFriendship userToken={props.userToken} userId={user.id} />
                  <br />
                <FriendList userToken={props.userToken} userId={user.id} />
              </Collection>
            </Tab>
            <Tab title="Subscriders" >
              <Collection>
                <SubscriberList userToken={props.userToken} userId={user.id} />
              </Collection>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </MainLayout>
  )
}

export default FriendsPage
