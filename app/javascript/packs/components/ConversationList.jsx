import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { CollectionItem, Col, Collection } from 'react-materialize'
import styled from 'styled-components'

const Online = styled.div`
  color: green;
`

const Offline = styled.div`
  color: grey;
`

const ConversationList = (props) => {
  const [conversations, setConversations] = useState([])

  const getFriend = (conversation) => (
    conversation.users.find((user) => user.id.toString() !== props.userId)
  )

  useEffect(() => {
    axios.get('/api/v1/conversations', { headers: { Authorization: props.userToken } })
      .then((response) => {
        setConversations(response.data.conversations)
      })
  }, [props.userToken])

  return (
    <Collection>
      {
        conversations.map((conversation) => {
          const friend = getFriend(conversation)

          return (
            <CollectionItem key={conversation.id} className="avatar">
              <Link to={`/conversations/${conversation.id}`}>
                <img
                  alt=""
                  className="circle responseve-img"
                  src={friend.photo.url || '/placeholder.png'}
                />
                <Col xl={12}>
                  <span className="title">
                    {`${friend.first_name} ${friend.last_name}`}
                  </span>
                  { friend.online ? <Online>Online</Online> : <Offline>Offline</Offline> }
                </Col>
              </Link>
            </CollectionItem>
          )
        })
      }
    </Collection>
  )
}

export default ConversationList
