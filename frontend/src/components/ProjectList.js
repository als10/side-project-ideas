import React from 'react'
import Project from './Project'

const ProjectList = ({ projects, user, updateProject, removeProject }) => (
  <div style={{ marginBottom: 200, overflow: 'auto' }}>
    {projects.map(project => (
      <Project
        key={project._id}
        project={project}
        user={user}
        updateProject={updateProject}
        removeProject={removeProject}
      />
    ))}
  </div>
)

export default ProjectList