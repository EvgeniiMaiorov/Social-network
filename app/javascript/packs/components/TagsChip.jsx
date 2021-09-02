import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Chip } from 'react-materialize'

const TagsChip = (props) => {
  const [tags, setTags] = useState([])

  useEffect(() => {
    axios.get('/api/v1/tags', { headers: { Authorization: props.userToken } })
      .then((response) => {
        setTags(response.data.tags)
      })
  }, [props.userToken])

  const onTagAdd = () => (_event, value) => {
    props.setFieldValue('tags', [...props.tags, value.firstChild.data.replace(/\s/g, '').toLowerCase()])
  }

  const onTagDelete = () => (_event, value) => {
    props.setFieldValue('tags', props.tags.filter((tag) => tag !== value.firstChild.data))
  }

  return (
    <Chip
      options={{
        data: props.tags.map((tag) => ({ tag })),
        onChipAdd: onTagAdd(),
        onChipDelete: onTagDelete(),
        placeholder: 'Enter a tag',
        autocompleteOptions: {
          data: tags.reduce((acc, tag) => ({ ...acc, [tag.name]: null }), {}),
          limit: 10,
          minLength: 1,
          sortFunction: (first, second, value) => {
            const firstIndex = first.indexOf(value)
            const secondIndex = second.indexOf(value)

            if (firstIndex < secondIndex) return false
            if (firstIndex === secondIndex) return first.length > second.length

            return true
          },
        },
      }}
    />
  )
}

export default TagsChip
