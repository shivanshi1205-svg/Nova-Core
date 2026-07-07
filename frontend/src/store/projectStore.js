import { create } from 'zustand';

const API_URL = 'http://localhost:5000/api/projects';

const useProjectStore = create((set, get) => ({
  projects: [],
  currentProject: null,
  tasks: [],
  isLoading: false,
  error: null,

  // Fetch all projects for the user
  fetchProjects: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set({ projects: data, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create a new project
  createProject: async (projectData, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set((state) => ({ projects: [...state.projects, data], isLoading: false }));
      return data;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  // Fetch tasks for a project
  fetchTasks: async (projectId, token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set({ tasks: data, currentProject: projectId, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Create a task
  createTask: async (projectId, taskData, token) => {
    try {
      const response = await fetch(`${API_URL}/${projectId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(taskData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      set((state) => ({ tasks: [...state.tasks, data] }));
      return data;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },

  // Update a task (especially for drag and drop status updates)
  updateTask: async (projectId, taskId, updates, token) => {
    try {
      // Optimistic UI update
      set((state) => ({
        tasks: state.tasks.map(t => t._id === taskId ? { ...t, ...updates } : t)
      }));

      const response = await fetch(`${API_URL}/${projectId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
    } catch (error) {
      set({ error: error.message });
      // In a real app, we would revert the optimistic update here if the request failed
    }
  }
}));

export default useProjectStore;
