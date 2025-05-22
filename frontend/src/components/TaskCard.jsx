import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  fetchTasks,
  updateTask,
} from "../features/tasks/taskSlice";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import ConfirmModal from "./ConfirmDeleteModal";
import EditTaskModal from "./EditTaskModal";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [status, setStatus] = useState(task.status);

  const isOverdue =
    task.deadline &&
    new Date(task.deadline) < new Date() &&
    task.status !== "Done";

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteTask(task._id)).unwrap();
      toast.success(res.message || "Task deleted successfully");
      dispatch(fetchTasks());
    } catch (err) {
      toast.error(err || "Failed to delete task");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus); // update UI immediately

    const updatedTask = {
      title: task.title,
      description: task.description,
      deadline: task.deadline,
      status: newStatus,
    };

    try {
      const res = await dispatch(
        updateTask({ id: task._id, data: updatedTask })
      ).unwrap();

      toast.success(res.message || "Status updated");
      dispatch(fetchTasks());
    } catch (err) {
      toast.error(err);

      setStatus(task.status); // revert if failed
    }
  };

  return (
    <>
      <div className="bg-violet-200/90 p-4 shadow rounded-md border relative ">
        <h3 className="font-semibold text-md text-gray-900">{task.title}</h3>
        <p className="text-sm text-gray-600 mb-1">{task.description}</p>

        {task.deadline && (
          <p className="text-md text-gray-800">
            Deadline: {dayjs(task.deadline).format("MMM D, YYYY")}
          </p>
        )}

        <div className="mt-2">
          <label className="text-xs text-gray-900 font-medium">Status:</label>
          <select
            className="w-full border text-gray-900  p-1 rounded text-sm mt-1"
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option className="text-gray-900" value="To Do">
              To Do
            </option>
            <option className="text-gray-900" value="In Progress">
              In Progress
            </option>
            <option className="text-gray-900" value="Done">
              Done
            </option>
          </select>
        </div>

        {isOverdue && (
          <span className="absolute top-2 right-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">
            Overdue
          </span>
        )}

        <div className="flex gap-2 mt-3">
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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;
