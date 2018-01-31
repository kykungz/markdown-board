import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import MarkdownEditor from '../components/MarkdownEditor'
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
  color: gray;

  > .active {
    font-weight: 500;
  }
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
    loading: true
  }

  componentDidMount = async () => {
    const snapshot = await firebase.database().ref('/markdown').once('value')
    this.setState({
      text: snapshot.val(),
      loading: false
    })
  }

  componentWillUnmount = () => {
    firebase.database().ref('/').off()
  }

  handleClick = tab => {
    this.setState({ tab })
  }

  handleChange = text => {
    this.setState({ text })
  }

  upload = () => {
    firebase.database().ref('/markdown').set(this.state.text)
  }

  render () {
    return (
      <div className='container-fluid'>
        <h1>Admin</h1>
        <Nav>
          <NavItem onClick={() => this.handleClick('editor')}>
            <span className={`nav-link ${this.state.tab === 'editor' ? 'active' : ''}`}>
              <FontAwesome name='code' /> Editor
            </span>
          </NavItem>
          <NavItem onClick={() => this.handleClick('preview')}>
            <span className={`nav-link ${this.state.tab === 'preview' ? 'active' : ''}`}>
              <FontAwesome name='eye' /> Preview Changes
            </span>
          </NavItem>
          <Save onClick={this.upload}>
            <FontAwesome size='lg' name='upload' />
          </Save>
        </Nav>
        { this.state.tab === 'editor' &&
          <Editor>
            <MarkdownEditor onChange={this.handleChange} text={this.state.text} />
          </Editor>
        }
        { this.state.tab === 'preview' &&
          <Preview>
            <MarkdownViewer text={this.state.text} />
          </Preview>
        }
      </div>
    )
  }
}

export default Admin
