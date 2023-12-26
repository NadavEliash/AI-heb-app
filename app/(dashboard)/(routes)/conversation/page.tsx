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
import { MessagesSquare, Rss, Send } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

export default function Conversation() {
    const router = useRouter()
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])
    const [enMessages, setEnMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])

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
            interface hebUserMessage {
                content: any
                role: any
            }

            const hebUserMessage: hebUserMessage = {
                content: values.prompt,
                role: "user"
            }

            setMessages((prev) => [hebUserMessage, ...prev])

            const translatedUserMessage = await axios.post("/api/translate", { txt: values.prompt, target: "en" })
            const enUserMessage = {
                content: translatedUserMessage.data,
                role: "user"
            }
            const newMessages = [...enMessages, enUserMessage]

            const response = await axios.post("/api/conversation", { messages: newMessages })

            const enResponse = response.data

            const translatedResponse = await axios.post("/api/translate", { txt: enResponse.content.replaceAll('\n', '<br>'), target: "he" })
            const hebResponse = {
                content: translatedResponse.data.replaceAll('<br>', '\n'),
                role: response.data.role
            }

            setEnMessages((prev) => [...prev, enUserMessage, enResponse])
            setMessages((prev) => [hebResponse, ...prev])

            form.reset()

        } catch (error: any) {
            if (error?.response?.status === 403) {
                openModal()
            } else {
                openMsg()
            }
        } finally {
            setTimeout(() => {
                router.refresh()
            }, 500)
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
                tips={[
                    "השאלה צריכה להיות ברורה ומדויקת, על מנת לקבל תשובה מיטבית",
                    "השאלות והתשובות מתורגמות, שימו לב שעלולות ליפול טעויות",
                    "הימנעו מכפל משמעות. נסו לכתוב כך שלדברים תהיה משמעות ברורה אחת בלבד",
                    "שימו לב: הצ'אט לא יודע לענות על שאלות אקטואליות (כאלה שקשורות לזמן או למקום הספציפי שבו אתם נמצאים)"
                ]}
            />
            <div className="px-6 lg:px-16 w-full">
                <div className="fixed bg-white w-full bottom-8 short:bottom-4 right-0">
                    <div className="md:mr-72 px-6 lg:px-16">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="rounded-lg border border-gray-700 p-2 sm:p-4 focus-within:shadow-sm grid grid-cols-12 gap-2"
                            >
                                <FormField
                                    name="prompt"
                                    render={({ field }) => (
                                        <FormItem className="col-span-10">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-sm sm:placeholder:text-base"
                                                    disabled={isLoading}
                                                    placeholder="כתבו כאן כל שאלה שתרצו, בכל תחום"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="col-span-2 p-1"
                                    disabled={isLoading}>
                                    <p className="hidden sm:block">לשאול</p>
                                    <Send className="sm:hidden -rotate-90"/>
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="space-y-4 h-[65vh] short:h-[55vh] flex flex-col justify-end">
                    <div className="flex flex-col-reverse gap-y-4 overflow-y-scroll no-scrollbar">
                        {messages.map(message =>
                            <div
                                key={message.content}
                                className={cn("w-full border rounded-lg p-4 sm:p-8 flex items-start gap-x-8 whitespace-pre-wrap", message.role === "assistant" ? "bg-violet-100" : "font-bold bg-slate-200 text-sm")}>
                                {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                                {message.content}
                            </div>
                        )}
                    </div>
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex flex-col items-center justify-center bg-violet-100">
                            <Loader animation="chat" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}