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
  const [friends, setFriends] = useState([])

  useEffect(() => {
    axios.get(`/api/v1/users/${props.userId}/friends`, { headers: { Authorization: props.userToken } })
      .then((response) => {
      setFriends(response.data.users)
    })
  }, [props.userId, props.userToken])

  return (
    <>
      {friends.map(friends => (
        <CollectionItem key={friends.id} className="avatar">
          <img
            alt=""
            className="circle responseve-img"
            src={friends.photo.url || '/placeholder.png'}
          />
          <span className="title">
            {`${friends.first_name} ${friends.last_name}`}
          </span>
            { friends.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
        </CollectionItem>
      ))}
    </>
)
}


export default FriendList

