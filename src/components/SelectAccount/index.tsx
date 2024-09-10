import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import DataTableDialog from "../DataTableDialog";

import { useAccountStore } from "@/stores/AccountsStore";
import { useAuthStore } from "@/stores/AuthStore";

import { useEffect } from "react";

export default function SelectAccount() {
    let authStore = useAuthStore();
    let accountStore = useAccountStore();

    let { accounts, getAccounts, addAccount, setCurrentAccount } = accountStore;
    let { user, getUserInfo } = authStore;

    const decryptedUser = getUserInfo(user);

    const userAccount = accounts.filter(account => account.email == decryptedUser.userEmail);

    useEffect(() => {
        getAccounts();
    }, [])

    return (
        <>
            {userAccount[0] != undefined ? <div className="flex border rounded-lg p-2 gap-2">
                <Select onValueChange={(e) => setCurrentAccount(e)} defaultValue={userAccount[0].id}>
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
            </div> : "Nenhuma conta encontrada!"}
        </>
    )
}