import React from 'react'
import { Col, Row } from 'react-materialize'
import AllPosts from './AllPosts'

const PostsPage = (props) => (
  <Row>
    <Row>
      <Col xl={12}>
        <hr />
        <AllPosts
          userToken={props.userToken}
          userId={props.userId}
        />
      </Col>
    </Row>
  </Row>
)

export default PostsPage
