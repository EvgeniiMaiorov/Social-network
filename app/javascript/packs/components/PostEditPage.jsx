import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextInput, Button, Col, Row, Container } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import TagsChip from './TagsChip'

const PageContainer = styled(Container)`
  width: 100%;
  max-width: 1920px;
  padding: 100px;
`

const PostFormWrapper = styled.div`
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

const UploadImage = styled.div`
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

const PostEditInput = styled(TextInput)`
  width: 100%;
  text-indent: 30px;
  height: 40px;
`

const PostUpdateButton = styled(Button)`
  background-color: #407BFF;
  &:hover {
    background-color: #407BFF;
  }
  width: 100%;
  border-radius: 4px;
  margin-bottom: 50px;
`

const PostDeleteButton = styled(Button)`
  background-color: #c0031c;
  &:hover {
    background-color: #c0031c;
  }
  width: 90%;
  border-radius: 4px;
  margin-top: 50px;
`

const EditImageText = styled.div`
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

const postEditInitialValues = (post) => (
  { title: post.title, body: post.body, image: null, tags: post.tags.map((tag) => tag.name) }
)

const PostEditPage = (props) => {
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)
  const history = useHistory()
  const inputFile = useRef(null)

  useEffect(() => {
    axios.get(`/api/v1/posts/${postId}`, { headers: { Authorization: props.userToken } })
      .then((response) => {
        setPost(response.data.post)
        setLoading(false)
      })
  }, [props.userToken, postId])

  const onSubmit = (values, { setSubmitting }) => {
    if (!post) return
    setSubmitting(true)
    const formData = new FormData()
    formData.append('post[title]', values.title)
    formData.append('post[body]', values.body)
    if (values.image) formData.append('post[image]', values.image)
    values.tags.forEach((tag) => (
      formData.append('tags[]', tag)
    ))
    axios.patch(`/api/v1/posts/${post.id}`, formData, { headers: { Authorization: props.userToken } })
      .then(() => {
        setSubmitting(false)
        history.push('/users')
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

  const deletePost = () => {
    const result = window.confirm('Are you sure to delete?')
    if (result) {
      axios.delete(`/api/v1/posts/${post.id}`, { headers: { Authorization: props.userToken } })
        .then(() => {
          history.push('/users')
        })
    }
  }

  const postEditSchema = Yup.object().shape({
    title: Yup.string()
      .max(65, 'Title is too long!')
      .min(2, 'Title is too short!')
      .required('This field is required'),
    body: Yup.string()
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
          <PostFormWrapper>
            <Row>
              <Col xl={9}>
                <Text>Edit post</Text>
              </Col>
              <Col xl={3}>
                <PostDeleteButton onClick={deletePost}>Delete post</PostDeleteButton>
              </Col>
            </Row>
            { !loading && (
              <Formik
                initialValues={postEditInitialValues(post)}
                onSubmit={onSubmit}
                validationSchema={postEditSchema}
              >
                {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                  <Form>
                    <UploadImage>
                      <img
                        className="circle responseve-img"
                        onClick={onClick}
                        src={values.image ? URL.createObjectURL(values.image) : post.image.url || '/placeholder.png'}
                        alt=""
                        width="160"
                        height="160"
                        onKeyDown={onClick}
                        role="presentation"
                      />
                    </UploadImage>
                    <Col xl={12}>
                      <EditImageText onClick={onClick}>Edit image</EditImageText>
                    </Col>
                    <input
                      accept="image/*"
                      type="file"
                      name="photo"
                      ref={inputFile}
                      style={{ display: 'none' }}
                      onChange={onImageChange(setFieldValue)}
                    />
                    <Row>
                      <Col offset="s6">
                        <TagsChip userToken={props.userToken} setFieldValue={setFieldValue} tags={values.tags} />
                      </Col>
                    </Row>
                    <Row>
                      <Col offset="s6">
                        <Field
                          className={touched.title && errors.title ? 'invalid' : 'valid'}
                          error={errors.title}
                          name="title"
                          label="Title"
                          as={PostEditInput}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col offset="s6">
                        <Field
                          className={touched.body && errors.body ? 'invalid' : 'valid'}
                          error={errors.body}
                          name="body"
                          label="Body"
                          as={PostEditInput}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col offset="s5">
                        <PostUpdateButton type="submit" disabled={isSubmitting}>Update post</PostUpdateButton>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Formik>
            )}
          </PostFormWrapper>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default PostEditPage
