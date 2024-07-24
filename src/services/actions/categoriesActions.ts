import { getCategoriesAccess, addCategoriesAccess } from "../dataAccess/categoriesAccess";
import { CategoryProps } from "@/stores/CategoryStore";

export async function addCategoriesAction(category: CategoryProps) {
    const response = await addCategoriesAccess(category);
    return response.id;
}

export async function getCategoriesAction() {
    const response = await getCategoriesAccess();
    
    const categories: any[] = [];
    response.forEach((doc) => {
        categories.push(doc.data());
    })

    return categories;
}