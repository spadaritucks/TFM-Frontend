import {z} from 'zod'

const envSchema = z.object({
    NEXT_API_URL : z.string()
})

const _env = envSchema.safeParse(process.env)

if(_env.success === false){
    console.error("Variaveis de ambiente invalidas : ", _env.error.format())
    throw new Error("Variaveis de ambiente invalidas")
}

export const env = _env.data