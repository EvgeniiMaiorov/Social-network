import React, { useState, useEffect } from "react"
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import GoogleMarker from './GoogleMarker'

const GoogleMap = (props) => {
  const [invitations, setInvitations] = useState([])

  useEffect(() => {
    if(!props.user.id) return

    axios.get('/api/v1/invitations', {
      params: {user_id: props.user.id, type: 'friends'},
      headers: { Authorization: props.userToken }
    })
      .then((response) => {
        setInvitations(response.data.invitations)
      })
    }, [props.user, props.userToken])

  return (
    <div style={{ height: '100%', width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={{ lat: 52.4313, lng: 30.9937 }}
        center={{ lat: props.user.location?.latitude, lng: props.user.location?.longitude }}
        defaultZoom={12}
      >
        {invitations.map((invitation) => {
          const friend = props.user.id === invitation.user_id ? invitation.friend : invitation.user

          if (!friend.online) return null

          return (
            <GoogleMarker
              key={friend.id}
              lat={friend.location?.latitude}
              lng={friend.location?.longitude}
              photo={friend.photo?.url}
              firstName={friend.first_name}
              lastName={friend.last_name}
              friendId={friend.id}
              friendInterests={friend.interests}
              currentUserInterests={props.user.interests}
            />
          )
        })}
      </GoogleMapReact>
    </div>
  )
}
export default GoogleMap
