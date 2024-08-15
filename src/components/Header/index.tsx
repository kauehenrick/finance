import logoImg from '../../assets/finance_logo.png';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { CirclePower } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}
import { useAuthStore } from '@/stores/AuthStore';

export default function Header({ onOpenNewTransactionModal }: HeaderProps) {
    const { logout } = useAuthStore();

    return (
        <div className="bg-dark-800 flex items-center justify-around h-48">
            <img src={logoImg} className="logoImg w-52" />

            <div className="flex justify-between items-center gap-5 w-fit">

                <Button onClick={onOpenNewTransactionModal} className='bg-blue text-white hover:text-black' variant="secondary">Nova Transação</Button>

                <Avatar>
                    <AvatarImage src="https://github.com/kauehenrick.png" alt="avatar" />
                    <AvatarFallback>KH</AvatarFallback>
                </Avatar>

                <Dialog>
                    <DialogTrigger>
                        <CirclePower size={30} color="white" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Realizar logout</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>Deseja realmente sair do seu usuário?</DialogDescription>
                        <DialogFooter>
                            <div className="flex justify-end gap-4">
                                <DialogClose><Button variant="ghost" className='border'>Cancelar</Button></DialogClose>
                                <Button onClick={logout}>Sair</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </div>
    )
}
