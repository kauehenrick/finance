import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect } from "react";
import { useTransactionStore } from "@/stores/TransactionStore";
import DisableButton from "../DisableButton";
import UpdateButton from "../UpdateButton";

export default function TransactionsTable() {
    let store = useTransactionStore();

    let {transactions, fetchData, isLoading} = store;

    useEffect(() => {
        fetchData();
      }, []);

    return (
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-20">
            {
                isLoading && <div className="p-3">Carregando...</div>
            }

            <Table>
                <TableHeader>
                    <TableHead>Título</TableHead>
                    <TableHead>Valor</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                </TableHeader>

                <TableBody>
                    {transactions.map(transactions => (
                        <TableRow key={transactions.id}>
                            <TableCell>{transactions.title}</TableCell>

                            <TableCell className={transactions.type}>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'brl'
                                }).format(transactions.amount)}
                            </TableCell>

                            <TableCell>{transactions.category}</TableCell>

                            <TableCell>
                                {new Intl.DateTimeFormat('pt-BR', {
                                    dateStyle: 'short',
                                    timeStyle: 'short',
                                }).format(
                                    new Date(transactions.createdAt)
                                )}
                            </TableCell>

                            <TableCell className="flex gap-2.5">
                                <UpdateButton />
                                <DisableButton />
                            </TableCell>    
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}