import { db } from '../../../firebaseConfig'

const subcategoriesReference = db.collection('subcategories');

export async function getSubcategoriesAcess() {
    const response = await subcategoriesReference.get();

    return response;
}