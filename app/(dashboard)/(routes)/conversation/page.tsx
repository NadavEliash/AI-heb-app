'use client'

import { useEffect, useRef, useState } from "react"
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
import { ChevronsDown, MessagesSquare, Send } from "lucide-react"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

export default function Conversation() {
    const router = useRouter()
    const scrollRef = useRef<null | HTMLDivElement>(null)
    const ref = useRef<null | HTMLDivElement>(null)
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])
    const [enMessages, setEnMessages] = useState<OpenAI.Chat.ChatCompletionMessage[]>([])
    const [isScroll, setIsScroll] = useState(false)

    useEffect(() => {
        scrollRef.current?.addEventListener('scroll', () => setIsScroll(true))
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        },
    })

    const isLoading = form.formState.isSubmitting

    const { openModal } = useProModal()
    const { openMsg } = useUserMsg()

    const scrollMessages = () => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            setIsScroll(false)
        }, 400);
    }

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
            <div className="px-6 lg:px-24 xl:px-60 w-full">
                <div className="fixed bg-gradient-to-t from-white from-95% to-transparent w-full bottom-0 left-0 pt-3 pb-[6dvh]">
                    <div className="md:mr-72 px-6">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="rounded-full border border-gray-700 p-2 sm:p-4 pr-4 focus-within:shadow-sm grid grid-cols-12 gap-2 max-w-[600px] mx-auto"
                            >
                                <FormField
                                    name="prompt"
                                    render={({ field }) => (
                                        <FormItem className="col-span-10 lg:col-span-11">
                                            <FormControl className="m-0 p-0">
                                                <Input
                                                    className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-sm sm:placeholder:text-base overflow-auto"
                                                    disabled={isLoading}
                                                    placeholder="כתבו כאן כל שאלה שתרצו, בכל תחום"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button
                                    className="col-span-2 lg:col-span-1 p-1 min-w-fit rounded-full bg-transparent hover:bg-transparent"
                                    disabled={isLoading}>
                                    <Send className="-rotate-90 stroke-violet-500 hover:scale-110" />
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
                <div className="absolute h-4 w-full left-0 bg-gradient-to-b from-white to-transparent"></div>
                {isScroll && <div className="absolute bottom-[18dvh] left-8 lg:left-24 xl:left-64 cursor-pointer bg-black/20 opacity-50 p-2 rounded-full" onClick={scrollMessages}>
                    <ChevronsDown></ChevronsDown>
                </div>}
                <div className="flex flex-col justify-end h-[calc(85dvh-8rem)] sm:h-[calc(85dvh-8.5rem)]">
                    <div className="flex flex-col-reverse gap-y-4 overflow-y-scroll no-scrollbar" ref={scrollRef}>
                        <div className="w-full p-2 bg-transparent" ref={ref}></div>
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex flex-col items-center justify-center">
                                <Loader progres={false} />
                            </div>
                        )}
                        {messages.map(message =>
                            <div
                                key={message.content}
                                className={cn("w-full border rounded-lg p-4 sm:p-8 flex items-start gap-x-8 whitespace-pre-wrap", message.role === "assistant" ? "bg-violet-100" : "font-bold bg-slate-200 text-sm")}>
                                {message.role === "assistant" ? <BotAvatar /> : <UserAvatar />}
                                {message.content}
                            </div>
                        )}
                        <div className="w-full h-2"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}