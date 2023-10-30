import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import UserMassage from "@/components/user-msg"
import { getFreeApiCount } from "@/lib/api-limit"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const freeApiCount = await getFreeApiCount()

    return (
        <div dir="rtl" className="h-full relative">
            <UserMassage />
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[10] bg-gray-900">
                <Sidebar freeApiCount={freeApiCount} />
            </div>
            <main className="md:pr-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}