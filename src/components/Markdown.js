import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import ReactHtmlParser from 'react-html-parser'

const converter = new showdown.Converter()
converter.setFlavor('github')

const Markdown = (props) => (
  <div className='markdown-body'>
    { ReactHtmlParser(converter.makeHtml(props.text)) }
  </div>
)

Markdown.propTypes = {
  text: PropTypes.string
}

export default Markdown
