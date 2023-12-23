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
        const MONTH = process.env.PREMIUM_MONTH
        const QUARTER = process.env.PREMIUM_QUARTER
        const YEAR = process.env.PREMIUM_YEAR

        let timeLeft
        let plan

        if (data === MONTH) {
            timeLeft = 30 * 864 * 100000
            plan = "month"
        } else if (data === QUARTER) {
            timeLeft = 92 * 864 * 100000
            plan = "quarter"
        } else if (data === YEAR) {
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