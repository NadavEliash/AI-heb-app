import { auth } from "@clerk/nextjs"

import prismadb from "./prismadb"
import { MAX_FREE_ROUNDS } from "@/constants"

export async function increaseApiLimit() {
    const { userId } = auth()

    if (!userId) return

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    })

    if (userApiLimit) {
        await prismadb.userApiLimit.update({
            where: { userId: userId },
            data: { count: userApiLimit.count + 1 }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: { userId, count: 1 }
        })
    }
}

export async function checkApiLimit() {
    const { userId } = auth()

    if (!userId) return false

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    })

    if (!userApiLimit || userApiLimit.count < MAX_FREE_ROUNDS) {
        return true
    } else {
        return false
    }
}

export async function getFreeApiCount() {
    const { userId } = auth()

    if (!userId) return 0

    const userApiLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId: userId
        }
    })

    if (!userApiLimit) return 0

    return userApiLimit.count
}