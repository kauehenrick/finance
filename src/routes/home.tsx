import Header from "../components/Header";
import Summary from "../components/Summary";
import TransactionsTable from "../components/TransactionsTable";
import '../globals.css'
import { Toaster } from "sonner";

export default function Home() {
    return (
        <>
            <Toaster position="bottom-right" richColors closeButton />

            <Header />

            <Summary />

            <TransactionsTable />
        </>
    )
}