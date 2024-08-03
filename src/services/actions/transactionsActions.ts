import { addTransactionsAccess, setTransactionsAccess, updateTransactionsAccess, getTransactionsAccess } from "../dataAccess/transactionsAccess";
import { TransactionProps } from "@/stores/TransactionStore";

export async function addTransactionsAction(transaction: TransactionProps) {
    const response = await addTransactionsAccess(transaction);
    return response.id;
}

export async function setTransactionsAction(transaction: TransactionProps, id: string) {
    const response = await setTransactionsAccess(transaction, id);
    return response;
}

export async function updateTransactionsAction(transaction: TransactionProps, id: string) {
    const response = await updateTransactionsAccess(transaction, id);
    return response;
}

export async function getTransactionsAction() {
    const response = await getTransactionsAccess();
    const transactions: any[] = [];
    response.forEach((doc) => {
        transactions.push(doc.data());
    })

    transactions.forEach(e => {
        const ts = (e.date.seconds + e.date.nanoseconds * 10 ** -9) * 1000;
        e.date = new Date(ts);
    })

    return transactions;
}