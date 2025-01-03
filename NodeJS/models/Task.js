import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  

  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

export default mongoose.model('Task', taskSchema);
