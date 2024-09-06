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
import NewTransactionModal from "../NewTransactionModal";

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
        <div className="bg-white border rounded-lg p-2 w-10/12 m-auto mt-10">
            
            {isLoading && <div className="p-3">Carregando...</div>}

            <div className="flex justify-between mt-3 gap-2">
                <div className="flex border rounded-lg p-2">
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

                <div className="max-sm:hidden mr-2">
                    <NewTransactionModal />
                </div>
            </div>

            <DataTable columns={columns} data={transactionsActive} />
        </div>
    )
}