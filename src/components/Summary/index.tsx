import { useTransactionStore } from "@/stores/TransactionStore";
import { useAccountStore } from "@/stores/AccountsStore";
import { useAuthStore } from "@/stores/AuthStore";
import { priceFormatter } from "@/lib/formatter";

export default function Summary() {
    let transactionStore = useTransactionStore();
    let accountStore = useAccountStore();
    let authStore = useAuthStore();

    let { transactions } = transactionStore;
    let { accounts, currentAccount } = accountStore;
    let { user } = authStore;

    const userAccount = accounts.filter(account => account.email == user.userEmail);

    if (userAccount.length > 0 && currentAccount == "") {
        currentAccount = accounts[0].id;
    }

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

    const summaryCardStyle = "flex flex-col bg-white-700 rounded-xl py-3 pl-5 w-11/12 md:w-1/4 md:h-44 justify-center";

    return (
        <div className="bg-white rounded-xl w-11/12 md:w-3/4 m-auto flex flex-col md:flex-row items-center justify-center gap-3 -mt-9 md:mt-0 py-4 md:py-6">
            <div className="flex bg-white-700 items-center rounded-xl py-3 w-11/12 md:w-1/4 md:h-44 md:pl-5">
                <div className="border-2 h-[60px] border-green ml-4 mr-6 md:hidden"></div>

                <div>
                    <p className="mb-1 font-medium md:text-xl">Saldo total</p>

                    <p className="text-2xl font-bold md:text-3xl">{priceFormatter.format(summary.total)}</p>
                </div>
            </div>

            <div className={summaryCardStyle}>
                <p className="mb-1 font-medium md:text-xl">Entradas</p>

                <p className="text-2xl text-green font-bold md:text-3xl">{priceFormatter.format(summary.deposits)}</p>
            </div>

            <div className={summaryCardStyle}>
                <p className="mb-1 font-medium md:text-xl">Saídas</p>

                <p className="text-2xl text-red font-bold md:text-3xl">-{priceFormatter.format(summary.withdraws)}</p>
            </div>
        </div>
    )
}

