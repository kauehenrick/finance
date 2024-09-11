import { create } from "zustand";
import { getUsersAction, addUsersAction } from "@/services/actions/usersActions";

export type UserProps = {
    id: string;
    name: string | null;
    email: string | null;
    userSubscription: Date;
}

type UserStoreProps = {
    users: UserProps[],
    error: null | string | unknown,
    getUsers: () => void,
    addUser: (user: UserProps) => void,
}

export const useUserStore = create<UserStoreProps>((set) => ({
    users: [],
    error: null,
    getUsers: async () => {
        try {
            const response = await getUsersAction();
            set({ users: response })
        } catch (error) {
            set({ error })
        }
    },
    addUser: async (user) => {
        const data = { ...user };
        await addUsersAction(data);
        try {
            set((state) => ({
                users: [...state.users, data]
            }))
        } catch (error) {
            set({ error })
        }
    }
}))