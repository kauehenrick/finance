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
    add: (transaction: Transaction) => void,
}

//type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; 

const TransactionStore = create<TransactionStoreProps>()((set) => ({
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
    add: (transaction: Transaction) => 
        set((state) => ({
            transactions: [...state.transactions, transaction]
        }))
}))

export default TransactionStore;