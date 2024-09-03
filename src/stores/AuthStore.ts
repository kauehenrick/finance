import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type userProps = {
    userEmail: string | null,
    userName: string | null,
}

interface AuthStore {
    user: userProps;
    isLoggedIn: boolean;
    login: (email: string | null, name: string | null) => void;
    logout: () => void;
}
export const useAuthStore = create(
    persist<AuthStore>(
        (set) => ({
            isLoggedIn: false,
            user: {
                userEmail: null,
                userName: null,
            },
            login: (email, name) => {
                set({ isLoggedIn: true, user: { userEmail: email, userName: name } });
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