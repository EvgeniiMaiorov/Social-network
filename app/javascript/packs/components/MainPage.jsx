import React from 'react'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'

const MainPage = () => {
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    axios.post('/auth', values).then(response => {
      setSubmitting(false)
      console.log(response)
    }).catch(error => {
      setSubmitting(false)
      console.log(error)
    })
  }

  const validateValues = values => {
    const errors = {}
    if (!values.login) {
      errors.login = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)) {
      errors.login = 'Invalid login address'
    }
    if (!values.password) {
      errors.password = 'Required'
    }
    return errors
  }

  return (
    <PageContainer>
      <Row>
        <Col xl={5}>
          <LoginFormWrapper>
            <LogoTitle>
              <img src="/logo.png" />
              <Text>Welcom to LetsTalk!</Text>
            </LogoTitle>
            <Formik
              initialValues={{ login: '', password: '' }}
              validate={validateValues}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, values, handleChange, errors }) => (
                <Form>
                  <Row>
                    <Field
                      className={errors.login ? 'invalid' : 'valid'}
                      name="login"
                      label="Email"
                      error={errors.login}
                      as={LoginInput}
                      xl={12}
                    />
                  </Row>
                  <Row>
                    <Field
                      className={errors.password ? 'invalid' : 'valid'}
                      name="password"
                      label="Password"
                      error={errors.password}
                      as={LoginInput}
                      xl={12}
                      password
                    />
                  </Row>
                  <LoginButton type="submit" disabled={isSubmitting}>Log in</LoginButton>
                </Form>
              )}
            </Formik>
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
