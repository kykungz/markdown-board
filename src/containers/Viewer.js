import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import firebase from '../firebaseInstance'
import styled from 'styled-components'

const MarkdownWrapper = styled.div`
  max-width: 980px;
  margin: auto;
  border-radius: 4px;
  border: thin solid lightgray;
`

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
        <MarkdownWrapper>
          <MarkdownViewer text={this.state.text} />
        </MarkdownWrapper>
      </div>
    )
  }
}

export default Viewer
