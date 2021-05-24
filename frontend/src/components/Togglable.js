import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { IconButton } from '@material-ui/core'
import { AddCircle, Cancel } from '@material-ui/icons'

const Togglable = React.forwardRef((props, ref) => {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => (
    { toggleVisibility }
  ))

  return (
    <div>
      <div style={hideWhenVisible}>
        <IconButton onClick={toggleVisibility}>
          <AddCircle />
        </IconButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <IconButton onClick={toggleVisibility}>
          <Cancel />
        </IconButton>
      </div>
    </div>
  )
})

export default Togglable