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
import { MessagesSquare } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"

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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: OpenAI.Chat.ChatCompletionMessage = {
                role: "user",
                content: values.prompt
            }
            const newMessages = [...messages, userMessage]

            const response = await axios.post("/api/conversation", { messages: newMessages })

            setMessages((prev) => [...prev, userMessage, response.data])

            form.reset()

        } catch (error: any) {
            console.log(error)
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
                            className="rounded-lg border p-4 px-8 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
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
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}

                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map(message =>
                            <div
                                key={message.content}
                                className={cn("w-full border rounded-lg p-8 flex items-start gap-x-8", message.role === "user" ? "bg-white font-bold" : "bg-muted")}>
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