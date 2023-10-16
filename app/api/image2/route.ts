import Replicate from "replicate"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs';

const replicate = new Replicate({
    auth: process.env.STABILITY_AI_KEY
})

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt, amount = 1, resolution = 512 } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!replicate.auth) {
            return new NextResponse("Stability AI API key not configured", { status: 500 })
        }

        if (!prompt) {
            return new NextResponse("prompt is required", { status: 400 })
        }

        if (!amount) {
            return new NextResponse("amount is required", { status: 400 })
        }

        if (!resolution) {
            return new NextResponse("resolution is required", { status: 400 })
        }
        
        const response = await replicate.run(
            "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
            {
                input: {
                    prompt,
                    width: +resolution,
                    height: +resolution,
                    num_outputs: +amount
                }
            }
        )

        return NextResponse.json(response)
    } catch (error) {
        console.log("IMAGE_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}