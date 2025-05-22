import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const create = async (taskData) => {
  try {
    console.log("making api call with data: ", taskData);
    const res = await axios.post(API_URL, taskData);
    return res;
  } catch (error) {
    console.error("Create task error:", error.response?.data || error.message);
    throw error;
  }
};

const update = async (id, data) => {
  console.log("Data in uodate service: ", id, data);
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res;
};

const taskService = {
  getAll,
  create,
  update,
  delete: deleteTask,
};

export default taskService;
