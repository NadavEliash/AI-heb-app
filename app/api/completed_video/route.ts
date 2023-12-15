import Replicate from "replicate"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
})

export async function POST(
    req: Request
) {
    try {
        const body = await req.json()
        let { prediction } = body

        prediction = await replicate.wait(prediction, {})

        const subscription = await checkSubscription()

        if (!subscription) {
            increaseApiLimit()
        }

        return NextResponse.json(prediction.output)

    } catch (error) {
        console.log("COMPLETED_VIDEO_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}