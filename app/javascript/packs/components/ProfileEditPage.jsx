import React, { useRef, useEffect, useState } from 'react'
import { useJwt } from 'react-jwt'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'

const PageContainer = styled(Container)`
  width: 100%;
  max-width: 1920px;
  padding: 100px;
`

const ProfileFormWrapper = styled.div`
  position: absolute;
  width: 800px;
  height: 540px;
  left: 450px;
  top: 150px;
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
  top: 100px;
  cursor: pointer;
`

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 119.5%;
  margin-top: 50px;
  margin-left: 300px;
`

const ProfileEditInput = styled(TextInput)`
  width: 100%;
  text-indent: 30px;
  height: 40px;
`

const ProfileUpdateButton = styled(Button)`
  background-color: #407BFF;
  &:hover {
    background-color: #407BFF;
  }
  width: 100%;
  border-radius: 4px;
  margin-bottom: 50px;
`

const EditPhotoText = styled.div`
  position: absolute;
  width: 120px;
  height: 19px;
  left: 175px;
  top: 280px;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
`

const profileEditInitialValues = (user) => (
  { first_name: user.first_name, last_name: user.last_name, photo: null }
)

const ProfileEditPage = (props) => {
  const { decodedToken } = useJwt(props.userToken)
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const inputFile = useRef(null)

  useEffect(() => {
    if(!decodedToken) return
    axios.get(`/api/v1/users/${decodedToken.sub}`, { headers: { Authorization: props.userToken } })
    .then((response) => {
      setUser(response.data.user)
      setLoading(false)
    })
  }, [decodedToken])

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('user[first_name]', values.first_name)
    formData.append('user[last_name]', values.last_name)
    if (values.photo) formData.append('user[photo]', values.photo)
    axios.patch(`/api/v1/users/${decodedToken.sub}`, formData, { headers: { Authorization: props.userToken } })
    .then((response) => {
      setSubmitting(false)
      history.push('/users')
    }).catch((error) => {
      setSubmitting(false)
    })
  }

  const onClick = () => {
    inputFile.current.click()
  }

  const onPhotoChange = (setFieldValue) => {
    return (event) => {
      setFieldValue("photo", event.currentTarget.files[0])
    }
  }

  const profileEditSchema = Yup.object().shape({
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
          <ProfileFormWrapper>
            <Row>
              <Text>Edit profile</Text>
            </Row>
            { !loading && (
            <Formik
              initialValues={profileEditInitialValues(user)}
              onSubmit={onSubmit}
              validationSchema={profileEditSchema}
            >
              {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                <Form>
                  <UploadPhoto>
                    <img
                      className="circle responseve-img"
                      onClick={onClick}
                      src={values.photo ? URL.createObjectURL(values.photo) : user.photo.url || '/placeholder.png'}
                      alt=""
                      width="160"
                      height="160"
                    />
                  </UploadPhoto>
                  <Col xl={12}>
                    <EditPhotoText onClick={onClick}>Edit photo</EditPhotoText>
                  </Col>
                  <input accept="image/*" type='file' name='photo' ref={inputFile} style={{display: 'none'}} onChange={onPhotoChange(setFieldValue)} />
                  <Row>
                    <Col offset="s6">
                      <Field
                        className={touched.first_name && errors.first_name ? 'invalid' : 'valid'}
                        error={errors.first_name}
                        name="first_name"
                        label="First name"
                        as={ProfileEditInput}
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
                        as={ProfileEditInput}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s5">
                      <ProfileUpdateButton type="submit" disabled={isSubmitting}>Update</ProfileUpdateButton>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
            )}
          </ProfileFormWrapper>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default ProfileEditPage
