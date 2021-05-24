import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Button,
  Box,
  Typography
} from '@material-ui/core'
import { Favorite, Delete, Edit } from '@material-ui/icons'
import ProjectDetails from './ProjectDetails'
import CreateProjectForm from './CreateProjectForm'

const useStyles = makeStyles(() => ({
  root: {
    padding: 16,
    margin: 8,
    border: 'solid',
    borderColor: '#7D4F50',
    borderRadius: 10,
    color: '#7D4F50',
    backgroundColor: '#F9EAE1'
  },
  rightAligned: {
    float: 'right'
  },
  tag: {
    margin: 5,
    fontSize: 12,
    maxHeight: 20,
  }
}))

const Project= ({ project, user, updateProject, removeProject }) => {
  const classes = useStyles()
  const [ openDetails, setOpenDetails ] = useState(false)

  const updateFormRef = useRef()

  let liked = user && project.likes.includes(user.id)

  const like = () => {
    if (user) {
      updateProject(
        project._id,
        {
          likes: liked
            ? project.likes.filter(u => u !== user.id)
            : project.likes.concat(user.id)
        }
      )
      liked = !liked
    }
  }

  const edit = () => {
    updateFormRef.current.setTitle(project.title)
    updateFormRef.current.setDescription(project.description)
    updateFormRef.current.setTags(project.tags)
    updateFormRef.current.toggleVisibility()
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h5" style={{ margin: 8 }} onClick={() => setOpenDetails(true)}>
        {project.title}
      </Typography>
      <Box>
        {project.tags.map(
          (tag, i) => <Button key={i} variant="outlined" className={classes.tag}>{tag}</Button>
        )}
        <span className={classes.rightAligned}>
          <IconButton
            onClick={like}
            style={{ color: liked ? 'red' : '' }}
          >
            <Favorite />
          </IconButton>
          {project.likes.length}
          {user && user.id === project.user._id &&
            <Box display="inline" m={2}>
              <IconButton
                onClick={edit}
              >
                <Edit />
              </IconButton>
              <IconButton onClick={() => removeProject(project._id)}>
                <Delete />
              </IconButton>
            </Box>}
        </span>
      </Box>
      <ProjectDetails open={openDetails} setOpen={setOpenDetails} project={project}/>
      <CreateProjectForm
        createProject={updateProject}
        projectId={project._id}
        ref={updateFormRef}
      />
    </Box>
  )
}

export default Project