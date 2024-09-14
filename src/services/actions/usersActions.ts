import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { getUsersAccess } from '../dataAccess/usersAccess';
import { UserProps } from '@/stores/UserStore';

export async function getUsersAction() {
    const response = await getUsersAccess();

    const users: any[] = [];
    response.forEach((doc) => {
        users.push(doc.data());
    })

    users.forEach(e => {
        const ts = (e.userSubscription.seconds + e.userSubscription.nanoseconds * 10 ** -9) * 1000;
        e.userSubscription = new Date(ts);
    })

    return users;
}

export async function addUsersAction(user: UserProps) {
    const docRef = doc(db, "users", user.id);
    await setDoc(docRef, user);
}
