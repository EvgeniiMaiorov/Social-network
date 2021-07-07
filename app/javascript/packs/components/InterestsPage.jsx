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

const InterestsPage = (props) => {
  const [interestCategories, setInterestCategories] = useState([])
  const [userInterests, setUserInterests] = useState()
  const [interestsByCategory, setInterestsByCategory] = useState({})
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  useEffect(() => {
    axios.get('/api/v1/interest_categories', { headers: { Authorization: props.userToken } })
    .then((response) => {
      setInterestCategories(response.data.interest_categories)
    })

    axios.get('/api/v1/interests', { headers: { Authorization: props.userToken } })
    .then((response) => {
      setUserInterests(response.data.interests)
    })
  }, [])

  useEffect(() => {
    if (interestCategories.length === 0 || !userInterests) return

    const userInterestIdsByCategory = (interestCategoryId) => {
      const userInterestsIds = userInterests
      .filter((userInterest) => userInterest.interest_category_id === interestCategoryId )
      .map((userInterest) => userInterest.id.toString())

      return userInterestsIds
    }

    setInterestsByCategory(interestCategories.reduce((acc, interestCategory) => {
      acc[interestCategory.category_name] = userInterestIdsByCategory(interestCategory.id)

      return acc
    }, {}))
    setLoading(false)
  }, [interestCategories, userInterests])

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true)
    const interestsIds = Object.keys(values).reduce((acc, key) => [...acc, ...values[key]], [])

    axios.patch('/api/v1/users/update_user_interests', { interest_ids: interestsIds }, { headers: { Authorization: props.userToken } })
      .then((response) => {
        setSubmitting(false)
        history.push('/users')
      }).catch((error) => {
        setSubmitting(false)
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
            { !loading && (
              <Formik
                initialValues={interestsByCategory}
                onSubmit={onSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <Row>
                      { interestCategories?.map((interestCategory) => (
                        <Col key={interestCategory.id} xl={4}>
                          <Field as={Select} name={interestCategory.category_name} multiple>
                            <option value="" disabled>{interestCategory.category_name}</option>
                            {interestCategory.interests.map((interest) => (
                              <option key={interest.id} value={interest.id}>{interest.name}</option>
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
            )}
          </LoginFormWrapper>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default InterestsPage
