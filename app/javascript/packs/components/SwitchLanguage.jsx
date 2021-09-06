import React from 'react'
import { Row, Button, Col } from 'react-materialize'
import i18n from 'i18next'

const SwitchLanguage = () => {
  const handleOnclick = (e) => {
    e.preventDefault()
    i18n.changeLanguage(e.target.value)
  }

  return (
    <Row>
      <Col offset="xl10">
        <Col>
          <Button tiny="true" value="en" onClick={handleOnclick}>
            English
          </Button>
        </Col>
        <Col>
          <Button tiny="true" value="ru" onClick={handleOnclick}>
            Русский
          </Button>
        </Col>
      </Col>
    </Row>
  )
}

export default SwitchLanguage
