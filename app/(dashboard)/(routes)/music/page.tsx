'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"


import { MusicIcon } from "lucide-react"
import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { formSchema } from "./constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Card, CardFooter } from "@/components/ui/card"

export default function Music() {
    const router = useRouter()
    const [music, setMusic] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined)

            const translation = await axios.post("/api/translate", { txt: values.prompt, target: "en" })
            values.prompt = translation.data

            const response = await axios.post("/api/music", values)

            setMusic(response.data)

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
                title="מחולל המוזיקה"
                description="צרו רצועת שמע קצרה בעזרת בינה מלאכותית"
                icon={MusicIcon}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
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
                                                placeholder="למשל: מנגינה קצבית המובילה לנעימה שקטה ורגועה"
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
                    {!music && isLoading && (
                        <div className="p-40">
                            <Loader />
                        </div>
                    )}

                    {music && <div className="w-2/3 mt-8 mx-auto">
                        <Card
                            key={music}
                            className="overflow-hidden bg-gray-100">
                            <div className="relative">
                                <audio className="w-full" controls>
                                    <source src={music} />
                                </audio>
                            </div>
                        </Card>
                    </div>}
                </div>
            </div>
        </div>
    )
}