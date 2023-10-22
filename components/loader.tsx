import { cn } from "@/lib/utils"

interface LoaderProps {
    animation: string
}
export function Loader({animation}:LoaderProps) {
    return (
        <div className="w-full">
            <div className="h-full flex flex-col gap-y-4 items-center justify-center">
                <div className="w-10 h-10 relative animate-spin">
                    <img src="https://www.svgrepo.com/show/332441/loading.svg" alt="loading..." />
                </div>
                <div className="w-8 h-8 absolute animate-spin duration-700 mb-10">
                    <img src="https://www.svgrepo.com/show/361231/loading.svg" alt="loading..." />
                </div>
                <p className="text-muted-foreground">
                    סבלנות, המחשב חושב...
                </p>
            </div>
            <div className="border-green-700 border-2 rounded-xl w-9/12 h-4 mt-16 mx-auto overflow-hidden">
                <div className={cn("w-full h-full bg-green-300 rounded-r-lg", animation)}>
                </div>
            </div>
        </div>
    )
}