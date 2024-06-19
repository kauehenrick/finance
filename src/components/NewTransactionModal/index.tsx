"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogClose, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { CircleArrowUp, CircleArrowDown } from 'lucide-react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"

const formSchema = z.object({
    title: z.string().min(4, {
        message: "O título deve ter ao menos 2 caracteres",
    }),
    price: z.number(),
    category: z.string().optional()
})

export default function NewTransactionModal() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return (
        <Dialog>
            <p className='font-bold text-lg'>Nova Transação</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='text' placeholder='Descrição' {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='number' placeholder='Preço' {...field}></Input>
                                </FormControl>
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

                    <DialogFooter>
                        <DialogClose>
                            <Button variant="ghost">Cancelar</Button>
                        </DialogClose>

                        <Button type="submit">Salvar</Button>
                    </DialogFooter>

                </form>

            </Form>
        </Dialog>
    )
}