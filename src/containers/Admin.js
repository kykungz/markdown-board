import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import MarkdownEditor from '../components/MarkdownEditor'
import Loading from '../components/Loading'
import firebase from '../firebaseInstance'
import styled from 'styled-components'
import FontAwesome from 'react-fontawesome'

const Nav = styled.ul.attrs({
  className: 'nav nav-tabs'
})`
  position: relative;
  width: 100%;
  max-width: 980px;
  margin: auto;
`

const NavItem = styled.li.attrs({
  className: 'nav-item'
})`
  cursor: pointer;
  color: lightgray;

  > .active {
    font-weight: 500;
  }
`

const NavLink = styled.span`
  background: hsl(195, 14%, 30%);
`

const Editor = styled.div`
  max-width: 980px;
  margin: auto;
  border-top: none;
`

const Preview = styled.div`
  max-width: 980px;
  margin: auto;
  border: thin solid lightgray;
  border-top: none;
  border-radius: 0 0 4px 4px;
`

const Save = styled.button`
  position: absolute;
  right: 0;
  padding: .5em;
  cursor: pointer;
  border-radius: 2px;
  border-bottom: none;
  transition: all 300ms;

  &:hover {
    background: whitesmoke;
  }
`

class Admin extends Component {
  state = {
    tab: 'editor',
    text: '',
    isLoading: true
  }

  componentDidMount = async () => {
    const snapshot = await firebase.database().ref('/markdown').once('value')
    this.setState({
      text: snapshot.val(),
      isLoading: false
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/').off()
  }

  updateTab = tab => {
    this.setState({ tab })
  }

  updateText = text => {
    this.setState({ text })
  }

  upload = () => {
    firebase.database().ref('/markdown').set(this.state.text)
  }

  render () {
    return (
      <div className='container-fluid mb-4'>
        <h1>Admin</h1>
        <Nav>
          <NavItem onClick={() => this.updateTab('editor')}>
            <NavLink className={`nav-link ${this.state.tab === 'editor' ? 'active' : ''}`}>
              <FontAwesome name='code' /> Editor
            </NavLink>
          </NavItem>
          <NavItem onClick={() => this.updateTab('preview')}>
            <NavLink className={`nav-link ${this.state.tab === 'preview' ? 'active' : ''}`}>
              <FontAwesome name='eye' /> Preview Changes
            </NavLink>
          </NavItem>
          <Save onClick={this.upload}>
            <FontAwesome size='lg' name='upload' />
          </Save>
        </Nav>
        { this.state.tab === 'editor' &&
          <Editor>
            <Loading isLoading={this.state.isLoading}>
              <MarkdownEditor onChange={this.updateText} text={this.state.text} />
            </Loading>
          </Editor>
        }
        { this.state.tab === 'preview' &&
          <Preview>
            <Loading isLoading={this.state.isLoading}>
              <MarkdownViewer text={this.state.text} />
            </Loading>
          </Preview>
        }
      </div>
    )
  }
}

export default Admin
