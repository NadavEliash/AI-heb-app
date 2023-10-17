import * as z from "zod"

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "דרוש משפט כלשהו כדי להתחיל"
    })
})