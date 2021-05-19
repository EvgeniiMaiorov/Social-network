import React from 'react'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'

const PageContainer = styled(Container)`
  width: 100%;
  max-width: 1920px;
  padding: 100px;
`

const LoginFormWrapper = styled.div`
  position: absolute;
  width: 800px;
  height: 740px;
  left: 450px;
  top: 101px;
  background: #FFFFFF;
  border-radius: 38px;
`

const ImageWrapper = styled.div`
  position: absolute;
  width: 642.82px;
  height: 597px;
  left: 1000px;
  top: 350px;
  opacity: 0.84;
`

const Image = styled.img`
  width: 100%;
  position: relative;
`

const UploadPhoto = styled.div`
  position: absolute;
  width: 141px;
  height: 141px;
  left: 160px;
  top: 175px;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 119.5%;
  margin-top: 50px;
  margin-left: 250px;
`

const SignUpInput = styled(TextInput)`
  width: 100%;
  text-indent: 30px;
  height: 40px;
`

const SigbUpButton = styled(Button)`
  background-color: #407BFF;
  &:hover {
    background-color: #407BFF;
  }
  width: 100%;
  border-radius: 4px;
  margin-bottom: 50px;
`

const UploadPhotoText = styled.div`
  position: absolute;
  width: 120px;
  height: 19px;
  left: 175px;
  top: 325px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
`

const SignUp = (props) => {
  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    axios.post('/users', { user: values }).then((response) => {
      props.loginHandler(response.headers.authorization, response.data.user)
      setSubmitting(false)
      history.push('/interests')
    }).catch((error) => {
      setSubmitting(false)
    })
  }

  const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^(?!admin\b)/i, 'Nice try!')
      .min(2, 'Name is too short!')
      .max(50, 'Name is too long!')
      .required('This field is required'),
    last_name: Yup.string()
      .matches(/^(?!admin\b)/i, 'Nice try!')
      .min(2, 'Last name is too short!')
      .max(50, 'Last name is too long!')
      .required('This field is required'),
    email: Yup.string().email('Invalid email').required('This field is required'),
    password: Yup.string()
      .min(6, 'Password must be min 6 characters long')
      .required('This field is required'),
    password_confirmation: Yup.string().when('password', {
      is: (val) => (!!(val && val.length > 0)),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same',
      ),
    }),
  })

  return (
    <PageContainer>
      <Row>
        <Col xl={7}>
          <ImageWrapper>
            <Image src="/amico.png" />
          </ImageWrapper>
        </Col>
        <Col xl={6}>
          <LoginFormWrapper>
            <Row>
              <Text>Create new account</Text>
            </Row>
            <UploadPhoto>
              <img src="/placeholder.png" alt="" />
            </UploadPhoto>
            <Col xl={12}>
              <UploadPhotoText>Upload photo</UploadPhotoText>
            </Col>
            <Formik
              initialValues={{ first_name: '', last_name: '', email: '', password: '', password_confirmation: '' }}
              onSubmit={onSubmit}
              validationSchema={SignupSchema}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.first_name && errors.first_name ? 'invalid' : 'valid'}
                        error={errors.first_name}
                        name="first_name"
                        label="First name"
                        as={SignUpInput}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.last_name && errors.last_name ? 'invalid' : 'valid'}
                        error={errors.last_name}
                        name="last_name"
                        label="Last name"
                        as={SignUpInput}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.email && errors.email ? 'invalid' : 'valid'}
                        error={errors.email}
                        name="email"
                        label="Email"
                        as={SignUpInput}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.password && errors.password ? 'invalid' : 'valid'}
                        error={errors.password}
                        name="password"
                        label="Password"
                        as={SignUpInput}
                        password
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.password_confirmation && errors.password_confirmation ? 'invalid' : 'valid'}
                        error={errors.password_confirmation}
                        name="password_confirmation"
                        label="Password confirmation"
                        as={SignUpInput}
                        password
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s5">
                      <SigbUpButton type="submit" disabled={isSubmitting}>Create</SigbUpButton>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </LoginFormWrapper>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default SignUp
