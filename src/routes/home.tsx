import MobileFooter from "@/components/MobileFooter";
import MobileHeader from "@/components/MobileHeader";
import Summary from "../components/Summary";
import TransactionsTable from "../components/TransactionsTable";
import '../globals.css'
import { Toaster } from "sonner";
import Header from "@/components/Header";

export default function Home() {
    return (
        <>
            <Toaster position="bottom-right" richColors closeButton />

            <Header />

            <MobileHeader />

            <Summary />

            <TransactionsTable />

            <MobileFooter />
        </>
    )
}