'use client'

import { useUserMsg } from "@/store/user-msg-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import Image from "next/image"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"


export default function UserMassage() {
    const router = useRouter()

    const isOpen = useUserMsg((state) => state.isOpen)
    const { closeMsg } = useUserMsg()

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={closeMsg}>
                <DialogContent className="caret-transparent shadow-md border-2 w-11/12 rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl text-center mb-4">
                            אופס! משהו השתבש...
                        </DialogTitle>

                        <div className="w-2/3 mx-auto text-lg text-black text-center py-2">
                            לפעמים זה קורה בגלל שהתשובה לוקחת יותר מדי זמן..
                            <p className="mt-8">
                                נסו לרענן את הדף ולנסח מחדש 🙄

                            </p>
                        </div>
                    </DialogHeader>
                    <Button
                        onClick={() => {
                            router.refresh()
                            closeMsg()
                        }}
                        className="bg-[#95baa8] hover:bg-[#84a89a] rounded-2xl w-1/2 mx-auto text-black text-lg">
                        הבנתי
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}