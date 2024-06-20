import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";

interface TransactionItemProps {
    id: number;
    title: string;
    amount: number;
    category: string;
    createdAt: string;
    type: string;
}

export default function TransactionsTable() {
    const [transactions, setTransactions] = useState<TransactionItemProps[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/transactions')
            .then(response => response.json())
            .then(data => setTransactions(data));
    }, [])

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

                            <TableCell>
                                {new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'brl'
                                }).format(transactions.amount)}
                            </TableCell>
                            
                            <TableCell>{transactions.category}</TableCell>
                            
                            <TableCell className={transactions.type}>
                                {transactions.createdAt}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}