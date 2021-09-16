import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import SwitchLanguage from './SwitchLanguage'

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
  left: 135px;
  top: 175px;
  cursor: pointer;
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
  left: 165px;
  top: 355px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
`

const signUpInitialValues = {
  first_name: '', last_name: '', email: '', password: '', password_confirmation: '', photo: '',
}

const SignUp = (props) => {
  const history = useHistory()
  const { t } = useTranslation()

  const inputFile = useRef(null)

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('user[first_name]', values.first_name)
    formData.append('user[last_name]', values.last_name)
    formData.append('user[email]', values.email)
    formData.append('user[password]', values.password)
    formData.append('user[photo]', values.photo)
    axios.post('/users', formData)
      .then((response) => {
        props.loginHandler(response.headers.authorization)
        setSubmitting(false)
        history.push('/interests')
      }).catch(() => {
        setSubmitting(false)
      })
  }

  const onClick = () => {
    inputFile.current.click()
  }

  const onPhotoChange = (setFieldValue) => (event) => {
    setFieldValue('photo', event.currentTarget.files[0])
  }

  const signUpSchema = Yup.object().shape({
    first_name: Yup.string()
      .matches(/^(?!admin\b)/i, t('admin'))
      .min(2, t('short'))
      .max(50, t('long'))
      .required(t('required')),
    last_name: Yup.string()
      .matches(/^(?!admin\b)/i, t('admin'))
      .min(2, t('short'))
      .max(50, t('long'))
      .required(t('required')),
    email: Yup.string().email(t('error')).required(t('required')),
    password: Yup.string()
      .min(6, t('password_length'))
      .required(t('required')),
    password_confirmation: Yup.string().when('password', {
      is: (val) => (!!(val && val.length > 0)),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        t('password_check'),
      ),
    }),
  })

  return (
    <PageContainer>
      <Row>
        <SwitchLanguage />
        <Col xl={7}>
          <ImageWrapper>
            <Image src="/amico.png" />
          </ImageWrapper>
        </Col>
        <Col xl={6}>
          <LoginFormWrapper>
            <Row>
              <Text>{t('new_account')}</Text>
            </Row>
            <Formik
              initialValues={signUpInitialValues}
              onSubmit={onSubmit}
              validationSchema={signUpSchema}
            >
              {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                <Form>
                  <UploadPhoto>
                    <img
                      className="circle responseve-img"
                      onClick={onClick}
                      src={values.photo ? URL.createObjectURL(values.photo) : '/placeholder.png'}
                      alt=""
                      width="160"
                      height="160"
                      aria-hidden="true"
                    />
                  </UploadPhoto>
                  <Col xl={12}>
                    <UploadPhotoText onClick={onClick}>{t('upload_photo')}</UploadPhotoText>
                  </Col>
                  <input
                    accept="image/*"
                    type="file"
                    name="photo"
                    ref={inputFile}
                    style={{ display: 'none' }}
                    onChange={onPhotoChange(setFieldValue)}
                  />
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.first_name && errors.first_name ? 'invalid' : 'valid'}
                        error={errors.first_name}
                        name="first_name"
                        label={t('first_name')}
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
                        label={t('last_name')}
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
                        label={t('email')}
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
                        label={t('password')}
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
                        label={t('confirmation')}
                        as={SignUpInput}
                        password
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s5">
                      <SigbUpButton type="submit" disabled={isSubmitting}>{t('create_account')}</SigbUpButton>
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
