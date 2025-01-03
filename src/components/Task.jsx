import React, { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/taskSlice";
import toast from "react-hot-toast";
import axios from "axios";

function Task({ task }) {
  const dispatch = useDispatch();
  const [taskRemoved, setTaskRemoved] = useState(false); // State to track task removal
  const [isEditing, setIsEditing] = useState(false); // To toggle edit mode
  const [taskName, setTaskName] = useState(task.name); // Task name in edit mode
  const [taskDescription, setTaskDescription] = useState(task.description); // Task description in edit mode
  // const [updatedTask, setUpdatedTask] = useState([{
  //   name: "",
  //   description:""
  //   }])


  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const tasks = Array.isArray(response.data) ? response.data.flat() : [];
        dispatch(setTasks(tasks));
      } else {
        console.error("Failed to fetch tasks:", response.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Task deleted successfully
      } else {
        console.error("Failed to delete task:", response.data);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { _id: task._id }, // Use _id to match with useDrop
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleRemove = async () => {
    await deleteTask(task._id);
    setTaskRemoved(true); // Trigger fetchTasks by setting this state
    toast("Item Deleted", {
      icon: "💀",
      duration: 1000,
      style: {
        background: "#f56565",
        color: "#fff",
      },
    });
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSaveEdit = async (e,id) => {
    
    console.log(id,e.target.value);
    
    if (taskName && taskDescription) {
      try {
        const updatedTask = { name: taskName, description: taskDescription };

        // Send PUT request to update the task
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${id}`, // Ensure correct task ID is passed
          updatedTask,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          fetchTasks(); // Fetch updated tasks after saving
          setIsEditing(false); // Disable edit mode
          toast("Task Updated", {
            icon: "✏️",
            duration: 1000,
            style: {
              background: "#38a169", 
              color: "#fff",
            },
          });
        } else {
          console.error("Failed to update task:", response.data);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      toast.error("Please provide both task name and description!");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel the edit mode without saving
  };

  useEffect(() => {
    if (taskRemoved) {
      fetchTasks(); // Fetch updated tasks
      setTaskRemoved(false); // Reset state
    }
  }, [taskRemoved]);

  return (
    <div
      ref={drag}
      className={`relative p-4 mb-4 bg-white rounded-lg shadow-lg border border-gray-200 ${
        isDragging ? "opacity-50" : "opacity-100"
      } transition-opacity duration-200 ease-in-out`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="text-lg font-semibold text-gray-900 mb-2 w-full p-2 border rounded"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="text-sm text-gray-700 w-full p-2 border rounded mb-4"
          />
          <button
            onClick={(e)=>handleSaveEdit(e,task._id)}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <p className="text-lg font-semibold text-gray-900 mb-2 truncate">{task.name}</p>
          <p className="text-sm text-gray-700">{task.description}</p>
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 text-yellow-500 hover:text-yellow-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 3l5 5-11 11H5v-5L16 3z"
              />
            </svg>
          </button>
          <button
            onClick={handleRemove}
            className="absolute top-2 right-12 text-red-500 hover:text-red-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}

export default Task;



























