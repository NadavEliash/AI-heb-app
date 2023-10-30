'use client'

import { useProModal } from "@/store/pro-modal-store"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProModal() {
    const isOpen = useProModal((state) => state.isOpen)
    const { closeModal } = useProModal()

    return (
        <>
            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent className="px-6 w-11/12 max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col justify-center items-center text-2xl pt-6 text-center">
                            רוצים להמשיך ליהנות מבינה עברית ללא הגבלה?
                        </DialogTitle>
                        <h3 className="text-center text-xl pt-4">לגישה חופשית לכל התכנים באתר:</h3>
                        <div className="w-full pt-8 flex flex-row items-center gap-2">
                            <div className="border-2 rounded-3xl h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="font-normal p-1 px-4 bg-pink-700 hover:bg-pink-500">
                                    טעימה
                                </Badge>
                                <h2 className=" text-7xl"><span className="text-xl mr-2">₪</span>20</h2>
                                 לחודש אחד<br/>בלבד
                                <Button className="w-full bg-pink-700 hover:bg-pink-600 rounded-full">
                                    המשך
                                </Button>
                            </div>

                            <div className="border-2 rounded-3xl h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="font-normal p-1 px-4 bg-blue-500 hover:bg-blue-300">
                                    נשנוש
                                </Badge>
                                <h2 className=" text-7xl"><span className="text-xl">₪</span>15</h2>
                                לחודש<br />במשך 3 חודשים
                                <Button className="w-full bg-blue-500 hover:bg-blue-400 rounded-full">
                                    המשך
                                </Button>
                            </div>

                            <div className="border-2 rounded-3xl h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="font-normal p-1 px-4 bg-green-500 hover:bg-green-300">
                                    חופשי על הבר
                                </Badge>
                                <h2 className=" text-7xl"><span className="text-xl">₪</span>10</h2>
                                לחודש<br />במשך שנה
                                <Button className="w-full bg-green-500 hover:bg-green-400  rounded-full">
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