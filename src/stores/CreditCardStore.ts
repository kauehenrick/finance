import { create } from "zustand";
import { toast } from "sonner";
import { getCreditCardsAction, addCreditCardsAction } from "@/services/actions/creditCardsActions";
import { v4 as uuidv4 } from 'uuid';

export type CreditCardProps = {
    id: string,
    userId: string,
    alias: string,
    number: string;
    expiry: string;
    cvc: string;
    name: string;
}

type CreditCardStoreProps = {
    creditCards: CreditCardProps[],
    error: null | string | unknown,
    getCreditCards: () => void,
    addCreditCard: (category: Omit<CreditCardProps, "id">) => void,
}

export const useCreditCardStore = create<CreditCardStoreProps>((set) => ({
    creditCards: [],
    error: null,
    getCreditCards: async () => {
        try {
            const response = await getCreditCardsAction();
            set({ creditCards: response })
        } catch (error) {
            set({ error })
        }
    },
    addCreditCard: async (subcategory) => {
        const data = { ...subcategory, id: uuidv4() };
        await addCreditCardsAction(data);
        try {
            set((state) => ({
                creditCards: [...state.creditCards, data]
            }))
            toast.success("Cartão adicionado!");
        } catch (error) {
            set({ error })
        }
    }
}))