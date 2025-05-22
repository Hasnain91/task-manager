import { useState, useEffect } from "react";
import TaskModal from "../components/TaskModal";
import TaskBoard from "../components/TaskBoard";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Task
          </button>
        </div>

        {/* Future: TaskBoard will go here */}
        <TaskBoard />

        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Home;
