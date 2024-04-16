import { cn } from "@/lib/utils"
import { Lightbulb, LucideIcon } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

interface HeadingProps {
    title: string
    description: string
    icon: LucideIcon
    iconColor?: string
    bgColor?: string
    tips?: string[]
}

export default function Heading({
    title,
    description,
    icon: Icon,
    iconColor,
    bgColor,
    tips
}: HeadingProps) {
    const [tipsOpen, setTipsOpen] = useState(false)

    return (
        <>
            <div className="px-4 lg:px-8 flex items-center caret-transparent mt-20">
                <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                    <Icon className={cn("w-8 h-8 sm:w-10 sm:h-10", iconColor)} />
                </div>
                <div className="flex-1 sm:flex-none mr-4 sm:mr-2">
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="hidden w-72 sm:block text-sm font-bold">{description}</p>
                </div>
                {tips && <div className="sm:mr-4 bg-yellow-200 hover:bg-yellow-300 border-black/50 border-2 rounded-full p-3 cursor-pointer font-bold flex items-center" onClick={() => setTipsOpen(!tipsOpen)}>
                    <Lightbulb className="w-4 h-4 stroke-black sm:ml-2" />
                    <span className="hidden sm:flex">טיפים</span>
                </div>}
                <div>
                    <Dialog open={tipsOpen} onOpenChange={() => setTipsOpen(false)}>
                        <DialogContent className="px-2 md:px-6 w-11/12 top-80 caret-transparent rounded-2xl">
                            <DialogHeader>
                                <DialogTitle className="pt-4">
                                    <div className="flex gap-4 items-center p-2">
                                        <Icon className={cn("w-6 h-6", iconColor)} />
                                        <h1 className="text-right font-bold text-lg">טיפים ל<span>{title}</span></h1>
                                    </div>
                                    {tips?.map(line =>
                                        <div key={line} className="text-justify py-1 text-base font-normal sm:py-2 px-2 leading-relaxed flex gap-2">
                                            <div>◾</div>
                                            <p className="inline caret-transparent">{line}</p>
                                        </div>
                                    )}
                                </DialogTitle>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </>
    )
}