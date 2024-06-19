import logoImg from '../../assets/finance_logo.png';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import NewTransactionModal from '../NewTransactionModal';

export default function Header() {

    return (
        <div className="bg-dark-800 flex items-center justify-around h-48">
            <img src={logoImg} className="logoImg w-52" />

            <div className="flex justify-between w-56">

                <Dialog>

                    <DialogTrigger>
                        <Button className='bg-blue text-white' variant="secondary">Nova Transação</Button>
                    </DialogTrigger>

                    <DialogContent>

                    <NewTransactionModal />

                    </DialogContent>
                </Dialog>

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
