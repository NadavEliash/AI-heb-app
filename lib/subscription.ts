import { auth } from "@clerk/nextjs"

import prismadb from "./prismadb"

export async function setSubscription(timeLeft: number, plan: string) {
    const { userId } = auth()

    if (!userId) return false

    const periodEnd = new Date(Date.now() + timeLeft)

    const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId
        }
    })

    if (!userSubscription) {
        const subscription = await prismadb.userSubscription.create({
            data: { userId, plan, periodEnd }
        })
        return subscription
    } else {
        if (userSubscription.plan !== plan
            && userSubscription.periodEnd!.getTime() < periodEnd.getTime()) {
            const subscription = await prismadb.userSubscription.update({
                where: { userId },
                data: { periodEnd, plan }
            })
            return subscription
        } else {
            return null
        }
    }
}

export async function checkSubscription() {
    const { userId } = auth()

    if (!userId) return false

    const subscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId
        }
    })

    if (subscription) {
        if (subscription.periodEnd && subscription.periodEnd.getTime() < Date.now()) {
            await prismadb.userSubscription.delete({
                where: { userId }
            })
            return false
        }
        return subscription
    } else {
        return false
    }
}