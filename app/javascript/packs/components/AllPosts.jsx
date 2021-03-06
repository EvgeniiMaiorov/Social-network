import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import {
  TextInput, Col, Row, Button, Textarea, Collection, CollectionItem, Switch, Icon, Checkbox,
} from 'react-materialize'
import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useDebouncedCallback } from 'use-debounce'
import InfiniteScroll from 'react-infinite-scroll-component'
import * as Yup from 'yup'
import styled from 'styled-components'
import Comments from './Comments'
import Tags from './Tags'
import TagsChip from './TagsChip'

const postCreateValues = { title: '', body: '', image: '', delay: null, tags: [] }

const Liked = styled.span`
  color: ${(props) => (props.liked ? 'green' : 'black')};
`

const Disliked = styled.span`
  color: ${(props) => (props.disliked ? 'red' : 'black')};
`

const AllPosts = (props) => {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState()
  const inputFile = useRef(null)
  const [delay, setDelay] = useState(false)
  const [type, setType] = useState('all')
  const [page, setPage] = useState(1)
  const [nextPage, setNextPage] = useState(true)

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

  const getPosts = () => {
    if (search) return
    axios.get('/api/v1/posts/feed', {
      params: { type, page },
      headers: { Authorization: props.userToken },
    })
      .then((response) => {
        setPosts((prevPosts) => prevPosts.concat(response.data.posts))
        setPage((page) => ++page)
        setNextPage(!!response.data.meta.next_page)
      })
  }

  const setSearchDebounce = useDebouncedCallback(setSearch, 600)

  const onChange = (e) => {
    setSearchDebounce(e.target.value)
  }

  useEffect(() => {
    if (!search) return
    axios.get(
      '/api/v1/posts/feed',
      { params: { search, type },
        headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        setPosts(response.data.posts)
      })
  }, [props.userToken, search, type])

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true)
    const formData = new FormData()
    formData.append('post[title]', values.title)
    formData.append('post[body]', values.body)
    formData.append('post[image]', values.image)
    if (values.delay) formData.append('delay', values.delay)
    values.tags.map((tag) => (
      formData.append('tags[]', tag)
    ))
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

  const getData = (post) => (
    new Date(post.published_at).toLocaleString()
  )

  const onParamsChange = (e) => {
    setType(e.target.value)
    setPage(1)
    setPosts([])
    setNextPage(true)
  }

  const postCreateSchema = Yup.object().shape({
    title: Yup.string()
      .max(65, 'Title is too long!')
      .min(2, 'Title is too short!')
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
      <Row>
        <Row>
          <Col xl={4}>
            <Checkbox
              id="all"
              onChange={onParamsChange}
              checked={type === 'all'}
              label="All posts"
              value="all"
            />
          </Col>
          <Col xl={4}>
            <Checkbox
              id="friends_posts"
              onChange={onParamsChange}
              checked={type === 'friends_posts'}
              label="Friends posts"
              value="friends_posts"
            />
          </Col>
        </Row>
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
                    <TagsChip userToken={props.userToken} setFieldValue={setFieldValue} tags={values.tags} />
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
      <Row>
        <Col xl={12}>
          <Textarea xl={12} onChange={onChange} label="Search post" />
            <Collection>
              { props.userId && (
                <InfiniteScroll
                  dataLength={posts.length}
                  next={getPosts}
                  hasMore={nextPage}
                  loader={<h4>Loading...</h4>}
                >
                  {posts.map((post) => {
                    const data = getData(post)

                    return (
                      <CollectionItem key={post.id} className="avatar">
                        { post.image.url && (
                          <img
                            alt=""
                            className="circle responseve-img"
                            src={post.image.url}
                          />
                        )}
                        <Row>
                          <Col xl={8}>
                            <Tags postId={post.id} userToken={props.userToken} tags={post.tags} />
                          </Col>
                          { props.userId === post.user_id.toString() && (
                            <Col xl={4}>
                              <Link to={`/posts/${post.id}/edit`}>Edit post</Link>
                            </Col>
                          )}
                        </Row>
                        <Col xl={12}>
                          <span className="title" style={{ fontWeight: 'bold' }}>
                            { post.title }
                          </span>
                          <p style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                            { post.body }
                          </p>
                        </Col>
                        <Comments
                          postId={post.id}
                          userToken={props.userToken}
                          comments={post.comments}
                          userId={props.userId}
                        />
                        <Row>
                          <Col xl={10}>
                            <Icon style={{ color: 'green', cursor: 'pointer' }} tiny onClick={saveLike(post, 'like')}>
                              thumb_up
                            </Icon>
                            <Liked liked={post.like?.status === 'like'}>{post.like_count}</Liked>
                            <Icon style={{ color: 'red', cursor: 'pointer' }} tiny onClick={saveLike(post, 'dislike')}>
                              thumb_down
                            </Icon>
                            <Disliked disliked={post.like?.status === 'dislike'}>{post.dislike_count}</Disliked>
                          </Col>
                          <Col xl={2}>
                            { data }
                          </Col>
                        </Row>
                      </CollectionItem>
                    )
                  })}
                </InfiniteScroll>
              )}
            </Collection>
        </Col>
      </Row>
    </>
  )
}

export default AllPosts
