"use client"

import { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CircleArrowUp, CircleArrowDown, Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTransactionStore } from '@/stores/TransactionStore';
import { Textarea } from "@/components/ui/textarea";
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
import { ScrollArea } from '../ui/scroll-area';
import CreditCard from '../CreditCard';
import { useCreditCardStore } from '@/stores/CreditCardStore';
import { useAuthStore } from '@/stores/AuthStore';
import type { CreditCardProps } from '@/stores/CreditCardStore';
import { MdOutlineMessage, MdRepeat } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    title: z.string({ message: "Este campo deve ser preenchido" }).min(4, {
        message: "O título deve conter ao menos 4 caracteres!",
    }),
    amount: z.coerce.number().positive({ message: "O valor deve ser maior que zero!" }),
    creditCard: z.string().optional(),
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

    const transactionStore = useTransactionStore();
    const categoryStore = useCategoryStore();
    const subcategoryStore = useSubcategoryStore();
    const accountStore = useAccountStore();
    const creditCardStore = useCreditCardStore();
    const authStore = useAuthStore();

    let { addTransaction } = transactionStore;
    let { categories, getCategories, addCategory } = categoryStore;
    let { subcategories, getSubcategories, addSubcategory } = subcategoryStore;
    let { currentAccount } = accountStore;
    let { creditCards, getCreditCards } = creditCardStore;
    let { user, getUserInfo } = authStore;

    const decryptedUser = getUserInfo(user);

    const validCreditCards: CreditCardProps[] = []

    creditCards.forEach(card => {
        if (card.userId === decryptedUser.userEmail) {
            validCreditCards.push(card);
        }
    })

    useEffect(() => {
        getCategories();
        getSubcategories();
        getCreditCards();
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

        const { image, creditCard, ...valuesWithoutImage } = values;

        const transactionData = {
            ...valuesWithoutImage,
            imageUrl: imageUrl,
            isActive: true,
            account: currentAccount,
            creditCard: creditCard !== undefined ? creditCard : ''
        };

        addTransaction(transactionData);
        form.reset();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='bg-blue text-white hover:text-black rounded-3xl min-w-16' variant="secondary">
                    <PlusCircle />
                    <p className='max-sm:hidden ml-2'>Nova Transação</p>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nova Transação</DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="h-fit py-4 space-y-10">
                        <ScrollArea className="h-[500px] w-full">
                            <div className='space-y-7 w-fit py-2 m-auto'>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descrição</FormLabel>
                                            <FormControl>
                                                <Input type='text' {...field} onChange={event => field.onChange(event.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className='flex gap-3 items-center'>
                                    <FormField
                                        control={form.control}
                                        name="amount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Valor</FormLabel>
                                                <FormControl>
                                                    <MoneyInput form={form} label='' placeholder='Preço' {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data</FormLabel>
                                                <Input
                                                    type="date"
                                                    {...field}
                                                    value={
                                                        field.value instanceof Date
                                                            ? field.value.toISOString().split('T')[0]
                                                            : field.value
                                                    }
                                                    className='w-[220px] justify-around'
                                                />
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className='flex gap-3'>
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center gap-2'>
                                                    <FormLabel>Categoria</FormLabel>
                                                    <FormDialog inputValue="categoria" addValue={addCategory} />
                                                </div>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-[220px] justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? categories.find(
                                                                        (category) => category.name === field.value
                                                                    )?.name
                                                                    : "Buscar a categoria"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[200px] p-0">
                                                        <Command>
                                                            <CommandInput placeholder="Pesquisar..." />
                                                            <CommandList>
                                                                <CommandEmpty>Nenhuma categoria encontrada.</CommandEmpty>
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
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="subcategory"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className='flex items-center gap-2'>
                                                    <FormLabel>Subcategoria</FormLabel>
                                                    <FormDialog inputValue="subcategoria" addValue={addSubcategory} />
                                                </div>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                role="combobox"
                                                                className={cn(
                                                                    "w-[220px] justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value
                                                                    ? subcategories.find(
                                                                        (subcategory) => subcategory.name === field.value
                                                                    )?.name
                                                                    : "Buscar a subcategoria"}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="min-w-[200px] p-0">
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
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="creditCard"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className='flex items-center gap-2'>
                                                <FormLabel>Cartão de crédito</FormLabel>
                                                <CreditCard />
                                            </div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            className={cn(
                                                                "min-w-[220px] justify-between",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value
                                                                ? validCreditCards.find(
                                                                    (creditCard) => creditCard.alias === field.value
                                                                )?.alias
                                                                : "Buscar cartão de crédito"}
                                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px] p-0">
                                                    <Command>
                                                        <CommandInput placeholder="Pesquisar..." />
                                                        <CommandList>
                                                            <CommandEmpty>Nenhum cartão encontrado.</CommandEmpty>
                                                            <CommandGroup>
                                                                {validCreditCards.map((creditCard) => (
                                                                    <CommandItem
                                                                        value={creditCard.alias}
                                                                        key={creditCard.id}
                                                                        onSelect={() => {
                                                                            form.setValue("creditCard", creditCard.alias)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                creditCard.name === field.value
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {creditCard.alias}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </FormItem>
                                    )}
                                />

                                <div className='flex'>
                                    <MdOutlineMessage />
                                    <MdRepeat />
                                    <GoPaperclip />
                                </div>

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
                                                    <div className="flex items-center justify-center rounded-md border-2 border-muted bg-dark-800 font-bold text-white w-32 gap-2.5 p-3">
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
                        </ScrollArea>
                        <DialogFooter className="w-full flex self-end">
                            <DialogClose asChild><Button variant="ghost" className='border'>Cancelar</Button></DialogClose>
                            <Button type="submit">Salvar</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}