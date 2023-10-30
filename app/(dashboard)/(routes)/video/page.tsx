'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"


import { Download, VideoIcon } from "lucide-react"
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
            const translation = await axios.post("/api/translate", { txt: values.prompt, target: "en" })
            const newText = values.prompt
            values.prompt = translation.data

            const response = await axios.post("/api/video", values)

            setVideo(prevVideo => [{ text: newText, video: response.data }, ...prevVideo])

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
                                                disabled={isLoading}
                                                placeholder="למשל: דג זהב באקווריום עגול וגדול"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-1 w-full"
                                disabled={isLoading}>
                                צור
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="py-20 px-40">
                            <Loader animation="animate-growing-video" />
                        </div>
                    )}

                    {video[0].video &&
                        video.map(row =>
                            row.video && <div className="w-2/3 mx-auto" key={row.video}>
                                <Card
                                    className="overflow-hidden border-0 p-4 mt-8">
                                    <h2 className="p-1 text-sm font-semibold mb-2">"{row.text}"</h2>
                                    <div className="relative">
                                        <video className="w-full aspect-video rounded-sm border bg-black" controls>
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