import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Monitor } from "lucide-react"

export const BotAvatar = () => {
    return (
        <div className="hidden w-8 h-8 sm:flex items-center justify-center rounded-full">
            <Avatar>
                <Monitor className="w-8 h-8 p-1" />
            </Avatar>
        </div>
    )
}