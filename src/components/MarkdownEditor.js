import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextArea = styled.textarea.attrs({
  rows: '24'
})`
  width: 100%;
  white-space: nowrap;
  border: thin solid lightgray;
  border-top: none !important;
  border-radius: 0 0 4px 4px !important;
  background: url(http://i.imgur.com/2cOaJ.png);
  background-attachment: local;
  background-repeat: no-repeat;
  background-color: white;
  padding-left: 35px;
  padding-top: 10px;

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
