import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CollectionItem } from 'react-materialize'
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
      params: {user_id: props.userId, type: 'friends'},
      headers: { Authorization: props.userToken }
    })
    .then((response) => {
      setInvitations(
        response.data.invitations
        )
      })
    }, [props.userId, props.userToken])

    const friendRow = (invitation) => {
      const friend = props.userId === invitation.user_id.toString() ? invitation.friend : invitation.user

      return (
        <CollectionItem key={invitation.id} className="avatar">
          <img
            alt=""
            className="circle responseve-img"
            src={friend.photo.url || '/placeholder.png'}
          />
          <span className="title">
            {`${friend.first_name} ${friend.last_name}`}
          </span>
            { friend.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
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

