import logoImg from '../../assets/finance_logo.png';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { useState } from 'react';
import NewTransactionModal from '../NewTransactionModal';

export default function Header() {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    return (
        <div className="bg-dark-800 flex items-center justify-around h-48">
            <img src={logoImg} className="logoImg w-52" />

            <div className="flex justify-between w-56">

                <Button onClick={handleOpenNewTransactionModal} className='bg-blue text-white hover:text-black' variant="secondary">Nova Transação</Button>

                <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal}></NewTransactionModal>

                <Avatar>
                    <AvatarImage src="https://github.com/kauehenrick.png" alt="avatar" />
                    <AvatarFallback>KH</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
