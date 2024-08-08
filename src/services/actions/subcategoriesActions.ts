import { getSubcategoriesAccess } from '../dataAccess/subcategoriesAccess';


export async function getSubcategoriesAction() {
    const response = await getSubcategoriesAccess();

    const subcategories: any[] = [];
    response.forEach((doc) => {
        subcategories.push(doc.data());
    })

    return subcategories;
}
