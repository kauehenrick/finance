"use client"

import Modal from 'react-modal';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '../ui/button';
import { Input } from '../ui/input'
import { CircleArrowUp, CircleArrowDown } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const formSchema = z.object({
    title: z.string().min(4, {
        message: "O título deve ter ao menos 2 caracteres",
    }),
    amount: z.number(),
    type: z.string(),
    category: z.string().optional(),
})

export default function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="bg-background flex flex-col w-fit p-5 m-auto rounded-xl"
        >
            <p className='font-bold text-lg pb-3'>Nova Transação</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='text' placeholder='Descrição' {...field} />
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

                    <RadioGroup className="flex justify-center gap-5" defaultValue="deposit">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="deposit" id="deposit" />
                            <Label htmlFor="deposit">Entrada</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="withdraw" id="withdraw" />
                            <Label htmlFor="withdraw">Saída</Label>
                        </div>
                    </RadioGroup>

                    <div className='flex justify-center gap-5'>
                        <Button className='gap-2'>
                            <CircleArrowUp color='green' />
                            <p>Entrada</p>
                        </Button>

                        <Button className='gap-2'>
                            <CircleArrowDown color='red' />
                            <p>Saída</p>
                        </Button>
                    </div>

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem className="space-y-1">
                                <FormLabel>Theme</FormLabel>
                                <FormDescription>
                                    Select the theme for the dashboard.
                                </FormDescription>
                                <FormMessage />
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="grid max-w-md grid-cols-2 gap-8 pt-2"
                                >
                                    <FormItem>
                                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                            <FormControl>
                                                <RadioGroupItem value="light" className="sr-only" />
                                            </FormControl>
                                            <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                                <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                                    <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                                        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                    </div>
                                                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                    </div>
                                                    <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="block w-full p-2 text-center font-normal">
                                                Light
                                            </span>
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem>
                                        <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                                            <FormControl>
                                                <RadioGroupItem value="dark" className="sr-only" />
                                            </FormControl>
                                            <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
                                                <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                                    <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                    </div>
                                                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                    </div>
                                                    <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                                                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="block w-full p-2 text-center font-normal">
                                                Dark
                                            </span>
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end gap-4">
                        <Button variant="ghost" className='border'>Cancelar</Button>
                        <Button type="submit">Salvar</Button>
                    </div>
                </form>
            </Form>
        </Modal>
    )
}