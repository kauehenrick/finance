import { useContext } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TransactionsContext } from "@/hooks/TransactionsContext";

export default function TransactionsTable() {
    const transactions = useContext(TransactionsContext);

    return (
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-20">
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
                                {transactions.createdAt}
                                {/*new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transactions.createdAt)
                                )*/}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}