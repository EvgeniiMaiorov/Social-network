import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Col, Row, Container, Select } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const PageContainer = styled(Container)`
  width: 100%;
  max-width: 1920px;
  padding: 100px;
`

const LoginFormWrapper = styled.div`
  position: absolute;
  width: 825px;
  height: 650px;
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

const Text = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 119.5%;
  margin-top: 50px;
  margin-left: 250px;
`

const SignUpButton = styled(Button)`
  background-color: #407BFF;
  &:hover {
    background-color: #407BFF;
  }
  width: 100%;
  border-radius: 4px;
  margin-bottom: 50px;
`

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 375px;
  padding-top: 60px;
`

const InterestsPage = () => {
  const [interestCategories, setInterestCategories] = useState([])

  const [initialValues, setInitialValues] = useState({})

  const history = useHistory()

  useEffect(() => {
    axios.get('/api/v1/interest_categories')
    .then((response) => {
      setInterestCategories(response.data.interest_categories)
      setInitialValues(response.data.interest_categories.reduce((acc, interestCategory) => acc[interestCategory.id] = [], {}))
    })
  }, [])

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    const interestsIds = Object.keys(values).reduce((acc, key) => [...acc, ...values[key]], [])
    axios.post('/api/v1/users/interests', { interestsIds })
      .then((response) => {
        setSubmitting(false)
        history.push(`/users/${props.userId}`)
      }).catch((error) => {
        setSubmitting(false)
        console.log(error)
      })
  }

  return (
    <PageContainer>
      <Row>
        <Col xl={7}>
          <ImageWrapper>
            <Image src="/rafiki.png" />
          </ImageWrapper>
        </Col>
        <Col xl={12}>
          <LoginFormWrapper>
            <LogoTitle>
              <img src="/logo.png" alt="" />
            </LogoTitle>
            <Text>Select your interests</Text>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Row>
                    { interestCategories?.map((ic) => (
                      <Col key={ic.id} xl={4}>
                        <Field as={Select} name={ic.id} multiple>
                          <option value="" disabled>{ic.category_name}</option>
                          {ic.interests.map((i) => (
                            <option key={i.id} value={i.id}>{i.name}</option>
                          ))}
                        </Field>
                      </Col>

                    ))}
                  </Row>
                  <Row>
                    <Col offset="s5">
                      <SignUpButton type="submit" disabled={isSubmitting}>Confirm</SignUpButton>
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

export default InterestsPage
