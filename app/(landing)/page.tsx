'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"
import { ImageIcon, LucideIcon, MessageSquare, Music, Video } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Loader } from "@/components/loader"


const tools: { title: string, textColor: string, icon: LucideIcon, animation: string, margin: string }[] = [
  {
    title: 'צ\'אט חופשי בעברית',
    textColor: 'gray-700',
    icon: MessageSquare,
    animation: 'animate-emerge-1',
    margin: 'sm:mr-10'
  },
  {
    title: 'מחולל תמונות ממשפט בעברית',
    textColor: 'green-700',
    icon: ImageIcon,
    animation: 'animate-emerge-2',
    margin: 'sm:mr-40'
  },
  {
    title: 'מחולל קטעי וידאו קצרים',
    textColor: 'pink-700',
    icon: Video,
    animation: 'animate-emerge-3',
    margin: 'sm:mr-32'
  },
  {
    title: 'מחולל רצועות מוזיקה',
    textColor: 'orange-700',
    icon: Music,
    animation: 'animate-emerge-4',
    margin: 'sm:mr-60'
  },
]

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const correctLink: string = isSignedIn ? "/dashboard" : "/sign-up"
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
  },[])

  return (
    <div className="w-full h-full py-4 px-4 flex flex-col items-center text-center caret-transparent">
      <Image src="https://www.svgrepo.com/show/352965/ai.svg"
        alt="logo" className="absolute h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 right-4"
        width={20}
        height={20} />
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mt-10 sm:mb-10 leading-normal">ברוכים הבאים <br className="sm:hidden" /> לבינה עברית!</h2>
      <h3 className="text-2xl sm:text-3xl lg:text-4xl my-6 sm:my-10 leading-normal"> התנסו בכלי בינה מלאכותית  <br className="sm:hidden" />המתקדמים ביותר:</h3>
      <div className="flex-1 flex flex-col sm:items-start gap-10 short:gap-4">
        {tools.map(tool =>
          <div key={tool.title} className={`border-2 shadow-lg rounded-full px-6 flex flex-row justify-between items-center gap-10 py-4 short:py-2 ${tool.animation} hover:drop-shadow-md ${tool.margin}`}>
            <h2 className={`text-${tool.textColor} sm:text-xl lg:text-2xl text-right`}>
              {tool.title}
            </h2>
            <tool.icon className={`text-${tool.textColor}`} />
          </div>
        )}
      </div>
      <Link className="w-full mb-10 mt-4 sm:mb-20 p-4" href={correctLink}>
        <Button className="w-full max-w-md h-16 text-3xl rounded-full" variant={"upgrade"} onClick={()=>setIsLoading(true)}>
          התחל ליצור
        </Button>
      </Link>
      {isLoading && <div className="absolute w-full h-full left-0 top-0 bg-white/80">
        <div className="mt-[50vh] -translate-y-1/2">
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
                <div className="w-20 h-20 relative animate-spin">
                    <Image
                        src="https://www.svgrepo.com/show/332441/loading.svg"
                        alt="loading..."
                        width={1024}
                        height={1024} />
                </div>
                <div className="w-14 h-14 absolute animate-spin duration-700">
                    <Image
                        src="https://www.svgrepo.com/show/332441/loading.svg"
                        alt="loading..."
                        width={1024}
                        height={1024} />
                </div>
            </div>
        </div>
      </div>}
    </div>

  )
}