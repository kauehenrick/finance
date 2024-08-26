import { create } from "zustand";
import { getAccountsAction, addAccountsAction } from "@/services/actions/accountsActions";
import { toast } from "sonner";

export type AccountProps = {
    email: string,
    alias: string,
    agency?: string,
    number?: string,
}

type AccountStoreProps = {
    accounts: AccountProps[],
    error: null | string | unknown,
    getAccounts: () => void,
    addAccount: (account: AccountProps) => void,
}

export const useAccountStore = create<AccountStoreProps>((set) => ({
    accounts: [],
    error: null,
    getAccounts: async () => {
        try {
            const response = await getAccountsAction();
            set({ accounts: response })
        } catch (error) {
            set({ error })
        }
    },
    addAccount: async (account) => {
        const data = { ...account };
        await addAccountsAction(data);
        try {
            set((state) => ({
                accounts: [...state.accounts, data]
            }))
            toast.success("Conta bancária adicionada!");
        } catch (error) {
            set({ error })
        }
    },
}))