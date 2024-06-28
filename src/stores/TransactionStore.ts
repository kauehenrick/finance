import axios from 'axios';
import { create } from "zustand";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
    isActive: boolean;
}

interface TransactionStoreProps {
    transactions: Transaction[],
    isLoading: boolean,
    error: null | string | unknown,
    fetchData: () => void,
    addTransaction: (transaction: Transaction) => void,
    deleteTransaction: (id: string) => void,
}

//type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; 

export const useTransactionStore = create<TransactionStoreProps>()((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    fetchData: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get('http://localhost:3000/transactions')
            set({ transactions: response.data, isLoading: false })
        } catch (error) {
            set({ error, isLoading: false })
        }
    },
    addTransaction: async (transaction) => {
        try {
            set((state) => ({
                transactions: [...state.transactions, transaction]
            }))
        } catch (error) {
            set({ error })
        }
    },
    deleteTransaction: async (id) => {
        await axios.delete(
            `http://localhost:3000/transactions/${id}`
        );
    }
}))