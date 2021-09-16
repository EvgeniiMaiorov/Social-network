import React from 'react'
import { Col, Row, Chip } from 'react-materialize'

const Tags = (props) => {
  const {tags} = props

  return (
    <>
      <Row>
        <Col xl={12}>
          {tags.map((tag) => (
            <Chip key={tag.id}>
              <span>
                { tag.name }
              </span>
            </Chip>
          ))}
        </Col>
      </Row>
    </>
  )
}

export default Tags
