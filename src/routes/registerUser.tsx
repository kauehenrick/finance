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
import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom"
import { useUserStore } from "@/stores/UserStore"
import { useEffect } from "react"

const formSchema = z
    .object({
        username: z.string().min(1, { message: "Esse campo deve ser preenchido." }).email("Esse não é um email válido."),
        password: z.string().min(1, { message: "Esse campo deve ser preenchido." }).min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
        confirmPassword: z.string().min(1, { message: "A confirmação de senha é obrigatória." }),
    })
    .refine((data) => data.password == data.confirmPassword, {
        path: ["confirmPassword"],
        message: "As senhas não são iguais.",
    })

export default function RegisterUser() {
    const [error, setError] = useState(false);

    const userStore = useUserStore();

    let { users, getUsers, addUser } = userStore;

    useEffect(() => {
        getUsers();
    }, []);

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const createUser = () => {
            createUserWithEmailAndPassword(auth, values.username, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    addUser({
                        id: user.uid,
                        email: user.email,
                        name: user.displayName,
                    });

                    navigate("/login");
                })
                .catch((error) => {
                    setError(true);
                });
        }

        users.find(userRegistered => userRegistered.email == values.username) ? null : createUser();
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Corfirme sua senha</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Informe sua senha novamente" {...field} />
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