import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { enc, AES } from 'crypto-js'

type userProps = {
    userEmail: string | null,
    userName: string | null,
}

interface AuthStore {
    user: userProps;
    isLoggedIn: boolean;
    login: (email: string | null, name: string | null) => void;
    logout: () => void;
    getUserInfo: (user: userProps) => userProps;
}

const encrypt = (data: string | null) => {
    return AES.encrypt(JSON.stringify(data), '').toString()
}

const decrypt = (encryptedData: string) => {
    const bytes = AES.decrypt(encryptedData, "")
    return JSON.parse(bytes.toString(enc.Utf8))
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
                set({ isLoggedIn: true, user: { userEmail: encrypt(email), userName: encrypt(name) } });
            },
            logout: () => {
                set({ isLoggedIn: false });
                localStorage.clear();
            },
            getUserInfo: (user) => {
                const userEmail = decrypt(user.userEmail as string);
                const userName = decrypt(user.userName as string);
                return user = {
                    userEmail, userName
                };
            }
        }),
        {
            name: 'userLoginInfo'
        }
    )
);