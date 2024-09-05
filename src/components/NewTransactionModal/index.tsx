"use client"

import { useEffect } from 'react';
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
import FormDialog from '../FormDialog';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import MoneyInput from '../ui/MoneyInput';
import { useAccountStore } from '@/stores/AccountsStore';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { useState } from 'react';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    title: z.string({ message: "Este campo deve ser preenchido" }).min(4, {
        message: "O título deve conter ao menos 4 caracteres!",
    }),
    //coerce used to fix input number value
    amount: z.coerce.number().positive({ message: "O valor deve ser maior que zero!" }),
    type: z.union([
        z.literal('deposit'),
        z.literal('withdraw'),
    ], { message: "Esta opção é obrigatória." }),
    category: z.string(),
    subcategory: z.string(),
    place: z.string().optional(),
    date: z.coerce.date({ required_error: "Este campo deve ser preenchido!", invalid_type_error: "Insira uma data válida!" }),
    note: z.string().optional(),
    image: z.any()
        .refine(
            (image) => ACCEPTED_IMAGE_TYPES.includes(image?.type),
            "Apenas formatos .jpg, .jpeg, .png and .webp são suportados."
        )
        .optional(),
})

async function uploadImage(file: File) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${uuidv4()}_${file.name}`);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
}

export default function NewTransactionModal() {
    const [open, setOpen] = useState(false)

    let transactionStore = useTransactionStore();
    let categoryStore = useCategoryStore();
    let subcategoryStore = useSubcategoryStore();
    let accountStore = useAccountStore();

    let { addTransaction } = transactionStore;
    let { categories, getCategories, addCategory } = categoryStore;
    let { subcategories, getSubcategories, addSubcategory } = subcategoryStore;
    let { currentAccount } = accountStore;

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

    async function onSubmit(values: z.infer<typeof formSchema>) {
        let imageUrl = "";

        if (values.image) {
            try {
                imageUrl = await uploadImage(values.image);
            } catch (error) {
                console.error("Erro ao fazer upload da imagem: ", error);
                return;
            }
        }

        const { image, ...valuesWithoutImage } = values;

        const transactionData = {
            ...valuesWithoutImage,
            imageUrl: imageUrl,
            isActive: true,
            account: currentAccount,
        };

        addTransaction(transactionData);
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='bg-blue text-white hover:text-black' variant="secondary">Nova Transação</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Transação</DialogTitle>
                </DialogHeader>
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
                                            <MoneyInput form={form} label='' placeholder='Preço' {...field} />
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
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[250px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? categories.find(
                                                                (category) => category.name === field.value
                                                            )?.name
                                                            : "Selecione a categoria"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Pesquisar..." />
                                                    <CommandList>
                                                        <CommandEmpty>No category found.</CommandEmpty>
                                                        <CommandGroup>
                                                            {categories.map((category) => (
                                                                <CommandItem
                                                                    value={category.name}
                                                                    key={category.id}
                                                                    onSelect={() => {
                                                                        form.setValue("category", category.name)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            category.name === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {category.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <FormDialog inputValue="categoria" addValue={addCategory} />

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="subcategory"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row gap-2 items-center">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[250px] justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? subcategories.find(
                                                                (subcategory) => subcategory.name === field.value
                                                            )?.name
                                                            : "Selecione a subcategoria"}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Pesquisar..." />
                                                    <CommandList>
                                                        <CommandEmpty>Nenhuma subcategoria encontrada.</CommandEmpty>
                                                        <CommandGroup>
                                                            {subcategories.map((subcategory) => (
                                                                <CommandItem
                                                                    value={subcategory.name}
                                                                    key={subcategory.id}
                                                                    onSelect={() => {
                                                                        form.setValue("subcategory", subcategory.name)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            subcategory.name === field.value
                                                                                ? "opacity-100"
                                                                                : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {subcategory.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <FormDialog inputValue="subcategoria" addValue={addSubcategory} />

                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <Input
                                            className="w-fit"
                                            type="date"
                                            {...field}
                                            value={
                                                field.value instanceof Date
                                                    ? field.value.toISOString().split('T')[0]
                                                    : field.value
                                            }
                                        />
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
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...fieldProps}
                                                type="file"
                                                onChange={(event) =>
                                                    onChange(event.target.files && event.target.files[0])
                                                }
                                            />
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

                        <DialogFooter>
                            <DialogClose asChild><Button variant="ghost" className='border'>Cancelar</Button></DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}