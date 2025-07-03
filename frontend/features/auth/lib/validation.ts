import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен быть минимум 6 символов')
})

export const registerSchema = z.object({
    email: z.string().email('Некорректный email'),
    password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
    confirmPassword: z.string().min(6, 'Подтвердите пароль')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
})

export type LoginFormData = z.output<typeof loginSchema>
export type RegisterFormData = z.output<typeof registerSchema>
