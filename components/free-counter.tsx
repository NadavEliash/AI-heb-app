'use client'

import { MAX_FREE_ROUNDS } from "@/constants"
import { Progress } from "./ui/progress"
import { Rubik } from "next/font/google"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useProModal } from "@/store/pro-modal-store"
import { useRouter } from "next/navigation"

const rubik = Rubik({ weight: "500", subsets: ["hebrew"] })

interface FreeCounterProps {
    user: boolean
    freeApiCount: number
    periodEnd: Date | false
}


export function FreeCounter(
    // { user = false, freeApiCount = 0, periodEnd }: FreeCounterProps
) {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const { openModal } = useProModal()

    useEffect(() => {
        setMounted(true)
    }, [])

    const timeLeft = periodEnd ? periodEnd.getTime() - Date.now() : 0

    if (!mounted) return null

    return (
        <>
            {user ?
                <div className={cn(`p-4 ${periodEnd ? "bg-purple-300" : "bg-white/70"} text-gray-700 text-center mx-4 sm:mx-8 rounded-lg`, rubik.className)}>
                    {periodEnd ?
                        <div className="mb-2">
                            <p>שימוש חופשי עד:</p>
                            <p>{periodEnd.toLocaleDateString('en-IL')}</p>
                        </div>
                        : <div>
                            <p className="text-lg mb-3">תקופת ניסיון:
                                <span className="text-base"> {MAX_FREE_ROUNDS} / {freeApiCount} </span>
                            </p>
                            <Progress value={100 * freeApiCount / MAX_FREE_ROUNDS} className="mb-8 mx-auto h-2" />
                        </div>}
                    {timeLeft < 2592000000 && <Button
                        variant={"upgrade"}
                        className="w-3/4 text-lg"
                        onClick={openModal}>
                        שדרג
                    </Button>}
                </div>
                :
                <div className="w-full text-center p-4">
                    <Button
                        variant={"destructive"}
                        className="w-3/4 text-lg mx-auto"
                        onClick={() => router.push('/sign-in')}>
                        התחבר
                    </Button>
                </div>}

        </>
    )
}