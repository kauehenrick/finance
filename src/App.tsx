import Header from "./components/Header";
import Summary from "./components/Summary";
import TransactionsTable from "./components/TransactionsTable";
import './globals.css'
import NewTransactionModal from "./components/NewTransactionModal";
import { useState } from "react";
import { Toaster } from "sonner";

export default function App(){
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <>
      <Toaster position="bottom-right" richColors closeButton />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Summary />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />

      <TransactionsTable />

    </>
  )
}

