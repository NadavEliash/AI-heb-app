'use client'

import { Card, } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import axios from "axios"
import { MessageSquare, ImageIcon, VideoIcon, Music, ArrowLeft, Subscript } from "lucide-react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const tools = [
    {
        label: 'התכתבו באופן חופשי עם צ\'אט GPT',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500'
    },
    {
        label: 'כתבו משפט והמחשב יהפוך אותו לתמונות מרהיבות',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700'
    },
    {
        label: 'תארו למחשב את הוידאו שברצונכם ליצור',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700'
    },
    {
        label: 'צרו קטע שמע ייחודי בעזרת כמה מילים',
        icon: Music,
        href: '/music',
        color: 'text-emerald-500'
    },
]

export default function DashboardPage() {
    const router = useRouter()
    const params = useParams()

    useEffect(() => {
        if (params.plan) {
            setSubscription()
            router.push('/dashboard')
        }
    }, [])

    async function setSubscription() {
        try {
            const response = await axios.post('/api/subscription', { data: params.plan[0] })
            const subscription = response.data

            if (subscription) {
                router.refresh()
            }
            
        } catch (error) {
            console.log('fail to subscribe')
        }
    }

    return (
        <div className="px-4 md:px-8 lg:px-20 caret-transparent">
            <h2 className="pr-8 mt-20 font-bold text-3xl text">גלו את עוצמת הבינה המלאכותית בעברית:</h2>
            <div className="mt-20 space-y-6 max-w-2xl">
                {tools.map(tool => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-6 border-black/10 flex items-center justify-between hover:shadow-md transiton cursor-pointer rounded-full"
                    >
                        <div className="flex items-center gap-6">
                            <tool.icon className={cn("w-6 h-6", tool.color)} />
                            <h2 className="text-sm sm:text-base font-bold">{tool.label}</h2>
                        </div>
                        <ArrowLeft className="w-5 h-5 mr-2" />
                    </Card>
                ))}
            </div>
        </div>
    )
}