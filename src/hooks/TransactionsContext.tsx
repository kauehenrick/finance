import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/services/api";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
}

type ValuesProps = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (values: ValuesProps) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data));
    }, []);

    async function createTransaction(values: any) {
        const response = await api.post('/transactions', values);
        const { transaction } = response.data;

        setTransactions([
            ...transaction,
            transaction
        ]);
    }
    
    return (
        <TransactionsContext.Provider value={{transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}
 