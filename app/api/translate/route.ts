import axios from "axios"
import { NextResponse } from "next/server"

const apiKey = process.env.GOOGLE_API_KEY

export async function POST(
    req: Request
) {
    try {
        const body = await req.json()
        const { txt, target } = body


        const translation = await axios.post(`https://translation.googleapis.com/language/translate/v2?q=${txt}&target=${target}&key=${apiKey}`)

        return NextResponse.json(translation.data.data.translations[0].translatedText)
    } catch (error) {
        console.log("TRANSLATION_ERROR")
        return new NextResponse("internal error", { status: 500 })
    }
}