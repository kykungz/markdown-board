import React, { Component } from 'react'
import Markdown from '../components/Markdown'
import firebase from '../firebaseInstance'

class MarkdownContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: '',
      loading: true
    }
  }

  componentDidMount () {
    firebase.database().ref('/markdown').on('value', snapshot => {
      this.setState({
        text: snapshot.val(),
        loading: false
      })
    })
  }

  componentWillUnmount () {
    firebase.database().ref('/').off()
  }

  render () {
    return <Markdown text={this.state.text} />
  }
}

export default MarkdownContainer
