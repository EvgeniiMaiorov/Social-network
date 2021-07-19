import React, { useState, useEffect } from 'react'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import { Checkbox, Row, Col } from 'react-materialize'
import GoogleMarker from './GoogleMarker'

const GoogleMap = (props) => {
  const [users, setUsers] = useState([])
  const [type, setType] = useState('online_friends')

  const onChange = (e) => {
    setType(e.target.value)
  }

  useEffect(() => {
    if (!props.user.id) return

    axios.get('/api/v1/users', {
      params: { user_id: props.user.id, type },
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setUsers(response.data.users)
      })
  }, [props.user, props.userToken, type])

  return (
    <>
      <div style={{ height: '100%', width: '100%', borderRadius: '24px', overflow: 'hidden' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '' }}
          defaultCenter={{ lat: 52.4313, lng: 30.9937 }}
          center={{ lat: props.user.location?.latitude, lng: props.user.location?.longitude }}
          defaultZoom={12}
        >
          {users.map((user) => (
            <GoogleMarker
              key={user.id}
              lat={user.location?.latitude}
              lng={user.location?.longitude}
              photo={user.photo?.url}
              firstName={user.first_name}
              lastName={user.last_name}
              friendId={user.id}
              friendInterests={user.interests}
              currentUserInterests={props.user.interests}
            />
          ))}
        </GoogleMapReact>
      </div>
      <Row>
        <Col xl={4}>
          <Checkbox
            id="90_percent"
            onChange={onChange}
            checked={type === '90_percent'}
            label="90%"
            value="90_percent"
          />
        </Col>
        <Col xl={4}>
          <Checkbox
            id="50_percent"
            onChange={onChange}
            checked={type === '50_percent'}
            label="50%"
            value="50_percent"
          />
        </Col>
        <Col xl={4}>
          <Checkbox
            id="online_friends"
            onChange={onChange}
            checked={type === 'online_friends'}
            label="Online friends"
            value="online_friends"
          />
        </Col>
      </Row>
    </>
  )
}
export default GoogleMap
