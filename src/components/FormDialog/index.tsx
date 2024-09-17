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
    DialogDescription
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useState } from 'react';

type FormDialogProps = {
    inputValue: string
    addValue?: any,
}

const formSchema = z.object({
    name: z.string({ message: "Este campo deve ser preenchido" })
})

export default function FormDialog(props: FormDialogProps) {    
    let [open, setOpen] = useState(false);

    const capitalize = props.inputValue.charAt(0).toUpperCase() + props.inputValue.slice(1);
    const lowerCase = props.inputValue.toLowerCase();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        props.addValue(values)
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                    <Plus className='hover:cursor-pointer' size={16} />
            </DialogTrigger>
            <DialogDescription className="hidden" />
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{capitalize}:</FormLabel>
                                    <FormControl>
                                        <Input
                                            id={lowerCase}
                                            placeholder={`Digite o título da ${lowerCase}`}
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