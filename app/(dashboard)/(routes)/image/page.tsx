'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import OpenAI from "openai"
import axios from "axios"

import { Download, ImageIcon } from "lucide-react"
import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { UserAvatar } from "@/components/user-avatar"
import { BotAvatar } from "@/components/bot-avatar"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

const translateKey = process.env.GOOGLE_CLOUD_KEY

export default function Images() {
    const router = useRouter()
    const [images, setImages] = useState<{ text: string, images: string[] }[]>([{ text: '', images: [] }])


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
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

            const response = await axios.post("/api/image", values)
            const urls = response.data.map((image: { url: string }) => image.url)
            const imagesNewRow = { text: newText, images: urls }

            setImages(prevImages => [imagesNewRow, ...prevImages])

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
                title="מחולל התמונות"
                description="צרו תמונות נפלאות בעזרת בינה מלאכותית"
                icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
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
                                    <FormItem className="col-span-12 lg:col-span-7">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="למשל: תמונה מצוירת של ילדה בונה ארמון חול על שפת הים"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span-6 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="">
                                                {amountOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span-6 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="">
                                                {resolutionOptions.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                <div className="space-y-4 mt-16">
                    {isLoading && (
                        <div className="py-20">
                            <Loader animation="animate-growing" />
                        </div>
                    )}
                    <div>
                        {images.map(row => (
                            row.text &&
                            <div
                                className="p-4 my-4"
                                key={row.text}>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                                    {row.images.map(src => (
                                        <div className="relative group" key={src}>
                                            <h2 className="absolute text-sm font-semibold text-transparent bg-transparent group-hover:text-gray-600 group-hover:bg-white group-hover:bg-opacity-80 z-10 p-2 w-full">
                                            &quot;{row.text}&quot;
                                            </h2>
                                            <Card
                                                className="rounded-lg overflow-hidden">
                                                <div className="relative aspect-square">
                                                    <Image
                                                        alt="Image"
                                                        fill
                                                        sizes="max-width: 1024px"
                                                        src={src}
                                                    />
                                                </div>
                                                <CardFooter className="p-2">
                                                    <Button
                                                        onClick={() => window.open(src)}
                                                        variant="secondary"
                                                        className="mx-auto"
                                                    >
                                                        <Download className="h-4 w-4 ml-2" />
                                                        הורדה
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}