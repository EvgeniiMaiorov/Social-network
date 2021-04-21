import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import MainRouter from './components/MainRouter'

const Global = createGlobalStyle`
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #E5E5E5;
}
`

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <>
      <Global />
      <MainRouter />
    </>,
    document.body.appendChild(document.createElement('div')),
  )
})
