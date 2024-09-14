import { db } from '../../../firebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";

export async function getCreditCardsAccess() {
    const q = query(collection(db, "creditCards"));
    const response = await getDocs(q);

    return response;
}