import { MAX_FREE_ROUNDS } from "@/constants"
import { Progress } from "./ui/progress"
import { Rubik } from "next/font/google"
import { cn } from "@/lib/utils"

const rubik = Rubik({ weight: "500", subsets: ["hebrew"]})

export function FreeCounter({freeApiCount = 0}) {
    return (
        <div className={cn("p-4 bg-white/10 text-white text-center mx-6 rounded-lg h-36", rubik.className)}>
            <h2 className="text-lg mb-4">ניצול תקופת הניסיון:</h2>
            <h3>{freeApiCount}/{MAX_FREE_ROUNDS}</h3>
            <Progress value={100 * freeApiCount/MAX_FREE_ROUNDS} className="mt-3 w-44 mx-auto h-3"/>
        </div>
    )
}