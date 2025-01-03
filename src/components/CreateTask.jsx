import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import axios from "axios";


function CreateTask({ closeModal }) {
  const dispatch = useDispatch();
 /* The `const [task, setTask] = useState({ id: "", name: "", description: "", status: "todo" });`
  `CreateTask` component is using the `useState` hook from React to initialize a state
 variable named `task` and a function to update that state named `setTask`. */

  const [task, setTask] = useState({
   
    name: "",
    description: "",
    status: "todo",
  });

  

  const createNewTask = async (task) => {
  
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        task, // Pass the task data here
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 201) {
        console.log("Task created successfully:", response.data);
      } else {
        console.error("Failed to create task:", response.data);
      }
    } catch (error) {
      console.error("Error occurred while creating task:", error);
    }
  };
  
  const GetTask = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200) {
        // Flatten the array if it's nested
        const tasks = Array.isArray(response.data[0]) ? response.data[0] : response.data;
        dispatch(addTask(tasks));  // Pass the flattened array
      } else {
        console.error("Failed to fetch tasks:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
  
    if (task.name.length <= 0)
      return toast.error("A task must have a required field");
  
    if (task.name.length > 100)
      return toast.error("A task must not have more than 100 characters");
  
    // Create the new task in the API
    await createNewTask(task);
  
    await GetTask(); 
  
      toast.success("Task Created", { duration: 1000 });
  
      setTask({
        name: "",
        description: "",
        status: "todo",
      });
  
      closeModal();
    
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        name="heading"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
        className="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter task name..."
        autoComplete="off"
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="border border-gray-300 bg-gray-50 rounded-md p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter task details..."
        autoComplete="off"
        required
      />

      <button
        type="submit"
        className="bg-indigo-600 text-white rounded-md px-6 py-3 text-sm font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Add Task
      </button>
    </form>
  );
}

export default CreateTask;