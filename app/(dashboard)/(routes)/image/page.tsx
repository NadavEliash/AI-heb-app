'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"

import { Download, ImageIcon, Send, X } from "lucide-react"
import Heading from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { amountOptions, formSchema, resolutionOptions } from "./constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/loader"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { SelectValue } from "@radix-ui/react-select"
import { Card, CardFooter } from "@/components/ui/card"
import { useProModal } from "@/store/pro-modal-store"
import { useUserMsg } from "@/store/user-msg-store"

const translateKey = process.env.GOOGLE_CLOUD_KEY

export default function Images() {
    const router = useRouter()
    const [images, setImages] = useState<{ text: string, images: string[] }[]>([{ text: '', images: [] }])
    const [displayImage, setDisplayImage] = useState<string>('')


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

    const downloadImg = async (src: string) => {
        try {
            const imgUrl = "http://localhost:3000/_next/image?url=" + src + "&w=1920&q=75"
            console.log(imgUrl)
            const response = await axios.post('/api/download_image', { imgUrl }, { responseType: 'arraybuffer' })

            const blob = new Blob([response.data], { type: 'image/jpeg' })
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'בינה_עברית.jpg'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error: ', error)
        }
    }

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
            setTimeout(() => {
                router.refresh()
            }, 1000)
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
                tips={[
                    "כדאי להוסיף תיאורים כמו \"איכות גבוהה\" \"מרהיב\" וכדומה",
                    "הוסיפו תיאור מדויק של התמונה שתרצו: \"ציור\" \"צילום מקצועי\" \"צילום סטודיו\" וכדומה",
                    "נסו להיות ספציפיים. הגדירו למחשב סגנון מדויק (למשל: ציור אימפרסיוניסטי של קלוד מונה)",
                ]}
            />
            <div className="px-4 lg:px-8 w-full max-w-4xl mt-12">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-3xl lg:rounded-full border border-gray-400 w-full p-2 lg:p-4 px-4 lg:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-7 border-0 rounded-lg p-1 sm:p-0">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="px-1 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent placeholder:text-sm"
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
                                    <FormItem className="col-span-5 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="rounded-full focus:ring-0 focus:ring-offset-0">
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
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
                                    <FormItem className="col-span-5 lg:col-span-2">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="rounded-full focus:ring-0 focus:ring-offset-0">
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
                                className="col-span-2 lg:col-span-1 w-full p-1 min-w-fit rounded-full bg-transparent hover:bg-transparent sm:bg-violet-500 sm:hover:bg-violet-500/90"
                                disabled={isLoading}>
                                <span className="hidden sm:block">צור</span>
                                <Send className="sm:hidden -rotate-90 stroke-violet-500 hover:scale-110" />
                            </Button>
                        </form>
                    </Form>
                </div>
                {displayImage && (
                    <div className="absolute top-0 left-0 w-full h-full hidden md:block">
                        <div className="fixed left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 z-30">
                            <Image
                                alt="Image"
                                width={800}
                                height={800}
                                loading="eager"
                                src={displayImage}
                                className="animate-scale rounded-lg"
                            />
                            <X className="fixed p-1 top-2 right-2 h-10 w-10 rounded-xl cursor-pointer animate-scale bg-white/30" onClick={() => setDisplayImage('')} />
                        </div>
                        <div className="fixed bg-gray-400 opacity-80 w-full h-full z-20" onClick={() => setDisplayImage('')}>
                        </div>
                    </div>
                )}
                <div className="space-y-4 mt-4">
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
                                <h2 className="lg:hidden font-light p-1">&quot;{row.text}&quot;</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-2">
                                    {row.images.map(src => (
                                        <div className="relative group" key={src}>
                                            <h2 className="hidden lg:block absolute text-sm font-semibold text-transparent bg-transparent group-hover:text-gray-600 group-hover:bg-white group-hover:bg-opacity-80 z-10 p-2 w-full">
                                                &quot;{row.text}&quot;
                                            </h2>
                                            <Card
                                                className="rounded-lg overflow-hidden">
                                                <div className="relative aspect-square" onClick={() => setDisplayImage(src)}>
                                                    <Image
                                                        alt="Image"
                                                        fill
                                                        sizes="max-width: 1024px"
                                                        src={src}
                                                        className="cursor-pointer"
                                                    />
                                                </div>
                                                {/* <CardFooter className="p-2">
                                                    <Button
                                                        onClick={() => { window.open(src) }}
                                                        variant="secondary"
                                                        className="mx-auto"
                                                    >
                                                        <Download className="h-4 w-4 ml-2" />
                                                        הורדה
                                                    </Button>
                                                </CardFooter> */}
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