"use client"

import moneyBackgroundImg from '../assets/money_2.jpg'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export default function OAuthLogin() {
    

    return (
        <div className="bg-background flex flex-row h-screen items-center justify-between">
            <div className="p-5 m-auto">

                <p className='font-semibold text-4xl mb-5'>Seja bem-vindo!</p>

                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        const userCredentials = jwtDecode(credentialResponse.credential)
                        console.log(userCredentials);
                    }}
                    onError={() => {
                        toast.error('Falha ao realizar login');
                    }}
                    theme='filled_black'
                    shape='pill'
                />

            </div>

            <img src={moneyBackgroundImg} alt="" className="h-full w-2/4 object-cover" />

        </div>
    )
}