import { getCategoriesAcess } from "../dataAccess/categoriesAccess";

export async function getCategoriesAction() {
    const response = await getCategoriesAcess();
    
    const categories: any[] = [];
    response.forEach((doc) => {
        categories.push(doc.data());
    })

    return categories;
}