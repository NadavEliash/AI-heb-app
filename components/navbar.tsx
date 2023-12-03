import { UserButton } from "@clerk/nextjs"
import MobileSidebar from "./mobile-sidebar"
import { getFreeApiCount } from "@/lib/api-limit"


export default async function Navbar() {
    const freeApiCount = await getFreeApiCount()
 
    return (
        <div className="absolute left-0 top-0 flex items-center justify-between p-4 w-full">
            <MobileSidebar freeApiCount={freeApiCount}/>
            <div className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    )
}