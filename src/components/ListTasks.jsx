import Section from "./Section";
import { useSelector } from "react-redux";

function ListTasks() {
  const tasks = useSelector((state) => state.tasks.tasks);

  return (
    <div className="flex flex-col md:flex-row flex-wrap items-start justify-center gap-8 py-8 px-4">
      {["todo", "inprogress", "peerReview", "done"].map((status, index) => (
        <Section status={status} tasks={tasks} key={index} />
      ))}
    </div>
  );
}
export default ListTasks;