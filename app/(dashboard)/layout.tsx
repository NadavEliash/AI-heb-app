import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import PaymentMassage from "@/components/payment-msg"
import UserMassage from "@/components/user-msg"
import ProModal from "@/components/pro-modal"
import { getFreeApiCount } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"
import { auth } from "@clerk/nextjs"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const subscription = await checkSubscription()
    const freeApiCount = await getFreeApiCount()
    const periodEnd = subscription ? subscription.periodEnd : false

    return (
        <div dir="rtl" className="h-full w-full absolute left-0">
            <UserMassage />
            <PaymentMassage />
            <ProModal />
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[10] bg-gray-900">
                <Sidebar freeApiCount={freeApiCount} periodEnd={periodEnd} />
            </div>
            <main className="md:pr-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}