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

export default function AvatarDropdownMenu() {
    let authStore = useAuthStore();

    let { logout } = authStore;

    return (
        <DropdownMenu modal={false}>
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
    )
}