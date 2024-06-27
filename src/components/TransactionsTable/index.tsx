import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import TransactionStore from "@/stores/TransactionStore";
import { useEffect } from "react";

export default function TransactionsTable() {
    let store = TransactionStore();
    
    let {transactions, fetchData, isLoading} = store
    
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
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transactions.createdAt)
                                )}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}