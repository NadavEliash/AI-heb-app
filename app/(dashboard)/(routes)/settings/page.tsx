'use client'

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/store/pro-modal-store"
import { SettingsIcon } from "lucide-react"

export default function Settings() {
    const { openModal } = useProModal()


    return (
        <div>
            <Heading
                title="הגדרות"
                description="נהל את החשבון שלך"
                icon={SettingsIcon}
                bgColor="bg-gray-100"
            />
            <div className="flex items-center">
                <h2 className="px-4 lg:px-8 py-4 text-xl">כרגע אין בחשבונך מסלול משודרג</h2>
                <Button
                    variant={"upgrade"}
                    className="w-40 text-lg rounded-full h-12 mx-4 lg:mx-8"
                    onClick={openModal}>
                    שדרג
                </Button>
            </div>
        </div>
    )
}