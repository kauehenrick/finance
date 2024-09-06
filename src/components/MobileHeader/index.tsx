import AvatarDropdownMenu from '../AvatarDropdownMenu';

let greetingMessage = ""
let currentHour = new Date().getHours()

if (currentHour <= 12) {
    greetingMessage = "Bom dia";
} else if (currentHour <= 17) {
    greetingMessage = "Boa tarde";
} else {
    greetingMessage = "Boa Noite";
}

export default function MobileHeader() {
    return (
        <div className="bg-dark-800 flex justify-center items-center flex-col h-48 md:hidden">
            <div className="flex items-center w-full">
                <div className="flex items-center gap-5 ml-8">
                    <AvatarDropdownMenu />

                    <p className="text-white text-lg">
                        {greetingMessage} Kauê, <br />
                        <span className="font-medium text-xl">Seja Bem-vindo!</span>
                    </p>

                </div>
            </div>
        </div>
    )
}
