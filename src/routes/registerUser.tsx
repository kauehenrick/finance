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
import moneyBackgroundImg from '../assets/money_3.jpg'
import { useAuthStore } from "@/stores/AuthStore"
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    username: z.string({ message: "Este campo deve ser preenchido" }).min(2, {
        message: "O título deve conter ao menos 2 caracteres",
    }),
    password: z.string({ message: "Este campo deve ser preenchido" }).min(6, {
        message: "O título deve conter ao menos 6 caracteres",
    }),
})

export default function RegisterUser() {
    const [error, setError] = useState(false);

    const { login } = useAuthStore()

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createUserWithEmailAndPassword(auth, values.username, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                navigate("/");
                login()
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            });
    }

    return (
        <div className="bg-background flex flex-row h-screen items-center justify-between">
            <div className="p-5 m-auto">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                        <p className="font-semibold text-4xl">Cadastrar Usuário</p>

                        <p className="text-lg">Insira suas credenciais para realizar o cadastro.</p>

                        {error && <span className="text-lg text-red">Email ou senha inválidos!</span>}

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Informe seu email" {...field} />
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
                                        <Input type="password" placeholder="Informe sua senha" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Cadastrar</Button>
                    </form>
                </Form>

            </div>

            <img src={moneyBackgroundImg} alt="" className="h-full w-2/4" />

        </div>
    )
}