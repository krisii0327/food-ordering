import Image from "next/image"
import Trash from "@/components/icons/Trash"
import { cartProductPrice } from "@/components/AppContext"

export default function CartProduct({product, onRemove, index}) {
    return (
        <div key={index} className="flex items-center gap-4 border-b py-4">
                <div className="w-24 h-24 overflow-hidden">
                    <Image src={product.image} alt={product.image} width={240} height={240}></Image>
                </div>
                <div className="grow">
                    <h3 className="font-semibold">{product.name}</h3>
                    {product.size && (
                        <div key={product.size.name} className="text-sm text-gray-700">
                            Size: <span>{product.size.name}</span>
                        </div>
                    )}
                    {product.extras?.length > 0 && (
                        <div key={product._id} className="text-sm text-gray-500">
                            Extras:
                            {product.extras.map(extra => (
                                <div key={extra._id}>{extra.name} ${extra.price}</div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="text-lg font-semibold">
                    ${cartProductPrice(product)}
                </div>
                {!!onRemove && (
                    <div className="ml-2">
                        <button className="p-2" type="button" onClick={() => onRemove(index)}>
                            <Trash />
                        </button>
                    </div>
                )}
            </div>
    )
}