// import { useState, useEffect } from "react";
// import TaskModal from "../components/AddTaskModal";
// import TaskBoard from "../components/TaskBoard";
// import { useDispatch } from "react-redux";
// import { fetchTasks } from "../features/tasks/taskSlice";

// const Home = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen p-4 sm:p-6 md:p-8">
//       <div className="max-w-5xl mx-auto w-full">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <h1 className="text-2xl sm:text-3xl font-bold text-white ">
//             Task Manager
//           </h1>

//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="w-full sm:w-auto bg-gradient-to-r from-purple-300 via-violet-500 to-purple-700 text-white font-semibold px-4 py-2 rounded hover:from-purple-400 hover:to-purple-800 transition-colors"
//           >
//             + New Task
//           </button>
//         </div>

//         <TaskBoard />

//         <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useState, useEffect } from "react";
import TaskModal from "../components/AddTaskModal";
import TaskBoard from "../components/TaskBoard";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../features/tasks/taskSlice";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // You can filter tasks inside TaskBoard or pass the searchQuery down as prop
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Navigation Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-4 sm:gap-10 mb-6">
          {/* Title */}
          <h1
            className="text-2xl 
           sm:text-3xl font-bold text-white whitespace-nowrap"
          >
            Task Manager
          </h1>

          {/* Search Bar */}

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="w-1/2  px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          {/* New Task Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-300 via-violet-500 to-purple-700 text-white font-semibold px-4 py-2 rounded hover:from-purple-400 hover:to-purple-800 transition-colors"
          >
            + New Task
          </button>
        </div>

        {/* Task Board */}
        <TaskBoard searchQuery={searchQuery} />

        {/* Add Task Modal */}
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};

export default Home;
