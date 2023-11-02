import { create } from 'zustand'

interface msgState {
    isOpen: boolean
    openMsg: ()=>void
    closeMsg: ()=>void
}

export const usePaymentMsg = create<msgState>((set) => ({
  isOpen: false,
  openMsg: () => set({  isOpen: true }),
  closeMsg: () => set({  isOpen: false }),
}))