import axios from "axios";

const API_URL = "http://localhost:3000/api/tasks";

const getAll = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Create task error:", error.response?.data || error.message);
    throw error;
  }
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
  try {
    const res = await axios.put(`${API_URL}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("update task error:", error.response?.data || error.message);
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res;
  } catch (error) {
    console.error("delete task error:", error.response?.data || error.message);
    throw error;
  }
};

const taskService = {
  getAll,
  create,
  update,
  delete: deleteTask,
};

export default taskService;
