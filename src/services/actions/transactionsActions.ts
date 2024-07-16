import { addTransactionsAcess, setTransactionsAcess, updateTransactionsAcess, getTransactionsAcess } from "../dataAcess/transactionsAcess";
import { TransactionProps } from "@/stores/TransactionStore";

export async function addTransactionsAction(transaction: TransactionProps) {
    const response = await addTransactionsAcess(transaction);
    return response.id;
}

export async function setTransactionsAction(transaction: TransactionProps, id: string) {
    const response = await setTransactionsAcess(transaction, id);
    return response;
}

export async function updateTransactionsAction(transaction: TransactionProps, id: string) {
    const response = await updateTransactionsAcess(transaction, id);
    return response;
}

export async function getTransactionsAction() {
    const response = await getTransactionsAcess();
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