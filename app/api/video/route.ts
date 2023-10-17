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
            "lucataco/animate-diff:beecf59c4aee8d81bf04f0381033dfa10dc16e845b4ae00d281e2fa377e48a9f",
            {
                input: {
                    prompt,
                    motion_module: "mm_sd_v14"
                }
            }
        )

        return NextResponse.json(response)
    } catch (error) {
        console.log("IMAGE_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}