"use client"

import moneyBackgroundImg from '../assets/money_2.jpg'

export default function OAuthLogin() {
    return (
        <div className="bg-background flex flex-row h-screen items-center justify-between">
            <div className="p-5 m-auto">

                <p className='font-semibold text-4xl mb-5'>Seja bem-vindo!</p>

            </div>

            <img src={moneyBackgroundImg} alt="" className="h-full w-2/4 object-cover" />

        </div>
    )
}