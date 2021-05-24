const projectsRouter = require('express').Router()
const Project = require('../models/project')
const middleware = require('../utils/middleware')

projectsRouter.get('/', async (request, response) => {
  const projects = await Project.find({})
    .populate('user', { username: 1, name: 1})
  response.json(projects)
})

projectsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  if (!user) return response.status(401).json({ error: 'token missing or invalid' })

  const newProject = new Project({
    ...body,
    date: new Date(),
    user: user
  })
  
  const savedProject = await newProject.save()

  user.projects = user.projects.concat(savedProject._id)
  await user.save()

  response.status(201).json(savedProject)
})

projectsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  if (!user) return response.status(401).json({ error: 'token missing or invalid' })

  const projectToDelete = await Project.findById(request.params.id)
  if (projectToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only creators can delete their projects' })
  }

  await Project.findByIdAndRemove(request.params.id)

  user.projects = user.projects.filter(p => p._id !== projectToDelete._id)
  await user.save()

  response.status(204).end()
})

projectsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  let body = request.body
  const user = request.user
  if (!user) return response.status(401).json({ error: 'token missing or invalid' })
  
  const updatedProject = await Project.findByIdAndUpdate(
    request.params.id,
    body,
    { new: true, runValidators: true }
  )
  response.json(updatedProject)
})

module.exports = projectsRouter