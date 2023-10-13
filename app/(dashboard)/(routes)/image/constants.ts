import * as z from "zod"

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "דרוש משפט כלשהו כדי להתחיל"
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
})

export const amountOptions = [
    {
        value: "1",
        label: "תמונה אחת"
    },
    {
        value: "2",
        label: "שתי תמונות"
    },
    {
        value: "3",
        label: "שלוש תמונות"
    },
    {
        value: "4",
        label: "ארבע תמונות"
    }
]

export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256"
    },
    {
        value: "512x512",
        label: "512x512"
    },
    {
        value: "1024x1024",
        label: "1024x1024"
    }
]