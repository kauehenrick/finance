import { db } from '../../../firebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";

export async function getAccountsAccess() {
    const q = query(collection(db, "accounts"));
    const response = await getDocs(q);

    return response;
}