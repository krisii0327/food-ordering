"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {signIn} from "next-auth/react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginInProgress, setLoginInProgress] = useState(false);

    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);

        await signIn('credentials', {email, password, callbackUrl:'/'});

        setLoginInProgress(false);
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginInProgress}/>
                <input type="password" name="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginInProgress}/>
                <button type="submit" disabled={loginInProgress}>Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" className="flex gap-4 justify-center items-center" onClick={() => signIn('google', {callbackUrl:'/'})}>
                    <Image src={'/google.png'} alt={'google'} width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing account? <Link className="underline" href={'/register'}>Login &raquo;</Link>
                </div>
            </form>
        </section>
    );
}