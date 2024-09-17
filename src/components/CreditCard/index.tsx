import { useState, ChangeEvent, FocusEvent } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from '../ui/input';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';
import { useCreditCardStore } from '@/stores/CreditCardStore';
import { useAuthStore } from '@/stores/AuthStore';

type FocusedField = 'number' | 'expiry' | 'cvc' | 'name' | '';

interface PaymentFormState {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
    focus: FocusedField;
}

const formSchema = z.object({
    alias: z.string().min(1, { message: "Este campo deve ser preenchido" }),
    number: z.coerce.number({ invalid_type_error: "Esse campo aceita apenas números" }).min(13, { message: "O número do cartão deve conter no mínimo 13 caracteres" }),
    expiry: z.string().min(1, { message: "Este campo deve ser preenchido" }).max(4, { message: "Data inválida" }),
    cvc: z.coerce.number({ invalid_type_error: "Esse campo aceita apenas números" }).min(3, { message: "O CVC possuí 3 digitos" }),
    name: z.string().min(1, { message: "Este campo deve ser preenchido" }),
})

export default function CreditCard() {
    let [open, setOpen] = useState(false);
    const [state, setState] = useState<PaymentFormState>({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
    });

    const creditCardStore = useCreditCardStore();
    let authStore = useAuthStore();

    let { user, getUserInfo } = authStore;
    const { addCreditCard } = creditCardStore;

    const decryptedUser = getUserInfo(user)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            alias: '',
            number: undefined,
            expiry: '',
            cvc: undefined,
            name: '',
        }
    });

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;

        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, focus: evt.target.name as FocusedField }));
    }

    function onSubmit(values: z.infer<typeof formSchema>) {
        addCreditCard({ ...values, userId: decryptedUser.userEmail })
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Plus size={16} className='hover:cursor-pointer'/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Cadastrar cartão de crédito</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col items-center gap-5 mt-3'>
                    <Cards
                        number={state.number}
                        expiry={state.expiry}
                        cvc={state.cvc}
                        name={state.name}
                        focused={state.focus}
                    />
                    <Form {...form}>
                        <form onSubmit={
                            e => {
                                e.stopPropagation();
                                form.handleSubmit(onSubmit)(e)
                            }}>

                            <FormField
                                control={form.control}
                                name="alias"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Apelido do cartão"
                                                {...field}
                                                onChange={event => field.onChange(event.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                name={field.name}
                                                placeholder="Número do cartão"
                                                value={state.number}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    handleInputChange(event);
                                                }}
                                                onFocus={handleInputFocus}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel></FormLabel>
                                        <FormControl>
                                            <Input
                                                type="name"
                                                name={field.name}
                                                placeholder="Nome"
                                                value={state.name}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    handleInputChange(event);
                                                }}
                                                onFocus={handleInputFocus}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className='flex gap-3'>
                                <FormField
                                    control={form.control}
                                    name="expiry"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="expiry"
                                                    name={field.name}
                                                    placeholder="Data expiração (MM/AA)"
                                                    value={state.expiry}
                                                    onChange={(event) => {
                                                        field.onChange(event);
                                                        handleInputChange(event);
                                                    }}
                                                    onFocus={handleInputFocus}

                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cvc"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel></FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="cvc"
                                                    name={field.name}
                                                    placeholder="CVC"
                                                    value={state.cvc}
                                                    onChange={(event) => {
                                                        field.onChange(event);
                                                        handleInputChange(event);
                                                    }}
                                                    onFocus={handleInputFocus}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter className='mt-5'>
                                <DialogClose asChild><Button variant="ghost" className='border'>Cancelar</Button></DialogClose>
                                <Button type="submit">Salvar</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

