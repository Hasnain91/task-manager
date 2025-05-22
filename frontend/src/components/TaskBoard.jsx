import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";
import TaskCard from "./TaskCard";

const TaskBoard = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const groupTasksByStatus = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  };

  const columns = [
    { title: "To Do", status: "To Do" },
    { title: "In Progress", status: "In Progress" },
    { title: "Done", status: "Done" },
  ];

  if (loading)
    return (
      <div className="text-center mt-4 text-gray-600">Loading tasks...</div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center p-4 bg-red-50 rounded-md">
        {error}
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {columns.map((col) => (
        <div
          key={col.status}
          className="bg-white rounded-lg shadow-xl shadow-purple-700 border border-gray-200 p-3"
        >
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            {col.title}
          </h2>
          <div className="space-y-3 max-h-[70vh] overflow-y-auto">
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
