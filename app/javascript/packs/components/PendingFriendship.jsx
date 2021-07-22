import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CollectionItem, Col, Button } from 'react-materialize'
import styled from 'styled-components'

const Online = styled.div`
  color: green;
`

const Offline = styled.div`
  color: grey;
`

const PendingFriendship = (props) => {
  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    axios.get('/api/v1/invitations', {
      params: { user_id: props.userId, type: 'inviters' },
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setInvitations(response.data.invitations)
      })
  }, [props.userId, props.userToken, props.reload])

  const makeFriend = (invitation) => () => {
    axios.patch(
      `/api/v1/invitations/${invitation.id}/accept`,
      { friend_id: props.userId, user_id: invitation.user_id },
      { headers: { Authorization: props.userToken } },
    )
      .then(() => {
        props.setReload((reload) => ++reload)
      })
  }

  const makeSubscriber = (invitation) => () => {
    axios.patch(
      `/api/v1/invitations/${invitation.id}/reject`,
      { friend_id: props.userId, user_id: invitation.user_id },
      { headers: { Authorization: props.userToken } },
    )
      .then(() => {
        props.setReload((reload) => ++reload)
      })
  }

  return (
    <>
      {invitations.map((invitation) => (
        <CollectionItem key={invitation.id} className="avatar">
          <Link to={`/users/${invitation.user_id}`}>
            <img
              alt=""
              className="circle responseve-img"
              src={invitation.user.photo.url || '/placeholder.png'}
            />
            <Col xl={6}>
              <span className="title">
                {`${invitation.user.first_name} ${invitation.user.last_name}`}
              </span>
              { invitation.user.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
            </Col>
          </Link>
          <Col xl={6}>
            <Button onClick={makeFriend(invitation)}>Make a friend</Button>
            <Button onClick={makeSubscriber(invitation)}>Make a subscriber</Button>
          </Col>
        </CollectionItem>
      ))}
    </>
  )
}

export default PendingFriendship
