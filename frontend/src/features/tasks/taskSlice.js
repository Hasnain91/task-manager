import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "./taskService";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  filterStatus: "All",
  searchQuery: "",
};

// Thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await taskService.getAll();
      // console.log("response for fetchTasks in taskSlice is: ", res.data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
      const res = await taskService.create(taskData);
      console.log("Response for create task: ", res);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async ({ id, data }, thunkAPI) => {
    try {
      console.log("data in updateTask Slice: ", id, data);
      const res = await taskService.update(id, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id, thunkAPI) => {
    try {
      const res = await taskService.delete(id);
      console.log("response in delete task thunk: ", res);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

// Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export const { setFilterStatus, setSearchQuery } = taskSlice.actions;
export default taskSlice.reducer;
