'use client'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useProModal } from "@/store/pro-modal-store"
import { usePaymentMsg } from "@/store/payment-msg-store"


export default function ProModal() {
    const isOpen = useProModal((state) => state.isOpen)
    const { closeModal } = useProModal()
    const { openMsg } = usePaymentMsg()

    function onPayment(link: string) {
        closeModal()
        openMsg(link)
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent className="px-2 md:px-6 w-11/12 max-w-2xl rounded-2xl py-4 caret-transparent">
                    <DialogHeader className="w-full">
                        <DialogTitle className="flex flex-col justify-center items-center font-thin sm:font-semibold sm:text-xl pt-4 sm:pt-6 text-center leading-5 mb-4">
                            רוצים להמשיך ליהנות מבינה עברית ללא הגבלה?
                        </DialogTitle>
                        <h3 className="hidden sm:block text-center text-xl">לגישה חופשית לכל התכנים באתר:</h3>
                        <div className="w-full sm:pt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                            <div className="border-2 rounded-3xl sm:h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="hidden sm:block font-normal p-1 px-4 bg-pink-700 hover:bg-pink-500">
                                    טעימה
                                </Badge>
                                <h2 className="text-6xl sm:text-7xl"><span className="text-xl mr-2">₪</span>28</h2>
                                <div>לחודש אחד<br className="hidden sm:block" />
                                    <span className="mr-2 sm:mr-0">בלבד</span>
                                </div>
                                <p className="text-sm">סה"כ 28 ₪</p>
                                <Button className="w-full bg-pink-700 hover:bg-pink-600 rounded-full" onClick={() => onPayment("https://app.upay.co.il/API6/s.php?m=Uzd1dlg4aXdMcmlxakN0YlpwUXZJZz09")}>
                                    המשך
                                </Button>
                            </div>

                            <div className="border-2 rounded-3xl h-42 sm:h-80 sm:flex sm:flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="hidden sm:block font-normal p-1 px-4 bg-blue-500 hover:bg-blue-300">
                                    נשנוש
                                </Badge>
                                <h2 className="text-6xl sm:text-7xl"><span className="text-xl mr-2">₪</span>20</h2>
                                <div>לחודש<br className="hidden sm:block" />
                                    <span className="mr-2 sm:mr-0">במשך 3 חודשים</span>
                                </div>
                                <p className="text-sm">סה"כ 60 ₪</p>
                                <Button className="w-full bg-blue-500 hover:bg-blue-400 rounded-full" onClick={() => onPayment("https://app.upay.co.il/API6/s.php?m=V0cwM1JjQ3ZuWDcydkVZclpkZG81Zz09")}>
                                    המשך
                                </Button>
                            </div>

                            <div className="border-2 rounded-3xl h-42 sm:h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="hidden sm:block font-normal p-1 px-4 bg-green-500 hover:bg-green-300">
                                    חופשי על הבר
                                </Badge>
                                <h2 className="text-6xl sm:text-7xl"><span className="text-xl mr-2">₪</span>16</h2>
                                <div>לחודש<br className="hidden sm:block" />
                                    <span className="mr-2 sm:mr-0">במשך שנה</span>
                                </div>
                                <p className="text-sm">סה"כ 192 ₪</p>
                                <Button className="w-full bg-green-500 hover:bg-green-400 rounded-full" onClick={() => onPayment("https://app.upay.co.il/API6/s.php?m=K3ZMZTRHODUzWVF4Z010SXJWdjY2Zz09")}>
                                    המשך
                                </Button>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )
}