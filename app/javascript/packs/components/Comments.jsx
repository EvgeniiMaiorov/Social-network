import React, { useState } from 'react'
import axios from 'axios'
import { Col, Row, Button, Textarea, Collection, CollectionItem } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

const Comments = (props) => {
  const [comments, setComments] = useState(props.comments)

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    axios.post(`/api/v1/posts/${props.postId}/comments`, values, { headers: { Authorization: props.userToken } })
      .then((response) => {
        setSubmitting(false)
        setComments((prevComments) => [...prevComments, response.data.comment])
        resetForm({ body: '' })
      }).catch(() => {
        setSubmitting(false)
      })
  }

  const commentCreateSchema = Yup.object().shape({
    body: Yup.string()
      .required('This field is required'),
  })

  return (
    <>
      <Row>
        <Col xl={12}>
          <Formik
            initialValues={{ body: '' }}
            onSubmit={onSubmit}
            validationSchema={commentCreateSchema}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form>
                <Row>
                  <Col xl={12}>
                    <Field
                      className={touched.body && errors.body ? 'invalid' : 'valid'}
                      error={errors.body}
                      name="body"
                      label="Body"
                      as={Textarea}
                      xl={10}
                    />
                  </Col>
                  <Col xl={4}>
                    <Button type="submit" disabled={isSubmitting}>Leave a comment</Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Row>
        <Col xl={12}>
          <Collection>
            {comments.map((comment) => (
              <CollectionItem key={comment.id} className="avatar">
                <img
                  className="circle"
                  alt=""
                  src={comment.user.photo?.url || '/placeholder.png'}
                  width="80"
                  height="80"
                />
                <span>
                  { `${comment.user.first_name} ${comment.user.last_name}` }
                </span>
                <p>
                  { comment.body }
                </p>
              </CollectionItem>
            ))}
          </Collection>
        </Col>
      </Row>
    </>
  )
}

export default Comments
