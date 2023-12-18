import { checkSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST() {
    try {
        const { userId } = auth()

        if (!userId) return null

        const subscription = await checkSubscription()
        return subscription? NextResponse.json(subscription) : new NextResponse("")
    } catch (error) {
        console.log("CHECK_SUBSCRIPTION_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}