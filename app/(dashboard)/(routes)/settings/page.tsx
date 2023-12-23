'use client'

import { useEffect, useState } from "react"
import { SettingsIcon } from "lucide-react"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"
import { useProModal } from "@/store/pro-modal-store"
import axios from "axios"

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

    useEffect(() => {
        checkSubscription()
    }, [])

    const checkSubscription = async () => {
        const response = await axios.post('/api/check_subscription')

        setSubscription(response.data.plan === "trial" ? null : response.data)
    }

    const { openModal } = useProModal()

    const plan = subscription?.plan === "month" ? "חודשי" : subscription?.plan === "quarter" ? "לשלושה חודשים" : subscription?.plan === "year" ? "שנתי" : "תקופת ניסיון"
    const from = subscription ? new Date(subscription.updatedAt).toLocaleDateString('en-IL') : ''
    const to = subscription ? new Date(subscription.periodEnd).toLocaleDateString('en-IL') : ''

    return (
        <div>
            <Heading
                title="הגדרות"
                description="נהל את החשבון שלך"
                icon={SettingsIcon}
                bgColor="bg-gray-100"
            />
            <div className="flex flex-col items-start gap-4 px-10 lg:px-16 py-8">
                {subscription ?
                    <div>
                        <h2 className="text-xl">המנוי שלך הוא {plan}</h2>
                        <div className="flex justify-between w-52">
                            <h1>החל מתאריך: </h1>
                            <h1>{from}</h1>
                        </div>
                        <div className="flex justify-between w-52">
                            <h1>עד תאריך: </h1>
                            <h1>{to}</h1>
                        </div>
                    </div>
                    : <div className="py-4">
                        <h2 className="text-xl">כרגע אין בחשבונך מסלול משודרג</h2>
                    </div>
                }
                {plan !== "שנתי" && <Button
                    variant={"upgrade"}
                    className="w-60 text-lg rounded-full h-12 mt-10 flex items-start"
                    onClick={openModal}>
                    שדרג אותי
                </Button>}
            </div>
        </div>
    )
}