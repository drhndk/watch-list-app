import Spinner from "../components/Spinner";

export default function LoadingModal() {
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            e.preventDefault(); // Mencegah dialog tertutup
        }
    };

    return (
        <div>
            <dialog id="my_modal_loading" className="modal" onKeyDown={(e) => handleKeyDown(e)}>
                <Spinner />
            </dialog>
        </div>
    );
}