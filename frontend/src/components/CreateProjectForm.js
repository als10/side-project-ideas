import React, { useState, useImperativeHandle } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Modal,
  Backdrop,
  Fade,
  TextField,
  Button,
  IconButton,
  Fab,
  Typography,
  Box
} from '@material-ui/core'
import { Add } from '@material-ui/icons'

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

const CreateProjectForm = React.forwardRef(({ createProject, projectId }, ref) => {
  const classes = useStyles()

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ tags, setTags ] = useState([''])
  const [ visible, setVisible ] = useState(false)

  CreateProjectForm.displayName = 'CreateProjectForm'

  const toggleVisibility = () => setVisible(!visible)

  const handleSubmit = (event) => {
    event.preventDefault()
    toggleVisibility()
    if (projectId) createProject(projectId, { title, description, tags: tags.filter(t => t) })
    else createProject({ title, description, tags: tags.filter(t => t) })
    setTitle('')
    setDescription('')
    setTags([''])
  }

  useImperativeHandle(ref, () => (
    { toggleVisibility, setTitle, setDescription, setTags }
  ))

  return (
    <div>
      <div>
        <Fab
          style={{ display: projectId ? 'none' : '' }}
          color={'primary'}
          onClick={toggleVisibility}
          className={classes.fab}
        >
          <Add />
        </Fab>
      </div>
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
            <Typography variant="h3" m={8}>Add a Project</Typography>
            <form onSubmit={handleSubmit}>
              <Box component="span" display="block" mt={6} mb={3}>
                <TextField
                  required
                  type="text"
                  variant="outlined"
                  value={title}
                  label="Title"
                  className={classes.input}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </Box>
              <Box component="span" display="block" mb={3}>
                <TextField
                  type="text"
                  multiline
                  rows={6}
                  variant="outlined"
                  value={description}
                  label="Description"
                  className={classes.input}
                  onChange={({ target }) => setDescription(target.value)}
                />
              </Box>
              <Box component="span" display="block" mb={3}>
                {tags.map((tag, index) => (
                  <Box key={index} mb={1}>
                    <TextField
                      type="text"
                      variant="outlined"
                      label={`Tag ${index+1}`}
                      value={tag}
                      inputProps={{
                        maxLength: 20,
                      }}
                      onChange={({ target }) =>
                        setTags(tags.map((t, i) => i === index ? target.value : t))
                      }
                    />
                    {tags.length !== 1 &&
                      <IconButton
                        onClick={() => setTags(tags.filter((t, i) => i !== index))}
                        className={classes.buttonAdd}
                      >
                        -
                      </IconButton>}
                    {tags.length - 1 === index && tags.length <= 4 && tag &&
                      <IconButton
                        onClick={() => setTags(tags.concat(''))}
                        className={classes.buttonAdd}
                      >
                        +
                      </IconButton>}
                  </Box>
                ))}
              </Box>
              <Button
                type="submit"
                variant="outlined"
                className={classes.buttonSubmit}
              >
                {projectId ? 'Update' : 'Create'}
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
})

export default CreateProjectForm