import { db } from '../../../firebaseConfig'
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getTransactionsAccess() {
    const date = new Date();
    const firstDayOfThisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const q = query(collection(db, "transactions"), where("date", ">=", firstDayOfThisMonth));
    const response = await getDocs(q);

    return response;
}