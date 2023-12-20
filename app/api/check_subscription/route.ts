import { checkSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST() {
    try {
        const { userId } = auth()

        if (!userId) return false

        const subscription = await checkSubscription()

        if (!subscription) {
            return false
        }
        return NextResponse.json(subscription)
    } catch (error) {
        console.log("CHECK_SUBSCRIPTION_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}