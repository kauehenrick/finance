import { create } from "zustand";
import { getAccountsAction, addAccountsAction } from "@/services/actions/accountsActions";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export type AccountProps = {
    id: string,
    email: string,
    alias: string,
    agency?: string,
    number?: string,
}

type AccountStoreProps = {
    accounts: AccountProps[],
    currentAccount: string,
    error: null | string | unknown,
    getAccounts: () => void,
    addAccount: (account: Omit<AccountProps, "id">) => void,
    setCurrentAccount: (id: string) => void,
}

export const useAccountStore = create<AccountStoreProps>((set) => ({
    accounts: [],
    currentAccount: '',
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
        const data = { ...account, id: uuidv4() };
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
    setCurrentAccount: (id) => {
        set({ currentAccount: id })
    }
}))