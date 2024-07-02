import axios from 'axios';
import { create } from "zustand";
import { toast } from "sonner";


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
            toast.success("Transação adicionada!");
        } catch (error) {
            set({ error })
        }
    },
    deleteTransaction: async (id: string) => {
        try {
            await axios.delete(
                `http://localhost:3000/transactions/${id}`
              );

              set((state) => ({
                transactions: state.transactions.filter(
                  (transaction) => transaction.id!== Number(id)
                )
              }));

            toast.success("Transação excluída!");
            
        } catch (error) {
            
        }
    }
}))