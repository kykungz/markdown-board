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
  border: thin solid lightgray;
  width: 100%;
  max-width: 980px;
  margin: auto;
  border-radius: 4px;
  padding: 40px;
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
