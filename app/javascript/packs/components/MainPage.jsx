import React from 'react'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'

const MainPage = () => {
  return (
    <PageContainer>
      <Row>
        <Col xl={5}>
          <LoginFormWrapper>
            <LogoTitle>
              <img src="/logo.png" />
              <Text>Welcom to LetsTalk!</Text>
            </LogoTitle>
            <LoginInput xl={12} placeholder="Login" />
            <LoginInput xl={12} placeholder="Password" />
            <LoginButton>Log in</LoginButton>
          </LoginFormWrapper>
        </Col>
        <Col xl={7}>
          <ImageWrapper>
            <Image src="/rafiki2.png" />
          </ImageWrapper>
        </Col>
      </Row>
    </PageContainer>
  )
}

const PageContainer = styled(Container)`
  width: 100%;
  max-width: 1920px;
  padding: 100px;
`

const LoginFormWrapper = styled.div`
  background-color: white;
  height: 695px;
  border-radius: 38px;
  padding: 100px;
  width: 530px;
`

const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  width: 100%;
`

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`

const Text = styled.div`
  margin-left: 30px;
  font-family: Roboto;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: 33px;
  letter-spacing: 0em;
  text-align: left;
`

const LoginInput = styled(TextInput)`
  width: 100%;
  text-indent: 30px;
  height: 40px;
  margin-bottom: 20px;
`

const LoginButton = styled(Button)`
  background-color: #407BFF;
  &:hover {
    background-color: #407BFF;
  }
  width: 100%;
  border-radius: 4px;
`

export default MainPage