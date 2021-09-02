import React from 'react'
import { Col, Row, Button } from 'react-materialize'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const SendMessageButton = (props) => {
  const history = useHistory()
  const onClick = () => {
    axios.post(
      '/api/v1/conversations',
      { user_id: props.userId },
      { headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        history.push(`/conversations/${response.data.conversation.id}`)
      })
  }

  return (
    <Row>
      <Col xl={11} offset="xl1">
        <Button onClick={onClick}>Send message</Button>
      </Col>
    </Row>
  )
}

export default SendMessageButton
