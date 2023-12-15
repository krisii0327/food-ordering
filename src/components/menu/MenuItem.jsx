import { useContext } from "react"
import { CartContext } from "../AppContext"
import toast from "react-hot-toast";
import { useState } from "react";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import FlyingButton from 'react-flying-item'

export default function MenuItem(menuItem) {
    const {image, name, description, basePrice, sizes, extraIngredientPrices} = menuItem;

    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);

    const [showPopup, setShowPopup] = useState(false);
    const {addToCart} = useContext(CartContext);

    async function handleAddToCartButtonClick() {
        const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
        if (hasOptions && !showPopup) {
          setShowPopup(true);
          return;
        }
        addToCart(menuItem, selectedSize, selectedExtras);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setShowPopup(false);
    }

    function handleExtraThingClick(ev, extra) {
        const checked = ev.target.checked;
        if(checked) {
            setSelectedExtras(prev => [...prev, extra])
        } else {
            setSelectedExtras(prev => {
                return prev.filter(e => e.name !== extra.name)
            })
        }
    }

    let selectedPrice = basePrice;
    if (selectedSize) {
        selectedPrice += selectedSize.price;
    }
    if (selectedExtras?.length > 0) {
        for(const extra of selectedExtras) {
            selectedPrice += extra.price;
        }
    }

    return (
        <>
            {showPopup && (
                <div onClick={() => setShowPopup(false)} className="fixed inset-0 bg-black/80 flex items-center justify-center">
                    <div onClick={ev => ev.stopPropagation()} className="my-8 bg-white p-4 rounded-lg max-w-md">
                        <div className="overflow-y-scroll p-2" style={{maxHeight: 'calc(100vh - 80px)'}}>
                            <Image src={image} alt={name} width={200} height={200} className="mx-auto"></Image>
                            <h2 className="text-lg font-bold text-center mb-4">{name}</h2>
                            <p className="text-center text-gray-500 text-sm mb-4">{description}</p>
                            {sizes?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Pick your size</h3>
                                    {sizes.map(size => (
                                        <label key={size._id} className="flex items-center gap-1 p-4 border rounded-md mb-1">
                                            <input type="radio" name="size" onChange={() => setSelectedSize(size)} checked={selectedSize?.name === size.name}/>{size.name} ${basePrice + size.price}
                                        </label>
                                    ))}
                                </div>
                            )}
                            {extraIngredientPrices?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    {extraIngredientPrices.map(extra => (
                                        <label key={extra._id} className="flex items-center gap-1 p-4 border rounded-md mb-1">
                                            <input type="checkbox" name={extra.name} onChange={ev => handleExtraThingClick(ev, extra)} checked={selectedExtras.map(e => e._id).includes(extra._id)}/>
                                            {extra.name} +${extra.price}
                                        </label>
                                    ))}
                                </div> 
                            )}
                            <div className="bg-primary rounded-xl" onClick={handleAddToCartButtonClick}>
                                <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
                                    <div className="text-white sticky bottom-2" >
                                        Add to cart ${selectedPrice}
                                    </div>
                                </FlyingButton>
                            </div>
                            <button className="mt-2" onClick={() => setShowPopup(false)} type="button">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
        </>
    )
}