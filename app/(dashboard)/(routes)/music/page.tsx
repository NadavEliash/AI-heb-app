'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"


import { MusicIcon, Send } from "lucide-react"
import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { formSchema } from "./constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

export default function Music() {
    const router = useRouter()
    const [music, setMusic] = useState<{ text: string, audio: string }[]>([{ text: '', audio: '' }])

    const [loader, setLoader] = useState<boolean>(false)

    const [text, setText] = useState<string>('')
    const [prediction, setPrediction] = useState(null)

    useEffect(() => {
        if (prediction !== null) {
            setTimeout(() => {
                completeMusicGeneration()
                setPrediction(null)
            }, 80 * 1000)
        }
    }, [prediction])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })


    const { openModal } = useProModal()
    const { openMsg } = useUserMsg()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoader(true)
            const translation = await axios.post("/api/translate", { txt: values.prompt, target: "en" })
            setText(values.prompt)
            values.prompt = translation.data

            const response = await axios.post("/api/music", values)
            setPrediction(response.data)

        } catch (error: any) {
            if (error?.response?.status === 403) {
                openModal()
            } else {
                openMsg()
            }
        }
    }

    const completeMusicGeneration = async () => {
        try {
            const response = await axios.post("/api/completed_music", { prediction })
            setLoader(false)
            setMusic(prevMusic => [{ text, audio: response.data }, ...prevMusic])

            form.reset()
        } catch (error: any) {
            setLoader(false)

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
                title="מחולל השמע"
                description="צרו רצועת שמע קצרה בעזרת בינה מלאכותית"
                icon={MusicIcon}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
                tips={[
                    "אפשר לייצר מעבר בין שני קטעי מוזיקה, שני סגנונות וכו. אבל זכרו שרצועת המוזיקה היא קצרה יחסית",
                    "נסו לתאר כמה שיותר את הסגנון, את כלי הנגינה, את ההתרחשות (למשל: התגברות או התפוגגות) וכדומה",
                    "נסו להיות ספציפיים. הוסיפו תיאורים והכוונה מדויקת",
                ]}
            />
            <div className="px-4 lg:px-8 w-full max-w-4xl mt-12">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-full border border-gray-400 w-full p-2 lg:p-4 px-3 lg:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-10 lg:col-span-11">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-xs sm:placeholder:text-sm"
                                                disabled={loader}
                                                placeholder="למשל: מנגינת פתיחה עוצמתית עם חצוצרות ותופים"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-2 lg:col-span-1 w-full p-1 min-w-fit rounded-full bg-transparent hover:bg-transparent sm:bg-violet-500 sm:hover:bg-violet-500/90"
                                disabled={loader}>
                                <span className="hidden sm:block">צור</span>
                                <Send className="sm:hidden -rotate-90 stroke-violet-500 hover:scale-110"/>
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {loader && (
                        <div className="py-10">
                            <Loader animation="animate-growing-music" />
                        </div>
                    )}

                    {music.map(row =>
                        row.audio && <div
                            key={row.audio}
                            className="w-full mt-8 px-2">

                            <Card
                                className="overflow-hidden bg-gray-100 mt-8">
                                <h2 className="p-2 text-sm font-semibold">&quot;{row.text}&quot;</h2>
                                <div className="relative">
                                    <audio className="w-full" controls>
                                        <source src={row.audio} placeholder="רצועת שמע" />
                                    </audio>
                                </div>
                            </Card>

                        </div>)}
                </div>
            </div>
        </div>
    )
}