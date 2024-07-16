import logoImg from '../../assets/finance_logo.png';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';


interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export default function Header({onOpenNewTransactionModal}: HeaderProps) {
    return (
        <div className="bg-dark-800 flex items-center justify-around h-48">
            <img src={logoImg} className="logoImg w-52" />

            <div className="flex justify-between w-56">

                <Button onClick={onOpenNewTransactionModal} className='bg-blue text-white hover:text-black' variant="secondary">Nova Transação</Button>

                <Avatar>
                    <AvatarImage src="https://github.com/kauehenrick.png" alt="avatar" />
                    <AvatarFallback>KH</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
