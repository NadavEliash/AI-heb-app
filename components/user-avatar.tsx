import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"

export const UserAvatar = () => {
    const { user } = useUser()

    return (
        <div className="w-8 h-8">
            <Avatar>
                <AvatarImage src={user?.imageUrl} className="rounded-full"/>
                <AvatarFallback className="rounded-full">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}