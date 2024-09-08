"use client"

import { useEffect } from "react";
import { TransactionProps, useTransactionStore } from "@/stores/TransactionStore";
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { useAccountStore } from "@/stores/AccountsStore";
import { useAuthStore } from "@/stores/AuthStore";

import NewTransactionModal from "../NewTransactionModal";
import SelectAccount from "../SelectAccount";

export default function TransactionsTable() {
    let transactionStore = useTransactionStore();
    let accountStore = useAccountStore()
    let authStore = useAuthStore();

    let { user } = authStore;
    let { transactions, fetchData, isLoading } = transactionStore;
    let { accounts, currentAccount } = accountStore;

    useEffect(() => {
        fetchData();
    }, []);

    const userAccount = accounts.filter(account => account.email == user.userEmail);

    if (userAccount.length > 0 && currentAccount == "") {
        currentAccount = accounts[0].id;
    }

    let transactionsActive: TransactionProps[] = [];

    transactions.forEach(transaction => {
        if (transaction.isActive && transaction.account == currentAccount) {
            transactionsActive.push(transaction);
        }
    })

    return (
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-10">

            {isLoading && <div className="p-3">Carregando...</div>}

            <SelectAccount />

            <div className="max-sm:hidden mr-2">
                <NewTransactionModal />
            </div>

            <DataTable columns={columns} data={transactionsActive} />
        </div>
    )
}