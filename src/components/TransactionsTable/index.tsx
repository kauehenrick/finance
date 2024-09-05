"use client"

import { useEffect } from "react";
import { TransactionProps, useTransactionStore } from "@/stores/TransactionStore";
import { DataTable } from "./data-table"
import { columns } from "./columns"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAccountStore } from "@/stores/AccountsStore";
import { useAuthStore } from "@/stores/AuthStore";
import DataTableDialog from "../DataTableDialog";

export default function TransactionsTable() {
    let store = useTransactionStore();
    let accountStore = useAccountStore();
    let authStore = useAuthStore();

    let { transactions, fetchData, isLoading } = store;
    let { accounts, getAccounts, addAccount, setCurrentAccount, currentAccount } = accountStore;
    let { user } = authStore;

    const userAccount = accounts.filter(account => account.email == user.userEmail);

    useEffect(() => {
        fetchData();
        getAccounts();
    }, []);

    let transactionsActive: TransactionProps[] = [];

    transactions.forEach(transaction => {
        if (transaction.isActive && transaction.account == currentAccount) {
            transactionsActive.push(transaction);
        }
    })

    return (
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-20">
            {isLoading && <div className="p-3">Carregando...</div>}

            <div className="flex mt-3 gap-2 p-2 border w-fit rounded-lg">
                <Select onValueChange={(e) => setCurrentAccount(e)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                        {userAccount.map(account => (
                            <SelectItem
                                key={account.id}
                                value={account.id}
                            >
                                {account.alias}
                            </SelectItem>
                        ))
                        }
                    </SelectContent>
                </Select>

                <DataTableDialog inputValue="conta" addValue={addAccount} />
            </div>

            <DataTable columns={columns} data={transactionsActive} />
        </div>
    )
}