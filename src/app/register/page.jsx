"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setUserCreated(false);
        setError(false);
        setCreatingUser(true);
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'},
        });
        if(response.ok) {
            setUserCreated(true);
        }
        else {
            setError(true);
        }
        setCreatingUser(false); 
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Register
            </h1>
            {userCreated && (
                <div className="m-auto my-4 text-center bg-green-300 max-w-sm rounded-full">
                    User created. <br />
                    You can login now.{' '}
                    <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="m-auto my-4 text-center bg-red-300 max-w-sm rounded-full">
                    Error. Please try again later.
                </div>
            )}
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser}/>
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={creatingUser}/>
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" className="flex gap-4 justify-center items-center" onClick={() => signIn('google', {callbackUrl:'/'})}>
                    <Image src={'/google.png'} alt={'google'} width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account? <Link className="underline" href={'/login'}>Login &raquo;</Link>
                </div>
            </form>
        </section>
    )
}