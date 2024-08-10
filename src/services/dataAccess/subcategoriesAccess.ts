import { db } from '../../../firebaseConfig'
import { collection, query, getDocs } from "firebase/firestore";

export async function getSubcategoriesAccess() {
    const q = query(collection(db, "subcategories"));
    const response = await getDocs(q);

    return response;
}