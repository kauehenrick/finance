import { create } from "zustand";
import { toast } from "sonner";
import { getSubcategoriesAction, addSubcategoriesAction } from "@/services/actions/subcategoriesActions";
import { v4 as uuidv4 } from 'uuid';

export type SubcategoryProps = {
    id: string,
    name: string,
    value: string,
}

type SubcategoryStoreProps = {
    subcategories: SubcategoryProps[],
    error: null | string | unknown,
    getSubcategories: () => void,
    addSubcategory: (category: Omit<SubcategoryProps, "id">) => void,
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
    },
    addSubcategory: async (subcategory) => {
        const data = { ...subcategory, id: uuidv4() };
        await addSubcategoriesAction(data);
        try {
            set((state) => ({
                subcategories: [...state.subcategories, data]
            }))
            toast.success("Subcategoria adicionada!");
        } catch (error) {
            set({ error })
        }
    }
}))