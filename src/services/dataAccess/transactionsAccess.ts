import { db } from '../../../firebaseConfig'
import { TransactionProps } from '@/stores/TransactionStore';

const transactionsReference = db.collection('transactions');

export async function addTransactionsAccess(transaction: TransactionProps) {
    const response = await transactionsReference.add(transaction)
    return response;
}

export async function setTransactionsAccess(transaction: TransactionProps, id: string) {
    const response = await transactionsReference.doc(id).set(transaction)
    return response;
}

export async function updateTransactionsAccess(transaction: TransactionProps, id: string) {
    const response = await transactionsReference.doc(id).update(transaction)
    return response;
}

export async function getTransactionsAccess() {
    const date = new Date();
    const firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const response = await transactionsReference.orderBy("date").where("date", ">", firstDayOfThisMonth).get();
    
    return response;
}