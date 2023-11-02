'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { useRouter } from "next/navigation"
import { usePaymentMsg } from "@/store/payment-msg-store"


export default function PaymentMassage() {
    const router = useRouter()

    const isOpen = usePaymentMsg((state) => state.isOpen)
    const { closeMsg } = usePaymentMsg()

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={closeMsg}>
                <DialogContent className="caret-transparent">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-normal text-center">
                            סליחה... כרגע זה לא אפשרי
                        </DialogTitle>
                        <DialogDescription className="text-lg text-center">
                        אבל אנחנו עובדים על זה
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}