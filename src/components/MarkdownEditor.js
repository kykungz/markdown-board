import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextArea = styled.textarea.attrs({
  className: 'form-control',
  rows: '24'
})`
  width: 100%;
  white-space: nowrap;
  border-top: none !important;
  border-radius: 0 0 4px 4px !important;

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }
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
