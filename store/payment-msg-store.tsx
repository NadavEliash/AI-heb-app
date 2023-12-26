import { create } from 'zustand'

interface msgState {
    isOpen: boolean
    openMsg: (link:string)=>void
    closeMsg: ()=>void
    link: string
}

export const usePaymentMsg = create<msgState>((set) => ({
  isOpen: false,
  openMsg: (link:string) => set({  isOpen: true, link }),
  closeMsg: () => set({  isOpen: false }),
  link:''
}))