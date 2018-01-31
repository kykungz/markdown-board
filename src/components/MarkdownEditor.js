import React from 'react'
import PropTypes from 'prop-types'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/theme/material.css'
import 'codemirror/mode/gfm/gfm.js'

class MarkdownEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: props.text
    }
  }

  static propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func
  }

  handleChange = (editor, data, value) => {
    this.setState({ text: value }, () => {
      this.props.onChange(this.state.text)
    })
  }

  render () {
    return (
      <CodeMirror
        value={this.state.text}
        options={{
          mode: 'gfm',
          theme: 'material',
          lineNumbers: true,
          tabSize: '2'
        }}
        onBeforeChange={this.handleChange}
      />
    )
  }
}

export default MarkdownEditor
