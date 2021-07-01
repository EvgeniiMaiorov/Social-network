import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ReactTooltip from "react-tooltip"

const Marker = (props) => (
  <div
    data-tip
    data-for={`location-${props.userId}`}
    className={props.className}
    onClick={props.onClick}
  >
    <ReactTooltip id={`location-${props.userId}`} >{`${props.firstName} ${props.lastName}`}</ReactTooltip>
    <Link to="/friends/12">
      <img className="circle responseve-img"
        src={ props.photo || '/placeholder.png' }
        width="100%"
        height="100%"
      />
    </Link>
  </div>
)

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
