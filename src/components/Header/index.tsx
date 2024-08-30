import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import { CiLogout } from "react-icons/ci";
import { useAuthStore } from '@/stores/AuthStore';

let greetingMessage = ""
let currentHour = new Date().getHours()

if (currentHour <= 12) {
    greetingMessage = "Bom dia";
} else if (currentHour <= 17) {
    greetingMessage = "Boa tarde";
} else {
    greetingMessage = "Boa Noite";
}

export default function Header() {
    let authStore = useAuthStore();

    let { logout } = authStore;

    return (
        <div className="bg-dark-800 flex justify-center items-center flex-col h-48">
            <div className="flex items-center w-full">
                <div className="flex items-center gap-5 ml-8">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar className='size-16 border-2 border-white'>
                                <AvatarImage src="https://github.com/kauehenrick.png" alt="avatar" />
                                <AvatarFallback>KH</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Opções</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Button variant="ghost" className="gap-2" onClick={logout}>
                                    <CiLogout />
                                    <p>Realizar Logout</p>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <p className="text-white text-lg">
                        {greetingMessage} Kauê, <br />
                        <span className="font-medium text-xl">Seja Bem-vindo!</span>
                    </p>

                </div>
            </div>
        </div>
    )
}
