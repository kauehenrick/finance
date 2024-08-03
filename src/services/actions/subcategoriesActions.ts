import { getSubcategoriesAccess } from "../dataAccess/subcategoriesAccess";
import { SubcategoryProps } from "@/stores/SubcategoryStore";
import { addSubcategoriesAccess } from "../dataAccess/subcategoriesAccess";

export async function addSubcategoriesAction(subcategory: SubcategoryProps) {
    const response = await addSubcategoriesAccess(subcategory);
    return response.id;
}

export async function getSubcategoriesAction() {
    const response = await getSubcategoriesAccess();
    
    const subcategories: any[] = [];
    response.forEach((doc) => {
        subcategories.push(doc.data());
    })

    return subcategories;
}