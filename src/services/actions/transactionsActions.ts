import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { getTransactionsAccess } from "../dataAccess/transactionsAccess";
import { TransactionProps } from "@/stores/TransactionStore";

export async function getTransactionsAction() {
    const transactions: any[] = [];
    const response = await getTransactionsAccess();
    
    response.forEach((doc) => {
        transactions.push(doc.data());
    })

    transactions.forEach(e => {
        const ts = (e.date.seconds + e.date.nanoseconds * 10 ** -9) * 1000;
        e.date = new Date(ts);
    })

    return transactions;
}

export async function addTransactionsAction(transaction: TransactionProps) {
    const docRef = doc(db, "transactions", transaction.id);
    await setDoc(docRef, transaction);
}
