import { db } from '../../../firebaseConfig'

const transactionsReference = db.collection('transactions');

export function getTransactionsObserver() {
    transactionsReference.onSnapshot((snapshot) => {
        const transactions: any[] = [];
        snapshot.forEach(doc => {
            transactions.push(doc.data());
        })
        return transactions;
    });
}