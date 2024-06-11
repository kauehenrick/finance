import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export default function TransactionsTable() {
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
                    <TableRow>
                        <TableCell>Freelance de Website</TableCell>
                        <TableCell>R$ 6.000,00</TableCell>
                        <TableCell>Dev</TableCell>
                        <TableCell>12/02/2021</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}