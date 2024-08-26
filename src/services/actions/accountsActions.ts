import { db } from '../../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { getAccountsAccess } from "../dataAccess/accountsAccess";
import { AccountProps } from "@/stores/AccountsStore";

export async function getAccountsAction() {
    const response = await getAccountsAccess();

    const accounts: any[] = [];
    response.forEach((doc) => {
        accounts.push(doc.data());
    })

    return accounts;
}

export async function addAccountsAction(account: AccountProps) {
    await addDoc(collection(db, "accounts"), {
        email: account.email,
        alias: account.alias,
        agency: account.agency,
        number: account.number,
    });
}
