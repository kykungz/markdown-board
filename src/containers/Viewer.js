import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import Loading from '../components/Loading'
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
    isLoading: true
  }

  componentDidMount = () => {
    firebase.database().ref('/markdown').on('value', snapshot => {
      this.setState({
        text: snapshot.val(),
        isLoading: false
      })
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/').off()
  }

  render () {
    return (
      <div className='container-fluid mb-4'>
        <Loading isLoading={this.state.isLoading}>
          <h1>Viewer</h1>
          <MarkdownWrapper>
            <MarkdownViewer text={this.state.text} />
          </MarkdownWrapper>
        </Loading>
      </div>
    )
  }
}

export default Viewer
