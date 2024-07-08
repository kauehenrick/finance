import { db } from '../../../firebaseConfig'

const transactionsReference = db.collection('transactions');

interface TransactionProps {
    id: string,
    title: string,
    amount: number,
    category?: string | undefined,
    createdAt: string,
    type: string,
    isActive: boolean
}

export async function addTransactionsAcess(transaction: TransactionProps) {
    const response = await transactionsReference.add(transaction)
    return response;
}

export async function setTransactionsAcess(transaction: TransactionProps, id: string) {
    const response = await transactionsReference.doc(id).set(transaction)
    return response;
}

export async function updateTransactionsAcess(transaction: TransactionProps, id: string) {
    const response = await transactionsReference.doc(id).update(transaction)
    return response;
}

export async function getTransactionsAcess() {
    const response = await transactionsReference.get();
    return response;
}