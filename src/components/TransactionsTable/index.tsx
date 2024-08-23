import { useEffect } from "react";
import { TransactionProps, useTransactionStore } from "@/stores/TransactionStore";
import { DataTable } from "./data-table"
import { columns } from "./columns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function TransactionsTable() {
    let store = useTransactionStore();

    let { transactions, fetchData, isLoading } = store;

    useEffect(() => {
        fetchData();
    }, []);

    let transactionsActive: TransactionProps[] = [];

    transactions.forEach(transaction => {
        if (transaction.isActive) {
            transactionsActive.push(transaction);
        }
    })

    return (
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-20">
            <div className="mt-3 mb-5">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {isLoading && <div className="p-3">Carregando...</div>}

            <DataTable columns={columns} data={transactionsActive} />
        </div>
    )
}