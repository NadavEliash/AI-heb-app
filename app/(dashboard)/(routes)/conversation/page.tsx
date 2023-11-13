'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import OpenAI from "openai"
import axios from "axios"
import { cn } from "@/lib/utils"

import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { formSchema } from "./constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { MessagesSquare, Rss } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

export default function Conversation() {
    const router = useRouter()
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const { openModal } = useProModal()
    const { openMsg } = useUserMsg()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const originalUserMessage = values.prompt
            const translatedUserMessage = await axios.post("/api/translate", { txt: values.prompt, target: "en" })
            values.prompt = translatedUserMessage.data

            const userMessage: OpenAI.Chat.ChatCompletionMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]
            
            const response = await axios.post("/api/conversation", { messages: newMessages })
            
            const translatedResponse = await axios.post("/api/translate", { txt: response.data.content, target: "he" })
            response.data.content = translatedResponse.data

            userMessage.content = originalUserMessage
            setMessages((prev) => [...prev, response.data, userMessage])

            form.reset()

        } catch (error: any) {
            if (error?.response?.status === 403) {
                openModal()
            } else {
                openMsg()
            }
        } finally {
            router.refresh()
        }
    }

    return (
        <div>
            <Heading
                title="שיחה / צ'אט"
                description="צ'אט עם בינה מלאכותית (צ'אט ג'יפיטי)"
                icon={MessagesSquare}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />
            <div className="px-4 lg:px-8 w-full md:w-11/12">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border p-4 px-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent pla"
                                                disabled={isLoading}
                                                placeholder="שאלו כאן כל שאלה שרק תרצו"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}>
                                לשאול
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex flex-col items-center justify-center bg-muted">
                            <Loader animation="animate-growing" />
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map(message =>
                            <div
                                key={message.content}
                                className={cn("w-full border rounded-lg p-8 flex items-start gap-x-8", message.role === "user" ? "bg-white font-bold text-sm" : "bg-violet-500/10")}>
                                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                                {message.content}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}