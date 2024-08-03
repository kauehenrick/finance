import { getSubcategoriesAccess } from "../dataAccess/subcategoriesAccess";

export async function getSubcategoriesAction() {
    const response = await getSubcategoriesAccess();
    
    const categories: any[] = [];
    response.forEach((doc) => {
        categories.push(doc.data());
    })

    return categories;
}