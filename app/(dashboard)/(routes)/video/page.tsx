'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import { Send, VideoIcon } from "lucide-react"
import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { formSchema } from "./constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

export default function Video() {
    const router = useRouter()
    const [video, setVideo] = useState<{ text: string, video: string }[]>([{ text: '', video: '' }])
    const [loader, setLoader] = useState<boolean>(false)

    const [text, setText] = useState<string>('')
    const [prediction, setPrediction] = useState(null)

    useEffect(() => {
        if (prediction !== null) {
            setTimeout(() => {
                completeVideoGeneration()
                setPrediction(null)
            }, 90 * 1000)
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

            const response = await axios.post("/api/video", values)
            setPrediction(response.data)

        } catch (error: any) {
            if (error?.response?.status === 403) {
                openModal()
            } else {
                openMsg()
            }
        }
    }

    const completeVideoGeneration = async () => {
        try {
            const response = await axios.post("/api/completed_video", { prediction })
            setLoader(false)
            setVideo(prevVideo => [{ text, video: response.data }, ...prevVideo])

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
                title="מחולל הוידאו"
                description="צרו קטע וידאו קצר בעזרת בינה מלאכותית"
                icon={VideoIcon}
                iconColor="text-orange-700"
                bgColor="bg-orange-700/10"
                tips={[
                    "שימו לב שקטע הוידאו הוא קצר, הוא מדמה תנועה בסיסית בלבד",
                    "נסו לתאר כמה שיותר את התנועה שאמורה להתרחש בקטע הוידאו",
                    "נסו להיות ספציפיים. הוסיפו תיאורים והכוונה מדויקת",
                ]}

            />
            <div className="px-4 lg:px-8 w-full md:w-11/12 mt-4">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border border-gray-400 w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={loader}
                                                placeholder="למשל: דג זהב באקווריום עגול וגדול"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-2 w-full p-1"
                                disabled={loader}>
                                <span className="hidden sm:block">צור</span>
                                <Send className="sm:hidden -rotate-90"/>
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {loader && (
                        <div className="py-20">
                            <Loader animation="animate-growing-video" />
                        </div>
                    )}

                    {video[0].video &&
                        video.map(row =>
                            row.video && <div className="sm:w-2/3 mx-auto" key={row.video}>
                                <Card
                                    className="overflow-hidden border-0 p-4 mt-8">
                                    <h2 className="p-1 text-sm font-semibold mb-2">&quot;{row.text}&quot;</h2>
                                    <div className="relative">
                                        <video className="w-full aspect-video rounded-sm border bg-black" controls loop>
                                            <source src={row.video} />
                                        </video>
                                    </div>
                                </Card>
                            </div>)}
                </div>
            </div>
        </div>
    )
}