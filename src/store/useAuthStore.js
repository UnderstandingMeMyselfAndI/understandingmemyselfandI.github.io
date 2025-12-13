// src/stores/useAuthStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // 'user' will hold non-sensitive data like user ID or email
      // The authentication token/session data is typically managed by the BaaS SDK
      user: null, 
      isAuthenticated: false,
      isLoading: true, // Useful for checking initial auth state on app load
      
      // Actions
      setUser: (userData) => set({ 
        user: userData, 
        isAuthenticated: !!userData, // true if userData is not null
        isLoading: false
      }),
      setLoading: (loading) => set({ isLoading: loading }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false 
      }),
    }),
    {
      name: 'auth-storage', // key in local storage
      storage: createJSONStorage(() => localStorage), // use local storage
      // Only persist the user and isAuthenticated state
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStore;