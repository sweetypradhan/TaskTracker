import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const {  name, description, status } = req.body;
    const newTask = await Task.create({ name, description, status });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all tasks
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a task by its ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // if (!['pending', 'in-progress', 'completed'].includes(status)) {
    //   return res.status(400).json({ message: 'Invalid status value' });
    // }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true } // Return updated document
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: "Name and description are required." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Return updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a task by its ID
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
