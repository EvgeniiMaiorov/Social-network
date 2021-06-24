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
  const [pendingFriendship, setPendingFriendship] = useState([])

  useEffect(() => {
    axios.get(`/api/v1/users/${props.userId}/pending_friendship`, { headers: { Authorization: props.userToken } })
      .then((response) => {
      setPendingFriendship(response.data.users)
    })
  }, [props.userId, props.userToken])

  return (
    <>
      {pendingFriendship.map(pendingFriendship => (
        <CollectionItem key={pendingFriendship.id} className="avatar">
        <img
          alt=""
          className="circle responseve-img"
          src={pendingFriendship.photo.url || '/placeholder.png'}
          />
        <span className="title">
          {`${pendingFriendship.first_name} ${pendingFriendship.last_name}`}
        </span>
          { pendingFriendship.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
      </CollectionItem>
      ))}
    </>
)
}


export default pendingFriendship
