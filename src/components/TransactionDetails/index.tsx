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
import { ScrollArea } from "../ui/scroll-area";
import UpdateTransactionModal from "../UpdateTransactionModal";

export default function TransactionDetails(transaction: TransactionProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <PlusCircle size={18} className="ml-5" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl">Detalhes da Transação</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[600px] py-4">
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
                </ScrollArea>
                <DialogFooter>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Editar Transação</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Editar Transação</DialogTitle>
                            </DialogHeader>
                            <UpdateTransactionModal {...transaction} />
                        </DialogContent>
                    </Dialog>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 