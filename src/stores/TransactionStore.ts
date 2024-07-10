import { create } from "zustand";
import { toast } from "sonner";
import {addTransactionsAction, getTransactionsAction } from "@/services/actions/transactionsActions";


export interface Transaction {
    id: string;
    title: string;
    amount: number;
    category?: string;
    createdAt: string;
    type: 'deposit' | 'withdraw';
    isActive: boolean;
}

interface TransactionStoreProps {
    transactions: Transaction[],
    isLoading: boolean,
    error: null | string | unknown,
    fetchData: () => void,
    addTransaction: (transaction: Transaction) => void,
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
        await addTransactionsAction(transaction)
        try {
            set((state) => ({
                transactions: [...state.transactions, transaction]
            }))
            toast.success("Transação adicionada!");
        } catch (error) {
            set({ error })
        }
    }
}))