import Replicate from "replicate"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit"

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

        const freeTrial = await checkApiLimit()
        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        // const response = await replicate.run(
        //     "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
        //     {
        //         input: {
        //             prompt,
        //             motion_module: "mm_sd_v14"
        //         }
        //     }
        // )

        let prediction = await replicate.predictions.create({
            version: "beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
            input: {
                prompt,
                motion_module: "mm_sd_v14"
            }
        })

        prediction = await replicate.wait(prediction, {})
        
        increaseApiLimit()

        return NextResponse.json(prediction)

    } catch (error) {
        console.log("VIDEO_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}