import { UserButton, useAuth } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"
import { getFreeApiCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"


export default async function Navbar() {
    const subscription = await checkSubscription()
    const freeApiCount = await getFreeApiCount()
    const periodEnd = subscription ? subscription.periodEnd ? subscription.periodEnd : false : false

    return (
        <div className="absolute left-0 top-0 flex items-center justify-between p-4 w-full">
            <MobileSidebar freeApiCount={freeApiCount} periodEnd={periodEnd || false} />
            <div className="flex w-full justify-end">
                {/* <UserButton afterSignOutUrl="/" /> */}
            </div>
        </div>
    )
}