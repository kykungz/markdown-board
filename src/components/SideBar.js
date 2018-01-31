import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const SideBarWrapper = styled.div`
  position: fixed;
  width: 200px;
  height: 100%;
  left: 0;
  top: 0;
  padding-top: 2em;
  background: whitesmoke;
`

const File = styled.div`
  padding-left: .5em;
  transition: all 200ms;
  font-size: 1.5em;
  cursor: pointer;

  &:hover {
    background: lightgray;
  }
`

const SideBar = (props) => (
  <SideBarWrapper>
    { props.list.map((item, i) =>
      <Link key={i} to={item} style={{ textDecoration: 'none', color: 'black' }}>
        <File>{ item }</File>
      </Link>
    ) }
  </SideBarWrapper>
)

SideBar.propTypes = {
  list: PropTypes.array
}

export default SideBar
