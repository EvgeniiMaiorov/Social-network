import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { TextInput, Col, Row, Button, Textarea, Collection, CollectionItem, Switch, Icon } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import Comments from './Comments'

const postCreateValues = { title: '', body: '', image: '', delay: null }

const Unpublished = styled.span`
  color: grey;
  margin-left: 10px;
`

const Liked = styled.span`
  color: ${(props) => (props.liked ? 'green' : 'black')};
`

const Disliked = styled.span`
  color: ${(props) => (props.disliked ? 'red' : 'black')};
`

const UserPosts = (props) => {
  const [posts, setPosts] = useState([])
  const inputFile = useRef(null)
  const [delay, setDelay] = useState(false)

  const saveLike = (post, status) => () => {
    axios.post(
      `/api/v1/posts/${post.id}/like`,
      { status },
      { headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        setPosts((posts) => (
          posts.map((post) => (
            post.id === response.data.post.id ? response.data.post : post
          ))
        ))
      })
  }

  const handleDelaySwitch = () => {
    setDelay(!delay)
  }

  useEffect(() => {
    axios.get(`/api/v1/users/${props.userId}/posts`, { headers: { Authorization: props.userToken } })
      .then((response) => {
        setPosts(response.data.posts)
      })
  }, [props.userId, props.userToken])

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('post[title]', values.title)
    formData.append('post[body]', values.body)
    formData.append('post[image]', values.image)
    if (values.delay) formData.append('delay', values.delay)
    formData.append('tags[]', 'test')
    axios.post(`/api/v1/users/${props.userId}/posts`, formData, { headers: { Authorization: props.userToken } })
      .then((response) => {
        setSubmitting(false)
        setPosts([response.data.post, ...posts])
        resetForm(postCreateValues)
      }).catch(() => {
        setSubmitting(false)
      })
  }

  const onClick = () => {
    inputFile.current.click()
  }

  const onImageChange = (setFieldValue) => (event) => {
    setFieldValue('image', event.currentTarget.files[0])
  }

  const postCreateSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, 'Name is too long!')
      .required('This field is required'),
    body: Yup.string()
      .required('This field is required'),
    delay: Yup.number()
      .integer()
      .nullable(true)
      .typeError('you must specify a number')
      .max(24, 'Max 24 hours')
      .min(1, 'Min 1 hour'),
  })

  return (
    <>
      { props.showForm && (
        <Row>
          <Col xl={12}>
            <Formik
              initialValues={postCreateValues}
              onSubmit={onSubmit}
              validationSchema={postCreateSchema}
            >
              {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                <Form>
                  <input
                    accept="image/*"
                    type="file"
                    name="photo"
                    ref={inputFile}
                    style={{ display: 'none' }}
                    onChange={onImageChange(setFieldValue)}
                  />
                  <Row>
                    <Col offset="xl1" xl={3}>
                      <img
                        className="circle responseve-img"
                        onClick={onClick}
                        src={values.image ? URL.createObjectURL(values.image) : '/placeholder.png'}
                        alt=""
                        width="100"
                        height="100"
                        style={{ marginTop: '45px' }}
                        aria-hidden="true"
                      />
                    </Col>
                    <Col offset="s5" xl={6}>
                      <Field
                        className={touched.title && errors.title ? 'invalid' : 'valid'}
                        error={errors.title}
                        name="title"
                        label="Title"
                        as={TextInput}
                        xl={12}
                      />
                      <Field
                        className={touched.body && errors.body ? 'invalid' : 'valid'}
                        error={errors.body}
                        name="body"
                        label="Body"
                        as={Textarea}
                        xl={12}
                      />
                      { delay && (
                      <Field
                        className={touched.delay && errors.delay ? 'invalid' : 'valid'}
                        error={errors.delay}
                        name="delay"
                        label="Delay"
                        type="number"
                        min="1"
                        max="24"
                        value={String(values.delay)}
                        as={TextInput}
                        xl={12}
                      />
                      )}
                      <div className="input-field col">
                        <Row>
                          <Col>
                            <span>Show delay</span>
                          </Col>
                          <Col>
                            <Switch
                              id="Switch-11"
                              offLabel="Off"
                              checked={delay}
                              onLabel="On"
                              onClick={handleDelaySwitch}
                            />
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col offset="s5">
                      <Button
                        type="submit"
                        disabled={isSubmitting || Object.keys(touched).some((key) => errors[key])}
                      >
                        Create post
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      )}
      <Row>
        <Col xl={12}>
          <Collection>
            {posts.map((post) => (
              <CollectionItem key={post.id} className="avatar">
                { post.image.url && (
                  <img
                    alt=""
                    className="circle responseve-img"
                    src={post.image.url}
                  />
                )}
                <span className="title" style={{ fontWeight: 'bold' }}>
                  { post.title }
                </span>
                <span>
                  { !post.published_at && <Unpublished>(Unpublished)</Unpublished> }
                </span>
                <p>
                  { post.body }
                </p>
                <Comments postId={post.id} userToken={props.userToken} comments={post.comments} />
                <Icon style={{ color: 'green', cursor: 'pointer' }} tiny onClick={saveLike(post, 'like')}>
                  thumb_up
                </Icon>
                <Liked liked={post.like?.status === 'like'}>{post.like_count}</Liked>
                <Icon style={{ color: 'red', cursor: 'pointer' }} tiny onClick={saveLike(post, 'dislike')}>
                  thumb_down
                </Icon>
                <Disliked disliked={post.like?.status === 'dislike'}>{post.dislike_count}</Disliked>
              </CollectionItem>
            ))}
          </Collection>
        </Col>
      </Row>
    </>
  )
}

export default UserPosts
