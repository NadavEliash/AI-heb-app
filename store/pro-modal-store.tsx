import { create } from 'zustand'

interface modalState {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useProModal = create<modalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))