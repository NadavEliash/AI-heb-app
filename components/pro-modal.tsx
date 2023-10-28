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


export default function ProModal() {
    const isOpen = useProModal((state) => state.isOpen)
    const { closeModal } = useProModal()

    return (
        <>
            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex flex-col justify-center items-center">
                            רוצים להמשיך ליהנות מבינה עברית ללא הגבלה?
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>

    )
}