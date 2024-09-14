"use client"

import { useEffect } from "react";
import { TransactionProps, useTransactionStore } from "@/stores/TransactionStore";
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useAccountStore } from "@/stores/AccountsStore";
import { useAuthStore } from "@/stores/AuthStore";

export default function TransactionsTable() {
    let transactionStore = useTransactionStore();
    let accountStore = useAccountStore()
    let authStore = useAuthStore();

    let { user, getUserInfo } = authStore;
    let { transactions, fetchData, isLoading } = transactionStore;
    let { accounts, currentAccount, setCurrentAccount } = accountStore;

    useEffect(() => {
        fetchData();
    }, []);

    const decryptedUser = getUserInfo(user);

    const userAccount = accounts.filter(account => account.email == decryptedUser.userEmail);

    if (userAccount.length > 0 && currentAccount == "") {
        setCurrentAccount(accounts[0].id);
    }

    let transactionsActive: TransactionProps[] = [];

    transactions.forEach(transaction => {
        if (transaction.isActive && transaction.account == currentAccount) {
            transactionsActive.push(transaction);
        }
    })

    return (
        <div className="bg-white border rounded-lg p-2 w-11/12 m-auto mt-10">
            {isLoading ? <div className="p-3">Carregando...</div> : <DataTable columns={columns} data={transactionsActive} />}
        </div>
    )
}