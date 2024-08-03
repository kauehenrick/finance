import { db } from '../../../firebaseConfig'
import { CategoryProps } from '@/stores/CategoryStore';

const categoriesReference = db.collection('categories');

export async function addCategoriesAccess(category: CategoryProps) {
    const response = await categoriesReference.add(category);
    return response;
}

export async function getCategoriesAccess() {
    const response = await categoriesReference.get();

    return response;
}