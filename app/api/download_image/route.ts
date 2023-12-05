import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export async function POST(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { src } = req.body

    try {
        const imageResponse = await fetch(src)
        const imageBuffer = await imageResponse.buffer()

        res.setHeader('Content-Disposition', 'attachment; filename=image.jpg')
        res.setHeader('Content-Type', 'image/jpeg')
        res.send(imageBuffer)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).send('Internal Server Error')
    }
}