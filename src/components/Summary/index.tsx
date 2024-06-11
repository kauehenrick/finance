import { CircleArrowUp, CircleArrowDown, CircleDollarSign } from "lucide-react";

export default function Summary() {
    return (
        <div className="flex justify-around w-9/12 m-auto -mt-10">

            <div className="bg-white items-center rounded-xl h-auto w-80 py-8 px-4">
                <header className="flex justify-between h-15 mb-1">
                    <p>Entradas</p>

                    <div>
                        <CircleArrowUp color="green" />
                    </div>
                </header>

                <strong className="text-3xl">R$ 6.000,00</strong>
            </div>


            <div className="bg-white items-center rounded-xl h-auto w-80 py-8 px-4">
                <header className="flex justify-between mb-1">
                    <p>Saídas</p>
                    <CircleArrowDown color="red"/>
                </header>

                <strong className="text-3xl">R$ 6.000,00</strong>
            </div>

            <div className="bg-blue items-center rounded-xl text-white h-auto w-80 py-8 px-4">
                <header className="flex justify-between mb-1">
                    <p>Total</p>
                    <CircleDollarSign />
                </header>

                <strong className="text-3xl">R$ 6.000,00</strong>
            </div>
        </div>
    )
}

