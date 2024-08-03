import { db } from '../../../firebaseConfig'
import { SubcategoryProps } from '@/stores/SubcategoryStore';

const subcategoriesReference = db.collection('subcategories');

export async function addSubcategoriesAccess(category: SubcategoryProps) {
    const response = await subcategoriesReference.add(category);
    return response;
}

export async function getSubcategoriesAccess() {
    const response = await subcategoriesReference.get();

    return response;
}