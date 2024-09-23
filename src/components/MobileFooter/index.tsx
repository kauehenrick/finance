import NewTransactionModal from "../NewTransactionModal";

export default function MobileFooter() {
    return (
        <div className="bg-blue flex justify-center items-center fixed bottom-0 w-full h-16 md:hidden">
            <NewTransactionModal />
        </div>
    )
}