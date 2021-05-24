import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, Backdrop, Fade, Typography, Box, Button } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: 750,
    maxHeight: 700,
    margin: 50,
    padding: 32,
    border: 'solid',
    borderColor: '#7D4F50',
    borderRadius: 10,
    color: '#7D4F50',
    backgroundColor: '#F9EAE1',
    overflow: 'auto'
  },
  tag: {
    margin: 6,
    border: 'solid',
    borderWidth: 1
  }
}))

const ProjectDetails = ({ open, setOpen, project }) => {
  const classes = useStyles()

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography paragraph variant="h3">{project.title}</Typography>
            <Typography paragraph variant="body2" color="textSecondary">
              {`By ${project.user.name || project.user.username}`}
            </Typography>
            <Typography paragraph style={{ whiteSpace: 'pre-line' }} color="textSecondary">
              {project.description}
            </Typography>
            <Box>
              {project.tags.map(
                (tag, i) => <Button key={i} variant="outlined" className={classes.tag}>{tag}</Button>
              )}
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ProjectDetails