import { checkSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST() {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const subscription = await checkSubscription()

        if (!subscription) {
            const trial = {
                id: '',
                userId,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                plan: 'trial',
                periodEnd: Date.now()
            }
            return NextResponse.json(trial)
        }
        return NextResponse.json(subscription)
    } catch (error) {
        console.log("CHECK_SUBSCRIPTION_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}