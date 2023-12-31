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
                <DialogContent className="caret-transparent shadow-md border-2">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center mb-2">
                            אופס! משהו השתבש...
                        </DialogTitle>
                        <Image
                            className="rounded-3xl mx-auto"
                            src="https://res.cloudinary.com/dnvbfkgsb/image/upload/v1698688109/slip_qtjres.jpg"
                            alt="Oops"
                            width={400}
                            height={400}
                        />
                        <DialogDescription className="w-2/3 mx-auto text-2xl font-bold text-black text-center pt-2">
                            נסו אולי לרענן את הדף? 🙄
                        </DialogDescription>
                    </DialogHeader>
                    <Button
                        onClick={() => {
                            router.refresh()
                            closeMsg()
                        }}
                        className="bg-[#95baa8] hover:bg-[#84a89a] rounded-2xl w-1/2 mx-auto text-black font-bold">
                        המשך
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}