import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'

const converter = new showdown.Converter()
converter.setFlavor('github')
converter.setOption('openLinksInNewWindow', 'true')

const GithubMarkdown = styled.div.attrs({
  className: 'markdown-body'
})`
  width: 100%;
  padding: 40px;
  background: white;
`

const MarkdownViewer = (props) => (
  <GithubMarkdown>
    { ReactHtmlParser(converter.makeHtml(props.text)) }
  </GithubMarkdown>
)

MarkdownViewer.propTypes = {
  text: PropTypes.string
}

export default MarkdownViewer
