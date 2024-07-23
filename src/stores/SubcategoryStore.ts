import { create } from "zustand";
import { getSubcategoriesAction } from "@/services/actions/subcategoriesActions";

type SubcategoryProps = {
    id: string,
    name: string,
    value: string,
}

type SubcategoryStoreProps = {
    subcategories: SubcategoryProps[],
    error: null | string | unknown,
    getSubcategories: () => void,
}

export const useSubcategoryStore = create<SubcategoryStoreProps>((set) => ({
    subcategories: [],
    error: null,
    getSubcategories: async () => {
        try {
            const response = await getSubcategoriesAction();
            set({ subcategories: response })
        } catch (error) {
            set({ error })
        }
    }
}))