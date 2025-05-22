import { useState, useEffect } from "react";
import TaskModal from "../components/AddTaskModal";
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
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white ">
            Task Manager
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-300 via-violet-500 to-purple-700 text-white font-semibold px-4 py-2 rounded hover:from-purple-400 hover:to-purple-800 transition-colors"
          >
            + New Task
          </button>
        </div>

        <TaskBoard />

        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Home;
