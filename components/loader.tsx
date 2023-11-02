import { cn } from "@/lib/utils"
import Image from "next/image"

interface LoaderProps {
    animation: string
}
export function Loader({animation}:LoaderProps) {
    return (
        <div className="w-full">
            <div className="h-full flex flex-col gap-y-4 items-center justify-center">
                <div className="w-10 h-10 relative animate-spin">
                    <Image 
                    src="https://www.svgrepo.com/show/332441/loading.svg"
                    alt="loading..."
                    width={1024}
                    height={1024}/>
                </div>
                <div className="w-7 h-7 absolute animate-spin duration-700 mb-10">
                <Image 
                    src="https://www.svgrepo.com/show/332441/loading.svg"
                    alt="loading..."
                    width={1024}
                    height={1024}/>
                </div>
                <p className="text-muted-foreground">
                    סבלנות, המחשב חושב...
                </p>
            </div>
            <div className="border-green-700 border-2 rounded-xl w-9/12 h-4 mt-16 mx-auto overflow-hidden">
                <div className={cn("w-full h-full bg-green-300 rounded-r-lg translate-x-2", animation)}>
                </div>
            </div>
        </div>
    )
}