import { create } from 'zustand';

const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem('auth-storage');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const initialState = getStoredAuth() || {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const useAuthStore = create((set) => ({
  ...initialState,

  setAuth: (user, accessToken, refreshToken) => {
    const newState = {
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    };
    localStorage.setItem('auth-storage', JSON.stringify(newState));
    set(newState);
  },

  updateUser: (user) => {
    set((state) => {
      const newState = { ...state, user };
      localStorage.setItem('auth-storage', JSON.stringify(newState));
      return newState;
    });
  },

  logout: () => {
    const newState = {
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    };
    localStorage.removeItem('auth-storage');
    set(newState);
  },
}));