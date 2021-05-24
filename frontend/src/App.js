import React, { useState, useEffect, useRef } from 'react'

import CreateProjectForm from './components/CreateProjectForm'
import Notification from './components/Notification'
import Appbar from './components/Appbar'
import ProjectList from './components/ProjectList'

import projectService from './services/projects'
import loginService from './services/login'
import userService from './services/users'

const App = () => {
  const [ projects, setProjects ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState({})
  const [ filter, setFilter ] = useState('')

  const notificationRef = useRef()

  useEffect(async () => {
    notify('Getting projects...')
    const projects = await projectService.getAll()
    setProjects(projects.sort((a, b) => b.likes.length - a.likes.length))
    notificationRef.current.setOpen(false)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      projectService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const notify = (message, severity) => {
    setMessage({ message, severity })
    notificationRef.current.setOpen(true)
  }

  const handleLogin = async (username, password) => {
    try {
      notify('Logging in...')
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      projectService.setToken(user.token)
      setUser(user)
      notify('Logged in successfully', 'success')
    } catch (exception) {
      notify('Incorrect credentials', 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addProject = async (project) => {
    try {
      notify('Adding project...')
      const newProject = await projectService.create(project)
      setProjects(projects.concat(newProject))
      notify('New project added', 'success')
    } catch (exception) {
      notify('Something went wrong', 'error')
    }
  }

  const updateProject = async (id, project) => {
    try {
      notify('Updating project...')
      const updatedProject = await projectService.update(id, project)
      setProjects(projects.map(p =>
        p._id === id ? { ...updatedProject, user: p.user } : p
      ).sort((a, b) => b.likes.length - a.likes.length))
      notify('Project updated', 'success')
    } catch (exception) {
      notify('Something went wrong', 'error')
    }
  }

  const removeProject = async (id) => {
    const projectToRemove = projects.find(p => p._id === id)
    if (window.confirm(`Remove project ${projectToRemove.title}?`)) {
      try {
        notify('Removing project...')
        await projectService.remove(id)
        setProjects(projects.filter(p => p._id !== id))
        notify('Project deleted', 'success')
      } catch (exception) {
        notify('Something went wrong', 'error')
      }
    }
  }

  const addUser = async (user) => {
    try {
      notify('Creating user...')
      await userService.create(user)
      notify('New user created', 'success')
    } catch (exception) {
      notify('Something went wrong', 'error')
    }
  }

  const projectsToShow = projects.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.tags.join(' ').toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ fontFamily: 'Roboto' }}>
      <div>
        <Appbar
          filter={filter}
          setFilter={setFilter}
          handleLogin={handleLogin}
          handleSignUp={addUser}
          logout={logout}
          user={user}
        />
        <Notification message={message} ref={notificationRef} />
        <div style={{ marginTop: 80 }}>
          <ProjectList
            projects={projectsToShow}
            user={user}
            updateProject={updateProject}
            removeProject={removeProject}
          />
          {user !== null &&
            <CreateProjectForm createProject={addProject} projectId={null} />}
        </div>
      </div>
    </div>
  )
}

export default App