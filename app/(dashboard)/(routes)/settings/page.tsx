'use client'

import { useEffect, useState } from "react"
import { SettingsIcon } from "lucide-react"
import { useAuth } from "@clerk/nextjs"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/store/pro-modal-store"
import axios from "axios"
import { Loader } from "@/components/loader"
import Link from "next/link"

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

    const { isSignedIn } = useAuth()

    useEffect(() => {
        isSignedIn ? checkSubscription() : setIsLoading(false)
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
            <div className="w-full sm:px-10 lg:px-10 py-8 mt-10">
                {isLoading && <div className="sm:w-40 mt-10 pr-4">
                    <Loader animation="chat" />
                </div>}
                {subscription ?
                    !isLoading && <div className="flex flex-col gap-4 items-start px-6 sm:px-0">
                        <h2 className="text-lg sm:text-xl">המנוי שלך הוא <span className="p-2 px-4 mx-2 rounded-full bg-gradient-to-r from-orange-700 to-yellow-400 text-gray-100 font-bold tracking-wider hover:from-yellow-400 hover:to-orange-700">{plan}</span></h2>
                        <h2 className="my-4 text-lg">המנוי מאפשר לך שימוש חופשי בכל הכלים!</h2>
                        <div className="flex justify-between w-52">
                            <h1>תאריך התחלה: </h1>
                            <h1>{from}</h1>
                        </div>
                        <div className="flex justify-between w-52">
                            <h1>עד תאריך: </h1>
                            <h1>{to}</h1>
                        </div>
                    </div>
                    : isSignedIn? !isLoading && <div className="py-4">
                        <h2 className="text-xl">כרגע אין בחשבונך מסלול משודרג</h2>
                    </div>
                    : 
                    <Link href={"/sign-in"}>
                    <div className="text-xl font-bold bg-slate-200 rounded-full inline p-4">
                        צרו חשבון כדי להתחיל
                    </div>
                    </Link>
                }
                {isSignedIn && timeLeft < 2592000000 && !isLoading && <Button
                    variant={"upgrade"}
                    className="w-52 text-lg rounded-full sm:rounded-r-xl  h-12 mt-20 flex items-start mx-auto sm:mx-0"
                    onClick={openModal}>
                    אפשר יותר? יאללה
                </Button>}
            </div>
        </div>
    )
}