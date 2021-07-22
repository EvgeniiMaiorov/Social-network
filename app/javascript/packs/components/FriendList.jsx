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

const FriendList = (props) => {
  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    axios.get('/api/v1/invitations', {
      params: { user_id: props.userId, type: 'friends' },
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setInvitations(
          response.data.invitations,
        )
      })
  }, [props.userId, props.userToken, props.reload])

  const makeSubscriber = (invitation) => {
    let params

    if (props.userId === invitation.user_id.toString()) {
      params = { friend_id: invitation.friend_id, user_id: props.userId }
    } else {
      params = { friend_id: props.userId, user_id: invitation.friend_id }
    }

    return () => {
      axios.patch(
        `/api/v1/invitations/${invitation.id}/reject`,
        params,
        { headers: { Authorization: props.userToken } },
      )
        .then(() => {
          props.setReload((reload) => ++reload)
        })
    }
  }

  const friendRow = (invitation) => {
    const friend = props.userId === invitation.user_id.toString() ? invitation.friend : invitation.user

    return (
      <CollectionItem key={invitation.id} className="avatar">
        <Link to={`/users/${friend.id}`}>
          <img
            alt=""
            className="circle responseve-img"
            src={friend.photo.url || '/placeholder.png'}
          />
          <Col xl={6}>
            <span className="title">
              {`${friend.first_name} ${friend.last_name}`}
            </span>
            { friend.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
          </Col>
        </Link>
        <Col xl={6}>
          <Button onClick={makeSubscriber(invitation)}>Make a subscriber</Button>
        </Col>
      </CollectionItem>
    )
  }

  return (
    <>
      {invitations.map(friendRow)}
    </>
  )
}

export default FriendList
