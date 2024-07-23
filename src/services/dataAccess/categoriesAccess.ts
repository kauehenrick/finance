import { db } from '../../../firebaseConfig'

const categoriesReference = db.collection('categories');

export async function getCategoriesAcess() {
    const response = await categoriesReference.get();

    return response;
}