import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chip, Autocomplete, Row } from 'react-materialize'
import { useDebouncedCallback } from 'use-debounce'

const TagsChip = (props) => {
  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState([])
  const [search, setSearch] = useState()

  const onTagDelete = () => (_event, value) => {
    setNewTags(() => newTags.filter((tag) => tag !== value.firstChild.data))
    props.setFieldValue('tags', newTags.filter((tag) => tag !== value.firstChild.data))
  }

  const setSearchDebounce = useDebouncedCallback(setSearch, 600)

  const onChange = (e) => {
    setSearchDebounce(e.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setNewTags((prevTags) => [...prevTags, event.target.value.replace(/\s/g, '').toLowerCase()])
      props.setFieldValue('tags', [...newTags, event.target.value.replace(/\s/g, '').toLowerCase()])
    }
  }

  useEffect(() => {
    axios.get(
      '/api/v1/tags',
      { params: { search },
        headers: { Authorization: props.userToken } },
    )
      .then((response) => {
        setTags(response.data.tags)
      })
  }, [props.userId, props.userToken, search])

  return (
    <>
      <Row>
        <Autocomplete
          id="Autocomplete-31"
          options={{
            data: tags.reduce((acc, tag) => ({ ...acc, [tag.name]: null }), {}),
            limit: 10,
            minLength: 1,
          }}
          placeholder="Insert here"
          onChange={onChange}
          onKeyDown={handleKeyPress}
        />
      </Row>
      <Row>
        <Chip
          close
          options={{
            data: newTags.map((tag) => ({ tag })),
            onChipDelete: onTagDelete(),
          }}
        />
      </Row>
    </>
  )
}

export default TagsChip
