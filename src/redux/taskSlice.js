import { createSlice } from '@reduxjs/toolkit';
 

const initialState = {
  tasks:  [],
  filteredTasks: [],
  searchQuery: ''
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
   /* The `setTasks` reducer is updating the `tasks` state with the payload
   received in the action. It then updates the local storage with the updated tasks array after
   converting it to a JSON string. Finally, it filters the `tasks` array based on the `searchQuery`
   in the state and updates the `filteredTasks` state with the filtered tasks. */
   setTasks: (state, action) => {
    // Ensure we're storing a flat array
    state.tasks = Array.isArray(action.payload[0]) ? action.payload[0] : action.payload;
    
    state.filteredTasks = Array.isArray(state.tasks) ? 
      state.tasks.filter(task =>
        task.name && task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      ) : [];
  },
  addTask: (state, action) => {
    // Handle both single task and array of tasks
    if (Array.isArray(action.payload)) {
      state.tasks = action.payload;
    } else {
      state.tasks.push(action.payload);
    }
    
    state.filteredTasks = Array.isArray(state.tasks) ? 
      state.tasks.filter(task =>
        task.name && task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      ) : [];
  },
   
   /* The `updateTaskStatus` reducer is responsible for updating the status of a
   specific task in the `tasks` state array. Here's a breakdown of what it does: */
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      state.tasks = state.tasks.map(task =>
        task._id === id ? { ...task, status } : task
      );
      state.filteredTasks = Array.isArray(state.tasks) ? 
  state.tasks.filter(task =>
    task.name && task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  ) : [];

    },
  /* The `setSearchQuery` reducer is responsible for updating the `searchQuery`
  state with the payload received in the action. It then filters the `tasks` array based on the
  updated `searchQuery` value and updates the `filteredTasks` state with the filtered tasks. This
  allows for dynamically filtering tasks based on the search query input by the user. */
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredTasks = Array.isArray(state.tasks) ? 
  state.tasks.filter(task =>
    task.name && task.name.toLowerCase().includes(state.searchQuery.toLowerCase())
  ) : [];

    },
  },
});

export const { setTasks, addTask, removeTask, updateTaskStatus, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
