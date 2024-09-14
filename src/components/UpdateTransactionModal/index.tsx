"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { CircleArrowUp, CircleArrowDown, Check, ChevronsUpDown } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useCategoryStore } from "@/stores/CategoryStore";
import { useSubcategoryStore } from '@/stores/SubcategoryStore';
import FormDialog from '../FormDialog';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import MoneyInput from '../ui/MoneyInput';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { TransactionProps } from '@/stores/TransactionStore';
import { useAccountStore } from "@/stores/AccountsStore";
import { useTransactionStore } from "@/stores/TransactionStore";
import { Pen } from "lucide-react";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
    title: z.string({ message: "Este campo deve ser preenchido" }).min(4, {
        message: "O título deve conter ao menos 4 caracteres!",
    }),
    amount: z.coerce.number().positive({ message: "O valor deve ser maior que zero!" }),
    type: z.string(),
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

export default function UpdateTransactionModal(transaction: TransactionProps) {
    let categoryStore = useCategoryStore();
    let subcategoryStore = useSubcategoryStore();
    let accountStore = useAccountStore();
    let transactionStore = useTransactionStore()

    let { categories, addCategory } = categoryStore;
    let { subcategories, addSubcategory } = subcategoryStore;
    let { currentAccount } = accountStore;
    let { updateTransaction } = transactionStore;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: transaction.title,
            amount: transaction.amount,
            category: transaction.category,
            subcategory: transaction.subcategory,
            type: transaction.type,
            place: transaction.place,
            note: transaction.note,
            date: transaction.date,
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
            id: transaction.id,
        };

        updateTransaction(transactionData);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Pen size={18} className="ml-3 hover:cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar transação</DialogTitle>
                </DialogHeader>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center h-fit py-4 space-y-10">
                        <ScrollArea className="h-[500px] w-full">
                            <div className='space-y-6 w-[400px] py-2 m-auto'>
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
                                        <FormItem className="flex flex-row gap-2 items-center border rounded-lg p-2">
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
                                        <FormItem className="flex flex-row gap-2 items-center border rounded-lg p-2">
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

                                {transaction.imageUrl !== "" ? <img src={transaction.imageUrl} alt="Preview da Imagem" className="border rounded-lg" /> : null}

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
                                    <FormItem className="space-y-1 py-5">
                                        <FormMessage />
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={transaction.type}
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
                        </ScrollArea>
                        <DialogFooter className="w-full flex self-end">
                            <DialogClose asChild><Button variant="ghost" className='border'>Cancelar</Button></DialogClose>
                            <DialogClose asChild><Button type="submit">Salvar</Button></DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
} 