import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"
import { getFreeApiCount } from "@/lib/api-limit"


export default async function Navbar() {
    const freeApiCount = await getFreeApiCount()
 
    return (
        <div className="flex items-center p-4">
            <MobileSidebar freeApiCount={freeApiCount}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}