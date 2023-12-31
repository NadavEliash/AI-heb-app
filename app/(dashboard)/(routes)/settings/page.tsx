'use client'

import { useEffect, useState } from "react"
import { SettingsIcon } from "lucide-react"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/store/pro-modal-store"
import axios from "axios"
import { Loader } from "@/components/loader"

interface userSubscription {
    id: string
    userId: string
    createdAt: Date
    updatedAt: Date
    plan: string
    periodEnd: Date
}

export default function Settings() {
    const [subscription, setSubscription] = useState<userSubscription | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        checkSubscription()
    }, [])

    const checkSubscription = async () => {
        const response = await axios.post('/api/check_subscription')

        setSubscription(response.data.plan === "trial" ? null : response.data)
        setIsLoading(false)
    }

    const { openModal } = useProModal()

    const plan = subscription?.plan === "month" ? "חודשי" : subscription?.plan === "quarter" ? "לשלושה חודשים" : subscription?.plan === "year" ? "שנתי" : "תקופת ניסיון"
    const from = subscription ? new Date(subscription.updatedAt).toLocaleDateString('en-IL') : ''
    const to = subscription ? new Date(subscription.periodEnd).toLocaleDateString('en-IL') : ''
    const timeLeft = subscription?.periodEnd ? new Date(subscription.periodEnd).getTime() - Date.now() : 0

    return (
        <div>
            <Heading
                title="הגדרות"
                description="נהל את החשבון שלך"
                icon={SettingsIcon}
                bgColor="bg-gray-100"
            />
            <div className="w-full sm:px-10 lg:px-16 py-8">
                {isLoading && <div className="sm:w-40 mt-10">
                    <Loader animation="chat"/>
                </div>}
                {subscription ?
                    !isLoading && <div className="flex flex-col gap-4 items-center sm:items-start">
                        <h2 className="text-lg sm:text-xl">המנוי שלך הוא <span className="p-2 px-4 mx-2 rounded-full bg-gradient-to-r from-orange-700 to-yellow-400 text-gray-100 font-bold tracking-wider hover:from-yellow-400 hover:to-orange-700">{plan}</span></h2>
                        <h2 className="my-4 text-center">והוא מאפשר לך שימוש חופשי בכל הכלים</h2>
                        <div className="flex justify-between w-48">
                            <h1>תאריך התחלה: </h1>
                            <h1>{from}</h1>
                        </div>
                        <div className="flex justify-between w-48">
                            <h1>עד תאריך: </h1>
                            <h1>{to}</h1>
                        </div>
                    </div>
                    : !isLoading && <div className="py-4">
                        <h2 className="text-xl">כרגע אין בחשבונך מסלול משודרג</h2>
                    </div>
                }
                {timeLeft < 2592000000 && !isLoading && <Button
                    variant={"upgrade"}
                    className="w-60 text-lg rounded-full h-12 mt-20 flex items-start mx-auto sm:mx-0"
                    onClick={openModal}>
                    אפשר יותר? יאללה
                </Button>}
            </div>
        </div>
    )
}