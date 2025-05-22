import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateTask, fetchTasks } from "../features/tasks/taskSlice";
import { toast } from "react-hot-toast";

const EditTaskModal = ({ isOpen, onClose, task }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    status: "Pending",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        deadline: task.deadline ? task.deadline.slice(0, 10) : "",
        status: task.status || "Pending",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await dispatch(
        updateTask({ id: task._id, data: formData })
      ).unwrap();

      toast.success(res.message || "Task updated successfully");
      dispatch(fetchTasks());
      onClose();
    } catch (err) {
      toast.error(err || "Failed to update task");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-2 rounded"
            value={formData.description}
            onChange={handleChange}
          />
          <input
            name="deadline"
            type="date"
            className="w-full border p-2 rounded"
            value={formData.deadline}
            onChange={handleChange}
          />
          <select
            name="status"
            className="w-full border p-2 rounded"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
