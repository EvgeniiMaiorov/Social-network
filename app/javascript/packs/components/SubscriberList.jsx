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

const SubscriberList = (props) => {
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    axios.get(`/api/v1/users/${props.userId}/subscribers`, { headers: { Authorization: props.userToken } })
      .then((response) => {
      setSubscribers(response.data.users)
    })
  }, [props.userId, props.userToken])

  return (
    <>
      {subscribers.map(subscribers => (
        <CollectionItem key={subscribers.id} className="avatar">
        <img
          alt=""
          className="circle responseve-img"
          src={subscribers.photo.url || '/placeholder.png'}
          />
        <span className="title">
          {`${subscribers.first_name} ${subscribers.last_name}`}
        </span>
          { subscribers.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
      </CollectionItem>
      ))}
    </>
)
}


export default SubscriberList
