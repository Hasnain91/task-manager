import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  //   console.log(tasks);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const groupTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  const columns = [
    { title: "To Do", color: "bg-red-100", status: "To Do" },
    { title: "In Progress", color: "bg-yellow-100", status: "In Progress" },
    { title: "Done", color: "bg-green-100", status: "Done" },
  ];

  if (loading) return <div className="text-center mt-4">Loading tasks...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {columns.map((col) => (
        <div
          key={col.status}
          className="rounded-lg p-3 shadow-xl shadow-violet-700 border"
        >
          <h2 className="text-lg font-semibold mb-3">{col.title}</h2>
          <div className="space-y-3">
            {groupTasksByStatus(col.status).map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
