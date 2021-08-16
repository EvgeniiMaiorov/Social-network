import React, { useState } from 'react'
import { Col, Row, Chip } from 'react-materialize'

const Tags = (props) => {
  const [tags] = useState(props.tags)

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
