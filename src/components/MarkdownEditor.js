import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextArea = styled.textarea.attrs({
  className: 'form-control',
  rows: '22'
})`
  width: 100%;
  max-width: 980px;
  margin: auto;
  border-radius: 4px;
  white-space: nowrap;
`

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

  componentWillReceiveProps (nextProps) {
    if (nextProps.text !== this.state.text) {
      this.setState({ text: nextProps.text })
    }
  }

  handleChange (e) {
    this.setState({ text: e.target.value }, () => {
      this.props.onChange(this.state.text)
    })
  }

  render () {
    return (
      <TextArea onChange={e => this.handleChange(e)} value={this.state.text} />
    )
  }
}

export default MarkdownEditor
