'use client'

import { cn } from "@/lib/utils"
import { Rubik } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { FreeCounter } from "./free-counter"
import { NextFont } from "next/dist/compiled/@next/font"

const rubik = Rubik({ weight: "700", subsets: ['hebrew'] }) as NextFont

interface SidebarProps {
    user?: boolean
    freeApiCount: number
    periodEnd?: Date | false
}

const routes = [
    {
        label: 'ראשי',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500'
    },
    {
        label: 'שיחה עם בינה מלאכותית',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'מחולל התמונות',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: 'מחולל הוידאו',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: 'מחולל המוזיקה',
        icon: Music,
        href: '/music',
        color: 'text-emerald-500'
    },
    {
        label: 'הגדרות',
        icon: Settings,
        href: '/settings',
    },
]

export default function Sidebar(
    { user=false, freeApiCount = 0, periodEnd }: SidebarProps
) {
    const pathname = usePathname()

    return (
        <div className="py-4 flex flex-col h-full bg-slate-900 text-white overflow-auto">
            <div className="px-3 py-2 flex-1">
                <Link href="/" className="flex items-center pr-3 mb-14">
                    <div className="relative rounded-full w-12 h-12 ml-4 bg-white">
                        <Image className="p-1" fill alt="logo" src="https://www.svgrepo.com/show/530592/creativity.svg" />
                    </div>
                    <h1 className={cn("text-3xl font-bold", rubik.className)}>בינה עברית</h1>
                </Link>
                <div className="space-y-3">
                    {routes.map((route) => (
                        <Link href={route.href} key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text:white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 ml-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mb-8">
                <FreeCounter user={user} freeApiCount={freeApiCount} periodEnd={periodEnd || false}/>
            </div>
        </div>
    )
}