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
        const { userId } = auth()
        const body = await req.json()
        const { prompt } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        if (!replicate.auth) {
            return new NextResponse("Replicate API key not configured", { status: 500 })
        }
        if (!prompt) {
            return new NextResponse("prompt is required", { status: 400 })
        }

        const subscription = await checkSubscription()

        if (!subscription) {
                    const freeTrial = await checkApiLimit()
                    if (!freeTrial) {
                        return new NextResponse("Free trial has expired", { status: 403 })
                    }
                }
        
        // const response = await replicate.run(
        //     "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
        //     {
        //         input: {
        //             prompt,
        //             model_version: "melody",
        //             duration: 12
        //         }
        //     }
        // )

        let prediction = await replicate.predictions.create({
            version: "7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
            input: {
                prompt,
                model_version: "melody",
                duration: 12
            }
        })

        return NextResponse.json(prediction)
    } catch (error) {
        return new NextResponse("internal error", { status: 500 })
    }
}