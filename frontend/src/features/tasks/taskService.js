import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

const getAll = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const create = async (taskData) => {
  const res = await axios.post(API_URL, taskData);
  return res.data;
};

const update = async (id, data) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

const taskService = {
  getAll,
  create,
  update,
  delete: deleteTask,
};

export default taskService;
