'use client'

import { useState, useEffect } from "react"
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
    freeApiCount: number
    periodEnd?: Date | false
}

export default function MobileSidebar({ freeApiCount = 0, periodEnd }: MobileSidebarProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger>
                <div className="md:hidden">
                    <Menu />
                </div>
            </SheetTrigger>
            <SheetContent side="right" className="p-0" dir="rtl" onClick={()=>setOpen(false)}>
                <Sidebar freeApiCount={freeApiCount} periodEnd={periodEnd || false}/>
            </SheetContent>
        </Sheet>
    )
}