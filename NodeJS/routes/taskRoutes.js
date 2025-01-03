import express from 'express';
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
  deleteTask,
  updateTask
} from '../controllers/taskController.js';

const router = express.Router();

// POST /tasks: Create a new task
router.post('/tasks', createTask);

// GET /tasks: Fetch all tasks
router.get('/tasks', getAllTasks);

// GET /tasks/:id: Fetch a task by its ID
router.get('/tasks/:id', getTaskById);

// PUT /tasks/:id: Update the task status
// router.put('/tasks/:id', updateTaskStatus);

// PUT /tasks/:id/status: Update the task status
router.put('/tasks/:id/status', updateTaskStatus);

// PUT /tasks/:id: Update the task name and description
router.put('/tasks/:id', updateTask);


// DELETE /tasks/:id: Delete a task by its ID
router.delete('/tasks/:id', deleteTask);

export default router;
