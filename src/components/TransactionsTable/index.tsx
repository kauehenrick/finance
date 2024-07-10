//import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect } from "react";
import { useTransactionStore } from "@/stores/TransactionStore";
//import DisableButton from "../DisableButton";
//import UpdateButton from "../UpdateButton";
import { DataTable } from "./data-table"
import { columns } from "./columns"

export default function TransactionsTable() {
    let store = useTransactionStore();

    let { transactions, fetchData, isLoading } = store;

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-20">
            { isLoading && <div className="p-3">Carregando...</div> }

            <DataTable columns={columns} data={transactions} />
        </div>
    )
}