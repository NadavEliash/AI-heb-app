'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"
import { Loader } from "@/components/loader"
import { Card, } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import axios from "axios"
import { MessageSquare, ImageIcon, VideoIcon, Music, ArrowLeft, Subscript } from "lucide-react"

const tools = [
    {
        label: 'התכתבו באופן חופשי ובעברית עם צ\'אט GPT',
        icon: MessageSquare,
        href: '/conversation',
        color: 'text-violet-500',
        location: 'sm:left-2 sm:bottom-2',
        hover: 'sm:group-hover:left-3/4 sm:group-hover:bottom-3/4'
    },
    {
        label: 'כתבו משפט והמחשב יהפוך אותו לתמונות מרהיבות',
        icon: ImageIcon,
        href: '/image',
        color: 'text-pink-700',
        location: 'sm:right-2 sm:bottom-2',
        hover: 'sm:group-hover:right-3/4 sm:group-hover:bottom-3/4'
    },
    {
        label: 'תארו למחשב את הוידאו שברצונכם ליצור',
        icon: VideoIcon,
        href: '/video',
        color: 'text-orange-700',
        location: 'sm:left-2 sm:top-2',
        hover: 'sm:group-hover:left-3/4 sm:group-hover:top-3/4'
    },
    {
        label: 'צרו קטע שמע ייחודי בעזרת כמה מילים',
        icon: Music,
        href: '/music',
        color: 'text-emerald-500',
        location: 'sm:right-2 sm:top-2',
        hover: 'sm:group-hover:right-3/4 sm:group-hover:top-3/4'
    },
]

export default function DashboardPage() {
    const router = useRouter()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(false)
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
            <h2 className="mt-20 font-bold text-3xl lg:text-4xl text-center">אז מה תרצו ליצור היום?</h2>
            <div className="relative mt-10 flex flex-col items-center gap-10 sm:gap-4 sm:mt-20 sm:flex-row sm:flex-wrap sm:mx-auto sm:w-[500px]">
                {tools.map(tool => (
                    <Card
                        onClick={() => {
                            setIsLoading(true)
                            router.push(tool.href)
                            setTimeout(() => setIsLoading(false), 3000)
                        }}
                        key={tool.href}
                        className={`relative p-8 rounded-full  flex flex-col justify-between cursor-pointer border-black sm:p-3 md:w-[calc(50vw-180px)] sm:max-w-[242px] sm:h-60 sm:rounded-3xl group sm:justify-center`}
                    >
                        <div className={`sm:absolute ${tool.location} ${tool.hover} transition-all duration-500 flex items-center gap-6 sm:p-4`}>
                            <tool.icon className={`w-6 h-6 ${tool.color}`} />
                        </div>
                        <h2 className={`hidden sm:block text-black sm:text-transparent sm:group-hover:text-black transition-all duration-1000 text-center text-sm sm:text-lg`}>{tool.label}</h2>
                        {/* <ArrowLeft className="w-5 h-5 mr-2" /> */}
                    </Card>
                ))}
            </div>
            {isLoading && <div className="absolute w-full h-full left-0 top-0 bg-white/70 z-20">
                <div className="mt-[50vh] -translate-y-1/2">
                    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
                        <Loader large={true} progres={false} />
                    </div>
                </div>
            </div>}
        </div>
    )
}