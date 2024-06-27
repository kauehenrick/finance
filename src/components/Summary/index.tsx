import { CircleArrowUp, CircleArrowDown, CircleDollarSign } from "lucide-react";
import TransactionStore from "@/stores/TransactionStore";

export default function Summary() {
    let store = TransactionStore();
    
    let {transactions} = store

    console.log(transactions)

    const summary = transactions.reduce((acc, transaction) => {

        if (transaction.type === "deposit") {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        total: 0,
        withdraws: 0,
    })

    return (
        <div className="flex justify-around w-9/12 m-auto -mt-10">

            <div className="bg-white items-center rounded-xl h-auto w-80 py-8 px-4">
                <header className="flex justify-between h-15 mb-1">
                    <p>Entradas</p>

                    <div>
                        <CircleArrowUp color="green" />
                    </div>
                </header>

                <strong className="text-3xl">{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'brl'
                    }).format(summary.deposits)}</strong>
            </div>


            <div className="bg-white items-center rounded-xl h-auto w-80 py-8 px-4">
                <header className="flex justify-between mb-1">
                    <p>Saídas</p>
                    <CircleArrowDown color="red" />
                </header>

                <strong className="text-3xl">- {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'brl'
                    }).format(summary.withdraws)}</strong>
            </div>

            <div className="bg-blue items-center rounded-xl text-white h-auto w-80 py-8 px-4">
                <header className="flex justify-between mb-1">
                    <p>Total</p>
                    <CircleDollarSign />
                </header>

                <strong className="text-3xl"> {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'brl'
                    }).format(summary.total)}</strong>
            </div>
        </div>
    )
}

