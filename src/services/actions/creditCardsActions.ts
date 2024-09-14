import { db } from '../../../firebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { getCreditCardsAccess } from '../dataAccess/creditCardsAccess';
import { CreditCardProps } from '@/stores/CreditCardStore';

export async function getCreditCardsAction() {
    const response = await getCreditCardsAccess();

    const creditCards: any[] = [];
    response.forEach((doc) => {
        creditCards.push(doc.data());
    })

    return creditCards;
}

export async function addCreditCardsAction(creditCard: CreditCardProps) {
    const docRef = doc(db, "creditCards", creditCard.id);
    await setDoc(docRef, creditCard);
}