import React from 'react'
import ReactDOM from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import MainPage from './components/MainPage'

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
      <MainPage />
      <Global />
    </>,
    document.body.appendChild(document.createElement('div')),
  )
})
