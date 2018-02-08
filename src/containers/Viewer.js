import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import Loading from '../components/Loading'
import SideBar from '../components/SideBar'
import firebase from '../libraries/firebaseInstance'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ToastContainer, toast } from 'react-toastify'

const ViewerWrapper = styled.div.attrs({
  className: 'page-content'
})`
  padding: 40px 1em;
`

const MarkdownWrapper = styled.div`
  max-width: 980px;
  margin: auto;
  border-radius: 4px;
  border: thin solid lightgray;
`

class Viewer extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }

  state = {
    text: '',
    isLoading: true
  }

  componentDidMount = () => {
    if (this.props.location.state && this.props.location.state.toast) {
      toast.error(this.props.location.state.toast, {
        hideProgressBar: true
      })
      // Clear location state
      this.props.history.replace({
        pathname: this.props.location.pathname,
        state: {}
      })
    }
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
        <ToastContainer />
        <Loading isLoading={this.state.isLoading}>
          <SideBar list={['admin', 'Home', 'Software', 'Hardware']} />
          <ViewerWrapper>
            <MarkdownWrapper>
              <MarkdownViewer text={this.state.text} />
            </MarkdownWrapper>
          </ViewerWrapper>
        </Loading>
      </div>
    )
  }
}

export default Viewer
