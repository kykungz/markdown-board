import React, { Fragment } from 'react'
import ReactLoading from 'react-loading'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const CenteredReactLoading = styled(ReactLoading).attrs({
  type: 'bars',
  delay: 0
})`
  margin: auto;
  margin-top: 100px;
`

const Loading = (props) => (
  <Fragment>
    { props.isLoading
      ? <CenteredReactLoading />
      : props.children
    }
  </Fragment>
)

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
}

export default Loading
