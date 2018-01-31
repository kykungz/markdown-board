import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import Loading from '../components/Loading'
import SideBar from '../components/SideBar'
import firebase from '../libraries/firebaseInstance'
import styled from 'styled-components'

const ViewerWrapper = styled.div.attrs({
  className: 'page-content'
})``

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
      <div>
        <SideBar list={['admin', 'Home', 'Software', 'Hardware']} />
        <ViewerWrapper>
          <Loading isLoading={this.state.isLoading}>
            <MarkdownWrapper>
              <MarkdownViewer text={this.state.text} />
            </MarkdownWrapper>
          </Loading>
        </ViewerWrapper>
      </div>
    )
  }
}

export default Viewer
