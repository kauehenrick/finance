import { db } from '../../../firebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";

export async function getUsersAccess() {
    const q = query(collection(db, "users"));
    const response = await getDocs(q);

    return response;
}