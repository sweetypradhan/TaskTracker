import Header from "./Header";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { updateTaskStatus } from "../redux/taskSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { setTasks, setSearchQuery } from '../redux/taskSlice';


function Section({ status }) {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.filteredTasks);

  const [{ isOver }, drop] = useDrop({
    accept: "task",
    drop: (item) => handleDrop(item._id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const tasksToMap = tasks.filter((task) => task.status === status);

  async function updateStatus(id, status) {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}/status`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Task updated successfully:", response.data);
      } else {
        console.error("Failed to update task:", response.data);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

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

  async function handleDrop(id) {
    const newStatus = status; // Use the current section's status
    await updateStatus(id, newStatus);

    if (fetchTasks) {
      await fetchTasks(); // Call fetchTasks if it's provided
    }

    toast.success("Task moved successfully", {
      duration: 1000,
      icon: "🛒",
    });
  }

  let text = "Todo";
  let bg = "bg-gray-700";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-blue-500";
  } else if (status === "peerReview") {
    text = "Peer Review";
    bg = "bg-purple-500";
  } else if (status === "done") {
    text = "Closed";
    bg = "bg-green-500";
  }

  return (
    <div
      ref={drop}
      className={`w-full md:w-72 h-96 rounded-md p-4 shadow-lg overflow-hidden ${
        isOver ? "bg-gray-200" : "bg-white"
      } transition-all`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      <div className="mt-4 space-y-4 overflow-y-auto h-72">
        {tasksToMap.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default Section;
