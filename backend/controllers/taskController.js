const Task = require('../models/taskModel')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.status(200).json(tasks);
  res.status(200).json({ message: 'Get All Tasks' });
})

const setTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Pleas enter a task')
  }
  const task = await Task.create({ text: req.body.text, user: req.user.id })
  res.status(200).json(task);
})

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }

  const user = await User.findById(req.user.id)

  if (user) {
    res.status(401)
    throw new Error('No such user found')
  }

  if (task.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User is not authorized to update')
  }

  const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updateTask)
})

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id)
  if (!task) {
    res.status(400)
    throw new Error('Task not found')
  }
  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('No such user found')
  }
  if (task.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User is not authorized to update')
  }
  await Task.findByIdAndDelete(req.params.id)

  res.status(200).json({ id: req.params.id })
}

module.exports = { getTasks, setTask, updateTask, deleteTask }
