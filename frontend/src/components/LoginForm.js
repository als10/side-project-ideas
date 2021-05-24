import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import { Button, Box, InputBase } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: 6,
    color: '#F9EAE1',
    borderColor: '#F9EAE1'
  },
  input: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    maxWidth: '14ch',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
  }
}))

const LoginForm = ({ handleLogin }) => {
  const classes = useStyles()

  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box component="div" display="inline-block" className={classes.input}>
        <InputBase
          required
          placeholder="Username"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Box>
      <Box component="div" display="inline-block" className={classes.input}>
        <InputBase
          required
          type="password"
          placeholder="Password"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Box>
      <Box component="div" display="inline-block">
        <Button
          type="submit"
          variant="outlined"
          size="small"
          className={classes.button}
        >
          Login
        </Button>
      </Box>
    </form>
  )
}

export default LoginForm