import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { getSubcategoriesAccess } from '../dataAccess/subcategoriesAccess';
import { SubcategoryProps } from '@/stores/SubcategoryStore';

export async function getSubcategoriesAction() {
    const response = await getSubcategoriesAccess();

    const subcategories: any[] = [];
    response.forEach((doc) => {
        subcategories.push(doc.data());
    })

    return subcategories;
}

export async function addSubcategoriesAction(subcategory: SubcategoryProps) {
    const docRef = doc(db, "subcategories", subcategory.id);
    await setDoc(docRef, subcategory);
}