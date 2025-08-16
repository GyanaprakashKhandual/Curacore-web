const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

// Protect routes - user must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (format: Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token payload (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

// Optional: Admin role protection middleware
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

// Optional: Project owner verification middleware
const checkProjectOwnership = asyncHandler(async (req, res, next) => {
  const project = await Project.findById(req.params.projectId || req.params.id);
  
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Check if user is project owner or admin
  if (project.user.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to access this project');
  }

  next();
});

// Optional: Bug owner verification middleware
const checkBugOwnership = asyncHandler(async (req, res, next) => {
  const bug = await Bug.findById(req.params.id);
  
  if (!bug) {
    res.status(404);
    throw new Error('Bug not found');
  }

  // Check if user is bug owner, project owner, or admin
  if (bug.user.toString() !== req.user.id && 
      bug.project.user.toString() !== req.user.id && 
      req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized to access this bug');
  }

  next();
});

module.exports = { 
  protect, 
  admin, 
  checkProjectOwnership, 
  checkBugOwnership 
};