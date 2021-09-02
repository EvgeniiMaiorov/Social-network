import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { CollectionItem, Col, Collection, Row, TextInput, Button, Icon } from 'react-materialize'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import styled from 'styled-components'

const MessageButton = styled(Button)`
  margin-top: 15px;
  margin-left: 15px;
`
const ConversationPage = (props) => {
  const history = useHistory()
  const { conversationId } = useParams()
  const [messages, setMessages] = useState([])

  const messageCreateValues = { body: '' }

  useEffect(() => {
    axios.get('/api/v1/messages', {
      params: { conversation_id: conversationId },
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setMessages(response.data.messages)
      })
      .catch((error) => {
        if (error.response.status === 404) history.push('/user')
      })
  }, [props.userToken])

  const getData = (message) => (
    new Date(message.created_at).toLocaleString()
  )

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    axios.post('/api/v1/messages', values, {
      params: { conversation_id: conversationId },
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setSubmitting(false)
        setMessages([...messages, response.data.message])
        resetForm(messageCreateValues)
      }).catch(() => {
        setSubmitting(false)
      })
  }

  const messageCreateSchema = Yup.object().shape({
    body: Yup.string()
      .required('This field is required'),
  })

  return (
    <>
      <Collection>
        {
          messages.map((message) => {
            const data = getData(message)

            return (
              <CollectionItem key={message.id} className="avatar">
                <img
                  alt=""
                  className="circle responseve-img"
                  src={message.user.photo.url || '/placeholder.png'}
                />
                <Row>
                  <Col xl={9}>
                    <span className="title" style={{ fontWeight: 'bold' }}>
                      {message.user.first_name}
                    </span>
                    <p style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                      { message.body }
                    </p>
                  </Col>
                  <Col xl={3}>
                    { data }
                  </Col>
                </Row>
              </CollectionItem>
            )
          })
        }
      </Collection>
      <Row>
        <Col xl={12}>
          <Formik
            initialValues={messageCreateValues}
            onSubmit={onSubmit}
            validationSchema={messageCreateSchema}
          >
            {({ errors, touched }) => (
              <Row>
                <Form>
                  <Col xl={10}>
                    <Field
                      className={touched.body && errors.body ? 'invalid' : 'valid'}
                      error={errors.body}
                      name="body"
                      label="Body"
                      as={TextInput}
                      xl={12}
                    />
                  </Col>
                  <Col xl={2}>
                    <MessageButton tiny="true" type="submit">
                      <Icon>
                        send
                      </Icon>
                    </MessageButton>
                  </Col>
                </Form>
              </Row>
            )}
          </Formik>
        </Col>
      </Row>
    </>
  )
}

export default ConversationPage
