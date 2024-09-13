import { create } from "zustand";
import { getUsersAction, addUsersAction } from "@/services/actions/usersActions";
import { v4 as uuidv4 } from 'uuid';

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
    addUser: (user: Omit<UserProps, "userSubscription" | "id">) => void,
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
        const today = new Date();
        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const data = { ...user, userSubscription: nextMonth, id: uuidv4() };
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