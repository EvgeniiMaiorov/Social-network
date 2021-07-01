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
  const [ownInvitations, setOwnInvitations] = useState([])
  const [receivedInvitations, setReceivedInvitations] = useState([])

  useEffect(() => {
    axios.get('/api/v1/invitations', {
      params: {user_id: props.userId, type: 'friends'},
      headers: { Authorization: props.userToken }
    })
      .then((response) => {
        setOwnInvitations(
          response.data.invitations.filter((invitation) => invitation.user.id.toString() === props.userId)
        )
        setReceivedInvitations(
          response.data.invitations.filter((invitation) => invitation.friend.id.toString() === props.userId)
        )
      })
  }, [props.userId, props.userToken])

  return (
    <>
      {ownInvitations.map(ownInvitation => (
        <CollectionItem key={ownInvitation.id} className="avatar">
          <img
            alt=""
            className="circle responseve-img"
            src={ownInvitation.friend.photo.url || '/placeholder.png'}
          />
          <span className="title">
            {`${ownInvitation.friend.first_name} ${ownInvitation.friend.last_name}`}
          </span>
            { ownInvitation.friend.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
        </CollectionItem>
      ))}
      {receivedInvitations.map(receivedInvitation => (
        <CollectionItem key={receivedInvitation.id} className="avatar">
          <img
            alt=""
            className="circle responseve-img"
            src={receivedInvitation.user.photo.url || '/placeholder.png'}
          />
          <span className="title">
            {`${receivedInvitation.user.first_name} ${receivedInvitation.user.last_name}`}
          </span>
            { receivedInvitation.user.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
        </CollectionItem>
      ))}
    </>
)
}


export default FriendList

