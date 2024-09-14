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

const secretKey = import.meta.env.VITE_ENCRIPT_KEY;

const encrypt = (data: string | null) => {
    if (!data) return '';
    return AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const decrypt = (encryptedData: string) => {
    if (!encryptedData) return null;
    try {
        const bytes = AES.decrypt(encryptedData, secretKey);
        const decryptedText = bytes.toString(enc.Utf8);
        return decryptedText ? JSON.parse(decryptedText) : null;
    } catch (error) {
        console.error("Error decrypting data:", error);
        return null;
    }
};

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