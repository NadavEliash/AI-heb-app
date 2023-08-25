'use client'
import { useState, useEffect } from "react"
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";


export default function MobileSidebar() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(()=> {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null
    
    return (
        <Sheet>
            <SheetTrigger>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0" dir="rtl">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}