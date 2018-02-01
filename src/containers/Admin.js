import React, { Component } from 'react'
import MarkdownViewer from '../components/MarkdownViewer'
import MarkdownEditor from '../components/MarkdownEditor'
import Loading from '../components/Loading'
import SideBar from '../components/SideBar'
import firebase from '../libraries/firebaseInstance'
import styled from 'styled-components'
import Icon from 'react-fontawesome'

const AdminWrapper = styled.div.attrs({
  className: 'page-content'
})``

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

const NavLink = styled.span.attrs({
  className: 'nav-link '
})`
  background: hsl(195, 14%, 30%);
  transition: all 200ms;

  &:hover {
    background: hsl(195, 14%, 35%);
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

const OperationMenu = styled.div`
  position: absolute;
  right: 0;
`

const Operation = styled.button`
  padding: .5em;
  cursor: pointer;
  border-radius: 2px 2px 0 0;
  border-bottom: none;
  width: 40px;
  transition: all 300ms;

  &:disabled, &:disabled:hover {
    background: gray;
  }

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &:hover {
    background: whitesmoke;
  }
`

class Admin extends Component {
  state = {
    tab: 'preview',
    text: '',
    isLoading: true,
    isUploading: false
  }

  componentDidMount = () => {
    this.download()
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

  handleKeyDown = (e) => {
    // SAVE shortcut ( CTRL-S or CMD-S )
    if ((e.metaKey || e.ctrlKey) && e.keyCode === 83) {
      e.preventDefault()
      this.upload()
    }
  }

  download = () => {
    this.setState({ isLoading: true }, async () => {
      try {
        const snapshot = await firebase.database().ref('/markdown').once('value')
        this.setState({
          text: snapshot.val(),
          isLoading: false
        })
      } catch (e) {
        console.log('Error:', e)
      }
    })
  }

  upload = () => {
    this.setState({ isUploading: true }, async () => {
      await firebase.database().ref('/markdown').set(this.state.text)
      this.setState({ isUploading: false })
    })
  }

  render () {
    return (
      <div>
        <SideBar list={['/', 'Software', 'Hardware']} />
        <AdminWrapper>
          <Nav>
            <NavItem onClick={() => this.updateTab('preview')}>
              <NavLink className={this.state.tab === 'preview' ? 'active' : ''}>
                <Icon name='eye' /> Preview
              </NavLink>
            </NavItem>
            <NavItem onClick={() => this.updateTab('editor')}>
              <NavLink className={this.state.tab === 'editor' ? 'active' : ''}>
                <Icon name='code' /> Editor
              </NavLink>
            </NavItem>
            <OperationMenu>
              <Operation onClick={this.download} disabled={this.state.isLoading}>
                <Icon
                  size='lg'
                  style={{ color: '#494f55' }}
                  name='refresh'
                />
              </Operation>
              <Operation onClick={this.upload} disabled={this.state.isLoading}>
                <Icon
                  size='lg'
                  style={{ color: '#494f55' }}
                  name={this.state.isUploading ? 'spinner' : 'cloud-upload'}
                  spin={this.state.isUploading}
                />
              </Operation>
            </OperationMenu>
          </Nav>
          { this.state.tab === 'editor' &&
          <Loading isLoading={this.state.isLoading}>
            <Editor onKeyDown={e => this.handleKeyDown(e)}>
              <MarkdownEditor onChange={this.updateText} text={this.state.text} />
            </Editor>
          </Loading>
          }
          { this.state.tab === 'preview' &&
          <Loading isLoading={this.state.isLoading}>
            <Preview>
              <MarkdownViewer text={this.state.text} />
            </Preview>
          </Loading>
          }
        </AdminWrapper>
      </div>
    )
  }
}

export default Admin
