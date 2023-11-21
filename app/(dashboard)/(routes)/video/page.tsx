'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import { VideoIcon } from "lucide-react"
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
                completeGeneration()
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
            console.log(new Date())
            setLoader(true)
            const translation = await axios.post("/api/translate", { txt: values.prompt, target: "en" })
            setText(values.prompt)
            values.prompt = translation.data

            const response = await axios.post("/api/video", values)
            setPrediction(response.data)
            console.log(new Date())

        } catch (error: any) {
            if (error?.response?.status === 403) {
                openModal()
            } else {
                openMsg()
            }
        }
    }

    const completeGeneration = async () => {
        try {
            console.log(new Date())
            const response = await axios.post("/api/completed_video", { prediction })
            console.log(new Date())
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
            />
            <div className="px-4 lg:px-8 w-full md:w-11/12">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-11">
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
                                className="col-span-12 lg:col-span-1 w-full"
                                disabled={loader}>
                                צור
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