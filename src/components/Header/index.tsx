import logoImg from '../../assets/finance_logo.png';
import { Button } from '../ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Dialog, DialogContent, DialogFooter, DialogClose, DialogTrigger } from '../ui/dialog'
import { Input } from '../ui/input'
import { CircleArrowUp, CircleArrowDown } from 'lucide-react'

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
                        <p className='font-bold text-lg'>Nova Transação</p>

                        <Input type='text' placeholder='Descrição'></Input>

                        <Input type='number' placeholder='Preço'></Input>

                        <Input type='text' placeholder='Categoria'></Input>

                        <div className='flex justify-center gap-5'>
                            <Button className='gap-2'>
                                <CircleArrowUp color='green' />
                                <p>Entrada</p>
                            </Button>

                            <Button className='gap-2'>
                                <CircleArrowDown color='red' />
                                <p>Saída</p>
                            </Button>
                        </div>

                        <DialogFooter>
                            <DialogClose>
                                <Button variant="ghost">Cancelar</Button>
                            </DialogClose>

                            <Button>Salvar</Button>
                        </DialogFooter>

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