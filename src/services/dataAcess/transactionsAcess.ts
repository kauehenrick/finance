import { db } from '../../../firebaseConfig'
import { TransactionProps } from '@/stores/TransactionStore';

const transactionsReference = db.collection('transactions');

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
    const date = new Date();
    var firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDayPastMonth = new Date(firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1));

    const response = await transactionsReference.orderBy("date").where("date", ">=", lastDayPastMonth).get();
    
    return response;
}