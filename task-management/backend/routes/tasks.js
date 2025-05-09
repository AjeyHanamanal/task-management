const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Task = require('../models/Task');
const mongoose = require('mongoose');

// @route   GET api/tasks
// @desc    Get all tasks for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
router.post('/', [
  auth,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('dueDate', 'Due date is required').not().isEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'pending',
      priority: req.body.priority || 'medium',
      dueDate: req.body.dueDate,
      tags: req.body.tags || [],
      user: req.user.id
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid task ID' });
  }
  try {
    console.log('Delete request for task:', req.params.id, 'by user:', req.user.id);
    const task = await Task.findById(req.params.id);
    if (!task) {
      console.log('Task not found');
      return res.status(404).json({ msg: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      console.log('Not authorized');
      return res.status(401).json({ msg: 'Not authorized' });
    }
    await Task.deleteOne({ _id: req.params.id });
    console.log('Task removed');
    res.json({ msg: 'Task removed', id: req.params.id });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

module.exports = router; 