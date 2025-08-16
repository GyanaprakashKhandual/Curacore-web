const Project = require('../models/project.model');
const asyncHandler = require('express-async-handler');

exports.createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    user: req.user.id
  });

  res.status(201).json({
    success: true,
    data: project
  });
});


exports.getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: projects.length,
    data: projects
  });
});

exports.getProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, user: req.user.id });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  res.status(200).json({
    success: true,
    data: project
  });
});

exports.updateProject = asyncHandler(async (req, res) => {
  let project = await Project.findOne({ _id: req.params.id, user: req.user.id });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: project
  });
});

exports.deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findOne({ _id: req.params.id, user: req.user.id });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  await project.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});