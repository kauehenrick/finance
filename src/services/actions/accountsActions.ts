import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
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
    const docRef = doc(db, "accounts", account.id);
    await setDoc(docRef, account);
}
