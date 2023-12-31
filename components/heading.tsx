import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { Accordion, AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"

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
    return (
        <>
            <div className="px-4 lg:px-8 flex items-center gap-x-2 lg:gap-x-4 caret-transparent mt-20">
                <div className={cn("p-2 w-fit rounded-md", bgColor)}>
                    <Icon className={cn("w-10 h-10", iconColor)} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold">{title}</h2>
                    <p className="text-sm font-bold">{description}</p>
                </div>
            </div>
            {tips && <div className="mt-2">
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="relative no-underline justify-start mx-6 lg:mx-10">טיפים ל<span className="ml-4">{title}</span></AccordionTrigger>
                        <AccordionContent className="absolute bg-gradient-to-b from-white/90 from-80% to-transparent pb-16 z-10 w-full md:w-[calc(100%-18rem)]">
                            {tips?.map(line =>
                                <div key={line} className="text-justify py-1 sm:py-2 mx-10">
                                    <div className="-mb-5">◾</div>
                                    <p className="inline caret-transparent mr-4">{line}</p>
                                </div>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion >
            </div>}
        </>
    )
}

