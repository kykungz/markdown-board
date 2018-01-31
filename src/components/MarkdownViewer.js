import React from 'react'
import PropTypes from 'prop-types'
import markdownConverter from '../libraries/markdownConverter'
import styled from 'styled-components'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()

const GithubMarkdown = styled.div.attrs({
  className: 'markdown-body'
})`
  width: 100%;
  padding: 40px;
  background: white;
`

const MarkdownViewer = (props) => (
  <GithubMarkdown>
    { htmlToReactParser.parse(markdownConverter.makeHtml(props.text)) }
  </GithubMarkdown>
)

MarkdownViewer.propTypes = {
  text: PropTypes.string
}

export default MarkdownViewer
