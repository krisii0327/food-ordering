import mongoose, {models, Schema, model} from "mongoose";

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
});

const MenuItemSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: mongoose.Types.ObjectId,
    },
    basePrice: {
        type: Number,
        required: true,
    },
    sizes: {
        type: [ExtraPriceSchema]
    },
    extraIngredientPrices: {
        type: [ExtraPriceSchema]
    }
},
{
    timestamps: true,
}
);

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);