import { cn } from "@/lib/utils"
import Image from "next/image"

interface LoaderProps {
    progres?: boolean
    large?: boolean
    animation?: string
}
export function Loader({ progres, large, animation }: LoaderProps) {
    const size = large ? "w-8 h-8" : "w-5 h-5"

    return (
        <div className="w-full">
            <div className="flex gap-10 w-fit mx-auto">
                <div className={`bg-gray-500 rounded-full ${size} animate-ping delay-0`}></div>
                <div className={`bg-gray-500 rounded-full ${size} animate-ping delay-200`}></div>
                <div className={`bg-gray-500 rounded-full ${size} animate-ping delay-300`}></div>
            </div>
            {/* <div className="h-full flex flex-col gap-y-4 items-center justify-center">
                <div className={`${large ? "w-20 h-20" : "w-10 h-10"} relative animate-spin`}>
                    <Image
                        src="https://www.svgrepo.com/show/332441/loading.svg"
                        alt="loading..."
                        width={1024}
                        height={1024} />
                </div>
                <div className={`${large ? "w-14 h-14" : "w-7 h-7"} absolute animate-spin duration-700 ${progres ? "mb-10" : ""}`}>
                    <Image
                        src="https://www.svgrepo.com/show/332441/loading.svg"
                        alt="loading..."
                        width={1024}
                        height={1024} />
                </div>
            </div> */}
            {progres && <p className="text-muted-foreground text-center mt-8 text-lg">
                סבלנות, המחשב חושב...
            </p>}
            {progres && <div className="border-green-700 border-2 rounded-xl w-2/3 max-w-sm h-4 mt-4 mx-auto overflow-hidden">
                <div className={cn("w-full h-full bg-green-300 rounded-r-lg translate-x-2", animation)}>
                </div>
            </div>}
        </div>
    )
}