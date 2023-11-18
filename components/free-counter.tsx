'use client'

import { MAX_FREE_ROUNDS } from "@/constants"
import { Progress } from "./ui/progress"
import { Rubik } from "next/font/google"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { useProModal } from "@/store/pro-modal-store"
import { useUpdate } from "@/store/update"

const rubik = Rubik({ weight: "500", subsets: ["hebrew"] })

interface FreeCounterProps {
    freeApiCount: number
}


export function FreeCounter({ freeApiCount = 0 }) {
    const [mounted, setMounted] = useState(false)
    const [value, setValue] = useState(0)

    const { openModal } = useProModal()
    const { isUpdate } = useUpdate()

    useEffect(() => {
        if (isUpdate) {
            setValue(value => value = freeApiCount)
            console.log('update')
        }
    }, [isUpdate])

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div className={cn("p-4 bg-white/70 text-gray-700 text-center mx-4 sm:mx-8 rounded-lg h-36", rubik.className)}>
            <p className="text-lg mb-3">תקופת ניסיון:
                <span className="text-base"> {MAX_FREE_ROUNDS} / {value} </span>
            </p>
            <Progress value={100 * freeApiCount / MAX_FREE_ROUNDS} className="mb-4 mx-auto h-2" />
            <Button
                variant={"upgrade"}
                className="w-3/4 text-lg"
                onClick={openModal}>
                שדרג
            </Button>
        </div>
    )
}