import { CircleArrowUp, CircleArrowDown, CircleDollarSign } from "lucide-react";
import { useTransactionStore } from "@/stores/TransactionStore";
import { useAccountStore } from "@/stores/AccountsStore";

export default function Summary() {
    let store = useTransactionStore();
    let accountStore = useAccountStore();
    
    let { transactions } = store;
    let { currentAccount } = accountStore;

    const summary = transactions.reduce((acc, transaction) => {
        const transactionValidation = transaction.isActive && transaction.account == currentAccount;

        if (transaction.type === "deposit" && transactionValidation) {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else if (transactionValidation) {
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
        <div className="">

            <div className="bg-white items-center rounded-xl">
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


            <div className="bg-white items-center rounded-xl">
                <header className="flex justify-between mb-1">
                    <p>Saídas</p>
                    <CircleArrowDown color="red" />
                </header>

                <strong className="text-3xl">- {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'brl'
                    }).format(summary.withdraws)}</strong>
            </div>

            <div className="bg-blue text-white items-center rounded-xl ">
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

