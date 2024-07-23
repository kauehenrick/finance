import { create } from "zustand";
import { getCategoriesAction } from "@/services/actions/categoriesActions";

type CategoryProps = {
    id: string,
    name: string,
    value: string,
}

type CategoryStoreProps = {
    categories: CategoryProps[],
    error: null | string | unknown,
    fetchData: () => void,
}

export const useCategoryStore = create<CategoryStoreProps>((set) => ({
    categories: [],
    error: null,
    fetchData: async () => {
        try {
            const response = await getCategoriesAction();
            set({ categories: response })
        } catch (error) {
            set({ error })
        }
    }
}))