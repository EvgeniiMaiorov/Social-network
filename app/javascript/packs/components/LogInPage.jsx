import React from 'react'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import { useHistory, Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import SwitchLanguage from './SwitchLanguage'

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
  margin-bottom: 20px;
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
  top: 690px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
`

const GoogleLoginWrapper = styled.div`
  width: 100%;
  height: 14px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogInPage = (props) => {
  const history = useHistory()
  const { t } = useTranslation()

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)

    axios.post('/users/sign_in', { user: values })
      .then((response) => {
        setSubmitting(false)
        props.loginHandler(response.headers.authorization)
      }).catch(() => {
        setSubmitting(false)
      })
  }

  const validateValues = (values) => {
    const errors = {}

    if (!values.email) {
      errors.email = t('required')
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = t('error')
    }

    if (!values.password) {
      errors.password = t('required')
    }

    return errors
  }

  const responseGoogle = (response) => {
    axios.post(
      '/users/auth/google_oauth2/callback',
      response.tokenObj,
      { headers: { Authorization: `Bearer ${response.tokenObj.accessToken}`,
        'Content-Type': 'application/json',
        access_token: response.tokenObj.accessToken } },
    )
      .then((response) => {
        props.loginHandler(response.headers.authorization)

        if (!response.data.persisted) {
          history.push('/interests')
        }
      })
  }

  return (
    <PageContainer>
      <Row>
        <SwitchLanguage />
        <Col xl={5}>
          <LoginFormWrapper>
            <LogoTitle>
              <img src="/logo.png" alt="" />
              <Text>{t('title')}</Text>
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
                      label={t('email')}
                      error={errors.email}
                      as={LoginInput}
                      xl={12}
                    />
                  </Row>
                  <Row>
                    <Field
                      className={errors.password ? 'invalid' : 'valid'}
                      name="password"
                      label={t('password')}
                      error={errors.password}
                      as={LoginInput}
                      xl={12}
                      password
                    />
                  </Row>
                  <LoginButton type="submit" disabled={isSubmitting}>{t('log_in')}</LoginButton>
                  <GoogleLoginWrapper>
                    <GoogleLogin
                      clientId="511856659895-k2d41bc5g4tejsc78vom8lla02rnlm0b.apps.googleusercontent.com"
                      buttonText={t('sign_in')}
                      onSuccess={responseGoogle}
                      onFailure={(response) => console.log('response >> ', response)}
                      prompt="select_account"
                    />
                  </GoogleLoginWrapper>
                  <SignUpLink>
                    <Col xl={12}>
                      {t('member')}
                      {' '}
                      <Link to="/sign-up">{t('sign_up')}</Link>
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

export default LogInPage
