import { db } from '../../../firebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";

export async function getCategoriesAccess() {
    const q = query(collection(db, "categories"));
    const response = await getDocs(q);

    return response;
}