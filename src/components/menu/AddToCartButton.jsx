export default function AddToCartButton({hasSizesOrExtras, onClick, basePrice, image}) {

    if (!hasSizesOrExtras) {
        return (
            <div className="flying-button-parent mt-4" >
                <div>
                    <div onClick={onClick}>
                        Add to cart ${basePrice}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button type="button" className="mt-4 bg-primary text-white px-8 py-2 rounded-full" onClick={onClick}>
            <span>Add to cart (from ${basePrice})</span>
        </button>
    )
}