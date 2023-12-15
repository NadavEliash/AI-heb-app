import { setSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { data } = body

        let timeLeft
        let plan

        if (data === "month") {
            timeLeft = 30 * 864 * 100000
            plan = "month"
        } else if (data === "quarter") {
            timeLeft = 120 * 864 * 100000
            plan = "quarter"
        } else if (data === "year") {
            timeLeft = 365 * 864 * 100000
            plan = "year"
        } else {
            return new NextResponse(null)
        }

        const subscription = await setSubscription(timeLeft, plan)
        return new NextResponse(subscription ? JSON.stringify(subscription) : null)
    } catch (error) {
        console.log("SET_SUBSCRIPTION_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}