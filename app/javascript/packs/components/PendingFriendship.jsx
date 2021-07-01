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

const pendingFriendship = (props) => {
  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    axios.get('/api/v1/invitations', {
      params: {user_id: props.userId, type: 'inviters'},
      headers: { Authorization: props.userToken }
    })
      .then((response) => {
        setInvitations(response.data.invitations)
      })
  }, [props.userId, props.userToken])

  return (
    <>
      {invitations.map(invitation => (
        <CollectionItem key={invitation.id} className="avatar">
        <img
          alt=""
          className="circle responseve-img"
          src={invitation.user.photo.url || '/placeholder.png'}
          />
        <span className="title">
          {`${invitation.user.first_name} ${invitation.user.last_name}`}
        </span>
          { invitation.user.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
      </CollectionItem>
      ))}
    </>
)
}


export default pendingFriendship
