import { useTransactionStore } from "@/stores/TransactionStore";
import { useAccountStore } from "@/stores/AccountsStore";
import { priceFormatter } from "@/lib/formatter";

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
        <div className="bg-white rounded-xl w-11/12 md:w-1/4 m-auto flex flex-col items-center gap-3 -mt-9 md:mt-0 py-4">
            <div className="flex bg-white-700 items-center rounded-xl py-3 w-11/12">
                <div className="border-2 h-[60px] border-green ml-4 mr-6"></div>

                <div>
                    <p className="mb-1">Saldo total</p>

                    <strong className="text-2xl">{priceFormatter.format(summary.total)}</strong>
                </div>
            </div>

            <div className="flex flex-col bg-white-700 rounded-xl py-3 pl-5 w-11/12">
                <p className="mb-1">Entradas</p>

                <p className="text-2xl text-green font-bold">{priceFormatter.format(summary.deposits)}</p>
            </div>

            <div className="flex flex-col bg-white-700 rounded-xl py-3 pl-5 w-11/12">
                <p className="mb-1">Saídas</p>

                <p className="text-2xl text-red font-bold">-{priceFormatter.format(summary.withdraws)}</p>
            </div>
        </div>
    )
}

