'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"
import { ImageIcon, LucideIcon, MessageSquare, Music, Video } from "lucide-react"
import Link from "next/link"

const tools: { title: string, textColor: string, icon: LucideIcon, animation: string }[] = [
  {
    title: 'צ\'אט חופשי בעברית',
    textColor: 'gray-700',
    icon: MessageSquare,
    animation: 'animate-emerge-1'
  },
  {
    title: 'מחולל תמונות ממשפט בעברית',
    textColor: 'green-700',
    icon: ImageIcon,
    animation: 'animate-emerge-2'
  },
  {
    title: 'מחולל קטע וידאו ממשפט בעברית',
    textColor: 'pink-700',
    icon: Video,
    animation: 'animate-emerge-3'
  },
  {
    title: 'מחולל רצועת מוזיקה ממשפט בעברית',
    textColor: 'orange-700',
    icon: Music,
    animation: 'animate-emerge-4'
  },
]

export default function LandingPage() {
  const { isSignedIn } = useAuth()
  const correctLink: string = isSignedIn ? "/dashboard" : "/sign-up"

  return (
    <div className="w-full h-full py-4 px-2 flex flex-col items-center text-center caret-transparent">
      <Image src="https://www.svgrepo.com/show/352965/ai.svg"
        alt="logo" className="absolute h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 right-4"
        width={20}
        height={20} />
      <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold my-10">ברוכים הבאים <br className="sm:hidden" /> לבינה עברית!</h2>
      <h3 className="text-2xl sm:text-3xl lg:text-4xl my-6"> התנסו בכלי בינה מלאכותית המתקדמים ביותר:</h3>
      <div className="flex-1 flex flex-col items-start">
        {tools.map(tool =>
          <div key={tool.title} className={`flex flex-row justify-between items-center gap-10 py-3 sm:py-6 ${tool.animation} hover:drop-shadow-md`}>
            <tool.icon className={`text-${tool.textColor}`} />
            <h2 className={`text-${tool.textColor} text-base sm:text-2xl font-bold text-right`}>
              {tool.title}
            </h2>
          </div>
        )}
      </div>
      <Link className="w-full sm:mb-20 p-2" href={correctLink}>
        <Button className="w-full max-w-sm h-16 text-xl rounded-full" variant={"upgrade"}>
          התחל ליצור
        </Button>
      </Link>
    </div>
  )
}