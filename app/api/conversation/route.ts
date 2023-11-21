import OpenAI from 'openai'
// import { OpenAIStream, StreamingTextResponse } from 'ai'
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { ChatCompletionMessage } from 'openai/resources/chat/index.mjs'
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const instructionMessage: ChatCompletionMessage = {
    role: "assistant",
    content: "Answer in English please, even if the question is in Hebrew. please answer as short and quick as possible."
}

export async function POST(
    req: Request
) {
    try {

        const { userId } = auth()
        const body = await req.json()
        const { messages } = body

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!openai.apiKey) {
            return new NextResponse("OpenAI API key not configured", { status: 500 })
        }

        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 })
        }

        const freeTrial = await checkApiLimit()
        if (!freeTrial) {
            return new NextResponse("Free trial has expired", { status: 403 })
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages]
        })


        increaseApiLimit()
        return NextResponse.json(response.choices[0].message)
    } catch (error) {
        console.log("CONVERSATION_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}