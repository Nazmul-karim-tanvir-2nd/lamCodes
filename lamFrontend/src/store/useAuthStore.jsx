import { create } from 'zustand'

const useAuthStore = create((set) => ({
    url: 'http://localhost:5173', // Update this as needed
    token: null,
    setToken: (token) => set({ token }),
}))

export default useAuthStore