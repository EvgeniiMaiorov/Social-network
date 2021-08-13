import React, { useState, useEffect } from 'react'
import { Col, Row, Collection, CollectionItem } from 'react-materialize'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Activities = (props) => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios.get('/api/v1/activities', {
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setActivities(
          response.data.activities,
        )
      })
  }, [props.userToken])

  const activityType = (activity) => {
    switch (activity.activity_type) {
      case 'create_comment':
        return 'Just left a comment'
      case 'create_post':
        return 'Just created a post'
      case 'user_online':
        return 'Is online'
      case 'make_friend':
        return 'Make a ftiend'
      case 'reject_friend':
        return 'Make a subscriber'
      default:
        throw new Error('Undefined type of activity')
    }
  }

  return (
    <Row>
      <Col offset="xl1" xl={10}>
        <Collection>
          {activities.map((activity) => (
            <CollectionItem key={activity.id} className="avatar">
              <Link to={`/users/${activity.user.id}`}>
                <img
                  alt=""
                  className="circle responseve-img"
                  src={activity.user.photo.url || '/placeholder.png'}
                />
                <span className="title" style={{ fontWeight: 'bold' }}>
                  { activity.user.first_name } { activity.user.last_name }
                </span>
              </Link>
              <p>
                { activityType(activity) }
              </p>
            </CollectionItem>
          ))}
        </Collection>
      </Col>
    </Row>
  )
}

export default Activities
