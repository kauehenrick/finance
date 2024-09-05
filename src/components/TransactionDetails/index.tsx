import { TransactionProps } from "@/stores/TransactionStore";
import { PlusCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { priceFormatter, dateFormatter } from "@/lib/formatter";

export default function TransactionDetails(transaction: TransactionProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <PlusCircle size={18} className="ml-5"/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Detalhes da Transação</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Descrição</p>
                        <p>{transaction.title}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Preço</p>
                        <p>{priceFormatter.format(transaction.amount)}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Data</p>
                        <p>{dateFormatter.format(transaction.date)}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Local</p>
                        <p>{transaction.place}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Categoria</p>
                        <p>{transaction.category}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Subcategoria</p>
                        <p>{transaction.subcategory}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Observação</p>
                        <p>{transaction.note}</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-lg px-4 py-2 gap-1">
                        <p className="font-semibold text-lg">Anexo</p>
                        <img src={transaction.imageUrl} alt="" />
                    </div>
                </div>
                <DialogFooter>
                    <Button>Editar Transação</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 