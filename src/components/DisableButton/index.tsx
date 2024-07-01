import { Trash2 } from "lucide-react";
import axios from "axios";

export async function deleteTransaction(id: string) {
    try {
        const { data } = await axios.delete(`http://localhost:3000/transactions/${id}`);
        return data;
    } catch (error) {
        console.log(error)
        throw new Error("Falha ao deletar a Transação!");
    }
}

export default function DisableButton() {
    return (
        <div className="bg-red p-2 rounded-lg hover:brightness-75 cursor-pointer"><Trash2 color="background" size={16} /></div>
    )
}