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
                <DialogContent className="px-2 md:px-6 w-11/12 max-w-2xl rounded-2xl py-4">
                    <DialogHeader className="w-full">
                        <DialogTitle className="flex flex-col justify-center items-center font-thin sm:font-semibold sm:text-xl pt-4 sm:pt-6 text-center leading-5 mb-4">
                            רוצים להמשיך ליהנות מבינה עברית ללא הגבלה?
                        </DialogTitle>
                        <h3 className="hidden sm:block text-center text-xl">לגישה חופשית לכל התכנים באתר:</h3>
                        <div className="w-full sm:pt-8 flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
                            <div className="border-2 rounded-3xl sm:h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="hidden sm:block font-normal p-1 px-4 bg-pink-700 hover:bg-pink-500">
                                    טעימה
                                </Badge>
                                <h2 className="text-7xl"><span className="text-xl mr-2">₪</span>26</h2>
                                <div>לחודש אחד,<br className="hidden sm:block" />
                                    <span className="mr-2 sm:mr-0">בלבד</span>
                                </div>
                                <Button className="w-full bg-pink-700 hover:bg-pink-600 rounded-full">
                                    המשך
                                </Button>
                            </div>

                            <div className="border-2 rounded-3xl h-40 sm:h-80 sm:flex sm:flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="hidden sm:block font-normal p-1 px-4 bg-blue-500 hover:bg-blue-300">
                                    נשנוש
                                </Badge>
                                <h2 className="text-7xl"><span className="text-xl mr-2">₪</span>20</h2>
                                <div>לחודש,<br className="hidden sm:block" />
                                    <span className="mr-2 sm:mr-0">במשך 3 חודשים</span>
                                </div>
                                <Button className="w-full bg-blue-500 hover:bg-blue-400 rounded-full">
                                    המשך
                                </Button>
                            </div>

                            <div className="border-2 rounded-3xl h-40 sm:h-80 flex flex-col items-center justify-between text-lg w-full p-2 text-center">
                                <Badge className="hidden sm:block font-normal p-1 px-4 bg-green-500 hover:bg-green-300">
                                    חופשי על הבר
                                </Badge>
                                <h2 className="text-7xl"><span className="text-xl mr-2">₪</span>16</h2>
                                <div>לחודש,<br className="hidden sm:block" />
                                    <span className="mr-2 sm:mr-0">במשך שנה</span>
                                </div>
                                <Button className="w-full bg-green-500 hover:bg-green-400 rounded-full">
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