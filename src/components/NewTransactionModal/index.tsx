"use client"

import Modal from 'react-modal';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CircleArrowUp, CircleArrowDown } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTransactionStore } from '@/stores/TransactionStore';
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const formSchema = z.object({
    title: z.string({ message: "Este campo deve ser preenchido" }).min(4, {
        message: "O título deve ter ao menos 4 caracteres",
    }),
    //coerce used to fix input number value
    amount: z.coerce.number({
        required_error: "Este campo deve ser preenchido",
        invalid_type_error: "Preço deve ser um número",
    }).positive({message: "O número deve ser maior que zero"}),
    type: z.union([
        z.literal('deposit'),
        z.literal('withdraw'),
    ], { message: "Esta opção é obrigatória" }),
    category: z.string().optional(),
    place: z.string().optional(),
    date: z.date({ required_error: "Este campo deve ser preenchido" }),
    note: z.string().optional(),
})

export default function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    let store = useTransactionStore();
    
    let {addTransaction} = store

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            amount: 0,
            type: 'deposit',
            category: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {

        addTransaction({ ...values, isActive: true });

        form.reset();

        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="bg-background flex flex-col h-fit w-96 px-5 m-auto rounded-xl"
            ariaHideApp={false}
        >
            <p className='font-bold text-xl pt-5'>Nova Transação</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center min-h-100 h-fit py-4 space-y-10">

                    <div className='space-y-6'>

                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='text' placeholder='Descrição' {...field} onChange={event => field.onChange(event.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type='number' placeholder='Preço' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder='Categoria' {...field}></Input>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Textarea placeholder='Observação' {...field}></Textarea>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem className="space-y-1">
                            <FormMessage />

                            <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue="deposit"
                                className="grid max-w-fit grid-cols-2 gap-5 pt-2 m-auto"
                            >
                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:bg-green [&:has([data-state=checked])>div]:bg-opacity-60">
                                        <FormControl>
                                            <RadioGroupItem value="deposit" className="sr-only" />
                                        </FormControl>
                                        <div className="flex items-center justify-center rounded-md border-2 border-muted bg-dark-600 font-bold text-white w-32 gap-2.5 p-3">
                                            <CircleArrowUp color='green' />
                                            <p>Entrada</p>
                                        </div>
                                    </FormLabel>
                                </FormItem>

                                <FormItem>
                                    <FormLabel className="[&:has([data-state=checked])>div]:bg-red [&:has([data-state=checked])>div]:bg-opacity-60">
                                        <FormControl>
                                            <RadioGroupItem value="withdraw" className="sr-only" />
                                        </FormControl>
                                        <div className="flex items-center justify-center rounded-md border-2 border-muted bg-dark-600 font-bold text-white w-32 gap-2.5 p-3">
                                            <CircleArrowDown color='red' />
                                            <p>Saída</p>
                                        </div>
                                    </FormLabel>
                                </FormItem>
                            </RadioGroup>
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button variant="ghost" className='border' onClick={onRequestClose}>Cancelar</Button>
                    <Button type="submit" value="submit">Salvar</Button>
                </div>
            </form>
        </Form>
        </Modal >
    )
}