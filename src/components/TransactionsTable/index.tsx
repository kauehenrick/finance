import { useEffect } from "react";
import { TransactionProps, useTransactionStore } from "@/stores/TransactionStore";
import { DataTable } from "./data-table"
import { columns } from "./columns"

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
            { isLoading && <div className="p-3">Carregando...</div> }

            <DataTable columns={columns} data={transactionsActive} />
        </div>
    )
}