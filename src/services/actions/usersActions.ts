import { db } from '../../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore";
import { getUsersAccess } from '../dataAccess/usersAccess';
import { UserProps } from '@/stores/UserStore';

export async function getUsersAction() {
    const response = await getUsersAccess();

    const users: any[] = [];
    response.forEach((doc) => {
        users.push(doc.data());
    })

    return users;
}

export async function addUsersAction(user: UserProps) {
    await addDoc(collection(db, "users"), {
        name: user.name,
        email: user.email,
    });
}
