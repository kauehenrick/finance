import axios from 'axios';
import { create } from "zustand";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
}

interface TransactionStoreProps {
    transactions: Transaction[],
    isLoading: boolean,
    error: null | string | unknown,
    fetchData: () => void,
}

export const TransactionStore = create<TransactionStoreProps>()((set) => ({
    transactions: [],
    isLoading: false,
    error: null,
    fetchData: async () => {
        set({ isLoading: true })
        try {
            const response = await axios.get('http://localhost:3000/transactions')
            console.log(response.data)
            set({ transactions: response.data, isLoading: false })
        } catch (error) {
            set({ error, isLoading: false })
        }
    }
}))