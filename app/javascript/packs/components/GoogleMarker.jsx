import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ReactTooltip from "react-tooltip"
import { Col, Row } from 'react-materialize'

const Interest = styled.div`
  color: ${(props) => props.crossed ? 'yellow' : 'white' };
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  align-items: center;
`

const Marker = (props) => {
  const crossed = (friendInterestId) => {
    return props.currentUserInterests.some((userInterest) => friendInterestId === userInterest.id)
  }

  return (
    <div
      data-tip
      data-for={`location-${props.friendId}`}
      className={props.className}
      onClick={props.onClick}
    >
      <ReactTooltip id={`location-${props.friendId}`} >
        <Content>
          <div>{`${props.firstName} ${props.lastName}`}</div>
          <Row>
            {props.friendInterests.map((interest) => (
              <Col key={interest.id} xl={4}>
                <Interest crossed={crossed(interest.id)}>{interest.name}</Interest>
              </Col>
            ))}
          </Row>
        </Content>
      </ReactTooltip>
      <Link to="/friends/12">
        <img className="circle responseve-img"
          src={ props.photo || '/placeholder.png' }
          width="100%"
          height="100%"
        />
      </Link>
    </div>
  )
}

export default styled(Marker)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #3a6ee6;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    z-index: 1;
  }
`
