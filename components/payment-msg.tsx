'use client'

import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog"
import { useRouter } from "next/navigation"
import { usePaymentMsg } from "@/store/payment-msg-store"
import { Computer, Wallet } from "lucide-react"


export default function PaymentMassage() {
    const router = useRouter()
    const isOpen = usePaymentMsg((state) => state.isOpen)
    const link = usePaymentMsg((state) => state.link)
    const { closeMsg } = usePaymentMsg()

    useEffect(() => {
        setTimeout(() => { router.push(link) }, 3000)
        setTimeout(() => { closeMsg() }, 3500)
    }, [isOpen])

    return (
        <div>
            {isOpen && <div className="caret-transparent p-8 absolute bg-white z-50 rounded-3xl left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <h1 className="text-center text-5xl font-extrabold w-60 mx-auto">תודה!</h1>
                <h2 className="text-3xl font-normal text-center py-8">
                    מיד תועברו לדף התשלום
                </h2>
                <div className="flex flex-row justify-between items-center w-2/3 mx-auto">
                    <Computer />
                    <div className="text-3xl font-bold animate-emerge-4">·</div>
                    <div className="text-3xl font-bold animate-emerge-3">·</div>
                    <div className="text-3xl font-bold animate-emerge-2">·</div>
                    <div className="text-3xl font-bold animate-emerge-1">·</div>
                    <Wallet />
                </div>
                <p className="text-xl text-center py-4">
                    לאחר ביצוע התשלום תועברו ישירות לאתר
                </p>
            </div>}
            {isOpen && <div className="caret-transparent absolute bg-gray-200/70 z-40 w-full h-full" onClick={closeMsg}>
            </div>}
        </div>
    )
}