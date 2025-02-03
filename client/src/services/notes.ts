import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const notesService = {
  getNoteById: async (id: string) => {
    const response = await axios.get(`${API_URL}/notes/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  createNote: async (data: { title: string; content: string }) => {
    const response = await axios.post(`${API_URL}/notes`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  updateNote: async (id: string, data: { title: string; content: string }) => {
    const response = await axios.put(`${API_URL}/notes/${id}`, data, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  deleteNote: async (id: string) => {
    const response = await axios.delete(`${API_URL}/notes/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  getAllNotes: async () => {
    const response = await axios.get(`${API_URL}/notes`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

export default notesService;