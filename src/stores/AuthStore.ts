import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    user: string | null;
    isLoggedIn: boolean;
    login: (user: string | null) => void;
    logout: () => void;
}
export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: (user) => {
                set({ isLoggedIn: true, user: user});
            },
            logout: () => {
                set({ isLoggedIn: false });
                localStorage.clear();
            },
        }),
        {
            name: 'userLoginStatus',
        }
    )
);