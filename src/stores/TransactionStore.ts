import { create } from "zustand";
import { toast } from "sonner";
import {addTransactionsAction, getTransactionsAction, updateTransactionsAction } from "@/services/actions/transactionsActions";
import { v4 as uuidv4 } from 'uuid';

export type TransactionProps = {
    id: string,
    title: string,
    amount: number,
    category?: string | undefined,
    subcategory?: string | undefined,
    place?: string | undefined,
    date: Date,
    note?: string | undefined,
    type: string,
    isActive: boolean,
    account: string,
}

type TransactionStoreProps = {
    transactions: TransactionProps[],
    isLoading: boolean,
    error: null | string | unknown,
    fetchData: () => void,
    addTransaction: (transaction: Omit<TransactionProps, "id">) => void,
    disableTransaction: (transaction: TransactionProps) => void,
}

export const useTransactionStore = create<TransactionStoreProps>()((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    fetchData: async () => {
        set({ isLoading: true })
        try {
            const response = await getTransactionsAction();
            set({ transactions: response, isLoading: false })
        } catch (error) {
            set({ error, isLoading: false })
        }
    },
    addTransaction: async (transaction) => {
        const data = {...transaction, id: uuidv4()};
        await addTransactionsAction(data)
        try {
            set((state) => ({
                transactions: [...state.transactions, data]
            }))
            toast.success("Transação adicionada!");
        } catch (error) {
            set({ error })
        }
    },
    disableTransaction: async (transaction) => {
        const data = transaction;
        await updateTransactionsAction(data)
        try {
            set((state) => ({
                transactions: state.transactions.map((transaction) => transaction.id === data.id? {...transaction, isActive: false } : transaction)
            }))
            toast.success("Transação desativada!");
        } catch (error) {
            set({ error })
        }
    }
}))