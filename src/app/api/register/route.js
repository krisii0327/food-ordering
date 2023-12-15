import mongoose from "mongoose";
import { User } from "../../models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
    const body = await req.json();
    
    mongoose.connect(process.env.MONGO_URL);
    //mongoose.connect('mongodb+srv://kovesi44:xXn3rJrX9pRn8G03@cluster0.0pcwz2u.mongodb.net/food-ordering-app?retryWrites=true&w=majority');
    const pass = body.password;
    if(!pass?.length  || pass.length < 5) {
        new Error('password must be at least 5 characters');
    }

    const notHashedPassword = pass;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
    body.password = hashedPassword;

    const createdUser = await User.create(body);

    return Response.json(createdUser);
}