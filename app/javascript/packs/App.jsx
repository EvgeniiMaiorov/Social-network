// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import MainPage from './components/MainPage'
import styled, {createGlobalStyle} from 'styled-components'

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
    document.body.appendChild(document.createElement('div'))
  )
})
