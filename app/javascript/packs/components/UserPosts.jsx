import React, { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { TextInput, Col, Row, Button, Textarea, Collection, CollectionItem } from 'react-materialize'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


const postCreateValues = { title: '', body: '', image: '' }

const userPosts = (props) => {
  const [posts, setPosts] = useState([])
  const inputFile = useRef(null)

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
    axios.post(`/api/v1/users/${props.userId}/posts`, formData, { headers: { Authorization: props.userToken } })
    .then((response) => {
      setSubmitting(false)
      setPosts([response.data.post, ...posts])
      resetForm(postCreateValues)
    }).catch((error) => {
      setSubmitting(false)
    })
  }

  const onClick = () => {
    inputFile.current.click()
  }

  const onImageChange = (setFieldValue) => {
    return (event) => {
      setFieldValue("image", event.currentTarget.files[0])
    }
  }

  const postCreateSchema = Yup.object().shape({
    title: Yup.string()
      .max(50, 'Name is too long!')
      .required('This field is required'),
    body: Yup.string()
      .required('This field is required')
  })

  return (
    <>
      <Row>
        <Col xl={12}>
          <Formik
            initialValues={postCreateValues}
            onSubmit={onSubmit}
            validationSchema={postCreateSchema}
          >
          {({ isSubmitting, errors, touched, setFieldValue, values }) => (
            <Form>
              <input accept="image/*" type='file' name='photo' ref={inputFile} style={{display: 'none'}} onChange={onImageChange(setFieldValue)} />
              <Row>
                <Col offset="xl1" xl={3}>
                  <img
                    className="circle responseve-img"
                    onClick={onClick}
                    src={values.image ? URL.createObjectURL(values.image) : '/placeholder.png'}
                    alt=""
                    width="100"
                    height="100"
                    style={{marginTop: '45px'}}
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
                </Col>
              </Row>
              <Row>
                <Col offset="s5">
                  <Button type="submit" disabled={isSubmitting}>Create post</Button>
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
            {posts.map(posts => (
              <CollectionItem key={posts.id} className="avatar">
                <img
                  alt=""
                  className="circle responseve-img"
                  src={posts.image.url || '/placeholder.png'}
                  />
                <span className="title" style={{fontWeight: 'bold'}}>
                  { posts.title }
                </span>
                <p>
                  { posts.body }
                </p>
              </CollectionItem>
            ))}
          </Collection>
        </Col>
      </Row>
    </>
  )
}


export default userPosts
