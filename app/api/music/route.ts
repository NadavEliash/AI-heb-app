import Replicate from "replicate"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

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
        
        const response = await replicate.run(
            "meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906",
            {
                input: {
                    prompt,
                    model_version: "melody",
                    duration: 12
                }
            }
        )

        return NextResponse.json(response)
    } catch (error) {
        console.log("IMAGE_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}