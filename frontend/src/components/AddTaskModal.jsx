import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, fetchTasks } from "../features/tasks/taskSlice";
import toast from "react-hot-toast";

const TaskModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("To Do");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      return setError("Title is required");
    }
    if (title.length > 100) {
      return setError("Title must be 100 characters or less");
    }
    if (description.length > 500) {
      return setError("Description must be 500 characters or less");
    }

    // Clear error
    setError("");

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status,
    };

    if (deadline) {
      const isoDeadline = new Date(deadline).toISOString();
      taskData.deadline = isoDeadline;
    }

    try {
      const result = await dispatch(createTask(taskData)).unwrap();
      toast.success(result.message || "Task Created Successfully!");
      //close modal
      onClose();

      dispatch(fetchTasks());

      setTitle("");
      setDescription("");
      setDeadline("");
      setStatus("To Do");
    } catch (err) {
      setError(err || "Failed to create task");
      toast.error(err);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl text-gray-900 font-semibold mb-4">
          Create Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-red-600 text-sm mt-2">
              {typeof error === "string"
                ? error
                : error.message || "Something went wrong"}
            </p>
          )}

          <div>
            <label className="block text-gray-900 text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
              className="w-full p-2 text-gray-900 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              className="w-full text-gray-900 p-2 border rounded"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full text-gray-900 p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-900 text-sm font-medium">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 text-gray-900 border rounded"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
