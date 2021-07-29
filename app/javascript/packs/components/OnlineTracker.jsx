import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Online = styled.div`
  color: green;
`

const Offline = styled.div`
  color: grey;
`

const OnlineTracker = (props) => {
  const [online, setOnline] = useState(false)

  useEffect(() => {
    const getStatus = () => {
      axios.get(`/api/v1/users/${props.userId}/online_status`, { headers: { Authorization: props.userToken } })
        .then((response) => setOnline(response.data))
    }

    getStatus()
    const interval = setInterval(getStatus, 60000)

    return () => clearInterval(interval)
  }, [props.userId, props.userToken])

  return online ? <Online>Online</Online> : <Offline>Offline</Offline>
}

export default OnlineTracker
