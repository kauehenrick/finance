"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import moneyBackgroundImg from '../assets/money.jpg'
import { GoogleLogin } from '@react-oauth/google';

const formSchema = z.object({
    username: z.string({ message: "Este campo deve ser preenchido" }),
    password: z.string({ message: "Este campo deve ser preenchido" }),
})

export default function Login() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="bg-background flex flex-row h-screen items-center justify-between">
            <div className="p-5 m-auto">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <p className="font-semibold text-4xl">Bem-vindo de volta!</p>

                        <p className="text-lg">Acesse sua conta para continuar.</p>

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Entre com seu usuário" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Digite sua senha" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Entrar</Button>

                    </form>
                </Form>



            </div>

            <img src={moneyBackgroundImg} alt="" className="h-full w-2/4" />

        </div>
    )
}