import React from 'react'
import { Col, Row, Button } from 'react-materialize'
import axios from 'axios'
import styled from 'styled-components'

const InvitationButton = styled(Button)`
  margin-top: 10px;
  margin-right: 10px;
`

const InvitationButtons = (props) => {
  const deleteInvitation = () => {
    axios.delete(
      `/api/v1/invitations/${props.user.invitation.id}`,
      {
        data: { user_id: props.userId },
        headers: { Authorization: props.userToken },
      },
    )
      .then(() => {
        props.setUser({ ...props.user, invitation: null })
      })
  }

  const rejectInvitation = () => {
    let params
    if (props.user.invitation.user_id.toString() === props.userId) {
      params = { user_id: props.userId, friend_id: props.user.id }
    } else {
      params = { user_id: props.user.id, friend_id: props.userId }
    }
    axios.patch(
      `/api/v1/invitations/${props.user.invitation.id}/reject`,
      params,
      { headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        props.setUser({ ...props.user, invitation: response.data.invitation })
      })
  }

  const acceptInvitation = () => {
    axios.patch(
      `/api/v1/invitations/${props.user.invitation.id}/accept`,
      { user_id: props.user.id, friend_id: props.userId },
      { headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        props.setUser({ ...props.user, invitation: response.data.invitation })
      })
  }

  const createInvitation = () => {
    axios.post(
      '/api/v1/invitations',
      { user_id: props.userId, friend_id: props.user.id },
      { headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        props.setUser({ ...props.user, invitation: response.data.invitation })
      })
  }

  const invitationButtons = () => {
    switch (props.user?.invitation?.status) {
      case 'pending':
        if (props.user.invitation.user_id.toString() === props.userId) {
          return <InvitationButton onClick={deleteInvitation}>Delete</InvitationButton>
        }

        return (
          <>
            <InvitationButton onClick={acceptInvitation}>Make a friend</InvitationButton>
            <InvitationButton onClick={rejectInvitation}>Make a subscriber</InvitationButton>
          </>
        )

      case 'rejected':
        if (props.user.invitation.user_id.toString() === props.userId) {
          return <InvitationButton onClick={deleteInvitation}>Delete</InvitationButton>
        }

        return <InvitationButton onClick={acceptInvitation}>Make a friend</InvitationButton>

      case 'accepted':
        return <InvitationButton onClick={rejectInvitation}>Make a subscriber</InvitationButton>
      default:
        return <InvitationButton onClick={createInvitation}>Invite</InvitationButton>
    }
  }

  return (
    <Row>
      <Col xl={11} offset="xl1">
        {invitationButtons()}
      </Col>
    </Row>
  )
}

export default InvitationButtons
