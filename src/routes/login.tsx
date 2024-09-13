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
import { useAuthStore } from "@/stores/AuthStore"
import { useState } from "react"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UserProps, useUserStore } from "@/stores/UserStore";
import { useAccountStore } from "@/stores/AccountsStore"
import { useEffect } from "react";
import logoImg from "../assets/finance_logo.png"

type userLoginProps = {
    email: string | null,
    displayName: string | null,
}

const formSchema = z.object({
    username: z.string().min(1, { message: "Esse campo deve ser preenchido." }).email("Esse não é um email válido."),
    password: z.string().min(1, { message: "Esse campo deve ser preenchido." }).min(8, { message: "A senha deve conter pelo menos 8 caracteres" }),
})

export default function Login() {
    const [errorMessage, setErrorMessage] = useState("");

    const userStore = useUserStore();
    const accountStore = useAccountStore();

    let { users, getUsers, addUser } = userStore;
    let { setCurrentAccount } = accountStore;

    useEffect(() => {
        getUsers();
    }, []);

    const { login } = useAuthStore()

    const navigate = useNavigate();

    const registerUser = () => {
        navigate("/registerUser")
    }

    function validateSubscription(isUserRegistered: UserProps, func: Function) {
        const isUserSubscribed = isUserRegistered.userSubscription >= new Date();
        if (isUserSubscribed) {
            func()
        } else {
            setErrorMessage("Assinatura expirada.");
        }
    }

    function handleLogin(user: userLoginProps) {
        setCurrentAccount("");
        login(user.email, user.displayName);
        navigate("/");
    }

    const handleGoogleSignIn = async () => {
        const provider = await new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((userCredential) => {
            const user = userCredential.user;

            const isUserRegistered = users.find(userRegistered => userRegistered.email == user.email);

            if (isUserRegistered) {
                validateSubscription(isUserRegistered, () => handleLogin(user))
            } else {
                addUser({
                    email: user.email,
                    name: user.displayName,
                });
                onLogin();
            }
        })
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const isUserEmailValid = users.find(userRegistered => userRegistered.email == values.username)

        if (isUserEmailValid) {
            signInWithEmailAndPassword(auth, values.username, values.password)
                .then((userCredential) => {
                    const user = userCredential.user;

                    validateSubscription(isUserEmailValid, () => handleLogin(user));
                })
                .catch((error) => {
                    setErrorMessage("Email ou senha inválidos.");
                })
        } else {
            setErrorMessage("Usuário não encontrado.");
        }
    }

    return (
        <div className="bg-background flex flex-col md:flex-row h-screen items-center justify-between">
            <div className="flex flex-col p-5 m-auto">

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
                        <img src={logoImg} alt="Logo Finance" className="w-52 m-auto" />

                        <p className="font-semibold text-4xl">Bem-vindo de volta!</p>

                        <p className="text-lg">Acesse sua conta para continuar.</p>

                        {errorMessage === "" ? null : <span className="text-lg text-red">{errorMessage}</span>}

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuário</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Entre com seu usuário" {...field} />
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
                                        <Input type="password" placeholder="Digite sua senha" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between font-semibold">
                            <p>Não tem uma conta?</p>
                            <p className="hover:font-bold cursor-pointer" onClick={registerUser}>Cadastre-se</p>
                        </div>

                        <Button type="submit">Entrar</Button>
                    </form>
                </Form>

                <div className="relative my-5">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            ou faça login com
                        </span>
                    </div>
                </div>

                <Button className='flex rounded-full gap-2 w-fit self-center' onClick={handleGoogleSignIn}>
                    <FcGoogle />
                    <p>Realizar login com o Google</p>
                </Button>

            </div>

            <img src={moneyBackgroundImg} alt="" className="max-sm:hidden w-2/4 h-full" />

        </div>
    )
}