import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, fetchTasks } from "../features/tasks/taskSlice";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import ConfirmModal from "./ConfirmModal";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "Done";

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteTask(task._id)).unwrap();
      toast.success(res.message || "Task deleted successfully");
      console.log(res);
      dispatch(fetchTasks());
    } catch (err) {
      console.log("Error in handleDelete", err);
      toast.error(err || "Failed to delete task");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 shadow rounded-md border relative">
        <h3 className="font-semibold text-md">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{task.description}</p>
        {task.deadline && (
          <p className="text-xs text-gray-500">
            Deadline: {dayjs(task.deadline).format("MMM D, YYYY")}
          </p>
        )}
        {isOverdue && (
          <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
            Overdue
          </span>
        )}

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="text-sm text-white px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-sm"
          >
            Edit
          </button>

          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="text-sm text-white px-3 py-1 bg-red-600 hover:bg-red-700 rounded-sm"
          >
            Delete
          </button>
        </div>
      </div>

      {/* del confirm modal*/}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      />

      {/* edit taks modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;
