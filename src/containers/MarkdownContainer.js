import React, { Component } from 'react'
import Markdown from '../components/Markdown'

class MarkdownContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <Markdown text={this.state.text} />
    )
  }
}

export default MarkdownContainer
