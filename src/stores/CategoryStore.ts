import { create } from "zustand";
import { toast } from "sonner";
import { getCategoriesAction, addCategoriesAction } from "@/services/actions/categoriesActions";
import { v4 as uuidv4 } from 'uuid';

export type CategoryProps = {
    id: string,
    name: string,
}

type CategoryStoreProps = {
    categories: CategoryProps[],
    error: null | string | unknown,
    getCategories: () => void,
    addCategory: (category: Omit<CategoryProps, "id">) => void,
}

export const useCategoryStore = create<CategoryStoreProps>((set) => ({
    categories: [],
    error: null,
    getCategories: async () => {
        try {
            const response = await getCategoriesAction();
            set({ categories: response })
        } catch (error) {
            set({ error })
        }
    },
    addCategory: async (category) => {
        const data = { ...category, id: uuidv4() };
        await addCategoriesAction(data);
        try {
            set((state) => ({
                categories: [...state.categories, data]
            }))
            toast.success("Categoria adicionada!");
        } catch (error) {
            set({ error })
        }
    }
}))