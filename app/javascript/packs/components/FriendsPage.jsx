import React, { useState } from 'react'
import styled from 'styled-components'
import { Col, Row, Collection, Tab, Tabs } from 'react-materialize'
import FriendList from './FriendList'
import PendingFriendship from './PendingFriendship'
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
  const [reload, setReload] = useState(1)

  return (
    <>
      <ImageWrapper>
        <Image src="/rafiki.png" />
      </ImageWrapper>
      <Row>
        <Col xl={12}>
          <Tabs>
            <Tab title="Friends" >
              <Collection>
                <PendingFriendship reload={reload} setReload={setReload} userToken={props.userToken} userId={props.userId} />
                <br />
                <FriendList reload={reload} setReload={setReload} userToken={props.userToken} userId={props.userId} />
              </Collection>
            </Tab>
            <Tab title="Subscriders" >
              <Collection>
                <SubscriberList reload={reload} setReload={setReload} userToken={props.userToken} userId={props.userId} />
              </Collection>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </>
  )
}

export default FriendsPage
