import React from 'react'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

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

const SignUpLink = styled.div`
  position: absolute;
  width: 100%;
  height: 14px;
  left: 290px;
  top: 600px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`

const MainPage = () => {
  const history = useHistory()

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    console.log(values)
    axios.post('/users', { user: values }).then((response) => {
      setSubmitting(false)
      localStorage.setItem('token', response.headers.authorization)
      history.push(`/users/${response.data.id}`)
      console.log(response)
    }).catch((error) => {
      setSubmitting(false)
      console.log(error)
    })
  }

  const validateValues = (values) => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
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
              <img src="/logo.png" alt="" />
              <Text>Welcom to LetsTalk!</Text>
            </LogoTitle>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={validateValues}
              onSubmit={onSubmit}
            >
              {({ isSubmitting, errors }) => (
                <Form>
                  <Row>
                    <Field
                      className={errors.email ? 'invalid' : 'valid'}
                      name="email"
                      label="Email"
                      error={errors.email}
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
                  <SignUpLink>
                    <Col xl={12}>
                      Not a member?
                      {' '}
                      <Link to="/users">Sign up</Link>
                    </Col>
                  </SignUpLink>
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

export default MainPage
