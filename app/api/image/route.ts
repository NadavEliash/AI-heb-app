import OpenAI from 'openai';
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(
    req: Request
) {
    try {
        const { userId } = auth()
        const body = await req.json()
        const { prompt, amount = "1", resolution = "512x512" } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 })
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

        const freeTrial = await checkApiLimit()
        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution
        })

        increaseApiLimit()

        return NextResponse.json(response.data)
    } catch (error) {
        console.log("IMAGE_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}