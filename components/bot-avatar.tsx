import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Binary } from "lucide-react"

export const BotAvatar = () => {
    return (
        <div className="w-8 h-8 flex items-center justify-center bg-white rounded-full">
            <Avatar>
                <Binary />
            </Avatar>
        </div>
    )
}