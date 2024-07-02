import { Trash2 } from "lucide-react";
import { useTransactionStore } from "@/stores/TransactionStore";

export default function DisableButton() {
    let store = useTransactionStore();
    let {deleteTransaction} = store;

    return (
        <div className="bg-red p-2 rounded-lg hover:brightness-75 cursor-pointer"><Trash2 color="background" size={16} /></div>
    )
}