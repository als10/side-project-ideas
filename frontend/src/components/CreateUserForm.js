import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  Typography,
  Box
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
  },
  paper: {
    width: 500,
    maxHeight: 700,
    padding: 32,
    border: 'solid',
    borderColor: '#7D4F50',
    borderRadius: 10,
    color: '#7D4F50',
    backgroundColor: '#F9EAE1',
    overflow: 'auto'
  },
  fab: {
    width: '75px',
    height: '75px',
    position: 'fixed',
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
  buttonSubmit: {
    marginTop: 10,
    color: '#7D4F50',
    borderColor: '#7D4F50'
  },
  buttonAdd: {
    fontSize: 24,
    margin: 5,
    color: '#7D4F50',
    borderColor: '#7D4F50'
  }
}))

const CreateUserForm = ({ createUser }) => {
  const classes = useStyles()

  const [ name, setName ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ visible, setVisible ] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const handleSubmit = (event) => {
    event.preventDefault()
    toggleVisibility()
    createUser({ name, username, password })
    setName('')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Button
        variant="contained"
        style={{ color: '#7D4F50', borderColor: '#7D4F50', marginLeft: 6 }}
        onClick={toggleVisibility}
        size="small"
      >
        Sign Up
      </Button>
      <Modal
        open={visible}
        onClose={toggleVisibility}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={visible}>
          <Box component="span" display="block" className={classes.paper}>
            <Typography variant="h3" m={8}>Create an Account</Typography>
            <form onSubmit={handleSubmit}>
              <Box component="span" display="block" mt={6} mb={3}>
                <TextField
                  type="text"
                  variant="outlined"
                  value={name}
                  label="Name"
                  className={classes.input}
                  onChange={({ target }) => setName(target.value)}
                />
              </Box>
              <Box component="span" display="block" mb={3}>
                <TextField
                  required
                  type="text"
                  variant="outlined"
                  value={username}
                  label="Username"
                  inputProps={{
                    minLength: 3,
                  }}
                  className={classes.input}
                  onChange={({ target }) => setUsername(target.value)}
                />
              </Box>
              <Box component="span" display="block" mb={3}>
                <TextField
                  required
                  type="password"
                  variant="outlined"
                  value={password}
                  label="Password"
                  inputProps={{
                    minLength: 3,
                  }}
                  className={classes.input}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </Box>
              <Button
                type="submit"
                variant="outlined"
                className={classes.buttonSubmit}
              >
                Create
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default CreateUserForm