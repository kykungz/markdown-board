import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import firebase from '../firebaseInstance'

class Viewer extends Component {
  state = {
    text: '',
    loading: true
  }

  componentDidMount = () => {
    firebase.database().ref('/markdown').on('value', snapshot => {
      this.setState({
        text: snapshot.val(),
        loading: false
      })
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/').off()
  }

  render () {
    return (
      <div className='container-fluid'>
        <h1>Viewer</h1>
        <MarkdownViewer text={this.state.text} />
      </div>
    )
  }
}

export default Viewer
