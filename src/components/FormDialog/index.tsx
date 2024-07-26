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
    DialogClose,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

type FormDialogProps = {
    inputValue: string
    addValue: any,
}

const formSchema = z.object({
    name: z.string({ message: "Este campo deve ser preenchido" })
})

export default function FormDialog(props: FormDialogProps) {
    const capitalize = props.inputValue.charAt(0).toUpperCase() + props.inputValue.slice(1);
    const lowerCase = props.inputValue.toLowerCase();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    function onSubmit(values: z.infer<typeof formSchema>) {
        props.addValue(values)
        form.reset();
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className="gap-2"
                >
                    <Plus size={16}></Plus>
                    Criar Nova
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                            <DialogClose asChild>
                                <Button className="mt-3">Salvar</Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}