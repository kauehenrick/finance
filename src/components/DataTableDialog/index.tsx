"use client"
import { Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from 'react';
import { useAuthStore } from '@/stores/AuthStore';

type DataTableDialogProps = {
    inputValue: string
    addValue?: any,
}

const formSchema = z.object({
    alias: z.string({ message: "Este campo deve ser preenchido" }),
    agency: z.string().optional(),
    number: z.string().optional(),
})

export default function DataTableDialog(props: DataTableDialogProps) {
    let [open, setOpen] = useState(false);
    
    let authStore = useAuthStore();

    let { user } = authStore;

    const capitalize = props.inputValue.charAt(0).toUpperCase() + props.inputValue.slice(1);
    const lowerCase = props.inputValue.toLowerCase();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            agency: '',
            number: '',
        }
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        props.addValue({...values, email: user})
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant={"ghost"}
                    className="gap-2"
                >
                    <Plus size={16}></Plus>
                    Criar Nova
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={
                        e => {
                            e.stopPropagation();
                            form.handleSubmit(onSubmit)(e)
                        }}>

                        <DialogHeader className="font-bold mb-5">
                            <DialogTitle>Adicionar {capitalize}</DialogTitle>
                        </DialogHeader>

                        <FormField
                            control={form.control}
                            name="alias"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{capitalize}:</FormLabel>
                                    <FormControl>
                                        <Input
                                            id={lowerCase}
                                            className=""
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
                            name="agency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Agência:</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="agency"
                                            className=""
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
                                    <FormLabel>Número:</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="number"
                                            className=""
                                            {...field}
                                            onChange={event => field.onChange(event.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button className="mt-3">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}