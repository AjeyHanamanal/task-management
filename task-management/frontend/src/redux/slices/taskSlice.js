import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          'x-auth-token': token
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Failed to fetch tasks'
      );
    }
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: {
          'x-auth-token': token
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Failed to add task'
      );
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
        headers: {
          'x-auth-token': token
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Failed to update task'
      );
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user?.token;
      const response = await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: {
          'x-auth-token': token
        }
      });
      return response.data.id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.response?.data?.msg ||
        'Failed to delete task'
      );
    }
  }
);

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTasks: (state) => {
      state.tasks = [];
      state.status = 'idle';
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Add task
      .addCase(addTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tasks.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Delete task
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { clearTasks, clearError } = taskSlice.actions;
export default taskSlice.reducer; 