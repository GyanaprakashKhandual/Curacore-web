const Bug = require('../models/bug.model');
const Project = require('../models/project.model');
const asyncHandler = require('express-async-handler');


exports.getBugs = asyncHandler(async (req, res) => {
  // Check if project belongs to user
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  const bugs = await Bug.find({ project: req.params.projectId })
    .sort({ createdAt: -1 })
    .populate('user', 'name email');

  res.status(200).json({
    success: true,
    count: bugs.length,
    data: bugs
  });
});


exports.createBug = asyncHandler(async (req, res) => {
  // Check if project belongs to user
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  const bug = await Bug.create({
    bugType: req.body.bugType,
    bugModule: req.body.bugModule,
    bugDescription: req.body.bugDescription,
    refLink: req.body.refLink,
    requirement: req.body.requirement,
    severity: req.body.severity,
    priority: req.body.priority,
    status: req.body.status,
    project: req.params.projectId,
    user: req.user.id
  });

  res.status(201).json({
    success: true,
    data: bug
  });
});


exports.getBug = asyncHandler(async (req, res) => {
  const bug = await Bug.findOne({ _id: req.params.id, user: req.user.id })
    .populate({
      path: 'project',
      select: 'name description'
    })
    .populate('user', 'name email');

  if (!bug) {
    return res.status(404).json({
      success: false,
      error: 'Bug not found'
    });
  }

  res.status(200).json({
    success: true,
    data: bug
  });
});


exports.updateBug = asyncHandler(async (req, res) => {
  let bug = await Bug.findOne({ _id: req.params.id, user: req.user.id });

  if (!bug) {
    return res.status(404).json({
      success: false,
      error: 'Bug not found'
    });
  }

  // Update only the fields that are passed in
  const fieldsToUpdate = {
    bugType: req.body.bugType,
    bugModule: req.body.bugModule,
    bugDescription: req.body.bugDescription,
    refLink: req.body.refLink,
    requirement: req.body.requirement,
    severity: req.body.severity,
    priority: req.body.priority,
    status: req.body.status
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]);

  bug = await Bug.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: bug
  });
});


exports.deleteBug = asyncHandler(async (req, res) => {
  const bug = await Bug.findOne({ _id: req.params.id, user: req.user.id });

  if (!bug) {
    return res.status(404).json({
      success: false,
      error: 'Bug not found'
    });
  }

  await bug.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});


exports.getBugStats = asyncHandler(async (req, res) => {
  // Check if project belongs to user
  const project = await Project.findOne({ _id: req.params.projectId, user: req.user.id });

  if (!project) {
    return res.status(404).json({
      success: false,
      error: 'Project not found'
    });
  }

  const stats = await Bug.aggregate([
    {
      $match: { project: mongoose.Types.ObjectId(req.params.projectId) }
    },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    success: true,
    data: stats
  });
});