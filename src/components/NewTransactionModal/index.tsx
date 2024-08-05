"use client"

import { useEffect } from 'react';
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
import { ptBR } from 'date-fns/locale';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCategoryStore } from "@/stores/CategoryStore";
import { useSubcategoryStore } from '@/stores/SubcategoryStore';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}
import FormDialog from '../FormDialog';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    title: z.string({ message: "Este campo deve ser preenchido" }).min(4, {
        message: "O título deve ter ao menos 4 caracteres",
    }),
    //coerce used to fix input number value
    amount: z.coerce.number({
        required_error: "Este campo deve ser preenchido",
        invalid_type_error: "Preço deve ser um número",
    }).positive({ message: "O valor deve ser maior que zero" }),
    type: z.union([
        z.literal('deposit'),
        z.literal('withdraw'),
    ], { message: "Esta opção é obrigatória" }),
    category: z.string(),
    subcategory: z.string(),
    place: z.string().optional(),
    date: z.date({ required_error: "Este campo deve ser preenchido" }),
    note: z.string().optional(),
    image: z.any()
    .optional(),
})

export default function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    let transactionStore = useTransactionStore();
    let categoryStore = useCategoryStore();
    let subcategoryStore = useSubcategoryStore();

    let { addTransaction } = transactionStore;
    let { categories, getCategories, addCategory } = categoryStore;
    let { subcategories, getSubcategories } = subcategoryStore;

    useEffect(() => {
        getCategories();
        getSubcategories();
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            amount: 0,
            category: '',
            subcategory: '',
            type: 'deposit',
            place: '',
            note: '',
            date: new Date(),
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
                                <FormItem className="flex flex-row gap-2 items-center">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[240px] gap-2">
                                            <SelectValue
                                                placeholder="Selecione uma categoria..."
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categorias</SelectLabel>
                                                {categories.map(category => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.name}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <FormDialog inputValue="categoria" addValue={addCategory} />

                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subcategory"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="w-[240px] gap-2">
                                            <SelectValue
                                                placeholder="Selecione uma subcategoria..."
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Subcategorias</SelectLabel>
                                                {subcategories.map(subcategory => (
                                                    <SelectItem
                                                        key={subcategory.id}
                                                        value={subcategory.name}
                                                    >
                                                        {subcategory.name}
                                                    </SelectItem>
                                                ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP", { locale: ptBR })
                                                    ) : (
                                                        <span>Informe a data</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date: Date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="place"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="text" placeholder='Local' {...field}></Input>
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

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input type="file" placeholder='Imagem' {...field} />
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