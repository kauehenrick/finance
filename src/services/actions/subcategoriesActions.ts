import { getSubcategoriesAcess } from "../dataAccess/subcategoriesAcess";

export async function getSubcategoriesAction() {
    const response = await getSubcategoriesAcess();
    
    const categories: any[] = [];
    response.forEach((doc) => {
        categories.push(doc.data());
    })

    return categories;
}