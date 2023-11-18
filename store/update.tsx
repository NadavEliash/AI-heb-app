import { create } from 'zustand'

interface updateState {
    isUpdate: boolean
    onUpdate: ()=>void
    didUpdate: ()=>void
}

export const useUpdate = create<updateState>((set) => ({
  isUpdate: false,
  onUpdate: () => set({  isUpdate: true }),
  didUpdate: () => set({  isUpdate: false }),
}))