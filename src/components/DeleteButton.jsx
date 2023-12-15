import { useState } from "react";

export default function DeleteButton({label, onDelete}) {
    const [showConfirm, setShowConfirm] = useState(false);

    if(showConfirm) {
        return (
            <div className="fixed bg-black/80 flex inset-0 items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg border">
                    <div>Are you sure you want to delete?</div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={() => setShowConfirm(false)}>Cancel</button>
                        <button type="button" onClick={onDelete} className="bg-primary text-white">Yes,&nbsp;delete</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    );
}