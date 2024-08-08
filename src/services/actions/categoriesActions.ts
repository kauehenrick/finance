import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { getCategoriesAccess } from '../dataAccess/categoriesAccess';
import { CategoryProps } from '@/stores/CategoryStore';

export async function getCategoriesAction() {
    const response = await getCategoriesAccess();

    const categories: any[] = [];
    response.forEach((doc) => {
        categories.push(doc.data());
    })

    return categories;
}

export async function addCategoriesAction(category: CategoryProps) {
    const docRef = doc(db, "categories", category.id);
    await setDoc(docRef, category);
}
